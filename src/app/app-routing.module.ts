import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './modules/crud/components/post-list/post-list.component';
import { PostDetailComponent } from './modules/crud/components/post-detail/post-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' }, 
  { path: 'posts', component: PostListComponent },       
  { path: 'posts/:id', component: PostDetailComponent }, 
  { path: '**', redirectTo: '/posts' }                   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
