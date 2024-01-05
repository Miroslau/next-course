'use client';
import React, { useCallback, useEffect, useState } from 'react';

import Form from '@/components/form';
import { IPost } from '@/models/post.interface';
import { postForm } from '@/constants/postForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const CreatePost = () => {
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [post, setPost] = useState<IPost>({
    tag: '',
    description: '',
  });
  const { data: session } = useSession();
  const router = useRouter();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { name, value } = event.target;
      setPost({
        ...post,
        [name]: value,
      });
    },
    [post]
  );

  const createPost = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setSubmiting(true);
    try {
      const response = await fetch('/api/post/add-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: post.description,
          tag: post.tag,
          // @ts-ignore
          userId: session?.user['id'],
        }),
      });
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('the post has not been create: ', error);
    } finally {
      setSubmiting(false);
    }
  };

  return (
    <Form
      type='Create'
      model={post}
      submiting={submiting}
      handleChange={handleChange}
      handleSubmit={createPost}
      inputs={postForm}
    />
  );
};

export default CreatePost;
