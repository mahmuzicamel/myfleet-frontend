import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Inject,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {switchMap, takeUntil} from "rxjs/operators";
import {FuseMediaWatcherService} from "../../../../@fuse/services/media-watcher";
import {Observable, Subject} from "rxjs";
import {Customer} from "./customer.types";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "./customer.service";
import {DOCUMENT} from "@angular/common";
import {FormControl} from "@angular/forms";

@Component({
    selector     : 'example',
    templateUrl  : './customer.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerComponent implements OnInit, OnDestroy
{
    @ViewChild('drawer') drawer: MatDrawer;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    selectedCustomer: Customer;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    customers$: Observable<Customer[]>;
    customersCount: number = 0;
    noContacts: any;
    searchInputControl: FormControl = new FormControl();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _customerService: CustomerService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _router: Router,
        @Inject(DOCUMENT) private _document: any
    )
    {
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngOnInit(): void {
        this.customers$ = this._customerService.customers$;
        this._customerService.customers$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((customers: Customer[]) => {
                this.customersCount = customers.length;
                this._changeDetectorRef.markForCheck();
            });

        this._customerService.customer$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((customer: Customer) => {
                this.selectedCustomer = customer;
                this._changeDetectorRef.markForCheck();
            });

        this.searchInputControl.valueChanges
            .pipe(takeUntil(this._unsubscribeAll),
                switchMap(query => this._customerService.searchCustomer(query))).subscribe();


        if (this.drawer != undefined) {
            this.drawer.openedChange.subscribe((opened) => {
                if (!opened) {
                    this.selectedCustomer = null;
                    this._changeDetectorRef.markForCheck();
                }
            });
        }

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode and drawerOpened
                if ( matchingAliases.includes('lg') )
                {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                }
                else
                {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
