import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/core/services/post.service';
import anime from 'animejs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;
  loading: boolean = true;
  
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPostById(postId).subscribe(post => {
      this.post = post;
      this.loading = false;
    });
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

  goBackToList(): void {
    this.router.navigate(['/posts']);
  }
}
