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
];
