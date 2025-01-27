import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ project }) {
  const { data, setData, post, errors, reset } = useForm({
    image: '',
    name: project.name || '',
    status: project.status || '',
    description: project.description || '',
    due_date: project.due_date || '',
    _method: 'PUT',
  })

  const onSubmit = (e) => {
    e.preventDefault()

    post(route('project.update', project.id))
  }
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Edit project "{project.name}"
        </h2>
      }
    >
      <Head title="Create" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <div>
                {project.image_path && (<div className="mb-4">
                  <img src={project.image_path} alt="Image" className="w-64"/>
                </div>)}
                <InputLabel
                  htmlFor="project_image_path"
                  value='Project Image' />
                <TextInput
                  id="project_image_path"
                  type="file"
                  name="image"
                  className='mt-1 w-full block'
                  onChange={e => setData('image', e.target.files[0])} />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_name"
                  value='Project Name' />
                <TextInput
                  id="project_name"
                  type="text"
                  name="name"
                  value={data.name}
                  isFocused={true}
                  className='mt-1 w-full block'
                  onChange={e => setData('name', e.target.value)} />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_description"
                  value='Project Description' />
                <TextAreaInput
                  id="project_description"
                  type="text"
                  name="description"
                  value={data.description}
                  className='mt-1 w-full block'
                  onChange={e => setData('description', e.target.value)} />
                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_due_date"
                  value='Project Deadline' />
                <TextInput
                  id="project_due_date"
                  type="date"
                  name="due_date"
                  className='mt-1 w-full block'
                  value={data.due_date}
                  onChange={e => setData('due_date', e.target.value)} />
                <InputError message={errors.due_date} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_status"
                  value='Project Status' />
                <SelectInput
                  id="project_status"
                  name="status"
                  className='mt-1 w-full block'
                  value={data.status}
                  onChange={e => setData('status', e.target.value)}>
                  <option value=''>Select Status</option>
                  <option value='pending'>Pending</option>
                  <option value='in_progress'>In progress</option>
                  <option value='completed'>Completed</option>
                </SelectInput>
                <InputError message={errors.status} className="mt-2" />
              </div>
              <div className="mt-7 flex justify-between">
                <Link className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transitio-all hover:bg-gray-300 mr-2" href={route('project.index')}>
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
