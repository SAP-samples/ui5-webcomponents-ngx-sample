// Angular Modules & more...
import { inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ui5ThemingModule } from '@ui5/theming-ngx';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { Ui5I18nModule } from '@ui5/webcomponents-ngx/i18n';
// import '@ui5/webcomponents-icons/dist/AllIcons.js';x
// import '@ui5/webcomponents/dist/features/InputElementsFormSupport.js';
import {Ui5WebcomponentsIconsModule} from '@ui5/webcomponents-ngx';
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';


// Custom Components
import { HeaderComponent } from './header/header.component';
import { MessageComponent } from './message/message.component';
import { LegendItemComponent } from './legend-item/legend-item.component';
import { PassengerListComponent } from './passenger-list/passenger-list.component';
import { SeatsChartComponent } from './seats-chart/seats-chart.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { TripCalendarComponent } from './trip-calendar/trip-calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideTheming, themingInitializer } from '@fundamental-ngx/core/theming';


// FOR FD CALENDAR
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDatetimeAdapter,
    FdDatetimeModule
  } from '@fundamental-ngx/core/datetime';

@NgModule({ declarations: [
        AppComponent,
        HeaderComponent,
        MessageComponent,
        LegendItemComponent,
        PassengerListComponent,
        SeatsChartComponent,
        PaymentDetailsComponent,
        TripCalendarComponent
    ],
    bootstrap: [AppComponent], 
    imports: [BrowserModule,
        AppRoutingModule,
        CommonModule,
        FormsModule,
        FdDatetimeModule,
        Ui5ThemingModule.forRoot({
            defaultTheme: "sap_horizon"
        }),
        Ui5WebcomponentsModule,
        Ui5WebcomponentsIconsModule.forRoot([
            "sap-icons",
            "tnt-icons",
            "business-suite-icons"
          ]),
        LayoutGridModule,
        Ui5I18nModule.forRoot({
            language: 'en',
            fetchDefaultLanguage: true,
            bundle: {
                name: 'i18n_bundle',
                translations: {
                    useFactory: () => {
                        const http = inject(HttpClient);
                        return {
                            en: http.get('assets/i18n/messages_en.json', { responseType: 'json' }),
                            zh_TW: http.get('assets/i18n/messages_zh_TW.json', { responseType: 'json' }),
                            bg: http.get('assets/i18n/messages_bg.json', { responseType: 'json' })
                        };
                    }
                }
            }
        }),
        BrowserAnimationsModule,
        FundamentalNgxCoreModule
    ]
        
        
        , providers: [provideHttpClient(withInterceptorsFromDi()), provideTheming({ defaultTheme: 'sap_horizon', changeThemeOnQueryParamChange: false }), themingInitializer()] })
export class AppModule { }
