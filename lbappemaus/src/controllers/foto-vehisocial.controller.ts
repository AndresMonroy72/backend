import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Foto,
  Vehisocial,
} from '../models';
import {FotoRepository} from '../repositories';

export class FotoVehisocialController {
  constructor(
    @repository(FotoRepository)
    public fotoRepository: FotoRepository,
  ) { }

  @get('/fotos/{id}/vehisocial', {
    responses: {
      '200': {
        description: 'Vehisocial belonging to Foto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehisocial)},
          },
        },
      },
    },
  })
  async getVehisocial(
    @param.path.number('id') id: typeof Foto.prototype.id,
  ): Promise<Vehisocial> {
    return this.fotoRepository.vehisocial(id);
  }
}
