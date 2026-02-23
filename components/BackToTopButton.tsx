
import React, { useState, useEffect } from 'react';
import { ChevronUpIcon } from './Icons';

export const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            type="button"
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 p-3 bg-brand-dark text-brand-light shadow-lg hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300 ease-in-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            aria-label="Go to top"
            style={{ visibility: isVisible ? 'visible' : 'hidden' }}
        >
            <ChevronUpIcon className="w-6 h-6" />
        </button>
    );
};