
import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon } from './Icons';

export const Header = ({ setPage, page }: { setPage: (page: { name: string }) => void; page: { name: string }; }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const navLinks = ["About", "Services", "Case Studies", "Blog"];
    
    const handleNavClick = (pageName: string) => {
        setPage({ name: pageName });
        setIsMobileMenuOpen(false);
    };


    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-dark/80 backdrop-blur-sm shadow-lg' : 'bg-brand-dark'}`}>
                <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-[1440px]">
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('Home'); }} className="block focus:outline-none" aria-label="Mangena Attorneys Home">
                        <img src="https://i.postimg.cc/gjQPB7K8/MANGENA-ATTORNEYS-LOGO-FULL-LOGO-GOLD.png" alt="Mangena Attorneys Logo" className="h-12 w-auto" />
                    </a>
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => {
                            const pageName = link.replace(' ', '');
                            const isActive = page.name === pageName || (page.name.startsWith(pageName.slice(0, -1)) && page.name.endsWith('Detail'));
                            return (
                                <a
                                    key={link}
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); handleNavClick(pageName); }}
                                    className={`nav-link-underline transition-colors duration-300 tracking-wide ${isActive ? 'text-brand-blue' : 'text-brand-light hover:text-brand-light'}`}
                                >
                                    {link}
                                </a>
                            );
                        })}
                    </nav>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('Contact'); }} className="hidden md:inline-block bg-brand-blue text-brand-dark font-bold py-2 px-6 hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105">
                        Contact Us
                    </a>
                    <button className="md:hidden text-brand-light focus:outline-none z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                         {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Panel */}
            <div className={`fixed inset-0 bg-brand-dark z-40 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                 <div className="flex flex-col items-center justify-center h-full pt-20">
                    <nav className="flex flex-col items-center space-y-8">
                         {navLinks.map(link => {
                            const pageName = link.replace(' ', '');
                             const isActive = page.name === pageName || (page.name.startsWith(pageName.slice(0, -1)) && page.name.endsWith('Detail'));
                            return (
                                <a
                                    key={link}
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); handleNavClick(pageName); }}
                                    className={`text-2xl transition-colors duration-300 ${isActive ? 'text-brand-blue' : 'text-brand-light hover:text-brand-blue'}`}
                                >
                                    {link}
                                </a>
                            );
                        })}
                    </nav>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('Contact'); }} className="mt-12 bg-brand-blue text-brand-light font-bold py-3 px-8 hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105">
                        Contact Us
                    </a>
                </div>
            </div>
        </>
    );
};
