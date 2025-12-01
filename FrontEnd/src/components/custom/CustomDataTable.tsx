import {type ColumnDef, flexRender, getCoreRowModel, useReactTable,} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

/**
 * Componente genérico de tabela baseado no TanStack React Table.
 *
 * @template TData - O tipo (shape) de cada linha da tabela.
 * @template TValue - O tipo retornado pelos accessors das colunas.
 *
 * @param {Object} props
 * @param {import("@tanstack/react-table").ColumnDef<TData, TValue>[]} props.columns
 *   Lista de definições de colunas da tabela. Cada coluna pode conter
 *   `accessorKey`, `accessorFn`, `header`, `cell`, entre outros.
 *
 * @param {TData[]} props.data
 *   Array de objetos que representam as linhas da tabela. Cada objeto deve
 *   conter um campo `id` único, pois o componente usa `getRowId: row => row.id`.
 *
 * @description
 * Este componente:
 * - Renderiza uma tabela completa usando ShadCN UI + TanStack Table.
 * - Gera automaticamente cabeçalho e células com base nas colunas fornecidas.
 * - Usa `flexRender` para renderizar conteúdo customizável em `header` e `cell`.
 * - Utiliza `useReactTable` para controle do row model.
 * - É totalmente genérico, permitindo usar qualquer tipo como linha da tabela.
 *
 * @example
 * // Exemplo de tipo para as linhas
 * type Payment = {
 *   id: string
 *   amount: number
 *   status: "pending" | "success"
 *   email: string
 * }
 *
 * // Exemplo de colunas
 * const columns: ColumnDef<Payment>[] = [
 *   {
 *     accessorKey: "status",
 *     header: "Status"
 *   },
 *   {
 *     accessorKey: "email",
 *     header: "Email"
 *   },
 *   {
 *     accessorKey: "amount",
 *     header: "Valor"
 *   },
 * ]
 *
 * // Exemplo de dados
 * const data: Payment[] = [
 *   { id: "1", amount: 100, status: "pending", email: "teste@example.com" }
 * ]
 *
 * // Uso do componente
 * <CustomDataTable<Payment>
 *   columns={columns}
 *   data={data}
 * />
 *
 * @returns {JSX.Element}
 *   Retorna uma tabela estilizada e totalmente funcional.
 */
export default function CustomDataTable<TData, TValue>({columns, data,}: DataTableProps<TData, TValue>) {

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: originalRow => originalRow.id
  })


  return (
    <div className="overflow-hidden rounded-md border shadow-sm">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className={"bg-card text-center"}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className={""}>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={"bg-card"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}