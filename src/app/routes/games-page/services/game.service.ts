import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IGameDetails } from '../../../core/models/game-details.interface';
import { URL_GAMES } from 'core/constants/urls-api.constant';

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly _http = inject(HttpClient);

  getGameById(id: number): Observable<IGameDetails> {
    return this._http.get<IGameDetails>(`${URL_GAMES}/${id}`);
  }
}
