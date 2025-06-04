import { ApiService } from "@/infrastructure/http/apiService";
const api = new ApiService();




export interface RequestDepartament {
    name: string; abreviation: string
}

export interface RequestPosition {
    name: string,
    salary: {
        amount: number,
        salary_in_words: string
    },
    department_id: number
}
export class rhServices {
    async getUser<T>(): Promise<T> {
        const response = await api.get<{ data: T }>("department?page=1&limit=5&all=true&relations=false");
        return response?.data as T;
    }

    async postDepartament(data: RequestDepartament) {
        const response = await api.post("department", data);
        return response;
    }

    async pathDepartament(data: RequestDepartament, id: number) {
        const response = await api.path(`department/${id}`, data);
        return response;
    }

    async deleteDepartament(id: number) {
        const response = await api.delete(`department/${id}`);
        return response;
    }

    async getPosition<T>(): Promise<T> {
        const response = await api.get<{ data: T }>("position?page=1&limit=5&all=true&relations=false");
        return response?.data as T;
    }

    async postPosition(data: RequestPosition) {
        const response = await api.post("position", data);
        return response;
    }

    async pathPosition(data: RequestPosition, id: number) {
        const response = await api.path(`position/${id}`, data);
        return response;
    }

    async deletePosition(id: number) {
        const response = await api.delete(`position/${id}`);
        return response;
    }


}