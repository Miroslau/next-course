import React from 'react';
import '../styles/globals.css';

export const metadata = {
  title: 'VironIT Blog',
  description: 'Discover & Share AI Prompts',
};

interface Props {
  children: React.ReactNode;
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <div className='main'>
          <div className='gradient'></div>
        </div>

        <main className='app'>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
