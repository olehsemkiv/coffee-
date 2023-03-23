import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  public currentProduct!: IProductResponse;
  public categoryName!: string;

  constructor(

    private activatedRoute: ActivatedRoute,
    public orderService: OrderService

  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.currentProduct = response['productInfo'];

      if (this.currentProduct.category == 'coffee') {
        this.categoryName = 'Кава';
      } else if (this.currentProduct.category == 'another') {
        this.categoryName = 'До кави';
      } else if (this.currentProduct.category == 'dishes') {
        this.categoryName = 'Посуд';

      }
    })
    window.scrollTo(0, 0);

  }

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
