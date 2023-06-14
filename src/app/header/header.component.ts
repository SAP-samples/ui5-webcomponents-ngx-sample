import { Component, inject} from '@angular/core';
import { Subject, takeUntil, zip } from 'rxjs';
import { Ui5ThemingService } from '@ui5/theming-ngx';
import { I18nService } from '@ui5/webcomponents-ngx/i18n';
import { ShellBarComponent } from '@ui5/webcomponents-ngx';


import { AppService } from '../services/services';
import { THEMES, LANGUAGES } from '../constants/constants';
import { User } from '../interfaces/user';
import { Trip } from '../interfaces/trip';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

    componentUnsubscribe: Subject<boolean> = new Subject();
    isDataAvailable = false;

    userData = {age:25,typeOfTraveller:"Buisness",class:"VIP",yearsOfLoyalty:2,gender: "Female",picture:"assets/images/avatar_small.webp",email:"janice.smith@ui5example.com"};
    AccountSelected = false;
    editAccountSelected = false;
    editGender = false;
    // showNotifications = false;

    selectedTheme = "sap_horizon";
    currentTheme = "sap_horizon";
    themeDialogOpen = false;
    themes = THEMES;
    i18nService = inject(I18nService);

    selectedLanguage = this.i18nService.currentLanguage();
    currentLanguage = this.i18nService.currentLanguage();
    languageDialogOpen = false;
    languages = LANGUAGES;

    user!: User;
    

    domestic!: Trip[];
    international!: Trip[];

    constructor(private appService: AppService, private ui5ThemingService: Ui5ThemingService) { }

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
        this.ui5ThemingService.setTheme(this.selectedTheme).pipe(takeUntil(this.componentUnsubscribe)).subscribe();
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


    setEnterAccount(){
        this.AccountSelected = !this.AccountSelected;
    }
    setEditAccount(){
        this.editAccountSelected = !this.editAccountSelected;
    }

    onClickEditGender(){
        this.editGender = !this.editGender;

    }

}
