import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { BlogService } from './blog/blog.service';

@Injectable({
  providedIn: 'root'
})
export class BlogResolver implements Resolve<boolean> {
  constructor(
    private blogService: BlogService
  ) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.blogService.getOne(Number(route.paramMap.get('id')));
  }
}
