import React from 'react';
import {
    Users,
    Cat,
    Heart,
    DollarSign,
    ArrowUpRight,
    TrendingUp,
    Activity,
    Calendar as CalendarIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
    // Mock Data for Charts
    const data = [
        { name: 'Jan', adoptions: 4, intakes: 6 },
        { name: 'Feb', adoptions: 7, intakes: 5 },
        { name: 'Mar', adoptions: 5, intakes: 8 },
        { name: 'Apr', adoptions: 12, intakes: 9 },
        { name: 'May', adoptions: 15, intakes: 12 },
        { name: 'Jun', adoptions: 10, intakes: 8 },
        { name: 'Jul', adoptions: 18, intakes: 10 },
    ];

    const stats = [
        {
            name: 'Total Care',
            value: '124',
            label: 'Cats in System',
            change: '+12%',
            icon: Cat,
            gradient: 'from-blue-500 to-cyan-400',
            bg: 'bg-blue-50'
        },
        {
            name: 'Adoptions',
            value: '38',
            label: 'This Month',
            change: '+15.2%',
            icon: Heart,
            gradient: 'from-rose-500 to-pink-400',
            bg: 'bg-pink-50'
        },
        {
            name: 'Volunteers',
            value: '45',
            label: 'Active Team',
            change: '+2',
            icon: Users,
            gradient: 'from-emerald-500 to-teal-400',
            bg: 'bg-emerald-50'
        },
        {
            name: 'Revenue',
            value: '$12.4k',
            label: 'Donations YTD',
            change: '+8%',
            icon: DollarSign,
            gradient: 'from-violet-600 to-purple-400',
            bg: 'bg-purple-50'
        },
    ];

    const activities = [
        { id: 1, text: 'Luna was adopted by Sarah J.', time: '2 hours ago', type: 'adoption' },
        { id: 2, text: 'New intake: Oliver (Siamese)', time: '4 hours ago', type: 'intake' },
        { id: 3, text: 'Medical checkup completed for Mittens', time: '5 hours ago', type: 'medical' },
        { id: 4, text: 'Volunteer orientation scheduled', time: '1 day ago', type: 'other' },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-6 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-sm">
                <div>
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-brand-mocha to-gray-600 dark:from-brand-cream dark:to-gray-400 bg-clip-text text-transparent">
                        Dashboard
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Welcome back, Admin</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <Card key={item.name} className="border-0 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md overflow-hidden group">
                        <CardContent className="p-6 relative">
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.gradient} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`}></div>

                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-2xl ${item.bg} dark:bg-gray-700 shadow-inner`}>
                                    <item.icon className={`h-6 w-6 text-brand-mocha dark:text-brand-cream`} style={{ color: 'inherit' }} />
                                </div>
                                <div className="flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full border border-green-100 dark:border-green-900/30">
                                    <TrendingUp className="h-3 w-3" />
                                    {item.change}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-4xl font-bold text-gray-800 dark:text-white tracking-tight">{item.value}</h3>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">{item.name}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.label}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="lg:col-span-2">
                    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-white">
                                <Activity className="h-5 w-5 text-indigo-500" />
                                Adoption vs Intake Trends
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[350px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorAdoptions" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorIntakes" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.1} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            cursor={{ stroke: '#9ca3af', strokeWidth: 1, strokeDasharray: '4 4' }}
                                        />
                                        <Area type="monotone" dataKey="adoptions" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorAdoptions)" activeDot={{ r: 6, strokeWidth: 0 }} />
                                        <Area type="monotone" dataKey="intakes" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorIntakes)" activeDot={{ r: 6, strokeWidth: 0 }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Recent Activity */}
                <div className="lg:col-span-1">
                    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md h-full">
                        <CardHeader>
                            <CardTitle className="text-gray-800 dark:text-white">Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative border-l-2 border-gray-100 dark:border-gray-700 ml-3 list-none space-y-8 py-2">
                                {activities.map((activity) => (
                                    <div key={activity.id} className="relative pl-6">
                                        <div className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white dark:border-gray-800 shadow-sm
                                        ${activity.type === 'adoption' ? 'bg-pink-500' :
                                                activity.type === 'intake' ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{activity.text}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
                                <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors dark:text-indigo-400 dark:hover:text-indigo-300">
                                    View All Activity
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
