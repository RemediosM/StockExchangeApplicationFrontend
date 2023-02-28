import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllSharesComponent } from './components/all-shares/all-shares.component';
import { ShareHttpService } from './services/share-http.service';
import { NewShareComponent } from './components/new-share/new-share.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EditShareComponent } from './components/edit-share/edit-share.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AllSharesComponent,
    NewShareComponent,
    EditShareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: AllSharesComponent},
      {path: 'edit/:id', component: EditShareComponent},   
      {path: 'new', component: NewShareComponent}   
    ]),
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ShareHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
