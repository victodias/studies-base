import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table } from '@tanstack/react-table'

type Props<TData> =
  | {
      tableConfig: Table<TData>
      enableFiltering?: true
      textFilterByColumn: string
      enableVisibility?: boolean
    }
  | {
      tableConfig: Table<TData>
      enableFiltering?: false
      textFilterByColumn?: string
      enableVisibility?: boolean
    }

export function DataTableToolbar<TData>({
  tableConfig,
  textFilterByColumn,
  enableFiltering,
  enableVisibility
}: Props<TData>) {
  return (
    <div className="flex items-center py-4">
      {enableFiltering && (
        <Input
          className="max-w-sm"
          placeholder="Filter emails..."
          value={
            (tableConfig
              .getColumn(textFilterByColumn)
              ?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            tableConfig.getColumn('email')?.setFilterValue(event.target.value)
          }
        />
      )}

      {enableVisibility && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {tableConfig
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
