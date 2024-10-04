import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatTableDataSource } from '@angular/material/table'; 
import { PostService } from 'src/app/core/services/post.service';
import { Post } from 'src/app/models/post.model';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { EditDialogComponent } from 'src/app/shared/components/edit-dialog/edit-dialog.component';
import anime from 'animejs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  dataSource: MatTableDataSource<Post> = new MatTableDataSource<Post>();
  displayedColumns: string[] = ['name', 'email', 'company', 'actions']; 

  @ViewChild(MatPaginator) paginator!: MatPaginator; 

  constructor(private postService: PostService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.loadPosts();
    this.animateShapes();
  }

  animateShapes(): void {
    anime({
      targets: '.shape',
      translateX: () => anime.random(-300, 300),
      translateY: () => anime.random(-300, 300),
      scale: () => anime.random(0.8, 1.2),
      opacity: [
        { value: 0.2, duration: 2000 },
        { value: 0.2, duration: 2000 },
      ],
      duration: 4000,
      easing: 'easeInOutQuad',
      loop: true,
      direction: 'alternate',
    });
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator; 
    });
  }

  createPost(): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: { post: {}, isEditMode: false }
    });

    dialogRef.afterClosed().subscribe((result: Post) => {
      if (result) {
        this.dataSource.data = [...this.dataSource.data, result]; 
        this.paginator._changePageSize(this.paginator.pageSize); 
      }
    });
  }

  editPost(post: Post): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: { post, isEditMode: true }
    });
  
    dialogRef.afterClosed().subscribe((updatedPost: Post | undefined) => {
      if (updatedPost) {
        this.postService.updatePost(updatedPost).subscribe((result: Post) => {
          const index = this.dataSource.data.findIndex(p => p.id === result.id);
          if (index !== -1) {
            this.dataSource.data[index] = result;
            this.paginator._changePageSize(this.paginator.pageSize);
          }
        });
      }
    });
  }

  deletePost(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(post => post.id !== id);
        this.paginator._changePageSize(this.paginator.pageSize);  
      }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate([`/posts/${id}`]);
  }
}
