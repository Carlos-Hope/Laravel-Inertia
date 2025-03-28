import Pagination from '@/Components/Pagination'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import TextInput from '@/Components/TextInput.jsx'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid'
import TableHeading from '@/Components/TableHeading.jsx'
function Index({ auth, users, queryParams = null, success }) {

  queryParams = queryParams || {}
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name]
    }
    router.get(route('user.index'), queryParams)
  }
  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return;
    searchFieldChanged(name, e.target.value);
  }

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === 'asc') {
        queryParams.sort_direction = 'desc';
      } else {
        queryParams.sort_direction = 'asc';
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = 'asc'
    }
    router.get(route('user.index'), queryParams)
  }

  const deleteUser = (user) => {
    if (!window.confirm("Are you sure to delete this user")) {
      return;
    }
    router.delete(route('user.destroy', user.id))
  }
  return (

    <AuthenticatedLayout user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            User
          </h2>

          <Link
            href={route('user.create')}
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
                      <th onClick={e => sortChanged('name')} className='px-3 py-3'>
                        <div className='flex items-center justify-between gap-1 cursor-pointer'>Name
                          <div>
                            <ChevronUpIcon className={'w-4 -mt-2 ' + (queryParams.sort_field === 'name' && queryParams.sort_direction === 'asc' ? 'text-red-700' : '')} />
                            <ChevronDownIcon className={'w-4 -mt-2 ' + (queryParams.sort_field === 'name' && queryParams.sort_direction === 'desc' ? 'text-red-700' : '')} />
                          </div>
                        </div>
                      </th>
                      <TableHeading
                        name='email'
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                       Email
                      </TableHeading>
                      <th onClick={e => sortChanged('created_at')} className='px-3 py-3'>
                        <div className='flex items-center justify-between gap-1 cursor-pointer'>Create Date
                          <div>
                            <ChevronUpIcon className={'w-4 ' + (queryParams.sort_field === 'created_at' && queryParams.sort_direction === 'asc' ? 'text-red-700' : '')} />
                            <ChevronDownIcon className={'w-4 -mt-2 ' + (queryParams.sort_field === 'created_at' && queryParams.sort_direction === 'desc' ? 'text-red-700' : '')} />
                          </div></div>
                      </th>
                      <th className='px-3 py-3 text-right'>Action</th>
                    </tr>
                  </thead>
                  <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-70 dark:text-gray-400 border-b-2 border-gray-500'>
                    <tr className='text-nowrap'>
                      <th className='px-3 py-3'></th>
                      <th className='px-3 py-3'>
                        <TextInput
                          defaultValue={queryParams.name}
                          className='w-full text-white'
                          placeholder='User Name'
                          onBlur={e => searchFieldChanged('name', e.target.value)}
                          onKeyPress={e => onKeyPress('name', e)}
                        />
                      </th>
                      <th className='px-3 py-3'>
                        <TextInput
                          defaultValue={queryParams.email}
                          className='w-full text-white'
                          placeholder='User Email'
                          onBlur={e => searchFieldChanged('email', e.target.value)}
                          onKeyPress={e => onKeyPress('email', e)}
                        />
                      </th>
                      <th className='px-3 py-3'></th>
                      <th className='px-3 py-3 text-right'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.data.map(user => (
                      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={user.id}>
                        <td className='px-2 py-2'>{user.id}</td>
                        <td className='px-2 py-2'>
                            {user.name}
                        </td>
                        <td className='px-2 py-2'>
                            {user.email}
                        </td>
                        <td className='px-2 py-2'>{user.created_at}</td>
                        <td className='px-2 py-2'>
                          <Link href={route('user.edit', user.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                            Edit
                          </Link>
                          <button onClick={(e) => deleteUser(user)} className='font-medium text-red-6OO dark:text-red-500 hover:underline mx-1'> Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table></div>
              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Index
