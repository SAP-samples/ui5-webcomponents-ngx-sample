import { Component, inject } from '@angular/core';
import { Subject, zip } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThemingService } from '@fundamental-ngx/core/theming';

import { AppService } from '../services/services';
import { I18nService } from '../services/i18n.service';
import { THEMES, LANGUAGES } from '../constants/constants';
import { User } from '../interfaces/user';
import { Trip } from '../interfaces/trip';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent {

    componentUnsubscribe: Subject<boolean> = new Subject();
    isDataAvailable = false;

    selectedTheme = 'sap_horizon';
    currentTheme = 'sap_horizon';
    themeDialogOpen = false;
    themes = THEMES;

    selectedLanguage = 'en';
    currentLanguage = 'en';
    languageDialogOpen = false;
    languages = LANGUAGES;

    user!: User;
    domestic!: Trip[];
    international!: Trip[];

    private appService = inject(AppService);
    private themingService = inject(ThemingService);
    private i18nService = inject(I18nService);

    ngOnInit() {
        zip([this.appService.getDomesticTrips(), this.appService.getInternationalTrips(), this.appService.getUser()])
            .pipe(takeUntil(this.componentUnsubscribe))
            .subscribe(([domesticTrips, internationalTrips, user]) => {
                this.domestic = domesticTrips;
                this.international = internationalTrips;
                this.user = user;
                this.isDataAvailable = true;
            });
    }

    ngOnDestroy() {
        this.componentUnsubscribe.next(true);
        this.componentUnsubscribe.complete();
    }

    switchLanguage() {
        this.currentLanguage = this.selectedLanguage || 'en';
        this.i18nService.setLanguage(this.currentLanguage);
        this.setLanguageDialogOpen();
        this.shellbarMenuClicked();
    }

    setLanguageDialogOpen() {
        this.languageDialogOpen = !this.languageDialogOpen;
        this.selectedLanguage = this.currentLanguage;
    }

    setSelectedLanguage(languageName: string | undefined) {
        if (languageName != undefined) {
            this.selectedLanguage = languageName;
        }
    }

    switchTheme() {
        this.themingService.setTheme(this.selectedTheme);
        this.currentTheme = this.selectedTheme;
        this.setThemeDialogOpen();
        this.shellbarMenuClicked();
    }

    setThemeDialogOpen() {
        this.themeDialogOpen = !this.themeDialogOpen;
        this.selectedTheme = this.currentTheme;
    }

    setSelectedTheme(themeName: string | undefined) {
        if (themeName != undefined) {
            this.selectedTheme = themeName;
        }
    }

    shellbarMenuClicked() {
        const element = document.getElementById('shellbar') as any;
        if (element?.closeOverflow) element.closeOverflow();
    }
}
