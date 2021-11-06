import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CustomerService} from "../customer.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Customer} from "../customer.types";
import {Contact} from "../../apps/contacts/contacts.types";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  customer: Customer;

  constructor(
      private _customerService: CustomerService,
  )
  {
  }



  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */

  ngOnInit(): void {
    this._customerService.customer$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((customer: Customer) => {
            // Get the contact
          this.customer = customer;
    });


  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
