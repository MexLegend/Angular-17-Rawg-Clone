import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  inject,
} from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { KEY_STORAGE } from '@models/storage.enum';
import { ILoginForm, IUser } from '@models/user.interface';
import { AuthService } from '@coreServices/common/auth.service';
import { LocalStorageService } from '@coreServices/common/storage/local-storage.service';
import { AutoDestroyService } from '@coreServices//utils/auto-destroy.service';
import { SpinnerComponent } from '@shared/spinner/spinner.component';
import { UserService } from '@coreServices/common/user.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerComponent],
  providers: [AutoDestroyService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  private readonly _fb = inject(NonNullableFormBuilder);
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _userService = inject(UserService);
  private readonly _storageService = inject(LocalStorageService);

  form!: FormGroup<ILoginForm>;
  $loading: Signal<boolean> = this._authService.$loading;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group<ILoginForm>({
      email: this._fb.control('armando@gmail.com', {
        validators: [Validators.required, Validators.email],
      }),
      password: this._fb.control('1234567890', {
        validators: [Validators.required],
      }),
      remember: this._fb.control(false),
    });
  }

  handleSubmit(): void {
    if (this.form.valid) {
      const loginData = this.form.getRawValue();

      this._authService.login(loginData).subscribe({
        next: (user: IUser) => {
          this._storageService.setItem(KEY_STORAGE.DATA_USER, user);
          this._userService.setUserData(user);
          this._router.navigateByUrl('/');
        },
      });
    }
  }
}
