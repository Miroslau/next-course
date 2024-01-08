import React, { FC, useState } from 'react';
import { IPost } from '@/models/post.interface';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

interface BlogCardProps {
  post: IPost;
  handleTagClick?: (args?: any) => void;
  handleEdit?: (args?: void) => void;
  handleDelete?: (post: IPost) => void;
}

const BlogCard: FC<BlogCardProps> = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  const [copied, setCopied] = useState<string>('');
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.description);
    navigator.clipboard.writeText(post.description);
    setTimeout(() => setCopied(''), 3000);
  };

  const handleProfileClick = () => {
    if (
      post.user &&
      session &&
      session.user &&
      // @ts-ignore
      post.user.id === session?.user.id
    ) {
      return router.push('/profile');
    }
    if (post && post.user) {
      router.push(`/profile/${post.user.id}?name=${post.user?.name}`);
    }
  };

  const handlePostPage = (post: IPost) => {
    router.push(`/blog-post/${post.id}`);
  };

  return (
    <div className='prompt_card'>
      <div className='flex items-start justify-between gap-5'>
        <div
          className='flex flex-1 cursor-pointer items-center justify-start gap-3'
          onClick={handleProfileClick}
        >
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
      <p
        className='blue_gradient cursor-pointer pt-2 font-inter text-sm'
        onClick={handlePostPage.bind(this, post)}
      >
        Details
      </p>
      {post &&
        post.user &&
        session?.user?.id === post.user.id &&
        pathName === '/profile' && (
          <div className='flex-center border-grey-100 mt-5 gap-4 border-t pt-3'>
            <p className='green_gradient cursor-pointer font-inter text-sm'>
              Edit
            </p>
            <p
              className='orange_gradient cursor-pointer font-inter text-sm'
              onClick={handleDelete && handleDelete.bind(this, post)}
            >
              Delete
            </p>
          </div>
        )}
    </div>
  );
};

export default BlogCard;
