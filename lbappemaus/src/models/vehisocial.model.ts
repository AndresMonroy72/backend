import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {AcompananteVehisocial} from './acompanante-vehisocial.model';
import {Acompanante} from './acompanante.model';
import {Foto} from './foto.model';
import {Persona} from './persona.model';
import {Proveedor} from './proveedor.model';

@model({

  settings: {
    foreignKeys: {
      fk_vehisocial_id_proveedor: {
        name: 'fk_vehisocial_id_proveedor',
        entity: 'Proveedor',
        entityKey: 'id',
        foreignKey: 'id_proveedor',

      },

      fk_vehisocial_id_persona: {
        name: 'fk_vehisocial_id_persona',
        entity: 'Persona',
        entityKey: 'id',
        foreignKey: 'id_persona',

      }


    },
  },
})




export class Vehisocial extends Entity {
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
  color: string;

  @property({
    type: 'number',
    required: true,
  })
  modelo: number;

  @property({
    type: 'string',
    required: true,
  })
  serie: string;

  @property({
    type: 'string',
    required: true,
  })
  seriem: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    required: true,
  })
  descuento: number;

  @property({
    type: 'boolean',
    default: true,
  })
  estado?: boolean;

  @belongsTo(() => Persona, {name: 'tiene_persona'})
  id_persona: number;

  @hasMany(() => Acompanante, {through: {model: () => AcompananteVehisocial, keyFrom: 'id_vehisocial', keyTo: 'id_acompanante'}})
  acompanantes: Acompanante[];

  @hasMany(() => Foto, {keyTo: 'id_vehisocial'})
  fotos: Foto[];

  @belongsTo(() => Proveedor, {name: 'proveedor'})
  id_proveedor: number;

  constructor(data?: Partial<Vehisocial>) {
    super(data);
  }
}

export interface VehisocialRelations {
  // describe navigational properties here
}

export type VehisocialWithRelations = Vehisocial & VehisocialRelations;
