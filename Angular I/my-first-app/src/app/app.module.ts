import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { WarningAlertComponent } from './messages/warning-alert/warning-alert.component';
import { SuccessAlertComponent } from './messages/success-alert/success-alert.component';
import { UserNameComponent } from './user/user-name/user-name.component';
import { DisplayDetailsComponent } from './details/display-details/display-details.component';
import { GameControlComponent } from './game/game-control/game-control.component';
import { EvenComponent } from './game/game-control/even/even.component';
import { OddComponent } from './game/game-control/odd/odd.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    WarningAlertComponent,
    SuccessAlertComponent,
    UserNameComponent,
    DisplayDetailsComponent,
    GameControlComponent,
    EvenComponent,
    OddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
