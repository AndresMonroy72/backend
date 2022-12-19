import {Entity, model, property} from '@loopback/repository';

@model({

  settings: {
    foreignKeys: {
      fk_acomp_veh_id_vehisocial: {
        name: 'fk_acomp_veh_id_vehisocial',
        entity: 'Vehisocial',
        entityKey: 'id',
        foreignKey: 'id_vehisocial',

      },

      fk_acomp_veh_id_acompanante: {
        name: 'fk_acomp_veh_id_acompanante',
        entity: 'Acompanante',
        entityKey: 'id',
        foreignKey: 'id_acompanante',

      },

    },
  },
})



export class AcompananteVehisocial extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  id_vehisocial?: number;

  @property({
    type: 'number',
  })
  id_acompanante?: number;

  constructor(data?: Partial<AcompananteVehisocial>) {
    super(data);
  }
}

export interface AcompananteVehisocialRelations {
  // describe navigational properties here
}

export type AcompananteVehisocialWithRelations = AcompananteVehisocial & AcompananteVehisocialRelations;
