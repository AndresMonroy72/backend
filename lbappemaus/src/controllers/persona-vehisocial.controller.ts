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
  Persona,
  Vehisocial,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaVehisocialController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/vehisocials', {
    responses: {
      '200': {
        description: 'Array of Persona has many Vehisocial',
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
    return this.personaRepository.vehisocials(id).find(filter);
  }

  @post('/personas/{id}/vehisocials', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehisocial)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehisocial, {
            title: 'NewVehisocialInPersona',
            exclude: ['id'],
            optional: ['id_persona']
          }),
        },
      },
    }) vehisocial: Omit<Vehisocial, 'id'>,
  ): Promise<Vehisocial> {
    return this.personaRepository.vehisocials(id).create(vehisocial);
  }

  @patch('/personas/{id}/vehisocials', {
    responses: {
      '200': {
        description: 'Persona.Vehisocial PATCH success count',
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
    return this.personaRepository.vehisocials(id).patch(vehisocial, where);
  }

  @del('/personas/{id}/vehisocials', {
    responses: {
      '200': {
        description: 'Persona.Vehisocial DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vehisocial)) where?: Where<Vehisocial>,
  ): Promise<Count> {
    return this.personaRepository.vehisocials(id).delete(where);
  }
}
