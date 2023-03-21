import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public userProducts: Array<IProductResponse> = [];

  private eventSubscription!: Subscription;

  public categoryProductName!: string;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getData();
      }
    })
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;

    this.productService.getAllbyCategory(categoryName).subscribe(data => {
      this.userProducts = data;
    })
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

}
