import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { PostListComponent } from './modules/crud/components/post-list/post-list.component';
import { PostDetailComponent } from './modules/crud/components/post-detail/post-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { EditDialogComponent } from './shared/components/edit-dialog/edit-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostDetailComponent,
    EditDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule 
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
