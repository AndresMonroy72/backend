import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Proveedor,
  Vehisocial,
} from '../models';
import {ProveedorRepository} from '../repositories';

export class ProveedorVehisocialController {
  constructor(
    @repository(ProveedorRepository) protected proveedorRepository: ProveedorRepository,
  ) { }

  @get('/proveedors/{id}/vehisocials', {
    responses: {
      '200': {
        description: 'Array of Proveedor has many Vehisocial',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehisocial)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Vehisocial>,
  ): Promise<Vehisocial[]> {
    return this.proveedorRepository.vehisocials(id).find(filter);
  }

  @post('/proveedors/{id}/vehisocials', {
    responses: {
      '200': {
        description: 'Proveedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehisocial)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Proveedor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehisocial, {
            title: 'NewVehisocialInProveedor',
            exclude: ['id'],
            optional: ['id_proveedor']
          }),
        },
      },
    }) vehisocial: Omit<Vehisocial, 'id'>,
  ): Promise<Vehisocial> {
    return this.proveedorRepository.vehisocials(id).create(vehisocial);
  }

  @patch('/proveedors/{id}/vehisocials', {
    responses: {
      '200': {
        description: 'Proveedor.Vehisocial PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehisocial, {partial: true}),
        },
      },
    })
    vehisocial: Partial<Vehisocial>,
    @param.query.object('where', getWhereSchemaFor(Vehisocial)) where?: Where<Vehisocial>,
  ): Promise<Count> {
    return this.proveedorRepository.vehisocials(id).patch(vehisocial, where);
  }

  @del('/proveedors/{id}/vehisocials', {
    responses: {
      '200': {
        description: 'Proveedor.Vehisocial DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vehisocial)) where?: Where<Vehisocial>,
  ): Promise<Count> {
    return this.proveedorRepository.vehisocials(id).delete(where);
  }
}
