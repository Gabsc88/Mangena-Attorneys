
import React, { useState, useEffect, ReactNode, HTMLAttributes, useRef, CSSProperties } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { ScaleIcon, GavelIcon, BuildingIcon, UsersIcon, RightArrowIcon, PhoneIcon, MapPinIcon, EnvelopeIcon, ChevronDownIcon, TeamArrowLeftIcon, TeamArrowRightIcon, InstagramIcon, LinkedInIcon, FacebookIcon, TwitterIcon, ChevronUpIcon, WhatsAppIcon } from './components/Icons';
import { BackToTopButton } from './components/BackToTopButton';

interface PageState {
  name: string;
  params?: { [key: string]: any };
}

// --- Reusable Animated Section Wrapper ---
interface AnimatedSectionProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className, ...rest }) => {
    const [ref, isInView] = useScrollAnimation<HTMLDivElement>();
    return (
        <div
            ref={ref as any}
            className={`transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className || ''}`}
            {...rest}
        >
            {children}
        </div>
    );
};

interface BreadcrumbPart {
    label: string;
    page?: string;
}

// --- Reusable Page Hero ---
const PageHero = ({ title, subtitle, image, breadcrumbs, setPage }: { title:string, subtitle: string, image?: string, breadcrumbs: BreadcrumbPart[], setPage: (page: PageState) => void }) => (
    <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
        <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${image || `https://picsum.photos/seed/${title.replace(' ', '')}/1920/1080`})` }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-brand-dark/40"></div>
        <div className="relative z-10 text-center px-4">
            <AnimatedSection>
                <h1 className="text-5xl md:text-6xl font-serif font-black text-brand-blue mb-4">{title}</h1>
                <p className="text-xl md:text-2xl text-white font-serif mb-8">{subtitle}</p>
                <div className="text-sm uppercase tracking-wider">
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); setPage({ name: 'Home' }); }}
                        className="text-brand-blue hover:text-white transition-colors font-medium"
                    >
                        Home
                    </a>
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                            <span className="mx-2 text-gray-400">|</span>
                            {crumb.page ? (
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); setPage({ name: crumb.page! }); }}
                                    className="text-brand-blue hover:text-white transition-colors font-medium"
                                >
                                    {crumb.label}
                                </a>
                            ) : (
                                <span className="text-brand-blue font-bold">{crumb.label}</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </AnimatedSection>
        </div>
    </section>
);


// --- HOME PAGE SECTIONS ---

const SLIDE_DURATION = 7000; // 7 seconds

const slides = [
    {
        title: "MANGENA ATTORNEYS",
        subtitle: "Expeditious Legal Services",
        image: "https://i.postimg.cc/pdCMtrZ2/mangena.jpg",
    },
    {
        title: "Dedicated Legal Experts",
        subtitle: "Fighting for Your Rights",
        image: "https://i.postimg.cc/RCp2Rxrd/hero-2.jpg",
    },
    {
        title: "Proven Track Record",
        subtitle: "Results That Matter",
        image: "https://i.postimg.cc/0yD3P6zX/hero-3.jpg",
    },
];

const HeroSection = ({ setPage }: { setPage: (page: PageState) => void }) => {
    const [offsetY, setOffsetY] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const timerRef = useRef<number | null>(null);

    const handleScroll = () => setOffsetY(window.pageYOffset);

    const goToSlide = (slideIndex: number) => {
        setCurrentSlide(slideIndex);
    };

    const resetTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(
            () => setCurrentSlide((prev) => (prev + 1) % slides.length),
            SLIDE_DURATION
        );
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        resetTimer();
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [currentSlide]);

    const activeSlide = slides[currentSlide];
    const circumference = 2 * Math.PI * 20;

    return (
        <section id="home" className="relative h-screen flex items-center justify-center text-brand-blue overflow-hidden">
            {slides.map((slide, index) => (
                 <div
                    key={index}
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
                    style={{
                        backgroundImage: `url(${slide.image})`,
                        transform: `translateY(${offsetY * 0.5}px)`,
                        opacity: index === currentSlide ? 1 : 0,
                    }}
                />
            ))}
           
            <div className="absolute top-0 left-0 w-full h-full bg-brand-dark/50 z-10"></div>
            
            <div className="relative z-20 text-center px-4">
                <div key={currentSlide} className="animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-serif font-black text-brand-blue mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        {activeSlide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-white font-serif mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        {activeSlide.subtitle}
                    </p>
                    <a href="#" onClick={(e) => { e.preventDefault(); setPage({ name: 'Contact' }); }} className="bg-brand-blue text-brand-dark font-bold py-4 px-8 hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        Request Consultation
                    </a>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                {slides.map((_, index) => (
                    <button key={index} onClick={() => goToSlide(index)} className="w-8 h-8 flex items-center justify-center" aria-label={`Go to slide ${index + 1}`}>
                        {currentSlide === index ? (
                            <svg className="w-7 h-7 -rotate-90" viewBox="0 0 44 44">
                                <circle className="text-white/30" stroke="currentColor" strokeWidth="3" fill="transparent" r="20" cx="22" cy="22" />
                                <circle
                                    key={currentSlide}
                                    className="text-brand-blue"
                                    style={{ animation: `progress-ring ${SLIDE_DURATION}ms linear forwards` }}
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={circumference}
                                    strokeLinecap="round"
                                    fill="transparent"
                                    r="20"
                                    cx="22"
                                    cy="22"
                                />
                                <circle className="text-white" fill="currentColor" cx="22" cy="22" r="5" />
                            </svg>
                        ) : (
                            <div className="w-3 h-3 bg-white/40 hover:bg-white transition-colors rounded-full"></div>
                        )}
                    </button>
                ))}
            </div>
        </section>
    );
};

const AboutSummarySection = ({ setPage }: { setPage: (page: PageState) => void }) => (
    <section id="about" className="py-20 md:py-32 bg-white text-brand-dark">
        <div className="container mx-auto px-6 max-w-[1440px]">
            <AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="text-brand-dark font-semibold tracking-widest uppercase mb-4">Who We Are</p>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-light mb-6 leading-tight">
                            Best Solutions for Legal Problems
                        </h2>
                        <p className="text-brand-dark mb-8 leading-relaxed">
                            Mangena Attorneys Inc is a full-service law firm providing reliable legal representation across a wide range of practice areas. We understand that legal challenges are often time-sensitive and emotionally demanding. Our role is to bring order, direction and swift action when it matters most.
                        </p>
                        <button
                            onClick={() => setPage({ name: 'About' })}
                            className="bg-brand-blue text-brand-dark font-bold py-3 px-8 hover:bg-gray-800 transition-all duration-300 flex items-center group transform hover:scale-105"
                        >
                            Learn More
                            <RightArrowIcon className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </div>
                    <div className="relative mt-12 md:mt-0 flex justify-center md:justify-end items-center">
                        <div className="relative w-full max-w-md md:max-w-lg">
                            <div className="relative shadow-2xl aspect-square">
                                <img
                                    src="https://i.postimg.cc/SNHDN7fp/1771414264978.jpg"
                                    alt="Attorney"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                            <div className="absolute left-0 md:-left-20 top-2 bg-brand-blue text-brand-dark p-8 w-1/2 sm:w-3/5 md:w-[150px] shadow-2xl animate-fade-in-up text-center flex flex-col space-y-8" style={{ animationDelay: '200ms' }}>
                                <div>
                                    <p className="text-5xl font-serif font-bold">2018</p>
                                    <p className="text-brand-dark/70 mt-1">Founded</p>
                                </div>
                                <div>
                                    <p className="text-5xl font-serif font-bold">99%</p>
                                    <p className="text-brand-dark/70 mt-1">Satisfaction</p>
                                </div>
                                <div>
                                    <p className="text-5xl font-serif font-bold">70+</p>
                                    <p className="text-brand-dark/70 mt-1">Cases Won</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    </section>
);


const services = [
    { image: "https://i.postimg.cc/XNB4dXVK/criminal-8444883-1280.jpg", title: "Civil & Commercial Litigation", description: "We provide expert representation in legal disputes between individuals and businesses. Our team focuses on protecting your interests while achieving efficient, strategic resolutions." },
    { image: "https://i.postimg.cc/qqyPYhR9/lady-justice-2388500-1280.jpg", title: "Criminal Litigation", description: "Our firm offers a robust defense for individuals facing various criminal charges. We ensure your rights are protected throughout every stage of the legal process." },
    { image: "https://i.postimg.cc/SKPHx7YB/man-5806012-1280.jpg", title: "Family Law & Maintenance", description: "We handle sensitive matters including divorce, child maintenance, and spousal support. Our approach prioritizes your family's well-being and legal protection during transitions." },
    { image: "https://i.postimg.cc/PrH9JqN5/right-4944555-1280.jpg", title: "Labour & Employment Law", description: "We offer comprehensive advice on workplace relationships and statutory compliance. Our experts represent both employers and employees in complex labour-related disputes." },
];

const ServicesSummarySection = ({ setPage }: { setPage: (page: PageState) => void }) => (
    <section id="practices" className="py-20 md:py-32 bg-brand-light text-brand-dark">
        <div className="container mx-auto px-6 max-w-[1440px]">
            <AnimatedSection className="text-left">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl font-serif font-bold text-brand-dark mb-4">Our Services</h2>
                        <p className="text-lg text-brand-dark opacity-80">We offer a broad range of legal services, applying our expertise to achieve the best possible results for you.</p>
                    </div>
                    <button 
                        onClick={() => setPage({ name: 'Services' })}
                        className="mt-6 md:mt-0 text-brand-dark font-bold hover:text-brand-blue transition-colors flex items-center group"
                    >
                        Explore more
                        <RightArrowIcon className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => (
                    <AnimatedSection key={service.title} className="flex" style={{ transitionDelay: `${index * 100}ms` }}>
                        <div className="bg-white border border-gray-200 border-b-4 border-brand-blue shadow-sm text-center flex flex-col h-full group transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
                            <div className="relative">
                                <img src={service.image} alt={service.title} className="w-full h-56 object-cover" />
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center text-brand-dark font-bold text-lg border-4 border-white">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                            </div>
                            <div className="p-6 pt-10 flex-grow flex flex-col">
                                <h3 className="text-xl font-serif font-bold text-brand-dark mb-3">{service.title}</h3>
                                <p className="text-brand-dark leading-relaxed text-sm opacity-80">{service.description}</p>
                            </div>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    </section>
);

const testimonials = [
    {
        quote: "Mangena Attorneys provided clarity when I was overwhelmed. Their attention to detail and unwavering support made all the difference.",
        name: "Alexander Gray",
        title: "Entrepreneur",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300&auto=format&fit=crop"
    },
    {
        quote: "A truly professional and dedicated team. They handled my case with the utmost care and achieved a result beyond my expectations.",
        name: "Jessica Miller",
        title: "CEO, Innovate Inc.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop"
    },
    {
        quote: "Navigating the legal system was daunting, but Mangena Attorneys made the process clear and manageable. Highly recommended.",
        name: "Michael Connor",
        title: "Real Estate Developer",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop"
    }
];

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<number | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = window.setTimeout(
            () => setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length),
            7000
        );
        return () => resetTimeout();
    }, [currentIndex]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    return (
        <section className="py-20 md:py-32 bg-brand-light text-brand-dark">
            <div className="container mx-auto px-6 max-w-4xl">
                <AnimatedSection>
                    <div className="bg-brand-dark text-white p-12 md:p-16 shadow-2xl">
                        <div className="relative min-h-[300px] flex flex-col justify-center items-center">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex flex-col items-center justify-center text-center ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    <div className="flex items-center justify-between w-full max-w-xs sm:max-w-sm mx-auto mb-6">
                                        <button onClick={handlePrev} className="text-gray-400 hover:text-white transition-colors text-2xl" aria-label="Previous testimonial">
                                            &larr;
                                        </button>
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-24 h-24 rounded-full object-cover shadow-lg"
                                        />
                                        <button onClick={handleNext} className="text-gray-400 hover:text-white transition-colors text-2xl" aria-label="Next testimonial">
                                            &rarr;
                                        </button>
                                    </div>
                                    <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">{testimonial.name}</h3>
                                    <p className="text-brand-blue text-sm uppercase tracking-wider mb-6">{testimonial.title}</p>
                                    <p className="text-xl text-gray-300 italic leading-relaxed max-w-2xl mx-auto">
                                        &ldquo;{testimonial.quote}&rdquo;
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};


const teamExperts = [
    {
        name: 'Simon Mangena',
        title: 'Founder & Director',
        bio: 'With over 16 years of experience, Simon leads our firm with a passion for justice and an unwavering commitment to our clients. Mr Mangena’sarea of practice,under Mangena Attornes Inc,includes Criminal and Civil litigation, Commercial litigation,Labour law, Wills and Estates, Third party claim, Debt Collection, drafting of Legal Opinions and Contracts as wellas Mediation in all its forms with special interest and vast experience in family law.',
        image: 'https://i.postimg.cc/WbqwKqLg/1771414264959.jpg',
        socials: { instagram: '#', linkedin: '#', facebook: '#', twitter: '#' },
    },
    {
        name: 'Clement Khasu',
        title: 'Attorney',
        bio: 'Siphelele is a master strategist in corporate litigation, helping businesses navigate complex legal landscapes with confidence and precision.',
        image: 'https://i.postimg.cc/Xq2ZZ7XT/attorney-man.jpg',
        socials: { instagram: '#', linkedin: '#', facebook: '#', twitter: '#' },
    },
];

const TeamSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalExperts = teamExperts.length;
    const activeExpert = teamExperts[currentIndex];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalExperts);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalExperts) % totalExperts);
    };
    
    const getThumbnailIndices = () => {
        const indices = [];
        // Only show other team members as thumbnails, up to a maximum of 3
        for (let i = 1; i < totalExperts && i <= 3; i++) {
            indices.push((currentIndex + i) % totalExperts);
        }
        return indices;
    };

    const thumbnailIndices = getThumbnailIndices();

    return (
        <section className="py-20 md:py-32 bg-white text-brand-dark overflow-hidden">
            <div className="container mx-auto px-6 max-w-[1440px]">
                <AnimatedSection className="text-left mb-16">
                    <p className="text-brand-dark font-semibold tracking-widest uppercase mb-4 opacity-70">Our Team</p>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-light">Meet Our Team Of Experts</h2>
                </AnimatedSection>

                <div className="flex flex-col xl:flex-row items-center justify-center gap-12">
                    <div className="w-full xl:w-auto flex flex-row xl:flex-col items-center xl:items-start justify-between xl:justify-start">
                        <p className="text-xl font-semibold mb-0 xl:mb-12 order-1 xl:order-none">
                           <span className="text-brand-dark">{String(currentIndex + 1).padStart(2, '0')}</span>
                           <span className="text-brand-dark/40"> / {String(totalExperts).padStart(2, '0')}</span>
                        </p>
                        <div className="flex space-x-4">
                            {thumbnailIndices.map(index => (
                                <img
                                    key={index}
                                    src={teamExperts[index].image}
                                    alt={teamExperts[index].name}
                                    className="w-20 h-20 md:w-24 md:h-24 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => setCurrentIndex(index)}
                                />
                            ))}
                        </div>
                    </div>

                    <div key={currentIndex} className="flex-1 flex flex-col md:flex-row items-stretch bg-white shadow-xl animate-fade-in w-full">
                        <div className="relative w-full md:w-1/2 flex-shrink-0 aspect-square">
                             <img src={activeExpert.image} alt={activeExpert.name} className="w-full h-full object-cover" />
                            <span style={{ writingMode: 'vertical-rl' }} className="absolute top-0 -left-0 text-brand-dark/40 uppercase tracking-widest text-sm transform rotate-180 bg-white px-2 py-4 shadow-sm">{activeExpert.name}</span>
                        </div>

                        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
                            <div>
                                <h3 className="text-3xl lg:text-4xl font-serif font-bold mb-2 text-brand-dark">{activeExpert.name}</h3>
                                <p className="text-brand-light mb-6">{activeExpert.title}</p>
                                <p className="text-brand-dark mb-8 text-sm leading-relaxed">{activeExpert.bio}</p>
                                <div className="flex space-x-4 text-brand-dark">
                                    <a href={activeExpert.socials.instagram} className="hover:text-brand-light transition-colors"><InstagramIcon className="w-5 h-5"/></a>
                                    <a href={activeExpert.socials.linkedin} className="hover:text-brand-light transition-colors"><LinkedInIcon className="w-5 h-5"/></a>
                                    <a href={activeExpert.socials.facebook} className="hover:text-brand-light transition-colors"><FacebookIcon className="w-5 h-5"/></a>
                                    <a href={activeExpert.socials.twitter} className="hover:text-brand-light transition-colors"><TwitterIcon className="w-5 h-5"/></a>
                                </div>
                            </div>
                            <div className="flex space-x-2 mt-8">
                                <button onClick={handlePrev} className="w-14 h-14 border border-brand-blue bg-white text-brand-dark flex items-center justify-center hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                                    <TeamArrowLeftIcon className="w-6 h-6" />
                                </button>
                                <button onClick={handleNext} className="w-14 h-14 bg-brand-blue text-brand-dark flex items-center justify-center hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105">
                                    <TeamArrowRightIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const popularCases = [
    {
        slug: "personal-law-acquittal",
        category: "Personal Law",
        title: "Personal Law Defense",
        result: "Acquittal on All Charges",
        image: "https://i.postimg.cc/rmHXzBMf/lawyers-1000803-1280.jpg",
        challenge: "Our client was wrongly accused of a serious offense with substantial evidence mounted against them. The primary challenge was to dismantle the prosecution's case piece by piece and establish a strong, credible defense in a high-stakes, public-facing trial.",
        strategy: "We conducted an exhaustive independent investigation, uncovering new evidence and witness testimony that was overlooked. Our legal team meticulously prepared for trial, focusing on cross-examination to expose inconsistencies in the prosecution's narrative. We presented a clear, compelling alternative sequence of events to the jury.",
        outcome: "After a lengthy trial, the jury returned a verdict of not guilty on all counts. Our client's name was cleared, and they were able to return to their life. This case was a landmark victory for our firm and a testament to the power of a tenacious defense.",
    },
    {
        slug: "marriage-divorce-settlement",
        category: "Human Rights",
        title: "Marriage & Divorce Resolution",
        result: "$2 Million Settlement",
        image: "https://i.postimg.cc/BnNq4wLV/man-5806015-1280.jpg",
        challenge: "The case involved a complex, high-asset divorce with disputes over business valuations and hidden assets. Our client sought an equitable distribution of marital property and fair spousal support, but faced significant resistance and non-disclosure from the opposing party.",
        strategy: "Our team engaged forensic accountants to trace hidden assets and accurately value multiple business entities. We employed a firm but fair negotiation posture, backed by thorough documentation and the constant threat of litigation. The strategy was to make a fair settlement the most attractive option for the opposing side.",
        outcome: "We successfully negotiated a settlement of $2 million for our client, which included a significant portion of the disputed business assets. The outcome provided our client with financial security and the ability to move forward independently, avoiding a protracted and costly court battle.",
    },
    {
        slug: "mental-torture-case-dismissed",
        category: "Personal Law",
        title: "Civil Advocacy Victory",
        result: "Case Dismissed Pre-Trial",
        image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop",
        challenge: "Our client was the subject of a lawsuit alleging emotional distress and mental torture, which threatened both their personal reputation and professional standing. The challenge was to have the case dismissed early to avoid a damaging public trial based on what we believed were baseless allegations.",
        strategy: "We filed an aggressive motion to dismiss, arguing that the plaintiff's claims lacked legal merit and factual support. Our motion was supported by extensive legal research, affidavits, and a detailed dissection of the weaknesses in the plaintiff's case. We demonstrated to the court that the lawsuit was frivolous.",
        outcome: "The judge granted our motion, and the case was dismissed with prejudice before it ever reached a trial. This swift and decisive victory protected our client's reputation, saved them from the emotional and financial cost of litigation, and served as a strong deterrent against similar meritless claims.",
    },
];

const PopularCasesSection = ({ setPage }: { setPage: (page: PageState) => void }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = container.clientWidth * 0.9; // Scroll by 90% of the visible width
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="py-20 md:py-32 bg-white text-brand-dark">
            <div className="container mx-auto px-6 max-w-[1440px]">
                <AnimatedSection>
                    <div className="flex flex-col md:flex-row justify-between items-start mb-16">
                        <div className="md:w-2/5">
                            <p className="text-brand-dark font-semibold tracking-widest uppercase mb-4 opacity-70">Our Recent Cases</p>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-light leading-tight">
                                Popular Cases
                            </h2>
                        </div>
                        <div className="md:w-3/5 mt-4 md:mt-0 md:pl-8">
                            <p className="text-brand-dark leading-relaxed max-w-lg opacity-80">
                                Here are the highlights of our most notable and impactful cases that showcase our dedication, expertise, and unwavering commitment to justice.
                            </p>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection>
                    <div className="relative">
                        <div
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-4 -mx-4"
                        >
                            {popularCases.map((caseItem, index) => (
                                <div key={index} className="flex-none w-full sm:w-1/2 lg:w-1/3 snap-start px-4">
                                    <div
                                        className="relative aspect-square group overflow-hidden cursor-pointer"
                                        onClick={() => setPage({ name: 'CaseStudyDetail', params: { slug: caseItem.slug } })}
                                    >
                                        <img src={caseItem.image} alt={caseItem.title} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white w-full">
                                            <p className="text-sm uppercase tracking-wider">{caseItem.category}</p>
                                            <div className="w-10 h-px bg-brand-blue my-3"></div>
                                            <h3 className="text-2xl font-serif font-bold mb-2">{caseItem.title}</h3>
                                            <p className="text-sm text-brand-blue font-semibold">Result: <span className="text-white font-normal">{caseItem.result}</span></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => scroll('left')}
                            className="absolute top-1/2 -translate-y-1/2 -left-6 z-10 w-12 h-12 bg-brand-dark text-white flex items-center justify-center hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                            aria-label="Previous case"
                        >
                             <TeamArrowLeftIcon className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="absolute top-1/2 -translate-y-1/2 -right-6 z-10 w-12 h-12 bg-brand-dark text-white flex items-center justify-center hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                            aria-label="Next case"
                        >
                            <TeamArrowRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

const CallToActionSection = ({ setPage }: { setPage: (page: PageState) => void }) => (
    <section className="relative py-20 md:py-28 text-white overflow-hidden">
        <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-fixed"
            style={{
                backgroundImage: `url(https://i.postimg.cc/KYX13Wvv/contact-hero.jpg)`,
            }}
        />
        <div className="absolute inset-0 bg-brand-dark/60"></div>
        <div className="container mx-auto px-6 relative z-10 text-center max-w-[1440px]">
            <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-light mb-4">
                    Ready to Discuss Your Case?
                </h2>
                <p className="text-lg text-white max-w-2xl mx-auto mb-8">
                    Your legal journey starts with a conversation. Contact us today for a free, confidential consultation and let us help you find the best path forward.
                </p>
                <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setPage({ name: 'Contact' }); }}
                    className="bg-brand-blue text-brand-dark font-bold py-3 px-8 hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105"
                >
                    Request Free Consultation
                </a>
            </AnimatedSection>
        </div>
    </section>
);


