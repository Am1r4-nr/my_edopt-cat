import React from 'react';
import { Heart, Users, Shield, Cat } from 'lucide-react';

export default function About() {
    return (
        <div className="bg-brand-cream/30 dark:bg-gray-900 min-h-screen">
            {/* Header */}
            <div className="relative bg-brand-mocha dark:bg-gray-800 text-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-brand-cream">
                        About E-DOPTCAT
                    </h1>
                    <p className="mt-6 text-xl max-w-3xl mx-auto text-brand-cream/80">
                        We are dedicated to connecting homeless cats with loving families around IIUM Gombak. An initiative by the Abu Hurairah Club (AHC) to ensure every cat finds their purrfect match.
                    </p>
                </div>
                <div className="absolute inset-x-0 -bottom-1 h-32 bg-gradient-to-t from-brand-cream/30 dark:from-gray-900 to-transparent pointer-events-none" />
            </div>

            {/* Mission Section */}
            <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-brand-mocha dark:text-white mb-6">Our Mission</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            At E-DOPTCAT, we believe that every cat deserves a safe, loving home. Our platform was born from the need to modernize the animal shelter experience, making it easier for shelters to manage their residents and for potential adopters to find their new best friend.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            We work closely with the Abu Hurairah Club (AHC) at IIUM Gombak to help stray cats find care and permanent homes. Our AI-assisted matching system ensures that adoptions are successful and sustainable.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-brand-mocha transform rotate-3 rounded-3xl opacity-10"></div>
                        <img
                            src="https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                            alt="Team with cats"
                            className="relative rounded-3xl shadow-xl w-full object-cover h-96"
                        />
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="bg-white dark:bg-gray-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/20 text-pink-500 mb-4">
                                <Heart className="h-8 w-8" />
                            </div>
                            <h3 className="text-4xl font-bold text-gray-900 dark:text-white">500+</h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">Successful Adoptions</p>
                        </div>
                        <div className="p-6">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-500 mb-4">
                                <Cat className="h-8 w-8" />
                            </div>
                            <h3 className="text-4xl font-bold text-gray-900 dark:text-white">120</h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">Cats Currently in Care</p>
                        </div>
                        <div className="p-6">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-500 mb-4">
                                <Users className="h-8 w-8" />
                            </div>
                            <h3 className="text-4xl font-bold text-gray-900 dark:text-white">50+</h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">Dedicated Volunteers</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values */}
            <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-brand-mocha dark:text-white mb-12">Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: 'Compassion', icon: Heart, description: 'We treat every animal with kindness and respect.' },
                        { title: 'Integrity', icon: Shield, description: 'We are transparent in our operations and cat histories.' },
                        { title: 'Community', icon: Users, description: 'We build connections between people and pets.' }
                    ].map((value, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
                            <value.icon className="h-8 w-8 text-brand-mocha dark:text-brand-cream mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}
