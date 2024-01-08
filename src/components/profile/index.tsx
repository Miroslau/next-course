import React, { FC } from 'react';
import { IPost } from '@/models/post.interface';
import BlogCard from '@/components/blog-card';

interface ProfileProps<A> {
  name: string;
  description: string;
  data: A[];
  handleEdit?: (args?: void) => void;
  handleDelete?: (post: IPost) => void;
}

const Profile: FC<ProfileProps<IPost>> = ({
  name,
  description,
  data,
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='green_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{description}</p>
      <div className='prompt_layout mt-10'>
        {data.map((item) => (
          <BlogCard
            post={item}
            key={item.id}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
