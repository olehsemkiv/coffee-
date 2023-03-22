import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public basket: Array<IProductResponse> = [];
  public totalCount!: number;
  public totalPrice!: number;

  // ====================================================================================================================================================

  public BurgerStatus = false;


  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalCount();
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.totalPrice = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.price * prod.count, 0);
  }
  getTotalCount(): void {
    this.totalCount = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count, 0);
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  // ====================================================================================================================================================
  // ====================================================================================================================================================
  // ====================================================================================================================================================

  changeBurgerStatus(): void {
    this.BurgerStatus = !this.BurgerStatus;
    
  }

}
