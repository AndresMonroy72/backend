import {Entity, model, property} from '@loopback/repository';

@model()
export class Acompanante extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'number',
    required: true,
  })
  edad: number;


  constructor(data?: Partial<Acompanante>) {
    super(data);
  }
}

export interface AcompananteRelations {
  // describe navigational properties here
}

export type AcompananteWithRelations = Acompanante & AcompananteRelations;
