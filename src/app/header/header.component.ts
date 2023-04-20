import { Component, inject } from '@angular/core';
import { first, Observable, switchMap, forkJoin, of } from 'rxjs';
import { Ui5ThemingService } from '@ui5/theming-ngx';
import { I18nService } from '@ui5/webcomponents-ngx/i18n';
import { HttpClient } from '@angular/common/http';

import { THEMES, LANGUAGES } from 'src/app/constants/constants';
import { Trip } from 'src/app/interfaces/trip';
import { User } from 'src/app/interfaces/user';
import { ShellBarComponent } from '@ui5/webcomponents-ngx';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

    private tripsUrl = "/assets/mock-data/mockTrips.json";
    private userUrl = "/assets/mock-data/mockUser.json";
    isDataAvailable = false;

    selectedTheme = "sap_horizon";
    currentTheme = "sap_horizon";
    themeDialogOpen = false;
    themes = THEMES;
    i18nService = inject(I18nService);

    selectedLanguage = this.i18nService.currentLanguage();
    currentLanguage = this.i18nService.currentLanguage();
    languageDialogOpen = false;
    languages = LANGUAGES;

    user: any;

    domestic: any;
    international: any;

    constructor(private http: HttpClient, private ui5ThemingService: Ui5ThemingService) { }

    ngOnInit() {
        this.getJSON(this.tripsUrl).pipe(
            switchMap((data) => {
                return forkJoin({
                    trips: of(data),
                    user: this.getJSON(this.userUrl)
                });
            })
        ).subscribe(({ trips, user }) => {
            this.domestic = <Trip[]>trips.domesticTrips;
            this.international = <Trip[]>trips.internationalTrips;
            this.user = <User>user;

            this.isDataAvailable = true;
        });
    }

    private getJSON(url: string): Observable<any> {
        return this.http.get(url);
    }


    switchLanguage() {
        this.i18nService.setLanguage(this.selectedLanguage ? this.selectedLanguage : 'en');
        this.currentLanguage = this.selectedLanguage;
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
        this.ui5ThemingService.setTheme(this.selectedTheme).pipe(first()).subscribe();
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
        var element = document.getElementById('shellbar') as ShellBarComponent;
        if (element.closeOverflow) element.closeOverflow();
    }
}