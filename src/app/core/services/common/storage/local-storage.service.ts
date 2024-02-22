import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { StorageService } from './storage';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService extends StorageService {

  constructor() {
    super(window.localStorage);
  }
}
