import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideComponent {
  readonly navigationClick = output<void>();

  onNavigate(): void {
    this.navigationClick.emit();
  }
}