// --- PAGES ---

const HomePage = ({ setPage }: { setPage: (page: PageState) => void }) => (
    <>
        <HeroSection setPage={setPage} />
        <AboutSummarySection setPage={setPage} />
        <ServicesSummarySection setPage={setPage} />
        <PopularCasesSection setPage={setPage} />
        <TestimonialsSection />
        <TeamSection />
        <CallToActionSection setPage={setPage} />
    </>
);

const OurStorySection = () => (
    <section className="py-20 md:py-28 bg-white text-brand-dark">
        <div className="container mx-auto px-6 max-w-[1200px]">
            <AnimatedSection>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <p className="text-brand-dark font-semibold tracking-widest uppercase mb-4 opacity-70">Our Story</p>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-light mb-6 leading-tight">
                            Forged in Justice, Built on Trust
                        </h2>
                        <p className="text-brand-dark mb-6 leading-relaxed opacity-80">
                            Founded on the principle that everyone deserves exceptional legal representation, Mangena Attorneys began as a small practice with a big vision. We saw a need for a law firm that combined deep legal expertise with a genuinely client-centered approach.
                        </p>
                         <p className="text-brand-dark mb-8 leading-relaxed opacity-80">
                            Over the years, we've grown into a respected institution, but our core values remain unchanged. We are advocates, advisors, and partners to our clients, navigating complex legal challenges with dedication and integrity. Our history is not just about cases won; it's about the trust we've built and the lives we've impacted.
                        </p>
                         <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center">
                            <div className="border-t-2 border-brand-blue pt-4">
                                <p className="text-4xl font-serif font-bold text-brand-dark">2018</p>
                                <p className="text-brand-dark/50 text-sm">Founded</p>
                            </div>
                             <div className="border-t-2 border-brand-blue pt-4">
                                <p className="text-4xl font-serif font-bold text-brand-dark">70+</p>
                                <p className="text-brand-dark/50 text-sm">Cases Won</p>
                            </div>
                             <div className="border-t-2 border-brand-blue pt-4">
                                <p className="text-4xl font-serif font-bold text-brand-dark">99%</p>
                                <p className="text-brand-dark/50 text-sm">Client Satisfaction</p>
                            </div>
                        </div>
                    </div>
                     <div className="order-1 lg:order-2 flex justify-center">
                        <img 
                            src="https://i.postimg.cc/ZKx2cZmQ/mangena-att.jpg" 
                            alt="Our team in a meeting"
                            className="w-full max-w-md h-full object-cover shadow-2xl aspect-square"
                        />
                    </div>
                </div>
            </AnimatedSection>
        </div>
    </section>
);


