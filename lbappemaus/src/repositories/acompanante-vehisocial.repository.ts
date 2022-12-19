import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {AcompananteVehisocial, AcompananteVehisocialRelations} from '../models';

export class AcompananteVehisocialRepository extends DefaultCrudRepository<
  AcompananteVehisocial,
  typeof AcompananteVehisocial.prototype.id,
  AcompananteVehisocialRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(AcompananteVehisocial, dataSource);
  }
}
