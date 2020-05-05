import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule } from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { userService } from './services/user.service';
import { AuthGuard } from './guard/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { DropzoneDirective } from './directives/dropzone.directive';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { VeiwImageComponent } from './veiw-image/veiw-image.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    LoginComponent,
    UploadImageComponent,
    UserProfileComponent,
    DropzoneDirective,
    UploadTaskComponent,
    VeiwImageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([

      { path: '', component: HomeComponent },
      { path: 'error', component: ErrorComponent },
      { path: 'home', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'error' },

    ]),
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MatDialogModule,
    NgbModule,

  ],
  providers: [userService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [VeiwImageComponent, UploadImageComponent]
})
export class AppModule { }
