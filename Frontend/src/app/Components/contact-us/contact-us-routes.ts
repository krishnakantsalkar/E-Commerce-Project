import { Route } from "@angular/router";
import { ContactUsComponent } from "./contact-us/contact-us.component";

export const ContactUs: Route[] = [
  // child routing and lazy loading
  {
    path: "",
    component: ContactUsComponent
  }
];