const AboutPage = ({ setPage }: { setPage: (page: PageState) => void }) => (
    <>
        <PageHero 
            title="About Us" 
            subtitle="Decades of Combined Experience" 
            image="https://i.postimg.cc/fyzPjXhq/blog-hero.jpg"
            breadcrumbs={[{ label: 'About' }]}
            setPage={setPage} 
        />
        <OurStorySection />
        <section className="py-20 md:py-28 bg-brand-light text-brand-dark">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <AnimatedSection className="text-center">
                    <h2 className="text-4xl font-serif font-bold mb-4 text-brand-dark">Our Mission</h2>
                    <p className="text-lg text-brand-dark max-w-3xl mx-auto leading-relaxed opacity-80">
                        Our mission is to provide the highest quality legal representation with integrity, professionalism, and respect for our clients and the community. We dedicate ourselves to understanding our clients' needs and exceeding their expectations, striving for excellence in everything we do.
                    </p>
                </AnimatedSection>
            </div>
        </section>
        <TeamSection />
    </>
);

const detailedServices = [
    ...services,
    { image: "https://i.postimg.cc/B6TW7PtR/judgement-6722634-1280.jpg", title: "Third Party Claims & RAF", description: "We assist motor vehicle accident victims in navigating Road Accident Fund claims. Our goal is to secure the full compensation you deserve for your injuries and losses." },
    { image: "https://i.postimg.cc/Wz8BTRGn/purchase-3113198-1280.jpg", title: "Medical Negligence", description: "We provide specialized support for those harmed by substandard medical care. Our firm holds responsible parties accountable to pursue justice for your recovery." },
    { image: "https://i.postimg.cc/QtL6Nd0R/alvaro-serrano-hjw-KMkeh-Bco-unsplash.jpg", title: "Wills & Deceased Estates", description: "We offer professional guidance in drafting Wills and administering deceased estates. We ensure your legacy is protected and your final wishes are executed accurately." },
    { image: "https://i.postimg.cc/T20cF0Mz/metin-ozer-sp-FYb-CSF-Ec-unsplash.jpg", title: "Immigration & Refugee Law", description: "Our team navigates the complexities of visa applications and residency permits. We provide dedicated legal assistance to protect the rights of refugees and immigrants." },
    { image: "https://i.postimg.cc/PqnZPvnF/cytonn-photography-GJao3ZTX9g-U-unsplash.jpg", title: "Debt Collection & Contracts", description: "We provide efficient recovery services and the drafting of legally sound agreements. Our focus is on securing your financial assets and minimizing your commercial risk." },
];

