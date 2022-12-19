import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Acompanante} from '../models';
import {AcompananteRepository} from '../repositories';

export class AcompananteController {
  constructor(
    @repository(AcompananteRepository)
    public acompananteRepository : AcompananteRepository,
  ) {}

  @post('/acompanantes')
  @response(200, {
    description: 'Acompanante model instance',
    content: {'application/json': {schema: getModelSchemaRef(Acompanante)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Acompanante, {
            title: 'NewAcompanante',
            exclude: ['id'],
          }),
        },
      },
    })
    acompanante: Omit<Acompanante, 'id'>,
  ): Promise<Acompanante> {
    return this.acompananteRepository.create(acompanante);
  }

  @get('/acompanantes/count')
  @response(200, {
    description: 'Acompanante model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Acompanante) where?: Where<Acompanante>,
  ): Promise<Count> {
    return this.acompananteRepository.count(where);
  }

  @get('/acompanantes')
  @response(200, {
    description: 'Array of Acompanante model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Acompanante, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Acompanante) filter?: Filter<Acompanante>,
  ): Promise<Acompanante[]> {
    return this.acompananteRepository.find(filter);
  }

  @patch('/acompanantes')
  @response(200, {
    description: 'Acompanante PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Acompanante, {partial: true}),
        },
      },
    })
    acompanante: Acompanante,
    @param.where(Acompanante) where?: Where<Acompanante>,
  ): Promise<Count> {
    return this.acompananteRepository.updateAll(acompanante, where);
  }

  @get('/acompanantes/{id}')
  @response(200, {
    description: 'Acompanante model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Acompanante, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Acompanante, {exclude: 'where'}) filter?: FilterExcludingWhere<Acompanante>
  ): Promise<Acompanante> {
    return this.acompananteRepository.findById(id, filter);
  }

  @patch('/acompanantes/{id}')
  @response(204, {
    description: 'Acompanante PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Acompanante, {partial: true}),
        },
      },
    })
    acompanante: Acompanante,
  ): Promise<void> {
    await this.acompananteRepository.updateById(id, acompanante);
  }

  @put('/acompanantes/{id}')
  @response(204, {
    description: 'Acompanante PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() acompanante: Acompanante,
  ): Promise<void> {
    await this.acompananteRepository.replaceById(id, acompanante);
  }

  @del('/acompanantes/{id}')
  @response(204, {
    description: 'Acompanante DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.acompananteRepository.deleteById(id);
  }
}
