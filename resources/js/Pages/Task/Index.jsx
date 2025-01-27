import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import TaskTable from './TaskTable'

function Index({ auth, tasks, queryParams = null, success }) {
  return (
    <AuthenticatedLayout user={auth.user}
      header={
        <div className='flex items-center justify-between'>
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Task
          </h2>
          <Link
            href={route('task.create')}
            className='bg-emerald-500 py-1 px-3 font-semibold text-lg text-gray-800 dark:text-gray-200 rounded shadow transition-all hover:bg-emerald-600'>
            Add new
          </Link>
        </div>

      }
    >
      <Head title="Dashboard" />
      {success && (<div className='bg-emerald-500 py-2 px-4 text-white rounded'>
            {success}</div>)}
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <TaskTable tasks={tasks} queryParams={queryParams} success={success} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Index
