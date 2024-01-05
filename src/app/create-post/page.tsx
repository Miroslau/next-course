'use client';
import React, { useCallback, useEffect, useState } from 'react';

import Form from '@/components/form';
import { IPost } from '@/models/post.interface';
import { postForm } from '@/constants/postForm';

const CreatePost = () => {
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [post, setPost] = useState<IPost>({
    tag: '',
    description: '',
    date: '',
  });

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

  useEffect(() => {
    console.log('post: ', post);
  }, [post]);

  const createPost = async (event: React.SyntheticEvent) => {};

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
