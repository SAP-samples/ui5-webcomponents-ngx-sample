import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class I18nService {
    private http = inject(HttpClient);
    private lang$ = new BehaviorSubject<string>('en');

    translations: Record<string, string> = {};

    get currentLanguage() { return this.lang$.value; }

    constructor() {
        this.lang$.pipe(
            switchMap(l => this.http.get<Record<string, string>>(`assets/i18n/messages_${l}.json`))
        ).subscribe(t => { this.translations = t; });
    }

    setLanguage(lang: string) {
        this.lang$.next(lang);
    }
}
