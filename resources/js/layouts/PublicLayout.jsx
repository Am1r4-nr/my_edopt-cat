import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function PublicLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-brand-base bg-boho-pattern bg-cover bg-fixed text-brand-dark font-sans selection:bg-brand-primary selection:text-white">
            <header className="py-6 px-8 md:px-16 flex justify-between items-center max-w-7xl mx-auto w-full">
                <Link to="/" className="text-2xl font-display font-bold tracking-tight text-brand-dark">
                    e-Doptcat
                </Link>
                <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-500">
                    <Link to="/" className="hover:text-brand-dark transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-brand-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">Home</Link>
                    <Link to="/cats" className="hover:text-brand-dark transition-colors">View Cats</Link>
                    <Link to="/donate" className="hover:text-brand-dark transition-colors">Donate</Link>
                    <Link to="/events" className="hover:text-brand-dark transition-colors">Events</Link>
                    <Link to="/about" className="hover:text-brand-dark transition-colors">About Us</Link>
                    <Link to="/incidents" className="hover:text-brand-dark transition-colors">Incidents</Link>
                    <Link to="/gps" className="hover:text-brand-dark transition-colors flex items-center gap-1">📍 <span className="text-[10px] uppercase font-bold tracking-widest text-[#b35e19]">Map</span></Link>
                </nav>
                <div className="flex items-center space-x-4">
                    <Link to="/incidents" className="bg-[#b35e19] text-white font-medium px-6 py-2.5 rounded-full shadow-md hover:bg-orange-600 transition-colors text-sm">
                        Report Incident
                    </Link>
                    <Link to="/cats" className="bg-gradient-to-r from-brand-primary to-orange-400 text-white font-medium px-8 py-2.5 rounded-full shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all text-sm">
                        Adopt Now
                    </Link>
                </div>
            </header>

            <main className="flex-grow w-full">
                <Outlet />
            </main>

            <footer className="w-full mt-24 py-16 px-8 md:px-16 max-w-7xl mx-auto border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-1">
                        <Link to="/" className="text-xl font-display font-bold text-brand-dark mb-4 block">
                            e-Doptcat
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            A sanctuary where every paw finds its way home. Dedicated to high-end feline care and boutique adoption experiences.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-brand-secondary text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link to="/privacy" className="hover:text-brand-primary transition-colors hover:underline">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-brand-primary transition-colors hover:underline">Terms of Service</Link></li>
                            <li><Link to="/contact" className="hover:text-brand-primary transition-colors hover:underline">Contact Support</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-brand-secondary text-sm mb-4 uppercase tracking-wider">Social</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-brand-primary transition-colors hover:underline">Facebook</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors hover:underline">Instagram</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors hover:underline">TikTok</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-brand-secondary text-sm mb-4 uppercase tracking-wider">Stay Updated</h4>
                        <div className="flex mt-2">
                            <input type="email" placeholder="Email address" className="bg-brand-input border-none rounded-l-full px-5 py-2.5 w-full text-sm focus:ring-2 focus:ring-brand-primary" />
                            <button className="bg-brand-secondary hover:bg-brand-dark transition-colors text-white px-5 rounded-r-full flex items-center justify-center">
                                &rarr;
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-16 pt-8 text-center text-xs text-gray-400">
                    &copy; 2026 e-Doptcat Abu Hurairah Club. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
