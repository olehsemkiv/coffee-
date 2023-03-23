import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { blogElementResponse } from 'src/app/shared/interfaces/blog.interface';
import { BlogService } from 'src/app/shared/services/blog/blog.service';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {

  public blogForm!: FormGroup;
  public adminBlogs: Array<blogElementResponse> = [];
  public editStatus = false;



  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.getData();
  }

  initProductForm(): void {
    this.blogForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required]
    })
  }

  getData(): void {
    this.blogService.getAll().subscribe(data => {
      this.adminBlogs = data;
    })
  }

  addItem(): void {
    this.blogService.create(this.blogForm.value).subscribe(() => {
      this.getData();
      this.blogForm.reset();


    })


  }

  deleteItem(id: number): void {
    if (confirm('Остаточно видалити допис ?')) {
      this.blogService.delete(id).subscribe(() => {
        this.getData();
      })
    }
  }

}
