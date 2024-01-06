import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

export interface MyHttpResponse<T> {
    response?: HttpResponse<T>,
    error?: HttpErrorResponse,
    result? : T
}