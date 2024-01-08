import React, { FC } from 'react';
import { IPost } from '@/models/post.interface';
import BlogCard from '@/components/blog-card';

interface PostList {
  posts: IPost[] | any;
  handleTagClick: (args?: any) => void;
}

const Index: FC<PostList> = ({ posts, handleTagClick }) => {
  return (
    <div className='prompt_layout mt-16'>
      {posts.map((post: IPost) => (
        <BlogCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

export default Index;
