import { inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemingModule } from '@fundamental-ngx/core/theming';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { I18nModule } from '@fundamental-ngx/i18n';
import { provideUi5LanguageBridge } from '@fundamental-ngx/ui5-webcomponents-base/i18n';

// UI5 web component wrappers from @fundamental-ngx
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { Bar } from '@fundamental-ngx/ui5-webcomponents/bar';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Calendar } from '@fundamental-ngx/ui5-webcomponents/calendar';
import { CalendarDate } from '@fundamental-ngx/ui5-webcomponents/calendar-date';
import { Card } from '@fundamental-ngx/ui5-webcomponents/card';
import { CardHeader } from '@fundamental-ngx/ui5-webcomponents/card-header';
import { Dialog } from '@fundamental-ngx/ui5-webcomponents/dialog';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { MessageStrip } from '@fundamental-ngx/ui5-webcomponents/message-strip';
import { ProgressIndicator } from '@fundamental-ngx/ui5-webcomponents/progress-indicator';
import { RadioButton } from '@fundamental-ngx/ui5-webcomponents/radio-button';
import { Tab } from '@fundamental-ngx/ui5-webcomponents/tab';
import { TabContainer } from '@fundamental-ngx/ui5-webcomponents/tab-container';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';
import { ShellBar } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar';
import { ShellBarItem } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar-item';
import { Timeline } from '@fundamental-ngx/ui5-webcomponents-fiori/timeline';
import { TimelineItem } from '@fundamental-ngx/ui5-webcomponents-fiori/timeline-item';


import { Ui5I18nPipe } from './pipes/ui5-i18n.pipe';
import { HeaderComponent } from './header/header.component';
import { MessageComponent } from './message/message.component';
import { LegendItemComponent } from './legend-item/legend-item.component';
import { PassengerListComponent } from './passenger-list/passenger-list.component';
import { SeatsChartComponent } from './seats-chart/seats-chart.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { TripCalendarComponent } from './trip-calendar/trip-calendar.component';

const UI5_COMPONENTS = [
    Avatar, Bar, Button, Calendar, CalendarDate, Card, CardHeader, Dialog,
    Icon, Input, Label, MessageStrip, ProgressIndicator, RadioButton,
    Tab, TabContainer, Title,
    ShellBar, ShellBarItem, Timeline, TimelineItem
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        MessageComponent,
        LegendItemComponent,
        PassengerListComponent,
        SeatsChartComponent,
        PaymentDetailsComponent,
        TripCalendarComponent,
        Ui5I18nPipe
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ThemingModule.withConfig({ defaultTheme: 'sap_horizon' }),
        LayoutGridModule,
        I18nModule,
        ...UI5_COMPONENTS
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideUi5LanguageBridge()
    ]
})
export class AppModule { }
