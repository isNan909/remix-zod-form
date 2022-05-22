import { ActionFunction } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { z } from 'zod';

export const action: ActionFunction = async ({ request }) => {
  const formPayload = Object.fromEntries(await request.formData());

  const validationSchema = z
    .object({
      name: z.string().min(3),
      email: z.string().email(),
      confirmEmail: z.string().email(),
      expertise: z.enum([
        'Product Designer',
        'Frontend Developer',
        'Backend Developer',
        'Fullstack Developer',
      ]),
      url: z.string().url().optional(),
      availability: z.enum(['Full-time', 'Part-time', 'Contract', 'Freelance']),
      description: z.string().nullable(),
    })
    .refine((data) => data.email === data.confirmEmail, {
      message: 'Email and confirmEmail should be same email',
      path: ['confirmEmail'],
    });

  try {
    const validatedSchema = validationSchema.parse(formPayload);
    console.log('Form data is valid for submission:', validatedSchema); //API call can be made here
  } catch (error) {
    return {
      formPayload,
      error,
    };
  }
  return {} as any;
};

export default function Index() {
  const actionData = useActionData();
  return (
    <div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Remix Form Validation with Zod
            </h2>
          </div>
          <Form method="post" noValidate={true}>
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
                  defaultValue={actionData?.formPayload?.name}
                  key={actionData?.formPayload?.name}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder=""
                />
                <span className="text-sm text-red-500">
                  {actionData?.error?.issues[0]?.message}
                </span>
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
                  defaultValue={actionData?.formPayload?.email}
                  key={actionData?.formPayload?.email}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder=""
                />
                <span className="text-sm text-red-500">
                  {actionData?.error?.issues[1]?.message}
                </span>
              </div>
            </div>

            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-6">
                <label
                  htmlFor="omfirm Email"
                  className="block text-sm font-medium text-gray-700 pb-2"
                >
                  Comfirm Email
                </label>
                <input
                  name="confirmEmail"
                  type="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder=""
                />
              </div>
              <span className="text-sm text-red-500">
                {actionData?.error?.issues[2]?.message}
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
                >
                  <option></option>
                  <option>Product Designer</option>
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Fullstack Developer</option>
                </select>
              </div>
              <span className="text-sm text-red-500">
                {actionData?.error?.issues[3]?.message}
              </span>
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
                />
              </div>
              <span className="text-sm text-red-500">
                {actionData?.error?.issues[4]?.message}
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
                >
                  <option></option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Freelance</option>
                </select>
              </div>
              <span className="text-sm text-red-500">
                {actionData?.error?.issues[5]?.message}
              </span>
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
                />
              </div>
              <span className="text-sm text-red-500">
                {actionData?.error?.issues[6]?.message}
              </span>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
