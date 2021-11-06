import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomerService } from 'app/modules/admin/customer/customer.service';
import { Customer } from 'app/modules/admin/customer/customer.types';

@Injectable({
    providedIn: 'root'
})
export class CustomerResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private customerService: CustomerService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer[]>
    {
        return this.customerService.getCustomers();
    }
}

@Injectable({
    providedIn: 'root'
})
export class CustomersCustomerResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _customerService: CustomerService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer>
    {
        return this._customerService.getCustomerById(route.paramMap.get('id'))
                   .pipe(
                       // Error here means the requested contact is not available
                       catchError((error) => {

                           // Log the error
                           console.error(error);

                           // Get the parent url
                           const parentUrl = state.url.split('/').slice(0, -1).join('/');

                           // Navigate to there
                           this._router.navigateByUrl(parentUrl);

                           // Throw an error
                           return throwError(error);
                       })
                   );
    }
}

// @Injectable({
//     providedIn: 'root'
// })
// export class ContactsCountriesResolver implements Resolve<any>
// {
//     /**
//      * Constructor
//      */
//     constructor(private _contactsService: ContactsService)
//     {
//     }
//
//     // -----------------------------------------------------------------------------------------------------
//     // @ Public methods
//     // -----------------------------------------------------------------------------------------------------
//
//     /**
//      * Resolver
//      *
//      * @param route
//      * @param state
//      */
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Country[]>
//     {
//         return this._contactsService.getCountries();
//     }
// }
//
// @Injectable({
//     providedIn: 'root'
// })
// export class ContactsTagsResolver implements Resolve<any>
// {
//     /**
//      * Constructor
//      */
//     constructor(private _contactsService: ContactsService)
//     {
//     }
//
//     // -----------------------------------------------------------------------------------------------------
//     // @ Public methods
//     // -----------------------------------------------------------------------------------------------------
//
//     /**
//      * Resolver
//      *
//      * @param route
//      * @param state
//      */
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tag[]>
//     {
//         return this._contactsService.getTags();
//     }
// }
