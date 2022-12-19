import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Vehisocial} from './vehisocial.model';

@model({

  settings: {
    foreignKeys: {
      fk_foto_id_vehisocial: {
        name: 'fk_foto_id_vehisocial',
        entity: 'Vehisocial',
        entityKey: 'id',
        foreignKey: 'id_vehisocial',

      }
    },
  },
})



export class Foto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @belongsTo(() => Vehisocial, {name: 'vehisocial'})
  id_vehisocial: number;

  constructor(data?: Partial<Foto>) {
    super(data);
  }
}

export interface FotoRelations {
  // describe navigational properties here
}

export type FotoWithRelations = Foto & FotoRelations;
