import { Component, OnInit } from "@angular/core";
import { Productface } from "../productes/productface";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

import {
  trigger,
  style,
  animate,
  transition,
  group,
  query,
  animateChild,
  keyframes,
} from "@angular/animations";
import { ProductsService } from "../productes/products.service";
@Component({
  selector: "app-order-page",
  templateUrl: "./order-page.component.html",
  styleUrl: "./order-page.component.css",
})
export class OrderPageComponent implements OnInit {
  totalamount: number = 0;
  orderItems: any = {}; // Initialize orderItems as an object
  constructor(private orderService: ProductsService, private router: Router) {}

  ngOnInit() {
    // Retrieve order items from local storage
    const storedItems = localStorage.getItem("Ecommerce");
    if (storedItems) {
      this.orderItems = JSON.parse(storedItems);
      // Now you can access orderItems.name and other properties
    } else {
      // Handle the case where orderItems is not found in local storage
      console.warn("No order items found in local storage.");
      // You might redirect the user to a different page or show an error message.
    }

    console.log("Order name:", this.orderItems.name);
  }

  goBack(): void {
    this.router.navigate(["/procuts"]);
  }
}
