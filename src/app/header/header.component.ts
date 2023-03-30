import { Component, inject } from '@angular/core';
import { first } from 'rxjs';
import { Ui5ThemingService } from '@ui5/theming-ngx';
import { I18nService } from '@ui5/webcomponents-ngx/i18n';

import { USER } from 'src/assets/mock-data/mock-user';
import { DOMESTIC_TRIPS, INTERNATIONAL_TRIPS } from 'src/assets/mock-data/mock-trips';
import { THEMES } from 'src/assets/constant-querries';
import { LANGUAGES } from 'src/assets/constant-querries';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    constructor(private ui5ThemingService: Ui5ThemingService) { }

    switchLanguage() {
        this.i18nService.setLanguage(this.selectedLanguage ? this.selectedLanguage : 'en');
        this.currentLanguage = this.selectedLanguage;
        this.setLanguageDialogOpen();
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
        this.ui5ThemingService.setTheme(this.selectedTheme).pipe(first()).subscribe();
        this.currentTheme = this.selectedTheme;
        this.setThemeDialogOpen();
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

    selectedTheme = "sap_horizon";
    currentTheme = "sap_horizon";
    themeDialogOpen = false;
    themes = THEMES;
    i18nService = inject(I18nService);
    selectedLanguage = this.i18nService.currentLanguage();
    currentLanguage = this.i18nService.currentLanguage();
    languageDialogOpen = false;
    languages = LANGUAGES;
    user = USER;
    domestic = DOMESTIC_TRIPS;
    international = INTERNATIONAL_TRIPS;
}