const ServicesPage = ({ setPage }: { setPage: (page: PageState) => void }) => (
    <>
        <PageHero
            title="Our Services"
            subtitle="Comprehensive Legal Expertise"
            image="https://i.postimg.cc/Xq4RHm98/services-hero.jpg"
            breadcrumbs={[{ label: 'Services' }]}
            setPage={setPage}
        />
        <section className="py-20 md:py-28 bg-brand-light text-brand-dark">
            <div className="container mx-auto px-6 max-w-[1440px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {detailedServices.map((service, index) => (
                        <AnimatedSection key={service.title} className="flex" style={{ transitionDelay: `${index * 100}ms` }}>
                            <div className="bg-white border border-gray-200 border-b-4 border-brand-blue shadow-sm text-center flex flex-col h-full group transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
                                <div className="relative">
                                    <img src={service.image} alt={service.title} className="w-full h-56 object-cover" />
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center text-brand-dark font-bold text-lg border-4 border-white">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                </div>
                                <div className="p-6 pt-10 flex-grow flex flex-col">
                                    <h3 className="text-xl font-serif font-bold text-brand-dark mb-3">{service.title}</h3>
                                    <p className="text-brand-dark leading-relaxed text-sm opacity-80">{service.description}</p>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
        <CallToActionSection setPage={setPage} />
    </>
);

