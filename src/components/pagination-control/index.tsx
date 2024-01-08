import React, { FC } from 'react';

interface PaginationControlsPage {
  itemsPerPage: number;
  data: any[];
  handlePageChange: (...args: any) => void;
}

const Index: FC<PaginationControlsPage> = ({
  itemsPerPage,
  data,
  handlePageChange,
}) => {
  const totalPage = Math.ceil(data.length / itemsPerPage);

  return (
    <div className='mx-auto max-w-full rounded-lg bg-white p-6 shadow-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl'>
      <div className='flex justify-center'>
        <nav className='flex space-x-2' aria-label='Pagination'>
          {Array.from({ length: totalPage }, (_, index) => (
            <span
              key={index}
              onClick={handlePageChange.bind(this, index + 1)}
              className='focus:shadow-outline-blue relative inline-flex cursor-pointer items-center rounded-md border border-fuchsia-100 bg-white px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-fuchsia-200 focus:z-10 focus:border-blue-300 focus:outline-none'
            >
              {index + 1}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Index;
