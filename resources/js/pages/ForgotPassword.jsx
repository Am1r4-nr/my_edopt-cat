import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setStatus(null);
        try {
            await axios.get('/sanctum/csrf-cookie');
            const response = await axios.post('/forgot-password', { email });
            setStatus(response.data.status || 'Password reset link sent! Check your email.');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send reset link.');
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 flex items-center justify-center min-h-[70vh]">
            <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                
                {/* Left Side: Graphic */}
                <div className="hidden md:block relative h-full min-h-[500px]">
                    <div className="absolute inset-0 right-12 bottom-12 rounded-[2.5rem] overflow-hidden shadow-xl bg-white border-[12px] border-white z-10">
                        <img 
                            src="/images/hero_cat_1775141614458.png" 
                            alt="Cat" 
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                    {/* Floating smaller image */}
                    <div className="absolute bottom-0 right-0 w-64 h-40 rounded-2xl overflow-hidden shadow-2xl bg-white border-8 border-white z-20 rotate-[-4deg]">
                        <img 
                            src="/images/rescue_cat_1_1775141631751.png" 
                            alt="Small Cat" 
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="flex flex-col justify-center">
                    <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl shadow-gray-200/50">
                        
                        <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mb-4">Account Recovery</p>
                        <h2 className="text-3xl font-display font-bold text-brand-dark mb-4">Forgot password?</h2>
                        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                            Don't worry, it happens to the best of us. Enter the email associated with your e-Doptcat account and we'll send a secure link to reset it.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {status && <div className="text-green-600 border border-green-200 text-sm bg-green-50 px-4 py-3 rounded-xl font-medium">{status}</div>}
                            {error && <div className="text-red-500 border border-red-200 text-sm bg-red-50 px-4 py-3 rounded-xl font-medium">{error}</div>}
                            
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Email address</label>
                                <div className="relative">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        required 
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="hello@example.com"
                                        className="w-full bg-brand-input border-0 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-brand-primary/50 text-brand-dark placeholder-gray-400"
                                    />
                                    <svg className="w-5 h-5 text-brand-secondary absolute left-4 top-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                                </div>
                            </div>

                            <div className="bg-[#f0ebe3]/60 rounded-xl p-4 flex gap-3 text-xs text-gray-600">
                                <div className="mt-0.5 shrink-0">
                                    <svg className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                                </div>
                                <p className="leading-relaxed">Check your inbox and spam folder for the recovery link. The link will remain active for 24 hours for security.</p>
                            </div>

                            <div className="pt-2">
                                <button type="submit" className="w-full bg-gradient-to-r from-brand-secondary to-brand-primary hover:from-brand-primary hover:to-orange-400 text-white font-bold py-4 rounded-full shadow-lg shadow-brand-primary/30 transition-all hover:shadow-brand-primary/50 flex justify-center items-center gap-2">
                                    Send Reset Link <span>&rarr;</span>
                                </button>
                            </div>

                            <div className="text-center mt-6">
                                <Link to="/login" className="text-xs font-bold text-gray-400 flex items-center justify-center gap-1 hover:text-brand-dark transition-colors">
                                    <span>&larr;</span> Back to Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
