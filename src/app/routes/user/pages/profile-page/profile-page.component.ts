import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
} from '@angular/core';
import { IUser } from '@models/user.interface';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '@coreServices/common/user.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  private readonly _userService = inject(UserService);

  $user: Signal<IUser | null> = this._userService.getUserData();
}
