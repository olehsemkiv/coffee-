import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductService } from './product/product.service';



@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<boolean> {


  constructor(
    private productService: ProductService
  ) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.productService.getOne(Number(route.paramMap.get('id')));
  }
}
