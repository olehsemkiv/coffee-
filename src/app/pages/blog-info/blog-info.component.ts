import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { blogElementResponse } from 'src/app/shared/interfaces/blog.interface';

@Component({
  selector: 'app-blog-info',
  templateUrl: './blog-info.component.html',
  styleUrls: ['./blog-info.component.scss']
})
export class BlogInfoComponent implements OnInit {

  public currentBlog!: blogElementResponse;

  constructor(
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.currentBlog = response['blogInfo'];
    })
    window.scrollTo(0, 0);

  }

}
