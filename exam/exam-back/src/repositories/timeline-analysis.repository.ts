import {DefaultCrudRepository} from '@loopback/repository';
import {TimelineAnalysis, TimelineAnalysisRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TimelineAnalysisRepository extends DefaultCrudRepository<
  TimelineAnalysis,
  typeof TimelineAnalysis.prototype.record,
  TimelineAnalysisRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TimelineAnalysis, dataSource);
  }
}
