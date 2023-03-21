import { Component, OnInit } from '@angular/core';
import { blogElementResponse } from 'src/app/shared/interfaces/blog.interface';
import { BlogService } from 'src/app/shared/services/blog/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public userBlogs: Array<blogElementResponse> = [];

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.blogService.getAll().subscribe(data => {
      this.userBlogs = data
    })
  }

}
