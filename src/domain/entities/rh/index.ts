export interface CollatedDepartment<T>{
    page: number;
    limit: number;
    totalResult: number;
    totalPages: number;
    data: T[];
}

export interface Department {
    id: number;
    created_at: Date;
    updated_at: Date;
    name: string;
    abreviation: string;
}

export interface Position {
    id:         number;
    created_at: Date;
    updated_at: Date;
    name:       string;
    salary:     Salary;
    department: Department;
}

export interface Salary {
    id:              number;
    created_at:      Date;
    updated_at:      Date;
    amount:          string;
    salary_in_words: string;
}