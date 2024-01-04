import React from 'react';
import '../styles/globals.css';
import Navigation from '../components/navigation/index';
import Provider from '../components/provider/index';

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
        <Provider>
          <div className='main'>
            <div className='gradient'></div>
          </div>

          <main className='app'>
            <Navigation />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
