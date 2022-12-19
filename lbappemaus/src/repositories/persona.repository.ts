import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Persona, PersonaRelations, Vehisocial} from '../models';
import {VehisocialRepository} from './vehisocial.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly vehisocials: HasManyRepositoryFactory<Vehisocial, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('VehisocialRepository') protected vehisocialRepositoryGetter: Getter<VehisocialRepository>,
  ) {
    super(Persona, dataSource);
    this.vehisocials = this.createHasManyRepositoryFactoryFor('vehisocials', vehisocialRepositoryGetter,);
    this.registerInclusionResolver('vehisocials', this.vehisocials.inclusionResolver);
  }
}
