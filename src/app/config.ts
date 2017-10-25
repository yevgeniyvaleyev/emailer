import { InjectionToken } from '@angular/core';

export interface AppConfig {
  usersApi: string
}

export const APP_CONFIG_DATA: AppConfig = {
  // usersApi: 'http://test-api.javascript.ru/v1/ujeen/users'
  usersApi: 'https://test-api.javascript.ru/v1/ujeen/users'
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
