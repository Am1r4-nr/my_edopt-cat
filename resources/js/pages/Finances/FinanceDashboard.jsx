import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockFinances } from '@/lib/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign, TrendingUp, CreditCard } from 'lucide-react';

export default function FinanceDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Financial Oversight</h1>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">Total Revenue (YTD)</p>
                                <h3 className="text-3xl font-bold mt-2">RM 45,200</h3>
                            </div>
                            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                                <DollarSign className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-blue-100 text-sm">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span>+12% from last month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-purple-100 text-sm font-medium">Medical Fund</p>
                                <h3 className="text-3xl font-bold mt-2">RM 15,450</h3>
                            </div>
                            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                                <ActivityIcon />
                            </div>
                        </div>
                        <div className="mt-4 text-purple-100 text-sm">
                            <span>77% of monthly goal</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-green-100 text-sm font-medium">ToyyibPay Balance</p>
                                <h3 className="text-3xl font-bold mt-2">RM 8,240</h3>
                            </div>
                            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                                <CreditCard className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 text-green-100 text-sm">
                            <span>Last payout: 2 days ago</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={mockFinances.monthlyRevenue}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="donations" name="Donations" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="adopttionFees" name="Adoption Fees" fill="#10B981" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Fund Progress */}
                <Card>
                    <CardHeader>
                        <CardTitle>Fund Allocation Goals</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {mockFinances.funds.map((fund) => (
                            <div key={fund.name}>
                                <div className="flex justify-between text-sm font-medium mb-1">
                                    <span className="text-gray-700">{fund.name}</span>
                                    <span className="text-gray-500">
                                        RM {fund.current.toLocaleString()} / RM {fund.target.toLocaleString()}
                                    </span>
                                </div>
                                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${fund.color}`}
                                        style={{ width: `${(fund.current / fund.target) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function ActivityIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
    )
}
