import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Proveedor, ProveedorRelations, Vehisocial} from '../models';
import {VehisocialRepository} from './vehisocial.repository';

export class ProveedorRepository extends DefaultCrudRepository<
  Proveedor,
  typeof Proveedor.prototype.id,
  ProveedorRelations
> {

  public readonly vehisocials: HasManyRepositoryFactory<Vehisocial, typeof Proveedor.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('VehisocialRepository') protected vehisocialRepositoryGetter: Getter<VehisocialRepository>,
  ) {
    super(Proveedor, dataSource);
    this.vehisocials = this.createHasManyRepositoryFactoryFor('vehisocials', vehisocialRepositoryGetter,);
    this.registerInclusionResolver('vehisocials', this.vehisocials.inclusionResolver);
  }
}
