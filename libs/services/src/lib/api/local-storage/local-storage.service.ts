import { Injectable } from '@angular/core';
import { STORAGEKEYS } from '@lib-services';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService<T> {
  constructor() {}

  // Сохранение данных
  setItem(key: STORAGEKEYS, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Получение данных
  getItem(key: STORAGEKEYS): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Удаление данных
  removeItem(key: STORAGEKEYS): void {
    localStorage.removeItem(key);
  }

  // Очистка хранилища
  clear(): void {
    localStorage.clear();
  }
}
