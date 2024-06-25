import { Component, OnInit } from "@angular/core";
import { ChildrenOutletContexts } from "@angular/router";
import { slideInAnimation } from "./animations";
import { Productface } from "./productes/productface";
import { from, interval, map, Observable, Observer, of } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  animations: [slideInAnimation],
})
export class AppComponent  {
  title = "Ecommerse10-app";
  public productNumber: number | any;
  items: Productface[] = [];
  $value: number | any;
  data$: Observable<number> | undefined;
  constructor(private contexts: ChildrenOutletContexts) {
    function sequenceSubscriber(observer: Observer<number>) {
      // synchronously deliver 1, 2, and 3, then completes
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();

      // Return the unsubscribe function.
      // This one doesn't do anything
      // because values are delivered synchronously
      // and there is nothing to clean up.
      return { unsubscribe() {} };
    }
  }


  getRouteAnimationData() {
    return this.contexts.getContext("primary")?.route?.snapshot?.data?.[
      "animation"
    ];
  }
}
