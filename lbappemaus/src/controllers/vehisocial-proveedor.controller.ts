import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehisocial,
  Proveedor,
} from '../models';
import {VehisocialRepository} from '../repositories';

export class VehisocialProveedorController {
  constructor(
    @repository(VehisocialRepository)
    public vehisocialRepository: VehisocialRepository,
  ) { }

  @get('/vehisocials/{id}/proveedor', {
    responses: {
      '200': {
        description: 'Proveedor belonging to Vehisocial',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proveedor)},
          },
        },
      },
    },
  })
  async getProveedor(
    @param.path.number('id') id: typeof Vehisocial.prototype.id,
  ): Promise<Proveedor> {
    return this.vehisocialRepository.proveedor(id);
  }
}
