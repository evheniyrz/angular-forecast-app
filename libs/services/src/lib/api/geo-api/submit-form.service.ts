import { Injectable } from '@angular/core';

@Injectable()
export abstract class SubmitFomService<Type> {
  abstract submitFormData(params: {
    [Property in keyof Type]: Type[Property];
  }): void;
}
