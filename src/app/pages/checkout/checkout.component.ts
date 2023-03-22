import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public basket: Array<IProductResponse> = [];
  public totalPrice = 0;
  public totalCount = 0;

  public orderForm!: FormGroup;

  // ====================================================================================================================================================

  public tgURL = environment.TELEGRAM_KEY.url;
  public chatID = environment.TELEGRAM_KEY.chatID;

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.initOrderForm();
    window.scrollTo(0, 0);


  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    this.getTotalCount();
  }

  getTotalPrice(): void {
    this.totalPrice = this.basket.reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0)
  }
  getTotalCount(): void {
    this.totalCount = this.basket.reduce((total: number, prod: IProductResponse) => total + prod.count, 0)
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }
  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count
      localStorage.setItem('basket', JSON.stringify(this.basket))
    }
    else if (!value && product.count > 1) {
      --product.count
      localStorage.setItem('basket', JSON.stringify(this.basket))
    }
    this.updateBasket();
    this.orderService.changeBasket.next(true);
  }

  deleteCartItem(product: IProductResponse): void {
    if (this.basket.some(prod => prod.id === product.id)) {
      const index = this.basket.findIndex(prod => prod.id === product.id);
      this.basket.splice(index, 1);
      console.log(this.basket);
      localStorage.setItem('basket', JSON.stringify(this.basket))
      this.updateBasket();
      this.orderService.changeBasket.next(true);
    }

  }

  // ====================================================================================================================================================
  // ====================================================================================================================================================
  // ====================================================================================================================================================
  // ====================================================================================================================================================

  initOrderForm(): void {
    this.orderForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phone: ['+380', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      email: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      info: [null],
    })
  }

  addOrder(): void {
    let orderInfo = '';

    for (const item of this.basket) {
      orderInfo += `Назва продукту: ${item.name},
      Кількість продукту: ${item.count}
      ------------------ 
      
      `
      
    }

    const text = `
    ====================
    Ім'я: ${this.orderForm.value.firstName},
    Прізвище: ${this.orderForm.value.lastName},
    Номер телефону: ${this.orderForm.value.phone},
    Email: ${this.orderForm.value.email},
    Коментар: ${this.orderForm.value.info},
    =====================
    ${orderInfo}
    =====================
    Загальна ціна замовлення: ${this.totalPrice}
    `;



    const params = { chat_id: this.chatID, text };

    this.http.post(this.tgURL, params).subscribe(
      () => {
        console.log('Message sent successfully!');
        this.orderForm.reset();
        localStorage.removeItem('basket');

        this.basket = [];
        localStorage.setItem('basket', JSON.stringify(this.basket));

        this.router.navigate(['']);
        this.orderService.changeBasket.next(true);
      },
      (error) => {
        console.error(error);
      }
    );
  }


}
