import { Component, inject, ElementRef,ViewChild} from '@angular/core';
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

    @ViewChild('profileSettingsPopover',{ read: ElementRef }) profileSettingsPopover!: ElementRef;
    userData = {age:25,typeOfTraveller:"Buisness",class:"VIP",yearsOfLoyalty:2,gender: "Female",picture:"assets/images/avatar_small.webp",email:"janice.smith@ui5example.com"};
    newUserData = {firstName: "", lastName:"",age:0, email: "",gender: ""};
    AccountSelected = false;
    editAccountSelected = false;
    
    @ViewChild('notificationsPopOver',{ read: ElementRef }) notificationsPopOver!: ElementRef;
    notificationArray = [
    {typeOfNotification: "IMPORTANT",notificationInformation: "Check in for flight", notificationLink: ""},
    {typeOfNotification: "NORMAL",notificationInformation: "Eddit account", notificationLink: ""}];
    notificationCount:number = 0;
   

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
            this.notificationCount = this.notificationArray.length;
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
    setEditAccount(typeOfEdit:string){
        this.newUserData.firstName = this.user.firstName;
        this.newUserData.lastName = this.user.lastName;
        this.newUserData.age = this.userData.age;
        this.newUserData.email = this.userData.email;
        this.newUserData.gender = this.userData.gender;
        if(typeOfEdit === "ACCESS"){
        this.editAccountSelected = !this.editAccountSelected;
        }
        
        
    }
    
    confirmEdit(){
        this.user.firstName = this.newUserData.firstName;
        this.user.lastName = this.newUserData.lastName;
        this.userData.age = this.newUserData.age;
        this.userData.email = this.newUserData.email;
        this.userData.gender = this.newUserData.gender;
        this.editAccountSelected = !this.editAccountSelected;
    }

    updateValue(event:any, instanceType:any)
    {
        if(instanceType === "first-name"){
            this.newUserData.firstName = event.target.value;
        }
        else if(instanceType === "last-name"){
            this.newUserData.lastName = event.target.value;

        }else if(instanceType === "age"){
        this.newUserData.age = event.target.value;

        }else if (instanceType === "email"){
            this.newUserData.email = event.target.value;
        }
    }

    viewNotifications(event:any){
        if(this.notificationsPopOver.nativeElement.isOpen() === true){
            this.notificationsPopOver.nativeElement.close();
        }else{
            this.notificationsPopOver.nativeElement.showAt(event);
        }	
    }

    onProfileClick(event:any) {
        if(this.profileSettingsPopover.nativeElement.isOpen() === true){
            this.profileSettingsPopover.nativeElement.close();
        }else{
            this.profileSettingsPopover.nativeElement.showAt(event);
        }		
	}
    handleProfileSettingsSelect(event:any){
        const selectedKey = event.detail.item.getAttribute('data-key');
		if (selectedKey === 'settings') {
			this. setEnterAccount();
		 } else if (selectedKey === 'help') {
			
		}
        else if (selectedKey ==="sign-out"){

        }
        this.profileSettingsPopover.nativeElement.close();

    }

    handleNotifications(event:any){
        const selectedItem = Number(event.detail.item.getAttribute('data-key'));
        this.notificationArray.splice(selectedItem,1);
        this.notificationCount = this.notificationArray.length;
        
    }

    getIcon(icon:string){
        if(icon === 'IMPORTANT'){
            return 'alert';
        }
        else if(icon === "NORMAL"){
            return  "ui-notifications";

        }
        return "project-definition-triangle";
    }
}
