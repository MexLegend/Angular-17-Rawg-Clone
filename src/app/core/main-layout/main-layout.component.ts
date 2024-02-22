import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideBarComponent } from './components/aside-bar/aside-bar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, AsideBarComponent, TopBarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
