import Pagination from '@/Components/Pagination'
import { Link, router } from '@inertiajs/react'
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '../constants.jsx'
import TextInput from '@/Components/TextInput.jsx'
import SelectInput from '@/Components/SelectInput.jsx'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid'
import TableHeading from '@/Components/TableHeading.jsx'

export default function TaskTable( {tasks, queryParams = null, hideProjectColumn = false , success}) {
  queryParams = queryParams || {}
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name]
    }
    router.get(route('task.index'), queryParams)
  }
  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return;
    searchFieldChanged(name, e.target.value);
  }

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === 'asc') {
        queryParams.sort_direction = 'desc';
      }else{
        queryParams.sort_direction = 'asc';
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = 'asc'
    }
    router.get(route('task.index'), queryParams)
  }
  const deleteTask = (task) => {
    if(!window.confirm("Are you sure to delete this task")){
      return;
    }
    router.delete(route('task.destroy', task.id))
  }
  return (
    <>
      <div className='overflow-auto'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-70 dark:text-gray-400 border-b-2 border-gray-500'>
            <tr className='text-nowrap'>
              <TableHeading
                name='id'
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                ID
              </TableHeading>
              <th className='px-3 py-3'>Image</th>
             {!hideProjectColumn &&
              (<th className='px-3 py-3'>Project Name</th>)}
              <TableHeading
                name='name'
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Name
              </TableHeading>
              <th onClick={e => sortChanged('status')} className='px-3 py-3'>
                <div className='flex items-center justify-between gap-1 cursor-pointer'>Status
                  <div>
                    <ChevronUpIcon className={'w-4 -mt-2 ' + (queryParams.sort_field === 'status' && queryParams.sort_direction === 'asc' ? 'text-red-700' : '')} />
                    <ChevronDownIcon className={'w-4 -mt-2 ' + (queryParams.sort_field === 'status' && queryParams.sort_direction === 'desc' ? 'text-red-700' : '')} />
                  </div>
                </div>
              </th>
              <th onClick={e => sortChanged('created_at')} className='px-3 py-3'>
                <div className='flex items-center justify-between gap-1 cursor-pointer'>Create
                  <div>
                    <ChevronUpIcon className={'w-4 ' + (queryParams.sort_field === 'created_at' && queryParams.sort_direction === 'asc' ? 'text-red-700' : '')} />
                    <ChevronDownIcon className={'w-4 -mt-2 ' + (queryParams.sort_field === 'created_at' && queryParams.sort_direction === 'desc' ? 'text-red-700' : '')} />
                  </div></div>
              </th>
              <TableHeading
                name='due_date'
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Due Date
              </TableHeading>
              <th className='px-3 py-3'>Created By</th>
              <th className='px-3 py-3 text-right'>Action</th>
            </tr>
          </thead>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-70 dark:text-gray-400 border-b-2 border-gray-500'>
            <tr className='text-nowrap'>
              <th className='px-3 py-3'></th>
              <th className='px-3 py-3'></th>
             {!hideProjectColumn && (<th className='px-3 py-3'></th>)}
              <th className='px-3 py-3'>
                <TextInput
                  defaultValue={queryParams.name}
                  className='w-full text-white'
                  placeholder='Task Name'
                  onBlur={e => searchFieldChanged('name', e.target.value)}
                  onKeyPress={e => onKeyPress('name', e)}
                />
              </th>
              <th className='px-3 py-3'>
                <SelectInput
                  className='w-full'
                  defaultValue={queryParams.status}
                  onChange={e => searchFieldChanged('status', e.target.value)}>
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
              </th>
              <th className='px-3 py-3'></th>
              <th className='px-3 py-3'></th>
              <th className='px-3 py-3'></th>
              <th className='px-3 py-3 text-right'></th>
            </tr>
          </thead>
          <tbody>
            {tasks.data.map(task => (
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={task.id}>
                <td className='px-2 py-2'>{task.id}</td>
                <td className='px-2 py-2'>
                  <img src={task.image_path} alt="image" style={{ width: 60 }} />
                </td>
              {!hideProjectColumn && (<td className='px-2 py-2'>{task.project.name}</td>)}
                <th className='px-2 py-2 hover:underline text-gray-200'>
                  <Link href={route('task.show', task.id)}>{task.name}</Link>
                </th>
                <td className='px-2 py-2'>
                  <span className={"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]}>{TASK_STATUS_TEXT_MAP[task.status]}
                  </span>
                </td>
                <td className='px-2 py-2'>{task.created_at}</td>
                <td className='px-2 py-2'>{task.due_date}</td>
                <td className='px-2 py-2'>{task.createdBy.name}</td>
                <td className='px-2 py-2 text-nowrap'>
                  <Link href={route('task.edit', task.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                    Edit
                  </Link>
                  <button onClick={(e)=> deleteTask(task)} className='font-medium text-red-6OO dark:text-red-500 hover:underline mx-1'> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination links={tasks.meta.links} />
    </>
  )
}
