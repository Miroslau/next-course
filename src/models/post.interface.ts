export interface IPost {
  id?: string;
  tag: string;
  description: string;
  date?: Date;
  image: File | null;
  user?: IUser;
}
