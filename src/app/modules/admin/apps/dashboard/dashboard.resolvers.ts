import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardService } from 'app/modules/admin/apps/dashboard/dashboard.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _projectService: DashboardService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._projectService.getData();
    }
}
