import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../customer.service";

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {
  accountForm: FormGroup;

  constructor(
      private _customerService: CustomerService,
      private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // Create the form
    this.accountForm = this._formBuilder.group({
      name    : ['Brian Hughes'],
      username: ['brianh'],
      title   : ['Senior Frontend Developer'],
      company : ['YXZ Software'],
      about   : ['Hey! This is Brian; husband, father and gamer. I\'m mostly passionate about bleeding edge tech and chocolate! 🍫'],
      email   : ['hughes.brian@mail.com', Validators.email],
      phone   : ['121-490-33-12'],
      country : ['usa'],
      language: ['english']
    });
  }

}
