import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="w-full">
            {/* HERO SECTION */}
            <section className="flex flex-col lg:flex-row items-center justify-between py-12 lg:py-24 max-w-7xl mx-auto px-8 md:px-16 gap-12">
                <div className="flex-1 space-y-8 z-10">
                    <div className="inline-flex items-center space-x-2 bg-orange-100/80 text-orange-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        <span>Student-run Organisation @ IIUM</span>
                    </div>

                    <h1 className="text-[3.5rem] md:text-[5rem] leading-[1.05] tracking-tight font-display font-bold text-brand-dark">
                        Every Purr <br />
                        <span className="italic font-serif font-medium text-brand-primary">Deserves</span> a <br />
                        Home.
                    </h1>

                    <p className="text-gray-500 text-lg max-w-md leading-relaxed">
                        Welcome to e-Doptcat, a boutique rescue sanctuary managed by the Abu Hurairah Club. We blend compassionate care with a high-end adoption experience.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link to="/cats" className="bg-gradient-to-r from-brand-primary to-orange-400 text-white font-medium px-8 py-3.5 rounded-full shadow-lg shadow-orange-500/25 hover:-translate-y-1 transition-transform text-center flex items-center justify-center gap-2">
                            View Cats <span>&rarr;</span>
                        </Link>
                        <Link to="/donate" className="bg-gray-100 text-brand-dark hover:bg-gray-200 font-medium px-8 py-3.5 rounded-full transition-colors text-center text-sm flex items-center justify-center">
                            Support Our Mission
                        </Link>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-100 to-transparent rounded-[3rem] blur-3xl opacity-50 -z-10 translate-x-8 translate-y-8"></div>
                    <img
                        src="/images/hero_cat_1775141614458.png"
                        alt="Hero Cat"
                        className="w-full h-auto max-h-[600px] object-cover rounded-[2.5rem] shadow-2xl"
                    />
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="max-w-7xl mx-auto px-8 md:px-16 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="col-span-1 md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
                        <div>
                            <h3 className="text-4xl font-display font-bold text-brand-primary mb-2">1,240+</h3>
                            <p className="text-sm text-gray-500 max-w-xs">Lives transformed through AHC's dedicated student initiative.</p>
                        </div>
                        <div className="flex items-center -space-x-3 mt-8">
                            <div className="w-10 h-10 rounded-full bg-teal-500 border-2 border-white shadow-sm flex items-center justify-center text-white text-xs">RM</div>
                            <div className="w-10 h-10 rounded-full bg-cyan-700 border-2 border-white shadow-sm flex items-center justify-center text-white text-xs">AH</div>
                            <div className="w-10 h-10 rounded-full bg-orange-200 border-2 border-white shadow-sm flex items-center justify-center text-brand-primary text-xs font-bold">+5M</div>
                        </div>
                    </div>

                    <div className="col-span-1 bg-brand-secondary rounded-3xl p-8 text-white flex flex-col justify-center items-center text-center shadow-lg">
                        <h3 className="text-5xl font-display font-bold italic mb-2">98%</h3>
                        <p className="text-xs uppercase tracking-widest text-brand-primary font-bold">Success Rate</p>
                    </div>

                    <div className="col-span-1 bg-[#ede8e1] rounded-3xl p-8 flex flex-col justify-center">
                        <div className="text-brand-secondary mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="text-2xl font-display font-bold text-brand-dark mb-1">RM 85k+</h3>
                        <p className="text-xs text-gray-500">Total Donations Raised</p>
                    </div>

                    <div className="col-span-1 md:col-span-1 bg-[#ede8e1] rounded-3xl p-8 flex flex-col justify-center">
                        <div className="text-brand-secondary mb-4">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                        </div>
                        <h3 className="text-2xl font-display font-bold text-brand-dark mb-1">450+</h3>
                        <p className="text-xs text-gray-500">Cats Sheltered Yearly</p>
                    </div>

                    <div className="col-span-1 md:col-span-3 bg-brand-accent rounded-3xl p-8 text-white flex flex-col md:flex-row md:items-center justify-between shadow-md relative overflow-hidden">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-10 opacity-10">
                            <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                        </div>
                        <div className="z-10">
                            <h3 className="text-xl md:text-2xl font-display font-bold mb-2 tracking-tight">IIUM Student-Run</h3>
                            <p className="text-teal-100 text-sm opacity-90 max-w-sm">Animal Husbandry Club Initiative</p>
                        </div>
                        <div className="z-10 mt-6 md:mt-0">
                            <div className="w-12 h-12 rounded-full border border-teal-400 flex items-center justify-center text-teal-100 bg-teal-800/30">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LATEST RESCUES SECTION */}
            <section className="max-w-7xl mx-auto px-8 md:px-16 py-16">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-brand-dark mb-3 tracking-tight">Latest Rescues</h2>
                        <p className="text-gray-500 text-sm">Meet the newest members of our atelier looking for their forever studio.</p>
                    </div>
                    <Link to="/cats" className="text-brand-secondary text-sm font-semibold hover:text-brand-primary hidden md:inline-flex items-center gap-1 transition-colors">
                        See All Cats <span>&rarr;</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Cat 1 */}
                    <div className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] bg-gray-100 mb-5">
                            <img src="/images/rescue_cat_1_1775141631751.png" alt="Mochi" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-700">Available</div>
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-xl font-bold font-display text-brand-dark group-hover:text-brand-primary transition-colors">Mochi</h4>
                                <p className="text-gray-500 text-sm">3 Years • Russian Blue</p>
                            </div>
                            <div className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded uppercase tracking-wider font-bold">Active</div>
                        </div>
                    </div>

                    {/* Cat 2 */}
                    <div className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] bg-gray-100 mb-5">
                            <img src="/images/rescue_cat_2_1775141647261.png" alt="Oreo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-700">Available</div>
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-xl font-bold font-display text-brand-dark group-hover:text-brand-primary transition-colors">Oreo</h4>
                                <p className="text-gray-500 text-sm">2 Years • Calico</p>
                            </div>
                            <div className="bg-blue-50 text-blue-600 border border-blue-100 text-[10px] px-2 py-1 rounded uppercase tracking-wider font-bold">Senior</div>
                        </div>
                    </div>

                    {/* Cat 3 */}
                    <div className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] bg-gray-100 mb-5">
                            <img src="/images/rescue_cat_3_1775141665152.png" alt="Pearl" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-700">Available</div>
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-xl font-bold font-display text-brand-dark group-hover:text-brand-primary transition-colors">Pearl</h4>
                                <p className="text-gray-500 text-sm">1 Year • Persian Mix</p>
                            </div>
                            <div className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded uppercase tracking-wider font-bold">Active</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="max-w-7xl mx-auto px-8 md:px-16 py-16">
                <div className="bg-gradient-to-br from-brand-secondary to-brand-primary rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-xl shadow-brand-primary/20">
                    <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-12">
                        <svg className="w-96 h-96" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </div>

                    <div className="relative z-10 max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6">Join the IIUM AHC Mission.</h2>
                        <p className="text-lg text-orange-100 mb-10 opacity-90 max-w-md leading-relaxed">
                            Your donations directly fund medical treatments, premium nutrition, and cozy shelters for cats waiting for their forever homes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/donate" className="bg-white text-brand-primary hover:bg-orange-50 font-bold px-8 py-3.5 rounded-full text-center transition-colors shadow-sm">
                                Donate Now
                            </Link>
                            <Link to="/about" className="bg-transparent border border-orange-300 text-white hover:bg-orange-800/30 font-medium px-8 py-3.5 rounded-full text-center transition-colors">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
