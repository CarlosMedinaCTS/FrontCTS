import { ApiService } from "@/infrastructure/http/apiService";
const api = new ApiService();

export class rhServices {
    async getUser<T>(): Promise<T> {
        const response = await api.get<{ data: T }>("department?page=1&limit=10&all=false&relations=false");
        return response?.data as T;
    }

    async postDepartament(data: { name: string; abreviation: string }) {
        debugger
        const response = await api.post("department", data);
        return response;
    }

    async pathDepartament(data: { name: string; abreviation: string } , id : number) {
        const response = await api.path(`department/${id}`, data);
        return response;
    }
}