import { ChangeDetectionStrategy, Component, signal, inject, effect } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    HeaderComponent,
    AsideComponent,
    MainComponent,
    FooterComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly isSmallScreen = toSignal(
    this.breakpointObserver.observe(['(max-width: 680px)']).pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  readonly sidenavOpened = signal(true);

  constructor() {
    effect(() => {
      if (this.isSmallScreen()) {
        this.sidenavOpened.set(false);
      } else {
        this.sidenavOpened.set(true);
      }
    });
  }

  toggleSidenav(): void {
    this.sidenavOpened.update((opened) => !opened);
  }

  closeSidenavOnMobile(): void {
    if (this.isSmallScreen()) {
      this.sidenavOpened.set(false);
    }
  }
}
