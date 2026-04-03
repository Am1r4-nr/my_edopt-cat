import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/Card';

export default function FinanceDashboard() {
    const [data, setData] = useState({
        metrics: { total_raised: 0, active_cases: 0, completed_cases: 0 },
        recent_donations: [],
        active_tracking: []
    });
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await axios.get('/api/admin/donations', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setData(res.data);
        } catch (err) {
            console.error("Error fetching financial data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const markAsFunded = async (caseId) => {
        try {
            await axios.post(`/api/admin/donation-cases/${caseId}/mark-funded`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            fetchData(); // Refresh payload
        } catch (err) {
            console.error("Error marking case as funded", err);
        }
    };

    return (
        <div className="space-y-8 bg-[#FDFBF7] p-8 rounded-3xl min-h-screen">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold text-brand-dark mb-1">Donation & Fund Management</h1>
                <p className="text-sm text-gray-500">Real-time overview of kitten rescue contributions.</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white rounded-3xl border-0 shadow-sm relative overflow-hidden">
                    <CardContent className="p-8">
                        <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mb-2">Total Funds Raised</p>
                        <h2 className="text-4xl font-display font-bold text-brand-dark mb-4">
                            RM {parseFloat(data.metrics.total_raised || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </h2>
                        <div className="flex items-center text-xs font-bold text-green-600 bg-green-50 w-max px-3 py-1 rounded-full">
                            <span className="mr-1">&uarr;</span> 12% from last month
                        </div>
                        {/* Motif */}
                        <div className="absolute right-[-20px] bottom-[-20px] opacity-5 text-brand-secondary">
                            <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white rounded-3xl border-0 shadow-sm relative overflow-hidden">
                    <CardContent className="p-8">
                        <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mb-2">Active Cases</p>
                        <h2 className="text-4xl font-display font-bold text-brand-dark mb-4">{data.metrics.active_cases}</h2>
                        <p className="text-xs text-gray-400">Kittens awaiting full funding</p>
                    </CardContent>
                </Card>

                <Card className="bg-white rounded-3xl border-0 shadow-sm relative overflow-hidden">
                    <CardContent className="p-8">
                        <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mb-2">Completed Cases</p>
                        <h2 className="text-4xl font-display font-bold text-brand-dark mb-4">{data.metrics.completed_cases}</h2>
                        <p className="text-xs text-gray-400">Fully adopted & medical bills cleared</p>
                        <div className="absolute right-4 bottom-4 opacity-5 text-green-600">
                             <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Donations Table */}
            <Card className="bg-white rounded-3xl border-0 shadow-sm">
                <CardContent className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-display font-bold text-brand-dark flex items-center gap-2">
                            <span className="w-2 h-2 rounded bg-brand-primary"></span>
                            Recent Donations
                        </h3>
                        <button className="text-xs font-bold text-brand-primary hover:text-orange-500">View All History &rsaquo;</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 uppercase text-[10px] tracking-widest text-gray-400">
                                    <th className="font-bold pb-4">Donor Name</th>
                                    <th className="font-bold pb-4">Cat Case</th>
                                    <th className="font-bold pb-4">Amount (RM)</th>
                                    <th className="font-bold pb-4">Method</th>
                                    <th className="font-bold pb-4">Transaction ID</th>
                                    <th className="font-bold pb-4">Status</th>
                                    <th className="font-bold pb-4">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr><td colSpan="7" className="py-8 text-center text-gray-400">Loading records...</td></tr>
                                ) : data.recent_donations.length === 0 ? (
                                    <tr><td colSpan="7" className="py-8 text-center text-gray-400">No donations recorded yet.</td></tr>
                                ) : (
                                    data.recent_donations.map((row) => (
                                        <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-4 font-medium text-brand-dark">{row.donor_name}</td>
                                            <td className="py-4 text-gray-600">{row.cat_case}</td>
                                            <td className="py-4 font-bold text-brand-dark">{parseFloat(row.amount).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                            <td className="py-4 text-gray-600">{row.method}</td>
                                            <td className="py-4 text-gray-400 font-mono text-xs">{row.transaction_id}</td>
                                            <td className="py-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                    row.status === 'success' ? 'bg-green-50 text-green-600' :
                                                    row.status === 'pending' ? 'bg-yellow-50 text-yellow-600' :
                                                    'bg-red-50 text-red-600'
                                                }`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td className="py-4 text-gray-500 text-xs">{row.date}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Active Cases Tracking */}
            <Card className="bg-white rounded-3xl border-0 shadow-sm overflow-hidden text-brand-dark">
                <CardContent className="p-8">
                     <h3 className="text-lg font-display font-bold mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded bg-brand-primary"></span>
                            Active Cases Tracking
                     </h3>

                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                         {data.active_tracking.filter(c => c.status === 'active').length === 0 && !loading && (
                             <p className="col-span-2 text-gray-400 text-sm">No active cases to track.</p>
                         )}
                         {data.active_tracking.filter(c => c.status === 'active').map(cause => {
                             const percent = Math.min(Math.round((cause.current_amount / cause.target_amount) * 100), 100);
                             const fullyFunded = percent >= 100;

                             return (
                                 <div key={cause.id} className="bg-brand-base p-6 rounded-3xl border border-gray-100 flex flex-col gap-6">
                                     {/* Header Info */}
                                     <div className="flex items-center gap-4">
                                         <img src={`https://source.unsplash.com/random/100x100/?cat,${cause.id}`} alt="Cat" className="w-14 h-14 rounded-full object-cover shadow-sm bg-white" />
                                         <div className="flex-1">
                                             <h4 className="font-display font-bold text-brand-dark leading-tight">{cause.title}</h4>
                                             <p className="text-xs text-gray-500 line-clamp-1">{cause.description}</p>
                                         </div>
                                         <div className="bg-gray-100 px-3 py-1 rounded text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0">
                                             {cause.cat_id ? '#'+cause.cat_id : 'Gen'}
                                         </div>
                                     </div>

                                     {/* Bar */}
                                     <div>
                                         <div className="flex justify-between items-center mb-2">
                                             <p className="text-xs font-bold text-brand-secondary">RM {cause.current_amount} raised</p>
                                             <p className="text-xs font-bold text-gray-400">Goal: RM {cause.target_amount}</p>
                                         </div>
                                         <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                                             <div className="h-full bg-brand-secondary transition-all" style={{ width: `${percent}%`}}></div>
                                         </div>
                                     </div>

                                     {/* Button */}
                                     <div className="mt-auto flex justify-end">
                                         {fullyFunded ? (
                                              <button 
                                                onClick={() => markAsFunded(cause.id)}
                                                className="bg-brand-secondary hover:bg-brand-dark text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-md transition-colors flex items-center gap-2"
                                              >
                                                  <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80"></span>
                                                  Mark as Funded
                                              </button>
                                         ) : (
                                              <button disabled className="bg-gray-100 text-gray-400 text-xs font-bold px-6 py-2.5 rounded-full transition-colors cursor-not-allowed">
                                                  Goal not reached
                                              </button>
                                         )}
                                     </div>
                                 </div>
                             );
                         })}
                     </div>
                </CardContent>
            </Card>

        </div>
    );
}
