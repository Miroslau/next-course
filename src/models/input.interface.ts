export interface IInput {
  id: number;
  title: string;
  model: string;
  required?: boolean;
  placeholder?: string;
  type: string;
  variant?: string;
  autocomplete: string;
}
