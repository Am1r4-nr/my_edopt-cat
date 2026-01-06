import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import api from '@/lib/api';

export default function AnalyticsDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await api.get('/api/analytics');
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading reports...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Comprehensive Reports</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Population Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Shelter Population Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.population}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {data.population.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Operational Efficiency */}
                <Card>
                    <CardHeader>
                        <CardTitle>Operational Efficiency (Time in Mins)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.efficiency} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" width={100} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="manual" name="Manual Process" fill="#9CA3AF" />
                                    <Bar dataKey="digital" name="Digital (E-DOPTCAT)" fill="#3B82F6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                            Digital processing is on average <span className="font-bold text-green-600">67% faster</span> than manual methods.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
