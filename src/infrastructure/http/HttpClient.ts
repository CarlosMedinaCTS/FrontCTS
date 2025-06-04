export class HttpClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(
        endpoint: string,
        method: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        body?: any,
        options: RequestInit = {}
    ): Promise<{ data: T | null; error: string | null }> {
        const url = `${this.baseUrl}${endpoint}`;
        const fetchOptions: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            ...options,
        };

        if (body !== undefined) {
            fetchOptions.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, {
                ...fetchOptions,
                signal: AbortSignal.timeout(5000),
            });

            if (!response.ok) {
                return {
                    data: null,
                    error: `HTTP error! status: ${response.status}`,
                };
            }

            const data: T = await response.json();
            return { data, error: null };
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === "TimeoutError") {
                    return { data: null, error: "Request timed out - no response within 5 seconds." };
                }
                return { data: null, error: error.message || "Request failed due to an unknown error" };
            }
            return { data: null, error: "Request failed due to an unknown error" };
        }
    }

    get<T>(endpoint: string, options?: RequestInit) {
        return this.request<T>(endpoint, "GET", undefined, options);
    }

    post<T, B = unknown>(endpoint: string, body: B, options?: RequestInit) {
        return this.request<T>(endpoint, "POST", body, options);
    }

    put<T, B>(endpoint: string, body: B, options?: RequestInit) {
        return this.request<T>(endpoint, "PUT", body, options);
    }

    path<T, B>(endpoint: string, body: B, options?: RequestInit) {
        return this.request<T>(endpoint, "PATCH", body, options);
    }

    delete<T>(endpoint: string, options?: RequestInit) {
        return this.request<T>(endpoint, "DELETE", undefined, options);
    }
}