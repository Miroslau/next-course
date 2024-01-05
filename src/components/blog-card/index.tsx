import React, { FC, useState } from 'react';
import { IPost } from '@/models/post.interface';
import Image from 'next/image';

interface BlogCardProps {
  post: IPost;
  handleTagClick: (args?: any) => void;
}

const BlogCard: FC<BlogCardProps> = ({ post, handleTagClick }) => {
  const [copied, setCopied] = useState<string>('');

  const handleCopy = () => {
    setCopied(post.description);
    navigator.clipboard.writeText(post.description);
    setTimeout(() => setCopied(''), 3000);
  };

  return (
    <div className='prompt_card'>
      <div className='flex items-start justify-between gap-5'>
        <div className='flex flex-1 cursor-pointer items-center justify-start gap-3'>
          <Image
            width={40}
            height={40}
            className='rounded-full object-contain'
            src={post?.user?.image}
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post?.user?.name}
            </h3>
            <p className='font-inter text-sm text-gray-900'>
              {post?.user?.email}
            </p>
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            width={12}
            height={12}
            src={
              copied === post.description
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            alt={copied === post.description ? 'tick_icon' : 'copy_icon'}
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>
        {post.description}
      </p>
      <p
        className='blue_gradient cursor-pointer font-inter text-sm'
        onClick={handleTagClick && handleTagClick.bind(this, post.tag)}
      >
        #{post.tag}
      </p>
    </div>
  );
};

export default BlogCard;
