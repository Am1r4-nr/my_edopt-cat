import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Donate() {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [donationModal, setDonationModal] = useState({ open: false, caseId: null });

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const res = await axios.get('/api/donation-cases');
                setCases(res.data);
            } catch (err) {
                console.error("Failed to load cases", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCases();
    }, []);

    return (
        <div className="w-full relative min-h-screen pb-24">
            {/* Header */}
            <div className="text-center pt-16 pb-12 px-6 max-w-4xl mx-auto">
                <p className="text-[10px] font-bold tracking-widest text-brand-secondary uppercase mb-3">Giving Hope</p>
                <h1 className="text-5xl font-display font-bold text-brand-dark tracking-tight mb-6">Support Our Mission</h1>
                <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    Every contribution provides medical care, nutrition, and warm shelter for cats in transition. Join our community in giving these feline friends the life they deserve.
                </p>
            </div>

            {/* Cases Grid */}
            <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-3 text-center py-20 text-gray-500">Loading cases...</div>
                ) : cases.length === 0 ? (
                    <div className="col-span-3 text-center py-20 text-gray-400">No active donation cases at the moment.</div>
                ) : (
                    cases.map((cause, index) => {
                        const percent = Math.min(Math.round((cause.current_amount / cause.target_amount) * 100), 100);
                        const isFeatured = index === 0;

                        return (
                            <div key={cause.id} className={`bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col ${isFeatured ? 'md:col-span-2 md:flex-row gap-8' : ''}`}>
                                {/* Image Placeholder using dynamic random seeded images for UI testing since db cat image may be null */}
                                <div className={`aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden shrink-0 ${isFeatured ? 'md:w-1/2 md:aspect-auto md:h-full' : 'mb-5'}`}>
                                    <img src={`https://source.unsplash.com/random/800x600/?cat,${cause.id}`} alt="Cat" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col justify-between flex-1">
                                    <div className="mb-6">
                                        <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-2">{cause.title.split(' ')[0]}</p>
                                        <h3 className="text-2xl font-display font-bold text-brand-dark leading-tight mb-3">{cause.title}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">{cause.description}</p>
                                    </div>
                                    
                                    <div className="mt-auto">
                                        <div className="flex justify-between items-end mb-2">
                                            <p className="text-xs font-bold text-brand-dark">Progress</p>
                                            <p className="text-xs font-bold text-brand-primary">{percent}% Reached</p>
                                        </div>
                                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
                                            <div className="h-full bg-brand-primary rounded-full transition-all duration-1000" style={{ width: `${percent}%` }}></div>
                                        </div>
                                        <div className="flex justify-between items-center mb-6">
                                            <p className="text-[10px] font-bold uppercase text-gray-400">Raised: RM {cause.current_amount}</p>
                                            <p className="text-[10px] font-bold uppercase text-gray-400">Target: RM {cause.target_amount}</p>
                                        </div>
                                        <button 
                                            onClick={() => setDonationModal({ open: true, caseId: cause.id, title: cause.title })}
                                            className="w-full bg-brand-primary hover:bg-orange-500 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm text-sm"
                                        >
                                            Donate Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Impact Section */}
            <div className="max-w-7xl mx-auto px-6 md:px-16 mt-20">
                <div className="bg-gradient-to-r from-[#b35e19] to-brand-primary rounded-[2.5rem] p-12 text-white relative overflow-hidden shadow-xl">
                    {/* Background decor */}
                    <div className="absolute right-0 bottom-0 translate-x-20 translate-y-10 opacity-20">
                        <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
                    </div>
                    
                    <div className="relative z-10">
                        <h2 className="text-3xl font-display font-bold mb-4">Your Impact Last Month</h2>
                        <p className="text-orange-100 max-w-md leading-relaxed mb-10 text-sm">
                            Thanks to 420 generous donors, we successfully treated 15 emergency cases and found homes for 28 rescued cats.
                        </p>
                        <div className="grid grid-cols-3 gap-8 max-w-lg">
                            <div>
                                <h3 className="text-4xl font-display font-bold mb-1">15</h3>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-orange-200">Surgeries Funded</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-display font-bold mb-1">1,200kg</h3>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-orange-200">Food Distributed</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-display font-bold mb-1">28</h3>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-orange-200">Happy Adoptions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Donation Modal overlay */}
            {donationModal.open && (
                <DonationProcessModal 
                    close={() => setDonationModal({ open: false, caseId: null })}
                    caseId={donationModal.caseId}
                    caseTitle={donationModal.title}
                />
            )}
        </div>
    );
}

function DonationProcessModal({ close, caseId, caseTitle }) {
    const [amount, setAmount] = useState('50');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setError(null);

        try {
            const res = await axios.post('/api/donate', {
                case_id: caseId,
                amount: parseFloat(amount),
                name,
                email
            });
            
            // Redirect to ToyyibPay
            if (res.data.redirect_url) {
                window.location.href = res.data.redirect_url;
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl relative">
                <button onClick={close} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
                
                <h3 className="text-2xl font-display font-bold text-brand-dark mb-1">Complete Donation</h3>
                <p className="text-xs text-gray-500 mb-6 line-clamp-1">{caseTitle}</p>

                {error && <div className="bg-red-50 text-red-500 text-xs p-3 rounded-lg mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Select Amount (RM)</label>
                        <div className="grid grid-cols-3 gap-3 mb-3">
                            {['20', '50', '100'].map(val => (
                                <button type="button" key={val} onClick={() => setAmount(val)} className={`py-3 rounded-xl border text-sm font-bold transition-all ${amount === val ? 'bg-brand-primary text-white border-brand-primary' : 'bg-transparent text-gray-500 border-gray-200 hover:border-brand-primary'}`}>
                                    RM {val}
                                </button>
                            ))}
                        </div>
                        <input 
                            type="number" 
                            min="1" 
                            placeholder="Custom Amount" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-brand-input border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary/50 text-brand-dark" 
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Donor Details</label>
                        <input type="text" required placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-brand-input border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary/50 text-brand-dark mb-3" />
                        <input type="email" required placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-brand-input border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary/50 text-brand-dark" />
                    </div>
                    <button type="submit" disabled={processing} className="w-full bg-gradient-to-r from-brand-secondary to-brand-primary hover:from-brand-primary hover:to-orange-400 text-white font-bold py-4 rounded-xl shadow-lg mt-4 disabled:opacity-50">
                        {processing ? 'Processing...' : `Pay RM ${amount || 0}`}
                    </button>
                </form>
            </div>
        </div>
    );
}
