import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { count, Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
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
    private orderService: OrderService
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getData();
      }
    })
  }

  ngOnInit(): void {
    this.getData();
    window.scrollTo(0, 0);

  }

  getData(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;

    this.productService.getAllbyCategory(categoryName).subscribe(data => {
      this.userProducts = data;
      if (categoryName == 'coffee') {
        this.categoryProductName = 'Кава'
      } else if (categoryName == 'dishes') {
        this.categoryProductName = 'Посуд'

      } else if (categoryName == 'another') {
        this.categoryProductName = 'До кави'

      }
    })
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  // ====================================================================================================================================================
  // ====================================================================================================================================================
  // ====================================================================================================================================================



  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product)
      }
    } else {
      basket.push(product)
    }

    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }

  changeCount(product: IProductResponse): void {
    if (product.count < 1) {
      product.count = 1;
    }
  }
}
