import { bind, BindingScope } from '@loopback/core';
import { AdminApi } from '@oryd/hydra-client';


@bind({ scope: BindingScope.TRANSIENT })
export class HydraService extends AdminApi {
  private readonly hydraUrl: string;

  constructor() {
    super(process.env.HYDRA_ADMIN_URL);
    this.hydraUrl = process.env.HYDRA_ADMIN_URL!;
    if (!this.hydraUrl)
      throw new Error('HYDRA_ADMIN_URL not defined.');
  }
}
