import React from "react";

export interface TableColumn<T> {
    key: keyof T | string;
    label: string;
    render?: (row: T) => React.ReactNode;
    className?: string;
}

interface TableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

// Modificaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaar
function Table<T extends { id: React.Key }>({
    columns,
    data,
    page,
    totalPages,
    onPageChange
}: TableProps<T>) {
    return (
        <div className="w-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key as string} className={col.className ?? "px-6 py-3"}>
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id} className="bg-white border-b border-gray-100">
                            {columns.map((col) => (
                                <td key={col.key as string} className={col.className ?? "px-6 py-4"}>
                                    {col.render ? col.render(row) : (row[col.key as keyof T] as React.ReactNode)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Paginado solo estilo */}
            <div className="flex justify-end items-center gap-2 mt-4">
                <button
                    className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                >
                    Anterior
                </button>
                <span className="text-sm text-gray-600">
                    Página {page} de {totalPages}
                </span>
                <button
                    className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1)}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default Table;