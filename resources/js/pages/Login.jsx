import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await login({ email, password });
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 flex items-center justify-center min-h-[70vh]">
            <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                {/* Left Side: Graphic */}
                <div className="hidden md:block relative h-full min-h-[500px]">
                    <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl">
                        <img 
                            src="/images/hero_cat_1775141614458.png" 
                            alt="Welcome Back" 
                            className="w-full h-full object-cover object-center"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    </div>
                    
                    {/* Text overlay */}
                    <div className="absolute bottom-16 left-8 z-10 text-white">
                        <h2 className="text-3xl font-display font-bold leading-tight">Welcome Back to <br/>the Sanctuary</h2>
                    </div>

                    {/* Floating active cases card */}
                    <div className="absolute -bottom-6 left-8 w-64 bg-[#efe9df] rounded-2xl p-4 shadow-xl flex items-center gap-4 z-20">
                        <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-white shrink-0 shadow-inner">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Active Cases</p>
                            <p className="text-sm font-display font-bold text-brand-dark">1,240 Cats Housed</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="flex flex-col justify-center">
                    <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl shadow-gray-200/50">
                        <h2 className="text-3xl font-display font-bold text-brand-dark mb-2">Login</h2>
                        <p className="text-gray-500 text-sm w-4/5 mb-8">Continue your journey in cat guardianship.</p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && <div className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl font-medium">{error}</div>}
                            
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email address</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    required 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="hello@example.com"
                                    className="w-full bg-brand-input border-0 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-brand-primary/50 text-brand-dark placeholder-gray-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    required 
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-brand-input border-0 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-brand-primary/50 text-brand-dark placeholder-gray-400"
                                />
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary/50 bg-white" />
                                    <span className="text-xs text-gray-600 font-medium">Remember Me</span>
                                </label>
                                <Link to="/forgot-password" className="text-xs font-bold text-brand-secondary hover:text-brand-primary transition-colors">
                                    Forgot Password?
                                </Link>
                            </div>

                            <div className="pt-4">
                                <button type="submit" className="w-full bg-gradient-to-r from-brand-secondary to-brand-primary hover:from-brand-primary hover:to-orange-400 text-white font-bold py-4 rounded-full shadow-lg shadow-brand-primary/30 transition-all hover:shadow-brand-primary/50 flex justify-center items-center gap-2">
                                    Login <span>&rarr;</span>
                                </button>
                            </div>

                            <div className="text-center mt-6">
                                <p className="text-xs text-gray-500">
                                    Don't have an account? <Link to="/register" className="font-bold text-brand-secondary hover:text-brand-primary">Register Now</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
