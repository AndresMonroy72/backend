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
import {Vehisocial} from '../models';
import {VehisocialRepository} from '../repositories';

export class VehisocialController {
  constructor(
    @repository(VehisocialRepository)
    public vehisocialRepository : VehisocialRepository,
  ) {}

  @post('/vehisocials')
  @response(200, {
    description: 'Vehisocial model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vehisocial)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehisocial, {
            title: 'NewVehisocial',
            exclude: ['id'],
          }),
        },
      },
    })
    vehisocial: Omit<Vehisocial, 'id'>,
  ): Promise<Vehisocial> {
    return this.vehisocialRepository.create(vehisocial);
  }

  @get('/vehisocials/count')
  @response(200, {
    description: 'Vehisocial model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Vehisocial) where?: Where<Vehisocial>,
  ): Promise<Count> {
    return this.vehisocialRepository.count(where);
  }

  @get('/vehisocials')
  @response(200, {
    description: 'Array of Vehisocial model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vehisocial, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vehisocial) filter?: Filter<Vehisocial>,
  ): Promise<Vehisocial[]> {
    return this.vehisocialRepository.find(filter);
  }

  @patch('/vehisocials')
  @response(200, {
    description: 'Vehisocial PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehisocial, {partial: true}),
        },
      },
    })
    vehisocial: Vehisocial,
    @param.where(Vehisocial) where?: Where<Vehisocial>,
  ): Promise<Count> {
    return this.vehisocialRepository.updateAll(vehisocial, where);
  }

  @get('/vehisocials/{id}')
  @response(200, {
    description: 'Vehisocial model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vehisocial, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Vehisocial, {exclude: 'where'}) filter?: FilterExcludingWhere<Vehisocial>
  ): Promise<Vehisocial> {
    return this.vehisocialRepository.findById(id, filter);
  }

  @patch('/vehisocials/{id}')
  @response(204, {
    description: 'Vehisocial PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehisocial, {partial: true}),
        },
      },
    })
    vehisocial: Vehisocial,
  ): Promise<void> {
    await this.vehisocialRepository.updateById(id, vehisocial);
  }

  @put('/vehisocials/{id}')
  @response(204, {
    description: 'Vehisocial PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() vehisocial: Vehisocial,
  ): Promise<void> {
    await this.vehisocialRepository.replaceById(id, vehisocial);
  }

  @del('/vehisocials/{id}')
  @response(204, {
    description: 'Vehisocial DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.vehisocialRepository.deleteById(id);
  }
}
