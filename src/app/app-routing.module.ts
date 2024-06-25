import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductListComponent } from "./productes/product-list/product-list.component";
import { ProductDetailComponent } from "./productes/product-detail/product-detail.component";
import { CartComponent } from "./cart/cart.component";
import { OrderPageComponent } from "./order-page/order-page.component";

const routes: Routes = [
  {
    path: "procuts",
    component: ProductListComponent,
    data: { animation: "HomePage" },
  },

  {
    path: "product-detail/:id",
    component: ProductDetailComponent,
    data: { animation: "AboutPage" },
  },

  {
    path: "cart",
    component: CartComponent,
    data: { animation: "HomePage" },
  },

  {
    path: "order-page",
    component: OrderPageComponent,
  },

  { path: "", redirectTo: "/procuts", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
