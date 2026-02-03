import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { Vehicle, VehicleCreate } from '../../models/index';
import { PlateMaskDirective } from '@directives/index';

export interface VehicleFormData {
  vehicle: Vehicle | null;
}

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    PlateMaskDirective,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<VehicleFormComponent>);
  private readonly data = inject<VehicleFormData>(MAT_DIALOG_DATA);

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
      [Validators.required, Validators.pattern(/^[A-Z]{3}-\d{4}$|^[A-Z]{3}-\d[A-Z]\d{2}$/)],
    ],
    cor: [this.data.vehicle?.cor ?? '', [Validators.required, Validators.minLength(2)]],
  });

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

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.getRawValue();
      // Normaliza a placa para maiúsculas (já deve estar, mas garante)
      const normalizedValue: VehicleCreate = {
        ...formValue,
        placa: formValue.placa.toUpperCase(),
      };
      this.dialogRef.close(normalizedValue);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
