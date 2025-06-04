import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
    getPaginationRowModel,
} from '@tanstack/react-table'
import { useState } from "react";
import { RiArrowDropLeftLine, RiArrowDropRightLine, RiArrowRightDoubleLine } from 'react-icons/ri';
import Input from '../ui/inputs/Input';

interface Props<T> {
    data: T[];
    columns: ColumnDef<T>[];
}

function TableStack<T>({ data, columns }: Props<T>) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const table = useReactTable<T>({
        data,
        columns,
        state: { pagination },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: false,
        pageCount: Math.ceil(data.length / pagination.pageSize),
    });

    return (
        <div className="relative overflow-x-auto">
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 '>
                <thead className='text-xs text-gray-700 bg-gray-50'>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className='border border-gray-100'>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    <div className='text-sm font-medium px-6 py-2'>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className='border border-gray-100'>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    <div className='px-6 py-2 text-xs'>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <section className='flex flex-col md:flex-row justify-between mt-5 gap-4'>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                    <div>Página</div>
                    <span>
                        {pagination.pageIndex + 1} de {table.getPageCount()}
                    </span>
                </span>

                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <div className='flex gap-2'>
                        <button
                            className='bg-gray-100 border border-gray-200 rounded-lg p-1  cursor-pointer'
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <RiArrowRightDoubleLine className='text-gray-700 rotate-180' />
                        </button>
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className='bg-gray-100 border border-gray-200 rounded-lg p-0.5  cursor-pointer'
                        >
                            <RiArrowDropLeftLine className='text-gray-700 text-xl' />
                        </button>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className='bg-gray-100 border border-gray-200 rounded-lg p-0.5  cursor-pointer'
                        >
                            <RiArrowDropRightLine className='text-gray-700 text-xl' />
                        </button>
                        <button
                            className='bg-gray-100 border border-gray-200 rounded-lg p-1 cursor-pointer flex'
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <RiArrowRightDoubleLine className='text-gray-700' />
                        </button>
                    </div>

                    <span className="flex items-center gap-1 text-sm text-gray-600">
                        Ir a la página
                        <Input
                            type="number"
                            min={1}
                            max={table.getPageCount()}
                            value={pagination.pageIndex + 1}
                            onChange={e => {
                                let page = Number(e.target.value) - 1;
                                if (isNaN(page)) page = 0;
                                if (page < 0) page = 0;
                                if (page >= table.getPageCount()) page = table.getPageCount() - 1;
                                table.setPageIndex(page);
                            }}
                            className="border p-1 rounded !w-20"
                        />
                    </span>
                    <select
                        className='text-gray-600 text-sm'
                        value={pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Mostrar {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </section>
        </div>
    );
}

export default TableStack;