import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGameDetails } from '@models/game-details.interface';

@Component({
  selector: 'app-game-detail-page',
  standalone: true,
  imports: [],
  templateUrl: './game-detail-page.component.html',
  styleUrl: './game-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDetailPageComponent implements OnInit {
  private readonly _route = inject(ActivatedRoute);

  gameDetails!: IGameDetails;

  ngOnInit(): void {
    this.gameDetails = this._route.snapshot.data['game'] as IGameDetails;
  }
}
