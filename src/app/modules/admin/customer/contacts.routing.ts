import { Route } from '@angular/router';
import { CanDeactivateContactsDetails } from 'app/modules/admin/apps/contacts/contacts.guards';
import { ContactsContactResolver, ContactsCountriesResolver, ContactsResolver, ContactsTagsResolver } from 'app/modules/admin/apps/contacts/contacts.resolvers';
import { ContactsComponent } from 'app/modules/admin/apps/contacts/contacts.component';
import { ContactsListComponent } from 'app/modules/admin/apps/contacts/list/list.component';
import { ContactsDetailsComponent } from 'app/modules/admin/apps/contacts/details/details.component';
import {CustomerComponent} from "./customer.component";
import {CustomerResolver, CustomersCustomerResolver} from "./customer.resolvers";
import {CustomerDetailsComponent} from "./customer-details/customer-details.component";
import {CustomerInfoComponent} from "./customer-details/customer-info/customer-info.component";

export const customerRoutes: Route[] = [
    {
        path     : '',
        component: CustomerComponent,
        resolve  : {
            tags: CustomerResolver
        }, children: [ {
            path    : ':id',
            component: CustomerDetailsComponent,
            resolve : {
                tags: CustomersCustomerResolver
            }, children: [
                {
                    path : 'info',
                    component: CustomerInfoComponent
                }
            ]
        }
        ]
    }
];
