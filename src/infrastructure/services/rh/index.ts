import type { RequestDepartament, RequestPosition } from "@/domain/entities/rh";
import { ApiService } from "@/infrastructure/http/apiService";
const api = new ApiService();




// Servicios para el recursos humanos

export class rhServices {
    // peticiones para los departamentos creados
    async getDepartament<T>(): Promise<T> {
        const response = await api.get<{ data: T }>("department?page=1&limit=5&all=true&relations=false");
        return response?.data as T;
    }

    async postDepartament<T>(data: RequestDepartament): Promise<T> {
        const response = await api.post("department", data);
        return response as T;
    }

    async pathDepartament<T>(data: RequestDepartament, id: number): Promise<T> {
        const response = await api.path(`department/${id}`, data);
        return response as T;
    }

    async deleteDepartament<T>(id: number) : Promise<T> {
        const response = await api.delete(`department/${id}`);
        return response as T;
    }

    // peticiones para las posiciones creadas
    async getPosition<T>(): Promise<T> {
        const response = await api.get<{ data: T }>("position?page=1&limit=5&all=true&relations=false");
        return response?.data as T;
    }

    async postPosition<T>(data: RequestPosition) : Promise<T> {
        const response = await api.post("position", data);
        return response as T;
    }

    async pathPosition<T>(data: RequestPosition, id: number) : Promise<T> {
        const response = await api.path(`position/${id}`, data);
        return response as T;
    }

    async deletePosition<T>(id: number) : Promise<T> {
        const response = await api.delete(`position/${id}`);
        return response as T;
    }
}
