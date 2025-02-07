'use client';

import { ReactNode, useEffect, useState } from 'react';

type BaseLayoutProps = {
  children: ReactNode;
};

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 Y좌표가 80px을 넘어가면 scrolled 상태 활성화
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-b'>
      {/* 헤더 영역 */}
      <header
        className={`fixed top-0 left-0 w-full px-4 z-50 flex justify-between items-center transition-all duration-300 border-b
          ${scrolled ? 'backdrop-blur-md py-2' : 'py-4'}`}
      >
        <h1 className='text-xl font-semibold tracking-wide text-gray-400'>
          test
        </h1>
        <nav className='flex gap-6'>
          <a href='#' className=' hover:text-white transition'>
            no
          </a>
        </nav>
      </header>

      {/* 콘텐츠 영역 */}
      <main className='flex justify-center items-center pt-20 p-6'>
        {children}
      </main>
    </div>
  );
};
