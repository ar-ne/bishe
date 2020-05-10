import {DefaultCrudRepository} from '@loopback/repository';
import {WorkspaceSession, WorkspaceSessionRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class WorkspaceSessionRepository extends DefaultCrudRepository<
  WorkspaceSession,
  typeof WorkspaceSession.prototype.token,
  WorkspaceSessionRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(WorkspaceSession, dataSource);
  }
}
