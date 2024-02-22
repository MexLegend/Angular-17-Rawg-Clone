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
import { Subject, exhaustMap, filter, takeUntil, tap } from 'rxjs';
import { KEY_STORAGE } from '@models/storage.enum';
import { IUser } from '@models/user.interface';
import { AuthService } from '@coreServices/common/auth.service';
import { LocalStorageService } from '@coreServices/common/storage/local-storage.service';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { SpinnerComponent } from '../../../../shared/spinner/spinner.component';

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
  private readonly _destroy$ = inject(AutoDestroyService);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _storageService = inject(LocalStorageService);

  form!: FormGroup;
  submitClicked$: Subject<void> = new Subject<void>();
  $loading: Signal<boolean> = this._authService.$loading;

  ngOnInit(): void {
    this.initForm();
    this.subscribeToSubmit();
  }

  initForm(): void {
    this.form = this._fb.group({
      email: ['test@test.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
      remember: [false],
    });
  }

  subscribeToSubmit(): void {
    this.submitClicked$
      .pipe(takeUntil(this._destroy$))
      .pipe(
        tap(() => {
          if (this.form.invalid) {
            Object.values(this.form.controls).forEach((control) => {
              if (control.invalid) {
                control.markAsDirty();
                control.updateValueAndValidity({ onlySelf: true });
              }
            });
          }
        }),
        filter(() => this.form.valid),
        exhaustMap(() => this._authService.login(this.form.value))
      )
      .subscribe((user: IUser) => {
        this._storageService.setItem(KEY_STORAGE.DATA_USER, user);
        this._router.navigateByUrl('/');
      });
  }
}
