import { HttpClient } from "./HttpClient";

const http = new HttpClient(import.meta.env.VITE_API_URL);

export class ApiService {
    get<T>(url: string, options?: RequestInit) {
        return http.get<T>(url, options);
    }
    post<T, B = unknown>(url: string, body: B, options?: RequestInit) {
        return http.post<T, B>(url, body, options);
    }
    put<T, B = unknown>(url: string, body: B, options?: RequestInit) {
        return http.put<T, B>(url, body, options);
    }
    path<T, B = unknown>(url: string, body: B, options?: RequestInit) {
        return http.path<T, B>(url, body, options);
    }
    delete<T>(url: string, options?: RequestInit) {
        return http.delete<T>(url, options);
    }
}