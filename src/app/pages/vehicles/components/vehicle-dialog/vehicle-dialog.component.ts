import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Vehicle, VehicleCreate } from '@models/index';

export interface VehicleDialogData {
  vehicle: Vehicle | null;
}

@Component({
  selector: 'app-vehicle-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './vehicle-dialog.component.html',
  styleUrl: './vehicle-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<VehicleDialogComponent>);
  private readonly data = inject<VehicleDialogData>(MAT_DIALOG_DATA);

  readonly isEditMode = !!this.data.vehicle;
  readonly dialogTitle = this.isEditMode ? 'Editar Veículo' : 'Novo Veículo';

  readonly form = this.fb.nonNullable.group({
    marca: [this.data.vehicle?.marca ?? '', [Validators.required, Validators.minLength(2)]],
    modelo: [this.data.vehicle?.modelo ?? '', [Validators.required, Validators.minLength(2)]],
    ano: [
      this.data.vehicle?.ano ?? new Date().getFullYear(),
      [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear() + 1)],
    ],
    placa: [
      this.data.vehicle?.placa ?? '',
      [Validators.required, Validators.pattern(/^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/)],
    ],
    cor: [this.data.vehicle?.cor ?? '', [Validators.required, Validators.minLength(2)]],
  });

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.getRawValue() as VehicleCreate;
      this.dialogRef.close(formValue);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  getErrorMessage(field: 'marca' | 'modelo' | 'ano' | 'placa' | 'cor'): string {
    const control = this.form.get(field);

    if (control?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (control?.hasError('minlength')) {
      return 'Mínimo de 2 caracteres';
    }

    if (control?.hasError('min')) {
      return 'Ano inválido';
    }

    if (control?.hasError('max')) {
      return 'Ano não pode ser maior que o próximo ano';
    }

    if (control?.hasError('pattern')) {
      return 'Formato inválido (ex: ABC-1234 ou ABC1D23)';
    }

    return '';
  }
}
