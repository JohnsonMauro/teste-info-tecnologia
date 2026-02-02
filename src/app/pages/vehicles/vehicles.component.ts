import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VehicleService } from '@services/index';
import { Vehicle } from '@models/index';
import { VehicleDialogComponent } from './components/vehicle-dialog/vehicle-dialog.component';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclesComponent {
  private readonly vehicleService = inject(VehicleService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  readonly vehicles = this.vehicleService.vehicles;
  readonly displayedColumns = ['marca', 'modelo', 'ano', 'placa', 'cor', 'actions'];

  readonly dataSource = computed(() => this.vehicles());

  trackByVehicleId(_index: number, vehicle: Vehicle): string {
    return vehicle.id;
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(VehicleDialogComponent, {
      width: '600px',
      autoFocus: 'dialog',
      data: { vehicle: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.vehicleService.create(result);
        this.showSnackBar('Veículo criado com sucesso!');
      }
    });
  }

  openEditDialog(vehicle: Vehicle): void {
    const dialogRef = this.dialog.open(VehicleDialogComponent, {
      width: '600px',
      autoFocus: 'dialog',
      data: { vehicle },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.vehicleService.update(vehicle.id, result);
        this.showSnackBar('Veículo atualizado com sucesso!');
      }
    });
  }

  deleteVehicle(vehicle: Vehicle): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Excluir Veículo',
        message: `Deseja realmente excluir o veículo ${vehicle.marca} ${vehicle.modelo}?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
        confirmColor: 'warn',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.vehicleService.delete(vehicle.id);
        this.showSnackBar('Veículo excluído com sucesso!');
      }
    });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
