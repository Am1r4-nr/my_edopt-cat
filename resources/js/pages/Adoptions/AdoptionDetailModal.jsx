import React, { useState } from 'react';
import { X, Calendar, User, Cat, Shield, Mail, Phone, CheckCircle2, Circle, Clock, Sparkles, MessageSquare, FileText, Send, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function AdoptionDetailModal({ adoption, isOpen, onClose, stageRequirements = {}, onUpdateAdoption, onStageChange }) {
    if (!isOpen || !adoption) return null;

    const [activeTab, setActiveTab] = useState('details'); // details, analysis, messages
    const [messageDraft, setMessageDraft] = useState('');

    const stages = [
        { id: 1, name: 'New Application', description: 'Application received and waiting for initial review.' },
        { id: 2, name: 'Pending Review', description: 'Background and reference checks in progress.' },
        { id: 3, name: 'Interview', description: 'Scheduled interview with the potential adopter.' },
        { id: 4, name: 'Approved', description: 'Application approved, ready for adoption.' },
    ];

    const currentStageIndex = stages.findIndex(s => s.id === adoption.stage);

    // Get requirements for the CURRENT stage
    const currentRequirements = stageRequirements[adoption.stage] || [];
    const completedTasks = adoption.completedTasks || [];
    const isStageLocked = currentRequirements.some(req => !completedTasks.includes(req));

    const toggleTask = (taskName) => {
        let newTasks;
        if (completedTasks.includes(taskName)) {
            newTasks = completedTasks.filter(t => t !== taskName);
        } else {
            newTasks = [...completedTasks, taskName];
        }

        // Propagate update parent
        onUpdateAdoption({ ...adoption, completedTasks: newTasks });
    };

    const matchData = [
        { subject: 'Lifestyle', A: 90, fullMark: 100 },
        { subject: 'Home Env', A: 85, fullMark: 100 },
        { subject: 'Experience', A: 70, fullMark: 100 },
        { subject: 'Activity', A: 95, fullMark: 100 },
        { subject: 'Budget', A: 80, fullMark: 100 },
    ];

    const messageTemplates = [
        { label: 'Schedule Interview', text: "Hi, we'd like to schedule a quick call to discuss your application for " + adoption.catName + "." },
        { label: 'Request Documents', text: "Could you please provide proof of residence and landlord approval? Thanks!" },
        { label: 'Approval Notice', text: "Great news! Your application has been approved. Let's finalize the adoption." },
    ];

    const handleUseTemplate = (text) => {
        setMessageDraft(text);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col transition-colors">
                {/* Header with status */}
                <div className="flex justify-between items-start p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{adoption.applicant}</h2>
                            <span className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full text-xs font-semibold text-gray-500 dark:text-gray-300 shadow-sm">
                                #{adoption.id}
                            </span>
                            {adoption.matchScore && (
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm">
                                    <Sparkles className="h-3 w-3" /> {adoption.matchScore}% Match
                                </span>
                            )}
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
                            Applying for <span className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1"><Cat className="h-4 w-4" /> {adoption.catName}</span>
                        </p>
                    </div>

                    <div className="flex gap-2">
                        {/* Proceed Button */}
                        {adoption.stage < 4 && (
                            <Button
                                onClick={() => onStageChange(adoption.id, adoption.stage + 1)}
                                disabled={isStageLocked}
                                className={`gap-2 shadow-sm transition-all ${isStageLocked ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700' : 'bg-green-600 hover:bg-green-700 text-white shadow-green-200 dark:shadow-green-900/30'}`}
                            >
                                {isStageLocked ? <Lock className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                                {isStageLocked ? 'Locked' : `Proceed to ${stages[currentStageIndex + 1]?.name}`}
                            </Button>
                        )}

                        <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="px-6 border-b border-gray-100 dark:border-gray-700 flex gap-6">
                    {['details', 'analysis', 'messages'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-4 text-sm font-medium border-b-2 transition-all capitalize
                                ${activeTab === tab
                                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-200 dark:hover:border-gray-600'
                                }
                            `}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-white dark:bg-gray-800 min-h-[400px]">
                    {activeTab === 'details' && (
                        <div className="p-8">
                            {/* Detailed View content (reused from previous step mainly) */}
                            {/* Stepper / Timeline */}
                            <div className="mb-10">
                                <div className="relative flex justify-between mx-auto max-w-3xl">
                                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-gray-700 -z-0 rounded-full"></div>
                                    <div
                                        className="absolute top-1/2 left-0 h-1 bg-green-500 -z-0 rounded-full transition-all duration-500"
                                        style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
                                    ></div>

                                    {stages.map((stage, index) => {
                                        const isCompleted = index <= currentStageIndex;
                                        const isCurrent = index === currentStageIndex;

                                        return (
                                            <div key={stage.id} className="relative z-10 flex flex-col items-center group">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 transition-all duration-300 bg-white dark:bg-gray-800
                                                    ${isCompleted ? 'border-green-500 text-green-600' : 'border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600'}
                                                    ${isCurrent ? 'ring-4 ring-green-100 dark:ring-green-900/30 scale-110' : ''}
                                                `}>
                                                    {isCompleted ? <CheckCircle2 className="h-4 w-4 fill-green-50 dark:fill-green-900" /> : <Circle className="h-4 w-4" />}
                                                </div>
                                                <div className="absolute top-10 w-24 text-center">
                                                    <p className={`text-xs font-bold transition-colors ${isCurrent ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>{stage.name}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Alert for Locking */}
                            {isStageLocked && adoption.stage < 4 && (
                                <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50 rounded-xl flex gap-3 text-amber-800 dark:text-amber-200 animate-in slide-in-from-top-2">
                                    <Lock className="h-5 w-5 flex-shrink-0" />
                                    <div>
                                        <p className="font-bold text-sm">Progression Locked</p>
                                        <p className="text-xs mt-1">
                                            To move to the next stage, please complete the mandatory tasks below.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b dark:border-gray-700 pb-2"><User className="h-4 w-4" /> Applicant</h3>
                                    <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                                        <div className="flex justify-between border-b border-gray-50 dark:border-gray-700 pb-2">
                                            <span className="text-gray-500 dark:text-gray-400">Name</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{adoption.applicant}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-50 dark:border-gray-700 pb-2">
                                            <span className="text-gray-500 dark:text-gray-400">Email</span>
                                            <span className="font-medium text-gray-900 dark:text-white">sarah.j@example.com</span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-50 dark:border-gray-700 pb-2">
                                            <span className="text-gray-500 dark:text-gray-400">Phone</span>
                                            <span className="font-medium text-gray-900 dark:text-white">+1 555-0123</span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-50 dark:border-gray-700 pb-2">
                                            <span className="text-gray-500 dark:text-gray-400">Address</span>
                                            <span className="font-medium text-gray-900 dark:text-white">123 Maple Ave, London</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b dark:border-gray-700 pb-2"><Shield className="h-4 w-4" /> {stages[currentStageIndex]?.name} Checklist</h3>

                                    {currentRequirements.length === 0 ? (
                                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">No mandatory tasks for this stage.</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {currentRequirements.map((task, i) => {
                                                const isDone = completedTasks.includes(task);
                                                return (
                                                    <label key={i} className={`flex items-center gap-3 text-sm cursor-pointer group p-3 rounded-lg border transition-all
                                                        ${isDone ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'}
                                                    `}>
                                                        <div
                                                            onClick={() => toggleTask(task)}
                                                            className={`w-5 h-5 rounded border flex flex-shrink-0 items-center justify-center transition-colors ${isDone ? 'bg-green-500 border-green-500' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'}`}
                                                        >
                                                            {isDone && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                                                        </div>
                                                        <span className={isDone ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}>{task}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'analysis' && (
                        <div className="p-8 h-full flex flex-col items-center justify-center">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-purple-500" /> Compatibility Analysis
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 text-center max-w-md">
                                Based on the applicant's profile and the cat's needs, we have calculated a compatibility score.
                            </p>

                            <div className="h-[300px] w-full max-w-[500px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={matchData}>
                                        <PolarGrid stroke="#e5e7eb" className="dark:stroke-gray-700" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                        <Radar
                                            name="Match"
                                            dataKey="A"
                                            stroke="#8b5cf6"
                                            strokeWidth={3}
                                            fill="#8b5cf6"
                                            fillOpacity={0.3}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="mt-8 grid grid-cols-3 gap-6 w-full max-w-2xl bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">High</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-1">Activity Match</p>
                                </div>
                                <div className="text-center border-l border-gray-200 dark:border-gray-700">
                                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">Safe</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-1">Environment</p>
                                </div>
                                <div className="text-center border-l border-gray-200 dark:border-gray-700">
                                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">Exp</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-1">Cat Owner</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'messages' && (
                        <div className="p-0 h-full flex flex-col lg:flex-row h-[500px]">
                            {/* Templates Sidebar */}
                            <div className="w-full lg:w-1/3 border-r border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-6 space-y-4">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Quick Templates</h4>
                                {messageTemplates.map((t, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleUseTemplate(t.text)}
                                        className="w-full text-left p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500 transition-all text-sm group"
                                    >
                                        <p className="font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{t.label}</p>
                                        <p className="text-xs text-gray-400 mt-1 truncate">{t.text}</p>
                                    </button>
                                ))}
                            </div>

                            {/* Writer Area */}
                            <div className="flex-1 p-6 flex flex-col">
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Compose Message</h4>
                                <textarea
                                    className="flex-1 p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm leading-relaxed"
                                    placeholder="Type your message here..."
                                    value={messageDraft}
                                    onChange={(e) => setMessageDraft(e.target.value)}
                                ></textarea>
                                <div className="flex justify-end items-center gap-3 mt-4">
                                    <span className="text-xs text-gray-400">Sent to: sarah.j@example.com</span>
                                    <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30">
                                        <Send className="h-4 w-4" /> Send Message
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
