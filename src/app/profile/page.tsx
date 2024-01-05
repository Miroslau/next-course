'use client';
import React, { useEffect, useState } from 'react';

import Profile from '@/components/profile';
import { IPost } from '@/models/post.interface';
import { useSession } from 'next-auth/react';
import { aws4 } from 'mongodb/src/deps';

const MyProfile = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const { data: session } = useSession();

  const handleEdit = () => {};

  const handleDelete = async (post: IPost) => {
    console.log('post: ', post);
    const hasConfirmed = confirm(
      'Are you shure you want to delete this post ?'
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/post/${post.id?.toString()}`, {
          method: 'DELETE',
        });

        const filteredPosts = posts.filter((item) => item.id !== post.id);

        setPosts(filteredPosts);
      } catch (error) {}
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      // @ts-ignore
      const resp = await fetch(`/api/users/${session?.user['id']}/posts`);
      const { response } = await resp.json();

      setPosts(response);
    };

    // @ts-ignore
    if (session?.user['id']) fetchPosts();
  }, []);

  return (
    <Profile
      name='My'
      description='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
