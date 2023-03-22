import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeProducts: Array<IProductResponse> = [];

  constructor(
    private productService: ProductService,
    public orderService: OrderService

  ) { }

  ngOnInit(): void {
    this.getData();
    window.scrollTo(0, 0);

  }

  getData(): void {
    this.productService.getAll().subscribe(data => {
      this.homeProducts = data;
    })
  }

  addToBasket(product: IProductResponse): void {

    if (product.count >= 1) {
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
    } else {
      product.count = 1;
    }

  }

  changeCount(product: IProductResponse): void {
    if (product.count < 1) {
      product.count = 1;
    }
  }

}
