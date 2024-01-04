'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  signOut,
  useSession,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';
const Navigation = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const [toggleDropDown, setToggleDropDown] = useState<boolean>(false);

  useEffect(() => {
    const installProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    installProviders();
  }, []);

  return (
    <nav className='flex-between mb-16 w-full pt-3'>
      <Link href='/' className='flex-center flex gap-2'>
        <Image
          width={150}
          height={150}
          className='object-contain'
          src='/assets/images/logo.svg'
          alt='logo'
        />
      </Link>
      <div className='hidden sm:flex'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-post' className='black_btn'>
              Create Post
            </Link>
            <button type='button' className='outline_btn' onClick={signOut}>
              Sign Out
            </button>
            <Link href='/profile'>
              <Image
                width={37}
                height={37}
                className='rounded-full'
                src={
                  session?.user
                    ? session?.user.image
                    : '/assets/images/user.svg'
                }
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  onClick={() => signIn(provider.id)}
                  key={provider.name}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      <div className='relative flex sm:hidden'>
        <Image
          width={37}
          height={37}
          className='rounded-full'
          src='/assets/icons/menu.svg'
          alt='burger-menu'
          onClick={setToggleDropDown.bind(this, !toggleDropDown)}
        />
        {toggleDropDown && (
          <div className='dropdown'>
            {session?.user ? (
              <>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={setToggleDropDown.bind(this, false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-post'
                  className='dropdown_link'
                  onClick={setToggleDropDown.bind(this, false)}
                >
                  Create Post
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className='black_btn mt-5 w-full'
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      type='button'
                      onClick={() => signIn(provider.id)}
                      key={provider.name}
                      className='black_btn'
                    >
                      Sign In
                    </button>
                  ))}
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
