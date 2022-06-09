import { ActionFunction, json } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { ValidatePost } from '~/services/validation';
import { PostForm } from '~/components/PostForm';

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
  console.log('Call DB create method');
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
          <PostForm
            action="/?index"
            error={formData?.error}
            fields={formData?.fields}
          />
        </div>
      </div>
    </div>
  );
}
