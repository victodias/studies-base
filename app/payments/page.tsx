import { columns, Payment } from './columns'
import { DataTable } from '../../components/data-table'

async function getData(): Promise<Payment[]> {
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com'
    },
    {
      id: '489e1d42',
      amount: 125,
      status: 'processing',
      email: 'example@gmail.com'
    }
  ]
}

export default async function Page() {
  const data = await getData()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Payment</h1>
      <DataTable
        columns={columns}
        data={data}
        textFilterByColumn='email'
        enableFiltering
        enableVisibility
        enableSorting
        enableSelection
      />
    </div>
  )
}
