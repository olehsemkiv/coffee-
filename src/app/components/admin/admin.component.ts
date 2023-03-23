import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public productForm!: FormGroup;
  public adminProducts: Array<IProductResponse> = [];
  public editStatus = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.getData();
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      type: [null],
      name: [null, Validators.required],
      path: [null, Validators.required],
      description: [null, Validators.required],
      weight: [null],
      price: [null, Validators.required],
      country: [null],
      imagePath: [null, Validators.required],
      count: [1],
    })
  }

  getData(): void {
    this.productService.getAll().subscribe(data => {
      this.adminProducts = data;
    })
  }

  addItem(): void {
    this.productService.create(this.productForm.value).subscribe(() => {
      this.getData();
      this.productForm.reset();
    })
  }

  deleteItem(id: number): void {
    if (confirm('Остаточно видалити допис ?')) {
      this.productService.delete(id).subscribe(() => {
        this.getData();
      })
    }
  }

}