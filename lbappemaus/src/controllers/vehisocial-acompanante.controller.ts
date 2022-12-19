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
AcompananteVehisocial,
Acompanante,
} from '../models';
import {VehisocialRepository} from '../repositories';

export class VehisocialAcompananteController {
  constructor(
    @repository(VehisocialRepository) protected vehisocialRepository: VehisocialRepository,
  ) { }

  @get('/vehisocials/{id}/acompanantes', {
    responses: {
      '200': {
        description: 'Array of Vehisocial has many Acompanante through AcompananteVehisocial',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Acompanante)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Acompanante>,
  ): Promise<Acompanante[]> {
    return this.vehisocialRepository.acompanantes(id).find(filter);
  }

  @post('/vehisocials/{id}/acompanantes', {
    responses: {
      '200': {
        description: 'create a Acompanante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Acompanante)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Vehisocial.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Acompanante, {
            title: 'NewAcompananteInVehisocial',
            exclude: ['id'],
          }),
        },
      },
    }) acompanante: Omit<Acompanante, 'id'>,
  ): Promise<Acompanante> {
    return this.vehisocialRepository.acompanantes(id).create(acompanante);
  }

  @patch('/vehisocials/{id}/acompanantes', {
    responses: {
      '200': {
        description: 'Vehisocial.Acompanante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Acompanante, {partial: true}),
        },
      },
    })
    acompanante: Partial<Acompanante>,
    @param.query.object('where', getWhereSchemaFor(Acompanante)) where?: Where<Acompanante>,
  ): Promise<Count> {
    return this.vehisocialRepository.acompanantes(id).patch(acompanante, where);
  }

  @del('/vehisocials/{id}/acompanantes', {
    responses: {
      '200': {
        description: 'Vehisocial.Acompanante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Acompanante)) where?: Where<Acompanante>,
  ): Promise<Count> {
    return this.vehisocialRepository.acompanantes(id).delete(where);
  }
}
