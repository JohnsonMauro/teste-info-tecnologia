import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPlateMask]',
  standalone: true,
})
export class PlateMaskDirective {
  private readonly el = inject(ElementRef<HTMLInputElement>);
  private readonly ngControl = inject(NgControl, { optional: true });

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const formatted = this.formatPlate(input.value);

    input.value = formatted;
    this.ngControl?.control?.setValue(formatted, { emitEvent: false });
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') ?? '';
    const formatted = this.formatPlate(pastedText);

    this.el.nativeElement.value = formatted;
    this.ngControl?.control?.setValue(formatted, { emitEvent: true });
  }

  private formatPlate(value: string): string {
    // Remove tudo que não é letra ou número e converte para maiúsculas
    let cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '');

    // Limita a 7 caracteres (3 letras + 4 números/letras)
    cleaned = cleaned.slice(0, 7);

    // Aplica a máscara: ABC-1234 ou ABC-1D23
    if (cleaned.length > 3) {
      return cleaned.slice(0, 3) + '-' + cleaned.slice(3);
    }

    return cleaned;
  }
}