const CaseStudiesPage = ({ setPage }: { setPage: (page: PageState) => void }) => (
    <>
        <PageHero 
            title="Case Studies" 
            subtitle="Proven Results, Client Success" 
            image="https://i.postimg.cc/HnmmGV1b/casestudies-hero.jpg"
            breadcrumbs={[{ label: 'Cases' }]}
            setPage={setPage} 
        />
        <PopularCasesSection setPage={setPage} />
        <CallToActionSection setPage={setPage} />
    </>
);

const careers = [
    { 
        slug: "senior-associate-attorney",
        title: "Senior Associate Attorney", 
        location: "Justice City", 
        description: "Seeking an experienced attorney with 5+ years in corporate law. Must have a proven track record of success and strong client management skills.",
        responsibilities: [
            "Provide legal counsel to corporate clients on a variety of issues.",
            "Draft, review, and negotiate complex commercial agreements.",
            "Manage M&A transactions from due diligence to closing.",
            "Represent clients in litigation and dispute resolution.",
            "Mentor junior associates and contribute to firm growth."
        ],
        qualifications: [
            "Juris Doctor (J.D.) from an accredited law school.",
            "Admitted to the state bar and in good standing.",
            "Minimum of 5 years of experience in corporate law.",
            "Excellent analytical, negotiation, and communication skills.",
            "Proven ability to manage a significant caseload and client relationships."
        ]
    },
    { 
        slug: "paralegal",
        title: "Paralegal", 
        location: "Justice City", 
        description: "A detail-oriented paralegal needed to support our busy litigation team. Certification and 2+ years of experience required.",
        responsibilities: [
            "Assist attorneys with case management from inception to conclusion.",
            "Conduct legal research and gather relevant information.",
            "Draft pleadings, discovery requests, and other legal documents.",
            "Organize and maintain case files and documentation.",
            "Prepare for trials, hearings, and depositions."
        ],
        qualifications: [
            "Paralegal certificate or equivalent degree.",
            "Minimum of 2 years of experience in a litigation setting.",
            "Proficient in legal research software (e.g., Westlaw, LexisNexis).",
            "Strong organizational skills and attention to detail.",
            "Ability to work effectively in a fast-paced team environment."
        ]
    },
    { 
        slug: "legal-assistant",
        title: "Legal Assistant", 
        location: "Remote/Justice City", 
        description: "Entry-level position for a motivated individual to provide administrative support. Excellent organization and communication skills are a must.",
        responsibilities: [
            "Provide administrative support to multiple attorneys.",
            "Manage calendars, schedule meetings, and coordinate travel.",
            "Answer phones, screen calls, and communicate with clients.",
            "File legal documents with courts and administrative agencies.",
            "Handle billing and invoicing tasks."
        ],
        qualifications: [
            "Associate's or Bachelor's degree preferred.",
            "Previous experience in an office or administrative role is a plus.",
            "Proficiency with Microsoft Office Suite.",
            "Exceptional communication and interpersonal skills.",
            "A proactive and positive attitude with a desire to learn."
        ]
    },
];

