import { Route } from '@angular/router';
import { DashboardComponent } from 'app/modules/admin/apps/dashboard/dashboard.component';
import { ProjectResolver } from 'app/modules/admin/apps/dashboard/dashboard.resolvers';

export const projectRoutes: Route[] = [
    {
        path     : '',
        component: DashboardComponent,
        resolve  : {
            data: ProjectResolver
        }
    }
];
