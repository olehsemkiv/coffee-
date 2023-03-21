import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogInfoComponent } from './pages/blog-info/blog-info.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProductResolver } from './shared/services/product.resolver';
import { AdminBlogComponent } from './components/admin-blog/admin-blog.component';
import { BlogResolver } from './shared/services/blog.resolver';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'product/:category', component: ProductComponent },
  { path: 'product/:category/:id', component: ProductInfoComponent,resolve:{
    productInfo: ProductResolver
  } },
  { path: 'blog', component: BlogComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'about', component: AboutComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'blog/:id', component: BlogInfoComponent, resolve: {
    blogInfo: BlogResolver
  } },
  { path: 'admin-blog', component: AdminBlogComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
