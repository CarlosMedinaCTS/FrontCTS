export interface Response<T> {
    page: number;
    limit: number;
    totalResult: number;
    totalPages: number;
    data: T;
}

export interface Department {
    id: number;
    created_at: Date;
    updated_at: Date;
    name: string;
    abreviation: string;
    positions?: Position[]
}

export interface Position {
    id: number;
    created_at: Date;
    updated_at: Date;
    name: string;
    salary: Salary;
    department: Department;
}

export interface Salary {
    id: number;
    created_at: Date;
    updated_at: Date;
    amount: string;
    salary_in_words: string;
}


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

export interface ResponseData<T> {
    data: T;
    error: unknown
}

export interface UpdatePayload {
    affected : 1
    generatedMaps : []
    raw : []
}