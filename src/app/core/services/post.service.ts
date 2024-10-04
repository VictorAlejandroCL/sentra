import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private posts: Post[] = []; 

  constructor(private http: HttpClient) {}

  addPost(post: Post): Observable<Post> {
    const newId = this.posts.length > 0 ? Math.max(...this.posts.map(p => p.id)) + 1 : 1;
    const newPost = { ...post, id: newId };
    
    this.posts.push(newPost);

    return of(newPost);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  updatePost(post: Post): Observable<Post> {
    const index = this.posts.findIndex(p => p.id === post.id);
    if (index !== -1) {
      this.posts[index] = post;
    }
    return of(post); 
  }
  

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
