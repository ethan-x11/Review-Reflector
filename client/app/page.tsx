
'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar'
import Homepage from '@/app/components/Homepage'
import About from '@/app/components/About'
import ThemeSwitchButton from '@/app/components/ThemeSwitchButton';
import Footer from '@/app/components/Footer';
import WhatsappButton from '@/app/components/WhatsappButton';

const styles = {
  main: '',
  // main: 'min-h-screen hidden md:block',
  screen: 'hidden md:hidden h-screen w-screen text-black justify-center items-center flex',
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('homepage');

  const handleNavClick = (sectionName: string) => {
    setActiveSection(sectionName);
    window.scrollTo(0, 0);
  }
  
  const renderSection = () => {
    switch (activeSection) {
      case 'homepage':
        return <Homepage />;
      case 'about':
        return <About />;
      default:
        return <Homepage />;
    }
  }

  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
  <>
  <div className={styles.screen} >View from Desktop Browser</div>
    <main className={styles.main}>
      <Navbar onNavClick={handleNavClick} />
      {renderSection()}
      <Footer />
      <ThemeSwitchButton />
      <WhatsappButton phoneNumber="917003626799" />
    </main>
    </>
  )
}
