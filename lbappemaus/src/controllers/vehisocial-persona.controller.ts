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
  Persona,
} from '../models';
import {VehisocialRepository} from '../repositories';

export class VehisocialPersonaController {
  constructor(
    @repository(VehisocialRepository)
    public vehisocialRepository: VehisocialRepository,
  ) { }

  @get('/vehisocials/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Vehisocial',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.number('id') id: typeof Vehisocial.prototype.id,
  ): Promise<Persona> {
    return this.vehisocialRepository.tiene_persona(id);
  }
}
