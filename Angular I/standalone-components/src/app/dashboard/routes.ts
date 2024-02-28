import { Route } from "@angular/router";

export const DASHBOARD_ROUTES: Route[] = [
    {
        path: '',
        loadComponent: () => import('./dashboard.component').then(m=> m.DashboardComponent)
    },
    {
        path: 'today',
        loadComponent: () => import('./today/today.component').then(m=> m.TodayComponent)
        //component: TodayComponent <= this if not lazy load
    }
]