import React, { FC } from 'react';
import { IInput } from '@/models/input.interface';
import TextInput from '@/components/form/text-input';
import Link from 'next/link';
import TextareaInput from '@/components/form/textarea-input';
import FileInput from '@/components/form/file-input';
interface FormProps<A> {
  type: string;
  model: A;
  handleSubmit: (args?: any) => void;
  handleChange: (args?: any) => void;
  inputUpload: (args?: any) => void;
  submiting: boolean;
  inputs: IInput[];
}

const DynamicComponent = (input: IInput): React.FC | React.Component | any => {
  const type = input.type || '';
  switch (type) {
    case 'text':
      return TextInput;
    case 'textarea':
      return TextareaInput;
    case 'file':
      return FileInput;
    default:
      return TextInput;
  }
};

const Form: FC<FormProps<any>> = ({
  type,
  model,
  handleSubmit,
  submiting,
  inputs,
  handleChange,
  inputUpload,
}) => {
  return (
    <section className='flex-start w-full max-w-full flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc max-w-md text-left'>
        {type} and share amazing advice with our team, and let your imagination
        run wild with any technologies which you know!
      </p>
      <form
        onSubmit={handleSubmit}
        className='glassmorphism mt-10 flex w-full max-w-2xl flex-col gap-7'
      >
        {inputs.map((input) => {
          const Component = DynamicComponent(input);
          return (
            <Component
              key={input.id}
              id={input.id}
              value={model[`${input.model}`]}
              name={input.model}
              type={input.type}
              variant={input.variant}
              required={input.required}
              inputText={handleChange}
              inputUpload={inputUpload}
              label={input.title}
              placeholder={input.placeholder}
              autocomplete={input.autocomplete}
            />
          );
        })}
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-sm text-gray-500'>
            Cancel
          </Link>
          <button
            type='submit'
            disabled={submiting}
            className='rounded-full bg-primary-orange px-5 py-1.5 text-sm text-white'
          >
            {submiting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
