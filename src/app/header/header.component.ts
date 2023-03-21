import { Component } from '@angular/core';
import { first } from 'rxjs';

import { Ui5ThemingService } from '@ui5/theming-ngx';

import { USER } from 'src/assets/mock-data/mock-user';
import { DOMESTIC_TRIPS, INTERNATIONAL_TRIPS } from 'src/assets/mock-data/mock-trips';
import { THEMES } from 'src/assets/constant-querries';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    constructor(private ui5ThemingService: Ui5ThemingService) { }

    applyTheme() {
        this.setThemeDialogOpen();
        this.switchTheme();
    }

    switchTheme() {
        this.ui5ThemingService.setTheme(this.selectedTheme).pipe(first()).subscribe();
        this.currentTheme = this.selectedTheme;
    }

    setThemeDialogOpen() {
        this.themeDialogOpen = !this.themeDialogOpen;
    }

    setSelectedTheme(themeName: string | undefined) {
        if (themeName != undefined) {
            this.selectedTheme = themeName;
        }
    }

    selectedTheme = "Morning Horizon";
    currentTheme = "Morning Horizon";
    themeDialogOpen = false;
    themes = THEMES;
    user = USER;
    domestic = DOMESTIC_TRIPS;
    international = INTERNATIONAL_TRIPS;
}