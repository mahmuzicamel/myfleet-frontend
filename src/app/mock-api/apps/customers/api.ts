import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import { FuseMockApiService, FuseMockApiUtils } from '@fuse/lib/mock-api';
import { customers as contactsData } from 'app/mock-api/apps/customers/data';

@Injectable({
    providedIn: 'root'
})
export class CustomersMockApi
{
    private _customers: any[] = contactsData;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Contacts - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/customers/all')
            .reply(() => {

                // Clone the contacts
                const customers = cloneDeep(this._customers);

                // Sort the contacts by the name field by default
                customers.sort((a, b) => a.name.localeCompare(b.name));

                // Return the response
                return [200, customers];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Contacts Search - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/customers/search')
            .reply(({request}) => {

                // Get the search query
                const query = request.params.get('query');

                // Clone the contacts
                let customers = cloneDeep(this._customers);

                // If the query exists...
                if ( query )
                {
                    // Filter the contacts
                    customers = customers.filter(customer => customer.name && customer.name.toLowerCase().includes(query.toLowerCase()));
                }

                // Sort the contacts by the name field by default
                customers.sort((a, b) => a.name.localeCompare(b.name));

                // Return the response
                return [200, customers];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Contact - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/customers/customer')
            .reply(({request}) => {

                // Get the id from the params
                const id = request.params.get('id');

                // Clone the contacts
                const customers = cloneDeep(this._customers);

                // Find the contact
                const contact = customers.find(item => item.id === id);

                // Return the response
                return [200, contact];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Contact - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/customers/customer')
            .reply(() => {

                // Generate a new contact
                const newCustomer = {
                    id          : FuseMockApiUtils.guid(),
                    avatar      : null,
                    name        : 'New Contact',
                    emails      : [],
                    phoneNumbers: [],
                    job         : {
                        title  : '',
                        company: ''
                    },
                    birthday    : null,
                    address     : null,
                    notes       : null,
                    tags        : []
                };

                // Unshift the new contact
                this._customers.unshift(newCustomer);

                // Return the response
                return [200, newCustomer];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Contact - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/customers/customer')
            .reply(({request}) => {

                // Get the id and contact
                const id = request.body.id;
                const customer = cloneDeep(request.body.customer);

                // Prepare the updated contact
                let updatedCustomer = null;

                // Find the contact and update it
                this._customers.forEach((item, index, contacts) => {

                    if ( item.id === id )
                    {
                        // Update the contact
                        contacts[index] = assign({}, contacts[index], customer);

                        // Store the updated contact
                        updatedCustomer = contacts[index];
                    }
                });

                // Return the response
                return [200, updatedCustomer];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Contact - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onDelete('api/customers/customer')
            .reply(({request}) => {

                // Get the id
                const id = request.params.get('id');

                // Find the contact and delete it
                this._customers.forEach((item, index) => {

                    if ( item.id === id )
                    {
                        this._customers.splice(index, 1);
                    }
                });

                // Return the response
                return [200, true];
            });



        // -----------------------------------------------------------------------------------------------------
        // @ Avatar - POST
        // -----------------------------------------------------------------------------------------------------

        /**
         * Read the given file as mock-api url
         *
         * @param file
         */
        const readAsDataURL = (file: File): Promise<any> =>

            // Return a new promise
            new Promise((resolve, reject) => {

                // Create a new reader
                const reader = new FileReader();

                // Resolve the promise on success
                reader.onload = (): void => {
                    resolve(reader.result);
                };

                // Reject the promise on error
                reader.onerror = (e): void => {
                    reject(e);
                };

                // Read the file as the
                reader.readAsDataURL(file);
            })
        ;
    }
}
