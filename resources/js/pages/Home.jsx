import React from 'react';
import { Heart, Search, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="bg-brand-cream/10 dark:bg-gray-900 min-h-screen">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-mocha/5 to-transparent dark:from-brand-mocha/10 pointer-events-none" />

                <div className="relative max-w-7xl mx-auto pt-20 pb-24 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 xl:px-12 items-center">
                    <div className="px-6 lg:px-0 lg:pt-4">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <div className="hidden sm:mb-8 sm:flex">
                                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 dark:text-gray-300 ring-1 ring-gray-900/10 dark:ring-white/10 hover:ring-gray-900/20 dark:hover:ring-white/20">
                                    Adopting love, one cat at a time. <Link to="/about" className="font-semibold text-brand-mocha dark:text-brand-cream"><span className="absolute inset-0" aria-hidden="true" />Read more <span aria-hidden="true">&rarr;</span></Link>
                                </div>
                            </div>
                            <h1 className="mt-10 text-4xl font-bold tracking-tight text-brand-mocha dark:text-brand-cream sm:text-6xl font-sans">
                                Find Your Purrfect <br className="hidden lg:block" />
                                <span className="text-[#8B7E74] dark:text-[#E5D4A0]">Soulmate</span>
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                Connect with loving cats waiting for a forever home. Managed by the Abu Hurairah Club (AHC) to ensure every stray finds warmth and care.
                            </p>
                            <div className="mt-10 flex items-center gap-x-6">
                                <Link
                                    to="/register"
                                    className="rounded-full bg-brand-mocha px-8 py-3.5 text-sm font-semibold text-white shadow-xl hover:bg-brand-mocha/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-mocha transition-all transform hover:-translate-y-1"
                                >
                                    Start Adoption
                                </Link>
                                <Link to="/cats" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white flex items-center group">
                                    Browse Cats <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow relative">
                        <div className="absolute -top-20 -left-20 w-96 h-96 bg-brand-cream/30 rounded-full blur-3xl opacity-50 dark:opacity-20 animate-pulse" />
                        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                            {/* Decorative image placeholder until we have a real one */}
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-200 dark:bg-gray-800 aspect-[4/3] transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                                <img
                                    src="https://images.unsplash.com/photo-1548802673-380ab8ebc427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                    alt="Happy Cat"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-6 left-6 z-20 text-white">
                                    <p className="font-bold text-lg">Meet Luna</p>
                                    <p className="text-sm text-gray-200">Adopted 2 weeks ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats/Features */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            { name: 'Loving Care', icon: Heart, description: 'Full medical checkups and vaccinations for every rescue.' },
                            { name: 'Local Rescues', icon: MapPin, description: 'Managed by the Abu Hurairah Club (AHC) to help strays finds homes.' },
                            { name: 'Easy Match', icon: Search, description: 'Smart filtering to match you with your ideal companion.' },
                        ].map((feature) => (
                            <div key={feature.name} className="relative pl-16 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                    <div className="absolute left-6 top-8 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-mocha/10">
                                        <feature.icon className="h-6 w-6 text-brand-mocha dark:text-brand-cream" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">{feature.description}</dd>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl text-center p-12 bg-brand-mocha rounded-[3rem] relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-10" />
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Ready to welcome a new friend?
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-brand-cream/90">
                            Thousands of homeless cats are waiting for a loving family. Make a difference today.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                to="/cats"
                                className="rounded-full bg-brand-cream px-8 py-3.5 text-sm font-semibold text-brand-mocha shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
                            >
                                View Available Cats
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
