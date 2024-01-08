'use client';
import React, { useEffect, useState } from 'react';
import PostList from '@/components/post-list';
import { IPost } from '@/models/post.interface';
import PaginationControl from '@/components/pagination-control';

const itemsPerPage = 5;

const Feed = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [posts, setPosts] = useState<IPost[]>([]);
  const [searchedResults, setSearchedResults] = useState<IPost[]>([]);
  const [searchTimeOut, setSearchTimeOut] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPosts, setCurrentPosts] = useState<IPost[]>([]);

  const fetchPosts = async () => {
    const resp = await fetch('/api/post');
    const { response } = await resp.json();

    setPosts(response);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const newCurrentItems = posts.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentPosts(newCurrentItems);
  }, [posts, itemsPerPage, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filterPosts = (text: string) => {
    const regex = new RegExp(text, 'i');
    return posts.filter(
      (item) =>
        // @ts-ignore
        regex.test(item.user?.name) ||
        regex.test(item.tag) ||
        regex.test(item.description)
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeOut);
    setSearchText(event.target.value);

    setSearchTimeOut(
      setTimeout(() => {
        const searchResult = filterPosts(event.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);
    const searchResult = filterPosts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='flex-center relative w-full'>
        <input
          type='text'
          placeholder='Look for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      {searchText ? (
        <PostList posts={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <PostList posts={currentPosts} handleTagClick={handleTagClick} />
      )}
      {(searchedResults.length > 0 || posts.length > 0) && (
        <PaginationControl
          itemsPerPage={itemsPerPage}
          data={searchText ? searchedResults : posts}
          handlePageChange={handlePageChange}
        />
      )}
    </section>
  );
};

export default Feed;
