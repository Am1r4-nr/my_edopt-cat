import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState(null);
    
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!agreed) {
            setError('Please agree to the Terms and Conditions.');
            return;
        }
        if (password !== passwordConfirmation) {
            setError('Passwords do not match');
            return;
        }
        try {
            await register({ name, email, password, password_confirmation: passwordConfirmation });
            navigate('/'); 
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 flex items-center justify-center min-h-[70vh]">
            <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                
                {/* Left Side: Graphic / Text */}
                <div className="hidden md:flex flex-col justify-center space-y-8 h-full">
                    <div className="inline-flex self-start bg-orange-100/50 text-brand-secondary px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border border-orange-200/50">
                        Join the Family
                    </div>
                    
                    <h2 className="text-[3.5rem] leading-[1.05] tracking-tight font-display font-bold text-brand-dark">
                        Start your <br />
                        <span className="italic font-serif font-medium text-brand-primary">feline</span> journey.
                    </h2>
                    
                    <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                        Join a community of passionate cat lovers. Whether you're looking to adopt, volunteer, or support our sanctuary, your journey begins here in our nurturing atelier.
                    </p>

                    <div className="flex gap-4 pt-4">
                        <div className="bg-[#f0ebe3] px-6 py-4 rounded-2xl border border-white/50 shadow-sm flex-1">
                            <svg className="w-5 h-5 text-brand-secondary mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            <h4 className="font-display font-bold text-brand-dark text-lg">400+ Cats</h4>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Waiting for a home</p>
                        </div>
                        <div className="bg-[#f0ebe3] px-6 py-4 rounded-2xl border border-white/50 shadow-sm flex-1">
                            <svg className="w-5 h-5 text-brand-secondary mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                            <h4 className="font-display font-bold text-brand-dark text-lg">1.2k Members</h4>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Supporting the cause</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="flex flex-col justify-center p-2">
                    <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl shadow-gray-200/50 relative overflow-hidden">
                        
                        {/* Decorative dots top right */}
                        <div className="absolute top-8 right-8 text-gray-200 grid grid-cols-3 gap-1.5 opacity-50">
                            {[...Array(9)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-current"></div>)}
                        </div>

                        <h2 className="text-3xl font-display font-bold text-brand-dark mb-2">Create Account</h2>
                        <p className="text-gray-500 text-sm w-4/5 mb-8">Please fill in your details to get started.</p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && <div className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl font-medium">{error}</div>}
                            
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        name="name" 
                                        required 
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="John Doe"
                                        className="w-full bg-brand-input border-0 rounded-xl pl-4 pr-10 py-3.5 text-sm focus:ring-2 focus:ring-brand-primary/50 text-brand-dark placeholder-gray-400"
                                    />
                                    <svg className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Email address</label>
                                <div className="relative">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        required 
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="jane@example.com"
                                        className="w-full bg-brand-input border-0 rounded-xl pl-4 pr-10 py-3.5 text-sm focus:ring-2 focus:ring-brand-primary/50 text-brand-dark placeholder-gray-400"
                                    />
                                    <svg className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                                    <div className="relative">
                                        <input 
                                            type="password" 
                                            name="password" 
                                            required 
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-brand-input border-0 rounded-xl pl-4 pr-10 py-3.5 text-sm focus:ring-2 focus:ring-brand-primary/50 text-brand-dark placeholder-gray-400"
                                        />
                                        <svg className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Confirm Password</label>
                                    <div className="relative">
                                        <input 
                                            type="password" 
                                            name="password_confirmation"
                                            required 
                                            value={passwordConfirmation}
                                            onChange={e => setPasswordConfirmation(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-brand-input border-0 rounded-xl pl-4 pr-10 py-3.5 text-sm focus:ring-2 focus:ring-brand-primary/50 text-brand-dark placeholder-gray-400"
                                        />
                                        <svg className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 pt-3 pb-2">
                                <input 
                                    type="checkbox" 
                                    required
                                    checked={agreed}
                                    onChange={e => setAgreed(e.target.checked)}
                                    className="w-4 h-4 mt-0.5 rounded border-gray-300 text-brand-primary focus:ring-brand-primary/50 bg-white" 
                                />
                                <label className="text-xs text-gray-500 leading-snug">
                                    I agree to the <Link to="/terms" className="font-bold text-brand-secondary hover:text-brand-primary">Terms and Conditions</Link> and <Link to="/privacy" className="font-bold text-brand-secondary hover:text-brand-primary">Privacy Policy</Link> of e-Doptcat.
                                </label>
                            </div>

                            <div className="pt-2">
                                <button type="submit" className="w-full bg-gradient-to-r from-brand-secondary to-brand-primary hover:from-brand-primary hover:to-orange-400 text-white font-bold py-4 rounded-full shadow-lg shadow-brand-primary/30 transition-all hover:shadow-brand-primary/50 text-center">
                                    Create Account
                                </button>
                            </div>

                            <div className="text-center mt-6">
                                <p className="text-xs text-gray-500">
                                    Already have an account? <Link to="/login" className="font-bold text-brand-secondary hover:text-brand-primary">Login</Link>
                                </p>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
        </section>
    );
}
