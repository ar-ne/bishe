import {DefaultCrudRepository} from '@loopback/repository';
import {Record, RecordRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RecordRepository extends DefaultCrudRepository<
  Record,
  typeof Record.prototype.answerID,
  RecordRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Record, dataSource);
  }
}
