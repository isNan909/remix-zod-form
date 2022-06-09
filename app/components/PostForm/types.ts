import type { ComponentPropsWithoutRef } from 'react'

export type Props = ComponentPropsWithoutRef<'form'> & {
  error?: {
    formError?: string[] | null;
    fieldErrors?: {
      name?: string[] | null;
      email?: string[] | null;
      confirmEmail?: string[] | null;
      expertise?: string[] | null;
      url?: string[] | null;
      description?: string[] | null;
      availability?: string[] | null;
    };
  };
  fields?: {
    name: string;
    email: string;
    confirmEmail: string;
    expertise: string;
    url: string;
    description?: string;
    availability: string;
  };
}