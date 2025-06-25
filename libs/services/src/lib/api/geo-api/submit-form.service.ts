import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export abstract class SubmitFomService<Type> {
  abstract submitFormData(params: {
    [Property in keyof Type]: Type[Property];
  }): Subscription;
}
