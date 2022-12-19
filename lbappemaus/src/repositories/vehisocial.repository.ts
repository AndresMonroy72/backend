import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Vehisocial, VehisocialRelations, Persona, Acompanante, AcompananteVehisocial, Foto, Proveedor} from '../models';
import {PersonaRepository} from './persona.repository';
import {AcompananteVehisocialRepository} from './acompanante-vehisocial.repository';
import {AcompananteRepository} from './acompanante.repository';
import {FotoRepository} from './foto.repository';
import {ProveedorRepository} from './proveedor.repository';

export class VehisocialRepository extends DefaultCrudRepository<
  Vehisocial,
  typeof Vehisocial.prototype.id,
  VehisocialRelations
> {

  public readonly tiene_persona: BelongsToAccessor<Persona, typeof Vehisocial.prototype.id>;

  public readonly acompanantes: HasManyThroughRepositoryFactory<Acompanante, typeof Acompanante.prototype.id,
          AcompananteVehisocial,
          typeof Vehisocial.prototype.id
        >;

  public readonly fotos: HasManyRepositoryFactory<Foto, typeof Vehisocial.prototype.id>;

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof Vehisocial.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('AcompananteVehisocialRepository') protected acompananteVehisocialRepositoryGetter: Getter<AcompananteVehisocialRepository>, @repository.getter('AcompananteRepository') protected acompananteRepositoryGetter: Getter<AcompananteRepository>, @repository.getter('FotoRepository') protected fotoRepositoryGetter: Getter<FotoRepository>, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>,
  ) {
    super(Vehisocial, dataSource);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
    this.fotos = this.createHasManyRepositoryFactoryFor('fotos', fotoRepositoryGetter,);
    this.registerInclusionResolver('fotos', this.fotos.inclusionResolver);
    this.acompanantes = this.createHasManyThroughRepositoryFactoryFor('acompanantes', acompananteRepositoryGetter, acompananteVehisocialRepositoryGetter,);
    this.registerInclusionResolver('acompanantes', this.acompanantes.inclusionResolver);
    this.tiene_persona = this.createBelongsToAccessorFor('tiene_persona', personaRepositoryGetter,);
    this.registerInclusionResolver('tiene_persona', this.tiene_persona.inclusionResolver);
  }
}
