import { Component, Inject, inject, signal } from '@angular/core';
import { Subject, takeUntil, zip } from 'rxjs';
import { I18nService } from '@ui5/webcomponents-ngx/i18n';
import { ShellBarComponent } from '@ui5/webcomponents-ngx';

import { AppService } from '../services/services';
import { RtlService } from '@fundamental-ngx/cdk';
import { THEMES, LANGUAGES } from '../constants/constants';
import { User } from '../interfaces/user';
import { Trip } from '../interfaces/trip';

import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { CompleteThemeDefinition, ThemingService } from '@fundamental-ngx/core/theming';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    componentUnsubscribe: Subject<boolean> = new Subject();
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

    isRTL:boolean = false;

    user!: User;

    domestic!: Trip[];
    international!: Trip[];

    fd_themes: CompleteThemeDefinition[];
    constructor(private appService: AppService, private rtlService: RtlService) {}

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

    _dir: string = 'ltr';
    switchLanguage() {
        this.i18nService.setLanguage(this.selectedLanguage ? this.selectedLanguage : 'en');
        this.isRTL = this.selectedLanguage == 'ar' ? true : false;
        
        this.isRTL ? Array.from(document.getElementsByTagName('div')).forEach(el => {
            el.dir = 'rtl'
        }) : Array.from(document.getElementsByTagName('div')).forEach(el => {
            el.dir = 'ltr'
        })


        // With RxJS
        // this.rtlService.rtl.next(this.isRTL);
        // this.rtlService.rtl.subscribe((isThisRtl) => this._dir = isThisRtl ? 'rtl' : 'ltr');

        // With Signals
        // this.rtlService.rtlSignal = signal(false);
        // this.rtlService.rtlSignal.update((value) => value = this.isRTL)
        // this._dir = this.rtlService.rtlSignal() ? 'rtl' : 'ltr';
     
        
        // With Constructor


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
        setTheme(this.selectedTheme);
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
        var element = document.getElementById('shellbar') as unknown as ShellBarComponent;
        if (element && (element as any).closeOverflow) (element as any).closeOverflow();
    }
}