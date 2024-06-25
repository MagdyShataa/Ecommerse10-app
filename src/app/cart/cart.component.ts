import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Productface } from "../productes/productface";
import { ProductsService } from "../productes/products.service";
import { MatTable } from "@angular/material/table";
import { Router } from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  totalamount: number = 0;

  displayedColumns: string[] = ["position", "name", "weight", "symbol"];

  dataSource: any;

  @ViewChild(MatTable)
  table!: MatTable<Productface>;

  removeData() {
    this.items.pop();
    this.table.renderRows();
  }

  items = this.cartService.getItems();

  constructor(
    private cartService: ProductsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    const total = this.cartService.totalPrice();
    // Use 'total' here - for example, to display it in the template
    this.totalamount = total;
    console.log("Total price:", total);
  }

  checkoutForm = this.formBuilder.group({
    name: ["", Validators.required],
    address: ["", Validators.required],
  });

  onSubmit() {
    this.checkoutForm.value;
    this.cartService.products();
    localStorage.setItem(
      "Ecommerce",
      JSON.stringify(this.checkoutForm.value.name)
    );
    this.items = this.cartService.clearCart();
    console.warn("Your order has been submitted", this.checkoutForm.value);
    setTimeout(() => {
      this.router.navigate(["/order-page"]);
    }, 4000);
  }
}
