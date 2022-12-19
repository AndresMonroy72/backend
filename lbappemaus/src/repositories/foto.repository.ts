import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Foto, FotoRelations, Vehisocial} from '../models';
import {VehisocialRepository} from './vehisocial.repository';

export class FotoRepository extends DefaultCrudRepository<
  Foto,
  typeof Foto.prototype.id,
  FotoRelations
> {

  public readonly vehisocial: BelongsToAccessor<Vehisocial, typeof Foto.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('VehisocialRepository') protected vehisocialRepositoryGetter: Getter<VehisocialRepository>,
  ) {
    super(Foto, dataSource);
    this.vehisocial = this.createBelongsToAccessorFor('vehisocial', vehisocialRepositoryGetter,);
    this.registerInclusionResolver('vehisocial', this.vehisocial.inclusionResolver);
  }
}
