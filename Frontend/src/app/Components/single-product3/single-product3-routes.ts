import { Route } from "@angular/router";
import { SingleProduct3Component } from "./single-product3/single-product3.component";

export const singleProduct3: Route[] = [
  // child routing and lazy loading
  {
    path: "",
    component: SingleProduct3Component
  }
];
