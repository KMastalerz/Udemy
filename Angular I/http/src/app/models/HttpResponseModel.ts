import { HttpErrorResponse } from "@angular/common/http";

export interface MyHttpResponse<T> {
    result?: T;
    error: HttpErrorResponse;
}

export interface FirebasePostResponse {
    name: string;
}

export interface FirebaseGetResponse<T> {
    [key: string]: T;
}