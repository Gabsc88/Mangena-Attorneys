
import React, { useState } from 'react';
import {
    FacebookIcon,
    TwitterIcon,
    LinkedInIcon,
    InstagramIcon,
    ChevronDownIcon,
} from './Icons';

export const Footer = ({ setPage }: { setPage: (page: { name: string }) => void }) => {
    const [openSection, setOpenSection] = useState<string | null>('Quick Links');

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    const footerSections = [
        {
            title: 'Quick Links',
            links: [
                { name: 'Home', page: 'Home' },
                { name: 'About Us', page: 'About' },
                { name: 'Frequently Asked', page: 'Contact' },
            ]
        },
        {
            title: 'Services',
            links: [
                { name: 'Criminal Defense', page: 'Services' },
                { name: 'Corporate Law', page: 'Services' },
                { name: 'Family Law', page: 'Services' },
                { name: 'Civil Litigation', page: 'Services' },
                { name: 'Real Estate Law', page: 'Services' },
                { name: 'Intellectual Property', page: 'Services' },
            ]
        },
        {
            title: 'Explore',
            links: [
                { name: 'Case Studies', page: 'CaseStudies' },
                { name: 'Blog', page: 'Blog' },
                { name: 'Careers', page: 'Careers' },
            ]
        },
        {
            title: 'Contact',
            content: [
                '16 Van Eck Str, The Orchards Ext11, Pretoria',
                'admin@mangenaattorneys.co.za',
                '076 639 9693 | 086 556 4917'
            ]
        }
    ];

    const socialLinks = [
        { icon: <FacebookIcon className="w-5 h-5" />, href: "#" },
        { icon: <TwitterIcon className="w-5 h-5" />, href: "#" },
        { icon: <LinkedInIcon className="w-5 h-5" />, href: "#" },
        { icon: <InstagramIcon className="w-5 h-5" />, href: "#" },
    ];

    return (
        <footer className="bg-brand-blue text-brand-dark pt-20 pb-8">
            <div className="container mx-auto px-6 max-w-[1440px]">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src="https://i.postimg.cc/g05NCPh9/ICONMARK-NAVY.png" alt="Mangena Attorneys Logo" className="h-20 w-auto" />
                </div>
                
                <p className="text-center text-brand-dark max-w-3xl mx-auto mb-16 text-md leading-relaxed opacity-80">
                    Dedicated to providing exceptional legal services with integrity and a client-focused approach. We navigate complex legal challenges to achieve the best possible outcomes for you.
                </p>


                {/* Footer Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-20 text-center border-b border-brand-dark pb-12">
                    {footerSections.map((section) => (
                        <div key={section.title} className="w-full">
                            <button
                                className="w-full flex items-center justify-center text-xl font-serif font-bold text-brand-dark focus:outline-none"
                                onClick={() => toggleSection(section.title)}
                                aria-expanded={openSection === section.title}
                                aria-controls={`footer-section-${section.title.replace(' ', '')}`}
                            >
                                <span>{section.title}</span>
                                <ChevronDownIcon
                                    className={`w-5 h-5 text-brand-dark ml-2 transform transition-transform duration-300 flex-shrink-0 ${
                                        openSection === section.title ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            <div
                                id={`footer-section-${section.title.replace(' ', '')}`}
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                    openSection === section.title ? 'max-h-96 mt-6' : 'max-h-0'
                                }`}
                            >
                                <ul className="space-y-3">
                                    {section.links?.map((link) => (
                                        <li key={link.name}>
                                            <a
                                                href="#"
                                                onClick={(e) => { e.preventDefault(); setPage({ name: link.page }); }}
                                                className="text-brand-dark hover:opacity-70 transition-opacity duration-300 text-sm"
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                    {section.content?.map((item, index) => (
                                         <li key={index}>
                                            <p className="text-brand-dark text-sm opacity-80">{item}</p>
                                         </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Sub-footer */}
                <div className="pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                    <p className="text-brand-dark text-sm order-2 sm:order-1 mt-4 sm:mt-0 opacity-70">
                        &copy; {new Date().getFullYear()} Mangena Attorneys.
                    </p>
                    <div className="flex space-x-4 order-1 sm:order-2">
                        {socialLinks.map((link, index) => (
                            <a key={index} href={link.href} className="text-brand-dark hover:bg-brand-dark hover:text-brand-blue transition-all duration-300 w-10 h-10 border border-brand-dark flex items-center justify-center rounded-full">
                                {link.icon}
                            </a>
                        ))}
                    </div>
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-brand-dark hover:opacity-100 opacity-70 text-sm order-3 transition-opacity">
                        Privacy & Cookie Policy
                    </a>
                </div>
            </div>
        </footer>
    );
};
