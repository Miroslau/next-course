'use client';
import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { IPost } from '@/models/post.interface';
import Profile from '@/components/profile';

interface ProfileId {
  params: any;
}

const Page: FC<ProfileId> = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get('name') as string;

  const [userPosts, setUserPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      // @ts-ignore
      const resp = await fetch(`/api/users/${params?.id}/posts`);
      const { response } = await resp.json();

      setUserPosts(response);
    };

    if (params.id) {
      fetchPosts();
    }
  }, [params?.id]);

  return (
    <Profile
      name={userName}
      description={`Welcome to ${userName}'s personalized page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination!`}
      data={userPosts}
    />
  );
};

export default Page;
