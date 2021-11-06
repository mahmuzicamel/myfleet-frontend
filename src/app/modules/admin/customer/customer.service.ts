import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Customer, Address } from 'app/modules/admin/customer/customer.types';

@Injectable({
    providedIn: 'root'
})
export class CustomerService
{
    // Private
    private _customer: BehaviorSubject<Customer | null> = new BehaviorSubject(null);
    private _customers: BehaviorSubject<Customer[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for contact
     */
    get customer$(): Observable<Customer>
    {
        return this._customer.asObservable();
    }

    /**
     * Getter for contacts
     */
    get customers$(): Observable<Customer[]>
    {
        return this._customers.asObservable();
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get contacts
     */
    getCustomers(): Observable<Customer[]>
    {
        return this._httpClient.get<Customer[]>('api/customers/all').pipe(
            tap((customer) => {
                this._customers.next(customer);
            })
        );
    }

    /**
     * Search contacts with given query
     *
     * @param query
     */
    searchCustomer(query: string): Observable<Customer[]>
    {
        return this._httpClient.get<Customer[]>('api/customers/search', {
            params: {query}
        }).pipe(
            tap((customer) => {
                this._customers.next(customer);
            })
        );
    }

    /**
     * Get contact by id
     */
    getCustomerById(id: string): Observable<Customer>
    {
        return this._customers.pipe(
            take(1),
            map((customers) => {

                // Find the contact
                const customer = customers.find(item => item.id === id) || null;

                // Update the contact
                this._customer.next(customer);

                // Return the contact
                return customer;
            }),
            switchMap((customer) => {

                if ( !customer )
                {
                    return throwError('Could not found contact with id of ' + id + '!');
                }

                return of(customer);
            })
        );
    }

    /**
     * Create contact
     */
    createContact(): Observable<Customer>
    {
        return this.customers$.pipe(
            take(1),
            switchMap(customers => this._httpClient.post<Customer>('api/customers/customer', {}).pipe(
                map((customer) => {

                    // Update the contacts with the new contact
                    this._customers.next([customer, ...customers]);

                    // Return the new contact
                    return customer;
                })
            ))
        );
    }

    /**
     * Update contact
     *
     * @param id
     * @param contact
     */
    updateCustomer(id: string, contact: Customer): Observable<Customer>
    {
        return this.customers$.pipe(
            take(1),
            switchMap(customers => this._httpClient.patch<Customer>('api/customers/customer', {
                id,
                contact
            }).pipe(
                map((updatedCustomer) => {

                    // Find the index of the updated contact
                    const index = customers.findIndex(item => item.id === id);

                    // Update the contact
                    customers[index] = updatedCustomer;

                    // Update the contacts
                    this._customers.next(customers);

                    // Return the updated contact
                    return updatedCustomer;
                }),
                switchMap(updatedCustomer => this.customer$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {

                        // Update the contact if it's selected
                        this._customer.next(updatedCustomer);

                        // Return the updated contact
                        return updatedCustomer;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the contact
     *
     * @param id
     */
    deleteCustomer(id: string): Observable<boolean>
    {
        return this.customers$.pipe(
            take(1),
            switchMap(customers => this._httpClient.delete('api/customers/customer', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted contact
                    const index = customers.findIndex(item => item.id === id);

                    // Delete the contact
                    customers.splice(index, 1);

                    // Update the contacts
                    this._customers.next(customers);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }
}
