import { bind, BindingScope } from '@loopback/core';
import { AdminApi } from '@oryd/hydra-client';
import { repository } from '@loopback/repository';
import { UserRepository } from '../repositories';
import fs from 'fs';
import path from 'path';
import { User } from '../models';


@bind({ scope: BindingScope.TRANSIENT })
export class HydraService extends AdminApi {
  private readonly hydraUrl: string;

  constructor(@repository(UserRepository) private userRepo: UserRepository) {
    super(process.env.HYDRA_ADMIN_URL);
    this.importUser();
    this.hydraUrl = process.env.HYDRA_ADMIN_URL!;
    if (!this.hydraUrl)
      throw new Error('HYDRA_ADMIN_URL not defined.');
  }

  importUser() {
    try {
      if (fs.existsSync(path.resolve("users.json"))) {
        const users: User[] = require(path.resolve("users.json"))
        this.userRepo.createAll(users);
      }
    } catch (e) { console.log(e) }
  }
}
