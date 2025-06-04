export interface CollatedDepartment {
    page: number;
    limit: number;
    totalResult: number;
    totalPages: number;
    data: Department[];
}

export interface Department {
    id: number;
    created_at: Date;
    updated_at: Date;
    name: string;
    abreviation: string;
}