import { inject, Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, switchMap } from 'rxjs';

@Pipe({ name: 'ui5I18n', pure: false, standalone: false })
export class Ui5I18nPipe implements PipeTransform {
    private http = inject(HttpClient);
    private lang = new BehaviorSubject<string>('en');
    private translations: Record<string, string> = {};

    constructor() {
        this.lang.pipe(
            switchMap(l => this.http.get<Record<string, string>>(`assets/i18n/messages_${l}.json`))
        ).subscribe(t => { this.translations = t; });
    }

    setLanguage(lang: string) {
        this.lang.next(lang);
    }

    transform(key: string): string {
        return this.translations[key] ?? key;
    }
}
