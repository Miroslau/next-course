import { IInput } from '@/models/input.interface';

export const postForm: IInput[] = [
  {
    id: 1,
    title: 'Your Post',
    model: 'description',
    placeholder: 'Write your post here',
    required: true,
    variant: 'outline',
    type: 'textarea',
    autocomplete: 'off',
  },
  {
    id: 2,
    title: 'Field of Prompt',
    model: 'tag',
    placeholder: '#Tag',
    required: true,
    variant: 'outline',
    type: 'text',
    autocomplete: 'off',
  },
  {
    id: 3,
    title: 'Click in ths area',
    model: 'image',
    placeholder: 'image',
    required: true,
    variant: '',
    type: 'file',
    autocomplete: 'off',
  },
];
