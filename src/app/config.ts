import { InjectionToken } from '@angular/core';

export interface AppConfig {
  usersUrl: string
}

export const APP_CONFIG_DATA = {
  usersUrl: '/assets/users.json'
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
