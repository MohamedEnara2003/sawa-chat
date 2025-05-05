import { getRouterSelectors } from "@ngrx/router-store";


export const { 
    selectRouteData ,
    selectRouteParams ,
    selectQueryParams,
    selectCurrentRoute
} = getRouterSelectors() ;