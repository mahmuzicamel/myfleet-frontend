import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CustomerComponent } from 'app/modules/admin/customer/customer.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {customerRoutes} from "./contacts.routing";
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import {MatButtonModule} from "@angular/material/button";
import {MatOptionModule} from "@angular/material/core";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import { CustomerInfoComponent } from './customer-details/customer-info/customer-info.component';
import {MatTabsModule} from "@angular/material/tabs";

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: CustomerComponent
    }
];

@NgModule({
    declarations: [
        CustomerComponent,
        CustomerDetailsComponent,
        CustomerInfoComponent
    ],
    imports: [
        RouterModule.forChild(customerRoutes),
        MatSidenavModule,
        MatIconModule,
        CommonModule,
        MatButtonModule,
        MatOptionModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        MatTabsModule
    ]
})
export class CustomerModule
{

}
