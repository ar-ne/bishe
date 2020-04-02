import {DefaultCrudRepository} from '@loopback/repository';
import {UserCredential, UserCredentialRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserCredentialRepository extends DefaultCrudRepository<
  UserCredential,
  typeof UserCredential.prototype.username,
  UserCredentialRelations
> {
  constructor(
    @inject('datasources.DB') dataSource: DbDataSource,
  ) {
    super(UserCredential, dataSource);
  }
}
