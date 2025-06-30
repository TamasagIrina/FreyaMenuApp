import { HttpInterceptorFn } from "@angular/common/http";
export const authInterceptor: HttpInterceptorFn = (request, next)=> {
    const token= localStorage.getItem('authToken') ?? '';
    const ApiKey="";
    request=request.clone({
        setHeaders: {
            ApiKey: ApiKey ? ApiKey : '1dbb1d13494445d3a70b53c29fb399a4',
            Authorization: token ? `Bearer ${token}` : '',
        }
    });

    return next(request);
    
}; 