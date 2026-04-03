import React, { useState } from 'react';
import { Heart, DollarSign, Gift, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function Donate() {
    const [amount, setAmount] = useState('50');
    const [customAmount, setCustomAmount] = useState('');
    const [donationType, setDonationType] = useState('once');

    const handleCustomChange = (e) => {
        setCustomAmount(e.target.value);
        setAmount('custom');
    };

    const handleAmountSelect = (val) => {
        setAmount(val);
        setCustomAmount('');
    };

    return (
        <div className="min-h-screen bg-brand-cream/30 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-brand-mocha dark:text-brand-cream mb-4">
                        Support Our Furry Friends
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Your donation provides food, medical care, and shelter for cats in need. Every dollar makes a difference.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <Card className="p-6 bg-white dark:bg-gray-800 border-t-4 border-brand-mocha text-center hover:shadow-lg transition-all">
                        <div className="mx-auto bg-brand-mocha/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <Gift className="text-brand-mocha h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2 dark:text-white">$25 Provides</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Food for one cat for two weeks.</p>
                    </Card>
                    <Card className="p-6 bg-white dark:bg-gray-800 border-t-4 border-brand-mocha text-center hover:shadow-lg transition-all transform md:-translate-y-2">
                        <div className="mx-auto bg-brand-mocha/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <Heart className="text-brand-mocha h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2 dark:text-white">$50 Provides</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Basic vaccinations and a health check.</p>
                    </Card>
                    <Card className="p-6 bg-white dark:bg-gray-800 border-t-4 border-brand-mocha text-center hover:shadow-lg transition-all">
                        <div className="mx-auto bg-brand-mocha/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <DollarSign className="text-brand-mocha h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2 dark:text-white">$100 Provides</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Spay/Neuter surgery for one cat.</p>
                    </Card>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Make a Donation</h2>

                        {/* Donation Type */}
                        <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl mb-8 w-fit mx-auto md:mx-0">
                            <button
                                onClick={() => setDonationType('once')}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${donationType === 'once' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}
                            >
                                Give Once
                            </button>
                            <button
                                onClick={() => setDonationType('monthly')}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${donationType === 'monthly' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}
                            >
                                Monthly
                            </button>
                        </div>

                        {/* Amount Selection */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {['10', '25', '50', '100'].map((val) => (
                                <button
                                    key={val}
                                    onClick={() => handleAmountSelect(val)}
                                    className={`py-3 rounded-xl border-2 font-bold text-lg transition-all
                                        ${amount === val
                                            ? 'border-brand-mocha bg-brand-mocha/5 text-brand-mocha'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-brand-mocha/50 text-gray-600 dark:text-gray-300'}`}
                                >
                                    ${val}
                                </button>
                            ))}
                        </div>

                        {/* Custom Amount */}
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Or enter a custom amount</label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <Input
                                    type="number"
                                    value={customAmount}
                                    onChange={handleCustomChange}
                                    className="pl-7 text-lg"
                                    placeholder="Enter amount"
                                />
                            </div>
                        </div>

                        {/* Payment Mock */}
                        <div className="space-y-4">
                            <Button className="w-full h-12 text-lg bg-brand-mocha hover:bg-brand-mocha/90 dark:bg-brand-cream dark:text-brand-mocha dark:hover:bg-brand-cream/90">
                                Donate {amount === 'custom' ? `$${customAmount || '0'}` : `$${amount}`} {donationType === 'monthly' && '/ month'}
                            </Button>
                            <p className="text-xs text-center text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                                <CheckCircle className="h-3 w-3" /> Secure payment processing provided by Stripe
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
