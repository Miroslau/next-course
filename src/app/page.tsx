import Image from 'next/image';

export default function Home() {
  return (
    <section className='flex-center w-full flex-col'>
      <h1 className='head_text text-center'>
        <span className='text-center'>Viron</span>
        <span className='green_gradient text-center'>IT</span>
        <span className='text-center'>&nbsp;Blog</span>
      </h1>
      <p className='desc text-center'>
        VironIT Blogs allow you to open new possibilities and improve your soft
        and hard skills reading good advices from our colleagues! Create and
        share creative advices!
      </p>
      {/* Feed */}
    </section>
  );
}
