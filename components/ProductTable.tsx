'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Product } from '../types';

interface ProductTableProps {
  data: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  deletingId: string | null;
}

const columnHelper = createColumnHelper<Product>();

export default function ProductTable({ data, onEdit, onDelete, deletingId }: ProductTableProps) {
  const columns = [
    columnHelper.accessor('images', {
      header: 'Image',
      cell: (info) => (
        <img
          src={info.getValue()}
          alt="Product"
          className="w-16 h-16 object-cover rounded-md bg-gray-100"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'64\' height=\'64\' viewBox=\'0 0 64 64\'%3E%3Crect width=\'64\' height=\'64\' fill=\'%23e5e7eb\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-size=\'10\' fill=\'%239ca3af\'%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
      ),
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => <span className="font-medium text-gray-800">{info.getValue()}</span>,
    }),
    columnHelper.accessor('price', {
      header: 'Price',
      cell: (info) => <span className="text-gray-600">${Number(info.getValue()).toFixed(2)}</span>,
    }),
    columnHelper.accessor('avatar', {
      header: 'Avatar',
      cell: (info) => (
        <img
          src={info.getValue()}
          alt="Avatar"
          className="w-10 h-10 rounded-full border-2 border-gray-200 bg-gray-100"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'20\' fill=\'%23e5e7eb\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-size=\'14\' fill=\'%239ca3af\'%3E%3F%3C/text%3E%3C/svg%3E';
          }}
        />
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (props) => {
        const isDeleting = deletingId === props.row.original.id;
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(props.row.original)}
              disabled={!!deletingId}
              className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors disabled:opacity-50"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(props.row.original.id)}
              disabled={!!deletingId}
              className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors disabled:opacity-50 flex items-center"
            >
              {isDeleting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-50 border-b border-gray-200">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-4 text-sm font-semibold text-gray-700">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                  No products found. Add some!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
