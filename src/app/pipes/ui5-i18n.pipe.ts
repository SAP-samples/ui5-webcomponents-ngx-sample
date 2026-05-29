import { inject, Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '../services/i18n.service';

@Pipe({ name: 'ui5I18n', pure: false, standalone: false })
export class Ui5I18nPipe implements PipeTransform {
    private i18n = inject(I18nService);

    transform(key: string): string {
        return this.i18n.translations[key] ?? key;
    }
}
