/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'mainmenu',
        title   : 'Hauptmenü',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [{
            id   : 'dashboard',
            title: 'Dashboard',
            type : 'basic',
            icon : 'heroicons_outline:view-grid',
            link : 'dashboard'
        },
        {
            id   : 'customers',
            title: 'Kunden',
            type : 'basic',
            icon : 'heroicons_outline:user-group',
            link : '/customers'
        },
        {
            id   : 'cars',
            title: 'Fahrzeuge',
            type : 'basic',
            icon : 'heroicons_outline:truck',
            link : '/cars'
        },
        {
            id   : 'documents',
            title: 'Dokumente',
            type : 'basic',
            icon : 'heroicons_outline:cloud',
            link : '/documents'
        }
        ],
    },
    {
        id      : 'other',
        title   : 'Weitere Aktionen',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [{
            id   : 'download',
            title: 'Kundendaten exportieren',
            type : 'basic',
            icon : 'heroicons_outline:download',
            link : '/export'
        }, {
            id   : 'example',
            title: 'Example',
            type : 'basic',
            icon : 'heroicons_outline:trash',
            link : '/example'
        }, {
            id   : 'example2',
            title: 'Example 2',
            type : 'basic',
            icon : 'heroicons_outline:trash',
            link : '/example2'
        }],
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
