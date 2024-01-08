'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { IPost } from '@/models/post.interface';
import Image from 'next/image';

interface Post {
  id: number;
  tag: string;
  description: string;
  image: string;
  date: Date;
  user: IUser;
}

const Page = () => {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const resp = await fetch(`/api/post/${params?.id}`, {
        method: 'GET',
      });
      const { response } = await resp.json();

      setPost(response);
    };

    if (params.id) {
      fetchPost();
    }
  }, [params?.id]);

  return (
    <section className='mx-auto max-w-screen-lg'>
      <div className='relative mx-auto mb-4 w-full md:mb-0'>
        <h2 className='text-4xl font-semibold leading-tight text-gray-800'>
          Pellentesque a consectetur velit, ac molestie ipsum. Donec sodales,
          massa et auctor.
        </h2>
        <span className='green_gradient mb-2 inline-flex items-center justify-center py-2'>
          {post?.tag}
        </span>
        {post && post.image && (
          <Image
            width={0}
            height={0}
            src={post?.image}
            alt='image'
            sizes='100vw'
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        )}
      </div>
      <div className='flex flex-col lg:flex-row lg:space-x-12'>
        <div className='mt-12 w-full px-4 text-lg leading-relaxed text-gray-700 lg:w-3/4 lg:px-0'>
          <p className='pb-6'>{post?.description}</p>
        </div>
        <div className='m-auto mt-12 w-full max-w-screen-sm lg:w-1/4'>
          <div className='border-b border-t p-4 md:rounded md:border'>
            <div className='flex py-2'>
              {post && post.user && post.user.image && post.user.image && (
                <>
                  <img
                    className='mr-2 h-10 w-10 rounded-full object-cover'
                    src={post.user.image}
                  />
                  <div>
                    <p className='text-sm font-semibold text-gray-700'>
                      {post.user.name}
                    </p>
                    <p className='text-xs font-semibold text-gray-600'>
                      Editor
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
