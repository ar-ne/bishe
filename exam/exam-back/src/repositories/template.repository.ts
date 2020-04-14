import {DefaultCrudRepository} from '@loopback/repository';
import {Template, TemplateRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TemplateRepository extends DefaultCrudRepository<
  Template,
  typeof Template.prototype.name,
  TemplateRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Template, dataSource);
  }
}
