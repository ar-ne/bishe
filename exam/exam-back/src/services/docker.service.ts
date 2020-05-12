import { bind, BindingScope } from '@loopback/core';
import Dockerode, { Container, ContainerInspectInfo, EndpointsConfig, NetworkInspectInfo } from 'dockerode';
import { WorkspaceSession } from '../models';
import { repository } from '@loopback/repository';
import { WorkspaceSessionRepository } from '../repositories';
import { redisService } from '../redis-service';

export const docker = new Dockerode();

@bind({ scope: BindingScope.TRANSIENT })
export class DockerService {
  get network(): Promise<Dockerode.NetworkInspectInfo> {
    return this._network;
  }

  private _network: Promise<NetworkInspectInfo>;
  private networkLabel = process.env.CONTAINER_NETWORK;

  constructor(
    @repository(WorkspaceSessionRepository) private wsp: WorkspaceSessionRepository,
  ) {
    const self = this;
    self._network = docker.listNetworks().then((r: NetworkInspectInfo[]) => {
      return r.filter(value => value.Labels?.['com.docker.compose.network']?.includes(self.networkLabel!))[0];
    });
  }

  async getContainer(workspace: WorkspaceSession) {//返回一个运行中的容器
    let container = await this.verify(workspace);
    if (container === undefined) {
      container = await docker.createContainer(await this.getConfig(workspace));
      await container.start();
    }
    return container;
  }

  async destroy(workspaceSession: WorkspaceSession) {
    if (workspaceSession.containerID == undefined) {
      await this.wsp.deleteById(workspaceSession.token);
      return true;
    }
    const container = docker.getContainer(workspaceSession.containerID);
    if (container === undefined) {
      await this.wsp.deleteById(workspaceSession.token);
      return true;
    } else {
      await container.remove({
        force: true,
        v: true,
      });
      await redisService.ContainerRoute(workspaceSession).del();
      await this.wsp.deleteById(workspaceSession.token);
    }
  }

  async verify(workspaceSession: WorkspaceSession, retryLimit = 3): Promise<Container | undefined> {
    if (retryLimit <= 0) {
      throw new Error('Can not verify container state:' + workspaceSession.containerID);
    }
    if (workspaceSession.containerID === undefined) return undefined;
    const container = docker.getContainer(workspaceSession.containerID);
    if (container === undefined) return undefined; //未找到

    return await container.inspect()
      .then(async (inspectInfo: ContainerInspectInfo) => {
        if (inspectInfo.State.Status != 'running') {
          await container.restart();
        }
        return container;
      })
      .catch(async () => {
        return undefined;
      });
  }

  async getConfig(workspaceSession: WorkspaceSession) {
    const containerOption: Dockerode.ContainerCreateOptions = {
      Image: 'exam-theia',
      Labels: {
        'exam.workspace.token': workspaceSession.token,
        'exam.workspace.isWorkspace': 'true',
      },
      NetworkingConfig: {
        EndpointsConfig: {} as EndpointsConfig,
      },
      HostConfig: {
        // Memory: 512000000,
        // OomKillDisable: true,
        DiskQuota: 1024000000,
        // CpuQuota: 1000000,
        // CpuPeriod: 1000000,
      },
      Env: [
        `ACCESS_TOKEN=${workspaceSession.token}`,
        `PROJECT_ARCHIVE=${workspaceSession.projectArchive}`,
        `ENABLE_TRACK=${workspaceSession.enableTrack ? 1 : 0}`,
        `WS_URL=${process.env.WS_URL}`,
        `BACKEND_URL=http://exam-back:3000`,
      ],
    };
    containerOption.NetworkingConfig!.EndpointsConfig![await this._network.then(n => n.Name)] = {
      NetworkID: await this._network.then(n => n.Id),
    };
    return containerOption;
  }

  async ping() {
    return docker.ping().then(() => {
      return docker.listContainers().then(c => c.filter(v => v.Labels?.['exam.workspace.isWorkspace'] == 'true').map(v => v.Id));
    }).catch(reason => {
      return reason;
    });
  }
}