const CareersPage = ({ setPage }: { setPage: (page: PageState) => void }) => (
    <>
        <PageHero 
            title="Careers" 
            subtitle="Join Our Team of Experts" 
            image="https://i.postimg.cc/jjWtPphn/call-to-action.jpg"
            breadcrumbs={[{ label: 'Careers' }]}
            setPage={setPage} 
        />
        <section className="py-20 md:py-28 bg-white text-brand-dark">
            <div className="container mx-auto px-6 max-w-[1200px]">
                 <AnimatedSection className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold text-brand-light mb-4">Why Work at Mangena?</h2>
                    <p className="text-lg text-brand-dark max-w-3xl mx-auto leading-relaxed opacity-80">
                        We foster a collaborative environment where talented individuals can thrive. We are committed to professional growth, mentorship, and a healthy work-life balance. Join us in making a difference.
                    </p>
                </AnimatedSection>
                <div className="space-y-8 max-w-4xl mx-auto">
                     <h3 className="text-3xl font-serif font-bold text-center text-brand-light mb-8">Current Openings</h3>
                     {careers.map((job, index) => (
                        <AnimatedSection key={job.title} style={{ transitionDelay: `${index * 100}ms` }}>
                            <div className="bg-brand-light p-6 shadow-md flex flex-col sm:flex-row justify-between items-center">
                                <div>
                                    <h4 className="text-xl font-serif font-bold text-brand-dark">{job.title}</h4>
                                    <p className="text-brand-dark font-semibold text-sm opacity-60">{job.location}</p>
                                    <p className="text-brand-dark mt-2 text-sm max-w-2xl opacity-80">{job.description}</p>
                                </div>
                                <button 
                                    onClick={() => setPage({ name: 'CareerDetail', params: { slug: job.slug }})}
                                    className="bg-brand-dark text-white font-bold py-2 px-6 hover:bg-gray-800 transition-all duration-300 mt-4 sm:mt-0 flex-shrink-0 transform hover:scale-105">
                                    View Details
                                </button>
                            </div>
                        </AnimatedSection>
                     ))}
                </div>
            </div>
        </section>
    </>
);

const blogPosts = [
    { 
        slug: "navigating-commercial-leases",
        title: "Navigating the complexities of commercial leases", 
        date: "October 26, 2023", 
        category: "Corporate Law", 
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
        content: [
            "Commercial leases are intricate legal documents that can have long-term implications for your business. Unlike residential leases, they offer fewer statutory protections for tenants. Therefore, understanding the key terms and negotiating favorable conditions before signing is paramount.",
            "One of the most critical aspects to consider is the lease term and renewal options. A short-term lease might offer flexibility, but a long-term lease can provide stability and predictable costs. Look for renewal options that give you the right, but not the obligation, to extend the lease. Also, pay close attention to rent escalation clauses, which dictate how your rent will increase over time.",
            "Another crucial area is the definition of 'common area maintenance' (CAM) charges. These costs, passed on to tenants for the upkeep of shared spaces, can be a significant expense. Negotiate for a clear, narrow definition of what CAM includes and request a cap on annual increases to avoid unexpected financial burdens. Finally, always have an experienced commercial real estate attorney review your lease before you sign. Their expertise can help you identify potential pitfalls and secure terms that align with your business's best interests."
        ]
    },
    { 
        slug: "5-things-before-divorce",
        title: "5 Things to Know Before Filing for Divorce", 
        date: "October 15, 2023", 
        category: "Family Law", 
        image: "https://i.postimg.cc/qR3BVPhH/hammer-719061-1280.jpg",
        content: [
            "Filing for divorce is a significant life decision with emotional and financial ramifications. Being prepared can make the process smoother and less stressful. First, gather all your financial documents. This includes bank statements, tax returns, loan documents, and retirement account information. A clear financial picture is essential for equitable asset division.",
            "Second, consider your living arrangements. Will one spouse move out? Who will be responsible for the mortgage or rent? Addressing these questions early can prevent conflict later. Third, if you have children, start thinking about a parenting plan. Courts prioritize the best interests of the child, so a well-thought-out plan for custody and visitation is crucial.",
            "Fourth, understand the difference between mediation, collaborative divorce, and litigation. Exploring less adversarial options can save time, money, and emotional distress. Finally, and most importantly, consult with an experienced family law attorney. They can provide personalized advice, explain your rights and obligations, and guide you through every step of the legal process."
        ]
    },
    { 
        slug: "your-rights-when-questioned",
        title: "Your Rights When Questioned by Police", 
        date: "September 28, 2023", 
        category: "Criminal Defense", 
        image: "https://i.postimg.cc/SRLyjcfZ/right-4944546-1280.jpg",
        content: [
            "An interaction with law enforcement can be intimidating, but it is crucial to know your rights. The most important right you have is the right to remain silent, as guaranteed by the Fifth Amendment. You are not obligated to answer questions about where you are going, where you are coming from, or what you are doing. You only need to provide your name and identification if requested.",
            "You also have the right to refuse a search of your property, including your car or your home, without a warrant. If an officer asks for your consent to search, you can and should say, 'I do not consent to a search.' If they proceed to search anyway, do not physically resist, but clearly state that you do not consent. This can be critical for your defense later.",
            "Finally, you have the right to an attorney. If you are arrested or feel you are not free to leave, you should immediately and clearly state, 'I want a lawyer.' Once you invoke this right, police must cease questioning you until your attorney is present. Understanding and exercising these rights is your best protection in any encounter with the police."
        ]
    },
];

