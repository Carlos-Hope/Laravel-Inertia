import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from './constants';

export default function Dashboard({ auth, myPendingTasks, totalPendingTasks, myInProgressTasks, totalInProgressTasks, myCompletedTasks, totalCompletedTasks, activeTasks }) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className='text-amber-500 font-semibold text-xl'>Pending Tasks</h3>
              <p className='text-lg'>{myPendingTasks}/{totalPendingTasks}</p>
            </div>
          </div>
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className='text-blue-500 font-semibold text-xl'>In Progress Tasks</h3>
              <p className='text-lg'>{myInProgressTasks}/{totalInProgressTasks}</p>
            </div>
          </div>
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className='text-green-500 font-semibold text-xl'>Completed Tasks</h3>
              <p className='text-lg'>{myCompletedTasks}/{totalCompletedTasks}</p>
            </div>
          </div>

        </div>

        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-4">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-200 dark:text-gray-100">
              <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-70 dark:text-gray-400 border-b-2 border-gray-500'>
                  <tr>
                    <th className='py-3 px-3'>Id</th>
                    <th className='py-3 px-3'>Project Name</th>
                    <th className='py-3 px-3'>Name</th>
                    <th className='py-3 px-3'>Status</th>
                    <th className='py-3 px-3'>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTasks.data.map(task => (
                    <tr key={task.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                      <td className='px-3 py-2'>{task.id}</td>
                      <td className='px-3 py-2 text-white hover:underline'><Link href={route('project.show', task.project.id)}>
                          {task.project.name}
                        </Link></td>
                      <td className='px-3 py-2 text-white hover:underline'>
                        <Link href={route('task.show', task.id)}>
                          {task.name}
                        </Link>
                      </td>
                      <td className='px-2 py-2'>
                        <span className={"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]}>{TASK_STATUS_TEXT_MAP[task.status]}
                        </span>
                      </td>
                      <td className='px-3 py-2'>{task.due_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
