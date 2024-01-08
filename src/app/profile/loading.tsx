import React from 'react';
import Image from 'next/image';
const Loading = () => {
  return (
    <div className='flex-center w-full'>
      <Image
        width={50}
        height={50}
        src='assets/icons/loader.svg'
        alt='loader'
        className='object-contain'
      />
    </div>
  );
};

export default Loading;
