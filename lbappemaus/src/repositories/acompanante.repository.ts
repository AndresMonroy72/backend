import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Acompanante, AcompananteRelations} from '../models';

export class AcompananteRepository extends DefaultCrudRepository<
  Acompanante,
  typeof Acompanante.prototype.id,
  AcompananteRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Acompanante, dataSource);
  }
}
