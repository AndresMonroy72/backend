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
  Vehisocial,
  Foto,
} from '../models';
import {VehisocialRepository} from '../repositories';

export class VehisocialFotoController {
  constructor(
    @repository(VehisocialRepository) protected vehisocialRepository: VehisocialRepository,
  ) { }

  @get('/vehisocials/{id}/fotos', {
    responses: {
      '200': {
        description: 'Array of Vehisocial has many Foto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Foto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Foto>,
  ): Promise<Foto[]> {
    return this.vehisocialRepository.fotos(id).find(filter);
  }

  @post('/vehisocials/{id}/fotos', {
    responses: {
      '200': {
        description: 'Vehisocial model instance',
        content: {'application/json': {schema: getModelSchemaRef(Foto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Vehisocial.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foto, {
            title: 'NewFotoInVehisocial',
            exclude: ['id'],
            optional: ['id_vehisocial']
          }),
        },
      },
    }) foto: Omit<Foto, 'id'>,
  ): Promise<Foto> {
    return this.vehisocialRepository.fotos(id).create(foto);
  }

  @patch('/vehisocials/{id}/fotos', {
    responses: {
      '200': {
        description: 'Vehisocial.Foto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foto, {partial: true}),
        },
      },
    })
    foto: Partial<Foto>,
    @param.query.object('where', getWhereSchemaFor(Foto)) where?: Where<Foto>,
  ): Promise<Count> {
    return this.vehisocialRepository.fotos(id).patch(foto, where);
  }

  @del('/vehisocials/{id}/fotos', {
    responses: {
      '200': {
        description: 'Vehisocial.Foto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Foto)) where?: Where<Foto>,
  ): Promise<Count> {
    return this.vehisocialRepository.fotos(id).delete(where);
  }
}
