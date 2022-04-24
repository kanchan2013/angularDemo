import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { VendorComponent } from './vendor/vendor.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    VendorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
