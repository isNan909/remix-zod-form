import { ActionFunction, json } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { ValidatePost } from '~/services/validation';

type ActionData = {
  error: {
    formError: string[] | null;
    fieldErrors: {
      name?: string[] | null;
      email?: string[] | null;
      confirmEmail?: string[] | null;
      expertise?: string[] | null;
      url?: string[] | null;
      description?: string[] | null;
      availability?: string[] | null;
    };
  };
  fields: {
    name: string;
    email: string;
    confirmEmail: string;
    expertise: string;
    url: string;
    description: string;
    availability: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get('name');
  const email = form.get('email');
  const confirmEmail = form.get('confirmEmail');
  const expertise = form.get('expertise');
  const url = form.get('url');
  const availability = form.get('availability');
  const description = form.get('description');
  const result = ValidatePost.safeParse({
    name,
    email,
    confirmEmail,
    expertise,
    url,
    availability,
    description,
  });

  if (!result.success) {
    return json(
      {
        error: result.error.flatten(),
        fields: {
          name,
          email,
          confirmEmail,
          expertise,
          url,
          availability,
          description,
        },
      },
      {
        status: 400,
      }
    );
  }
  console.log('success API call:' + result?.data?.name);
  return {} as any;
};

export default function Index() {
  const formData = useActionData<ActionData>();
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
                  defaultValue={formData?.fields?.name}
                  key={formData?.fields?.name}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder=""
                />

                {formData?.error?.fieldErrors?.name && (
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
                  defaultValue={formData?.fields?.email}
                  key={formData?.fields?.email}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder=""
                />
                <span className="text-sm text-red-500">
                  {formData?.error?.fieldErrors?.email}
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
                  defaultValue={formData?.fields?.confirmEmail}
                  key={formData?.fields?.confirmEmail}
                />
              </div>
              <span className="text-sm text-red-500">
                {formData?.error?.fieldErrors?.confirmEmail}
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
                  defaultValue={formData?.fields?.expertise}
                  key={formData?.fields?.expertise}
                >
                  <option></option>
                  <option>Product Designer</option>
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Fullstack Developer</option>
                </select>
              </div>

              {formData?.error?.fieldErrors?.expertise && (
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
                  defaultValue={formData?.fields?.url}
                  key={formData?.fields?.url}
                />
              </div>
              <span className="text-sm text-red-500">
                {formData?.error?.fieldErrors?.url}
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
                  defaultValue={formData?.fields?.availability}
                  key={formData?.fields?.availability}
                >
                  <option></option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Freelance</option>
                </select>
              </div>

              {formData?.error?.fieldErrors?.availability && (
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
                  defaultValue={formData?.fields?.description}
                  key={formData?.fields?.description}
                />
              </div>
              <span className="text-sm text-red-500">
                {formData?.error?.fieldErrors?.description}
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