const BlogPage = ({ setPage }: { setPage: (page: PageState) => void }) => (
    <>
        <PageHero 
            title="Our Blog" 
            subtitle="Insights from Our Legal Experts" 
            image="https://i.postimg.cc/ZKnxKtZM/blog-image.jpg"
            breadcrumbs={[{ label: 'Blog' }]}
            setPage={setPage} 
        />
        <section className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-6 max-w-[1440px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <AnimatedSection key={post.title} style={{ transitionDelay: `${index * 100}ms` }}>
                            <div className="bg-white shadow-lg overflow-hidden h-full flex flex-col group">
                                <div className="overflow-hidden">
                                    <img src={post.image} alt={post.title} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <p className="text-brand-dark font-semibold text-sm mb-2">{post.category}</p>
                                    <h3 className="text-xl font-serif font-bold text-brand-light mb-3 flex-grow">{post.title}</h3>
                                    <div className='flex justify-between items-center'>
                                        <p className="text-brand-dark/50 text-sm">{post.date}</p>
                                        <button 
                                            onClick={() => setPage({ name: 'BlogDetail', params: { slug: post.slug } })}
                                            className="text-brand-dark font-bold text-sm hover:text-brand-blue transition-all duration-300 transform hover:scale-105">
                                            Read More &rarr;
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    </>
);

const faqs = [
    { q: "What types of cases does Mangena Attorneys handle?", a: "We handle a wide range of cases, including criminal defense, corporate law, family law, and civil litigation. Please see our Services page for a more comprehensive list." },
    { q: "How much does a consultation cost?", a: "We offer a free initial consultation to discuss your case, understand your needs, and determine how we can best assist you. There is no obligation." },
    { q: "What should I bring to my first meeting?", a: "Please bring all relevant documents related to your case, such as contracts, police reports, correspondence, and any other paperwork that may be important. Also, a list of questions you have for us." },
    { q: "How will I be kept updated on the progress of my case?", a: "We believe in clear and consistent communication. Your assigned attorney will provide regular updates via phone or email, and you can always reach out to our office with any questions." },
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-6 max-w-4xl text-brand-dark">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold mb-4 text-brand-dark">Frequently Asked Questions</h2>
                    <p className="text-lg text-brand-dark opacity-80">Find quick answers to common questions about our services and processes.</p>
                </AnimatedSection>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                         <AnimatedSection key={index} style={{ transitionDelay: `${index * 100}ms` }}>
                             <div className="bg-brand-light shadow-md overflow-hidden">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex justify-between items-center text-left p-6 font-serif font-bold text-lg focus:outline-none text-brand-dark"
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDownIcon className={`w-6 h-6 text-brand-dark transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                                    <div className="p-6 pt-0 text-brand-dark opacity-80">
                                        <p>{faq.a}</p>
                                    </div>
                                </div>
                             </div>
                         </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};


const ContactPage = ({ setPage }: { setPage: (page: PageState) => void }) => (
    <>
        <PageHero
            title="Contact Us"
            subtitle="Let's Discuss Your Case"
            image="https://i.postimg.cc/7hz59CM7/call-to-action-2.jpg"
            breadcrumbs={[{ label: 'Contact' }]}
            setPage={setPage}
        />
        <section id="contact-info" className="py-20 md:py-28 bg-white text-brand-dark">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 items-start">
                    {/* Left Column */}
                    <AnimatedSection>
                        <p className="text-brand-dark font-semibold tracking-widest uppercase mb-4 opacity-70">CONTACT US</p>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-light mb-6 leading-tight">
                            Get in touch with our expert agents
                        </h2>
                        <p className="text-brand-dark mb-12 leading-relaxed opacity-80">
                            Our success is determined not only by the results we acquire, but also by the manner in which we achieve them. We are here to listen.
                        </p>
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-white p-4 shadow-sm">
                                    <PhoneIcon className="w-6 h-6 text-brand-blue" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-brand-dark opacity-50">Call Us</p>
                                    <p className="font-bold text-brand-dark text-lg">076 639 9693</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-white p-4 shadow-sm">
                                    <WhatsAppIcon className="w-6 h-6 text-brand-blue" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-brand-dark opacity-50">WhatsApp Us</p>
                                    <p className="font-bold text-brand-dark text-lg">076 639 9693</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-white p-4 shadow-sm">
                                    <EnvelopeIcon className="w-6 h-6 text-brand-blue" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-brand-dark opacity-50">Send email</p>
                                    <p className="font-bold text-brand-dark text-lg">admin@mangenaattorneys.co.za</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-white p-4 shadow-sm">
                                    <MapPinIcon className="w-6 h-6 text-brand-blue" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-brand-dark opacity-50">Visit Us</p>
                                    <p className="font-bold text-brand-dark text-lg">16 Van Eck Str, The Orchards Ext11, Pretoria North</p>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Right Column (Form) */}
                    <AnimatedSection>
                        <div className="bg-white p-8 md:p-12 shadow-2xl h-full">
                            <form className="space-y-6 flex flex-col h-full">
                                <input type="text" placeholder="Your name" className="w-full bg-gray-100 border-none p-4 text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all" />
                                <input type="email" placeholder="Email address" className="w-full bg-gray-100 border-none p-4 text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all" />
                                <input type="tel" placeholder="Phone number" className="w-full bg-gray-100 border-none p-4 text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all" />
                                <textarea placeholder="Write a message" rows={5} className="w-full bg-gray-100 border-none p-4 text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all flex-grow"></textarea>
                                <div className="text-left">
                                    <button type="submit" className="bg-brand-blue text-brand-dark font-bold py-4 px-10 hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105">
                                        SEND A MESSAGE
                                    </button>
                                </div>
                            </form>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
        <FAQSection />
    </>
);

// --- DETAIL PAGES ---

const BlogDetailPage = ({ slug, setPage }: { slug?: string; setPage: (page: PageState) => void }) => {
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return (
            <div className="py-40 text-center">
                <h1 className="text-4xl font-bold">Post not found</h1>
                <button onClick={() => setPage({ name: 'Blog' })} className="mt-4 text-brand-blue hover:underline transition-transform duration-300 transform hover:scale-105 inline-block">
                    Back to Blog
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white text-brand-dark">
            <div className="relative h-96">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand-dark/50"></div>
            </div>
            <div className="container mx-auto px-6 max-w-4xl -mt-24 relative z-10 pb-20">
                <div className="bg-white p-8 md:p-12 shadow-2xl">
                    <AnimatedSection>
                        <p className="text-brand-blue font-semibold text-sm mb-2">{post.category}</p>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-light mb-4">{post.title}</h1>
                        <p className="text-brand-dark text-sm mb-8 opacity-60">{post.date}</p>
                        <div className="prose max-w-none text-brand-dark leading-relaxed space-y-6">
                            {post.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                        </div>
                        <button onClick={() => setPage({ name: 'Blog' })} className="mt-12 text-brand-dark font-bold hover:text-brand-blue transition-all duration-300 transform hover:scale-105 inline-block">
                             &larr; Back to Blog
                        </button>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
};

const CaseStudyDetailPage = ({ slug, setPage }: { slug?: string; setPage: (page: PageState) => void }) => {
    const caseStudy = popularCases.find(c => c.slug === slug);

    if (!caseStudy) {
        return (
            <div className="py-40 text-center">
                <h1 className="text-4xl font-bold">Case Study not found</h1>
                <button onClick={() => setPage({ name: 'CaseStudies' })} className="mt-4 text-brand-blue hover:underline transition-transform duration-300 transform hover:scale-105 inline-block">
                    Back to Case Studies
                </button>
            </div>
        );
    }
    
    return (
        <div className="bg-white text-brand-dark">
            <div className="relative h-96">
                <img src={caseStudy.image} alt={caseStudy.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand-dark/50"></div>
            </div>
            <div className="container mx-auto px-6 max-w-4xl -mt-24 relative z-10 pb-20">
                <div className="bg-white p-8 md:p-12 shadow-2xl">
                    <AnimatedSection>
                        <p className="text-brand-blue font-semibold text-sm mb-2">{caseStudy.category}</p>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-light mb-4">{caseStudy.title}</h1>
                        <p className="text-brand-dark text-sm mb-8">Result: <span className="font-semibold">{caseStudy.result}</span></p>
                        
                        <div className="text-brand-dark leading-relaxed space-y-4">
                            <h2 className="text-3xl font-serif font-bold text-brand-light pt-4">The Challenge</h2>
                            <p>{caseStudy.challenge}</p>
                            <h2 className="text-3xl font-serif font-bold text-brand-light pt-4">Our Strategy</h2>
                            <p>{caseStudy.strategy}</p>
                            <h2 className="text-3xl font-serif font-bold text-brand-light pt-4">The Outcome</h2>
                            <p>{caseStudy.outcome}</p>
                        </div>

                        <button onClick={() => setPage({ name: 'CaseStudies' })} className="mt-12 text-brand-dark font-bold hover:text-brand-blue transition-all duration-300 transform hover:scale-105 inline-block">
                             &larr; Back to Case Studies
                        </button>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
}

const CareerDetailPage = ({ slug, setPage }: { slug?: string; setPage: (page: PageState) => void }) => {
    const job = careers.find(c => c.slug === slug);

    if (!job) {
         return (
            <div className="py-40 text-center">
                <h1 className="text-4xl font-bold">Opening not found</h1>
                <button onClick={() => setPage({ name: 'Careers' })} className="mt-4 text-brand-blue hover:underline transition-transform duration-300 transform hover:scale-105 inline-block">
                    Back to Careers
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white text-brand-dark">
             <div className="relative h-96">
                <img src="https://i.postimg.cc/jjWtPphn/call-to-action.jpg" alt={job.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand-dark/50"></div>
            </div>
            <div className="container mx-auto px-6 max-w-4xl -mt-24 relative z-10 pb-20">
                 <div className="bg-white p-8 md:p-12 shadow-2xl">
                    <AnimatedSection>
                        <p className="text-brand-blue font-semibold text-sm mb-2">{job.location}</p>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-light mb-8">{job.title}</h1>

                        <h2 className="text-3xl font-serif font-bold text-brand-light mb-6">Job Description</h2>
                        <p className="text-brand-dark mb-10 leading-relaxed opacity-80">{job.description}</p>
                        
                        <h2 className="text-3xl font-serif font-bold text-brand-light mb-6">Key Responsibilities</h2>
                        <ul className="list-disc list-inside text-brand-dark mb-10 space-y-2 opacity-80">
                            {job.responsibilities.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>

                        <h2 className="text-3xl font-serif font-bold text-brand-light mb-6">Qualifications</h2>
                        <ul className="list-disc list-inside text-brand-dark mb-12 space-y-2 opacity-80">
                            {job.qualifications.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>

                        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
                            <h3 className="text-2xl font-serif font-bold text-brand-light mb-4">Apply for this Position</h3>
                            <p className="text-brand-dark mb-6 opacity-80">If you are a passionate and dedicated professional, we encourage you to apply.</p>
                            <button className="bg-brand-blue text-brand-dark font-bold py-3 px-12 hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105">
                                Apply Now
                            </button>
                        </div>
                        
                        <button onClick={() => setPage({ name: 'Careers' })} className="mt-12 text-brand-dark font-bold hover:text-brand-blue transition-all duration-300 transform hover:scale-105 inline-block">
                             &larr; Back to Careers
                        </button>
                    </AnimatedSection>
                 </div>
            </div>
        </div>
    );
};


// --- Main App Component ---

const App = () => {
    const [page, setPage] = useState<PageState>({ name: 'Home' });
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    const renderPage = () => {
        switch (page.name) {
            case 'About': return <AboutPage setPage={setPage} />;
            case 'Services': return <ServicesPage setPage={setPage} />;
            case 'CaseStudies': return <CaseStudiesPage setPage={setPage} />;
            case 'Careers': return <CareersPage setPage={setPage} />;
            case 'Blog': return <BlogPage setPage={setPage} />;
            case 'Contact': return <ContactPage setPage={setPage} />;
            case 'BlogDetail': return <BlogDetailPage slug={page.params?.slug} setPage={setPage} />;
            case 'CaseStudyDetail': return <CaseStudyDetailPage slug={page.params?.slug} setPage={setPage} />;
            case 'CareerDetail': return <CareerDetailPage slug={page.params?.slug} setPage={setPage} />;
            case 'Home':
            default:
                return <HomePage setPage={setPage} />;
        }
    };

    return (
        <>
            <Header setPage={setPage} page={page} />
            <main>
                {renderPage()}
            </main>
            <Footer setPage={setPage} />
            <BackToTopButton />
        </>
    );
};

export default App;
