import type { Props } from './types';
import { Form, useTransition } from '@remix-run/react';

export default function PostForm({ error, fields }: Props) {
  const transition = useTransition();
  return (
    <>
      <Form noValidate={true} method="post">
        <div className="rounded-md shadow-sm -space-y-px">
          <div className="mb-6">
            <label
              htmlFor="company-website"
              className="block text-sm font-medium text-gray-700 pb-2"
            >
              Full name
            </label>
            <input
              name="name"
              type="text"
              defaultValue={fields?.name}
              key={fields?.name}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder=""
            />

            {error?.fieldErrors?.name && (
              <>
                <span className="text-sm text-red-500">
                  Your name must be at least 3 characters long.
                </span>
              </>
            )}
          </div>
        </div>

        <div className="rounded-md shadow-sm -space-y-px">
          <div className="mb-6">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700 pb-2"
            >
              Email
            </label>
            <input
              name="email"
              type="text"
              defaultValue={fields?.email}
              key={fields?.email}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder=""
            />
            <span className="text-sm text-red-500">
              {error?.fieldErrors?.email}
            </span>
          </div>
        </div>

        <div className="rounded-md shadow-sm -space-y-px">
          <div className="mb-6">
            <label
              htmlFor="Confirm Email"
              className="block text-sm font-medium text-gray-700 pb-2"
            >
              Comfirm Email
            </label>
            <input
              name="confirmEmail"
              type="email"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder=""
              defaultValue={fields?.confirmEmail}
              key={fields?.confirmEmail}
            />
          </div>
          <span className="text-sm text-red-500">
            {error?.fieldErrors?.confirmEmail}
          </span>
        </div>

        <div className="rounded-md shadow-sm -space-y-px">
          <div className="mb-6">
            <label
              htmlFor="Expertise"
              className="block text-sm font-medium text-gray-700"
            >
              Expertise
            </label>
            <select
              name="expertise"
              className="mt-1 block w-full py-2 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              defaultValue={fields?.expertise}
              key={fields?.expertise}
            >
              <option></option>
              <option>Product Designer</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Fullstack Developer</option>
            </select>
          </div>

          {error?.fieldErrors?.expertise && (
            <>
              <span className="text-sm text-red-500">
                You must select a expertise
              </span>
            </>
          )}
        </div>

        <div className="rounded-md shadow-sm -space-y-px">
          <div className="mb-6">
            <label
              htmlFor="company-website"
              className="block text-sm font-medium text-gray-700 pb-2"
            >
              Github URL
            </label>
            <input
              name="url"
              type="text"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder=""
              defaultValue={fields?.url}
              key={fields?.url}
            />
          </div>
          <span className="text-sm text-red-500">
            {error?.fieldErrors?.url}
          </span>
        </div>

        <div className="rounded-md shadow-sm -space-y-px">
          <div className="mb-6">
            <label
              htmlFor="company-website"
              className="block text-sm font-medium text-gray-700"
            >
              Currently Available
            </label>
            <select
              name="availability"
              className="mt-1 block w-full py-2 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              defaultValue={fields?.availability}
              key={fields?.availability}
            >
              <option></option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Freelance</option>
            </select>
          </div>

          {error?.fieldErrors?.availability && (
            <>
              <span className="text-sm text-red-500">
                You must select an availability
              </span>
            </>
          )}
        </div>

        <div className="rounded-md shadow-sm -space-y-px">
          <div className="mb-6">
            <label
              htmlFor="company-website"
              className="block text-sm font-medium text-gray-700 pb-2"
            >
              Description
            </label>
            <textarea
              name="description"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder=""
              defaultValue={fields?.description}
              key={fields?.description}
            />
          </div>
          <span className="text-sm text-red-500">
            {error?.fieldErrors?.description}
          </span>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {transition.state === 'submitting'
              ? 'Submitting...'
              : 'Submit Form'}
          </button>
        </div>
      </Form>
    </>
  );
}
