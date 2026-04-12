import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
    return (
        <div className="w-full min-h-screen bg-brand-base font-sans text-brand-dark pb-24">

            {/* Section 1: Hero */}
            <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="max-w-xl">
                        <span className="bg-[#f5ead8] text-[#b35e19] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm inline-block mb-6 shadow-sm">
                            Our Sanctuary
                        </span>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-brand-dark tracking-tight mb-6 leading-tight">
                            About e-Doptcat
                        </h1>
                        <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed mb-6">
                            A real-time cat adoption and rescue management system by the Abu Hurairah Club (AHC), IIUM.
                        </p>
                        <div className="bg-[#fcf9f5] border border-[#f5ead8] p-6 rounded-3xl rounded-tl-none shadow-sm relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#b35e19] rounded-l-3xl"></div>
                            <p className="text-sm text-gray-500 leading-relaxed italic">
                                "AHC is a student-run organisation at IIUM dedicated to rescuing, caring for, and rehoming stray and abandoned cats on campus."
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="w-full aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                            <img src="/images/hero_cat_1775141614458.png" className="w-full h-full object-cover" alt="Orange Tabby Cat" />
                        </div>
                        {/* Decorative background blob */}
                        <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#f5ead8] rounded-full blur-3xl opacity-50 z-0"></div>
                    </div>
                </div>
            </div>

            {/* Section 2: Our Story */}
            <div className="max-w-3xl mx-auto px-6 py-16 text-center">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-8">Our Story</h2>
                <div className="space-y-6 text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
                    <p>
                        For years, the Abu Hurairah Club (AHC) worked tirelessly to manage campus cat welfare through fragmented channels. Our volunteers navigated manual processes, tracking rescues via social media DMs, and coordinated without a central system for urgent or unique needs. Records of adoptions and lists of ill cats got lost amidst the sheer volume of our thriving campus feline friends.
                    </p>
                    <p>
                        Recognizing this challenge, the vision for <strong>e-Doptcat</strong> was born. We needed more than just a website; we needed an entire digital sanctuary. By moving adoptions, incident tracking, and volunteer management online, we empowered our community to respond faster, track health history accurately, and connect hopeful adopters with their perfect feline matches seamlessly.
                    </p>
                </div>
            </div>

            {/* Section 3: Our Mission & Values */}
            <div className="bg-[#fcf9f5] border-y border-[#f5ead8] py-20 mt-8">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-4">Our Mission & Values</h2>
                        <p className="text-gray-500 text-sm">The pillars that support every rescue and every purr.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'Cat Welfare', icon: '🐾', desc: "Prioritizing the health, safety, and happiness of every campus feline under our care." },
                            { title: 'Transparency', icon: '👁️', desc: "Ensuring every donation and rescue action is clear and visible to our supporters." },
                            { title: 'Community', icon: '🤝', desc: "Fostering a strong network of student volunteers united by a love for cats." },
                            { title: 'Tech-Enabled Care', icon: '💻', desc: "Leveraging modern platforms to streamline our operations and improve rescue outcomes." }
                        ].map((val, idx) => (
                            <div key={idx} className="bg-[#ebe2d3] p-8 rounded-3xl text-center shadow-sm border border-[#dfd5c5] hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 mx-auto bg-[#f5ead8] rounded-full flex items-center justify-center text-xl mb-6 text-[#b35e19]">
                                    {val.icon}
                                </div>
                                <h3 className="font-bold text-brand-dark mb-3 text-sm uppercase tracking-wider">{val.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section 4: Meet the Team */}
            <div className="max-w-6xl mx-auto px-6 py-24">
                <div className="text-left mb-12">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-2">Meet the Team</h2>
                    <p className="text-gray-500 text-sm max-w-sm">The passionate hearts behind the platform.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { name: "Nur Amira Nabila Binti Mohd Alin", role: "Co-Founder", img: "https://i.pravatar.cc/300?img=47" },
                        { name: "Nurul Hazwani Binti Abdul Malik", role: "Co-Founder", img: "https://i.pravatar.cc/300?img=44" },
                        { name: "Dr. Mohd Khairul Azmi Bin Hassan", role: "Supervisor", img: "https://i.pravatar.cc/300?img=68" }
                    ].map((member, idx) => (
                        <div key={idx} className="flex flex-col group">
                            <div className="w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-5 bg-gray-200">
                                <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105" />
                            </div>
                            <h4 className="font-bold text-brand-dark text-base">{member.name}</h4>
                            <p className="text-[#b35e19] text-[10px] font-bold uppercase tracking-widest mt-1">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section 5: Volunteer CTA */}
            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="bg-gradient-to-br from-[#d97c2a] to-[#a85011] rounded-[3rem] p-12 md:p-16 text-center text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Want to make a difference for campus cats?</h2>
                        <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto mb-10 font-medium">
                            Join our growing community of volunteers and help advocate a better world for every stray at IIUM.
                        </p>
                        <Link to="/volunteer" className="bg-white text-[#b35e19] font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all inline-block">
                            Become a Volunteer
                        </Link>
                    </div>
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
                </div>
            </div>

            {/* Section 6: Reach Us */}
            <div className="max-w-6xl mx-auto px-6 py-20">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-10">Reach Us</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-10">
                        <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-full bg-[#fcf9f5] border border-[#f5ead8] flex items-center justify-center text-[#b35e19] text-xl shrink-0">✉️</div>
                            <div>
                                <h4 className="font-bold text-brand-dark text-sm mb-1">Email Us</h4>
                                <p className="text-xs text-gray-500">ahc.iium@student.iium.edu.my</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-full bg-[#fcf9f5] border border-[#f5ead8] flex items-center justify-center text-[#b35e19] text-xl shrink-0">📍</div>
                            <div>
                                <h4 className="font-bold text-brand-dark text-sm mb-1">Location</h4>
                                <p className="text-xs text-gray-500">IIUM Gombak Campus, 53100 Kuala Lumpur, Malaysia</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-full bg-[#fcf9f5] border border-[#f5ead8] flex items-center justify-center text-[#b35e19] text-xl shrink-0">🔗</div>
                            <div>
                                <h4 className="font-bold text-brand-dark text-sm mb-3">Follow Our Updates</h4>
                                <div className="flex gap-3">
                                    <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#b35e19] hover:text-white transition-colors">fb</a>
                                    <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#b35e19] hover:text-white transition-colors">ig</a>
                                    <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#b35e19] hover:text-white transition-colors">tt</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-[300px] rounded-[2rem] overflow-hidden shadow-sm relative">
                        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" alt="Map Location" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 bg-green-900/40 mix-blend-multiply"></div>
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-green-900/60 to-transparent"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#b35e19] rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-pulse">
                            <span className="text-white text-2xl">📍</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
