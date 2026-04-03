import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import api from '@/lib/api';
import {
    CheckCircle,
    Clock,
    Calendar,
    User,
    ArrowRight,
    MoreHorizontal,
    Mail,
    Phone,
    Cat as CatIcon,
    GripVertical,
    Search,
    Filter,
    Sparkles,
    Lock
} from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import AdoptionDetailModal from './AdoptionDetailModal';

const STAGE_REQUIREMENTS = {
    1: ['Identity Verified', 'Initial Contact Made'], // To move FROM 1 -> 2
    2: ['Landlord Approval', 'Vet Reference Check', 'Home Environment Photos', 'Income Verification'], // FROM 2 -> 3
    3: ['Interview Conducted', 'Meet & Greet with Cat', 'Final Approval Signing'], // FROM 3 -> 4
    4: [] // Final
};

export default function AdoptionBoard() {
    const [adoptions, setAdoptions] = useState([]);
    const [filteredAdoptions, setFilteredAdoptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAdoption, setSelectedAdoption] = useState(null);
    const [draggedItem, setDraggedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchAdoptions = async () => {
        try {
            const response = await api.get('/api/adoptions');
            // Mocking Match Scores and Tasks for demo purposes
            const enhancedData = response.data.map(ad => ({
                ...ad,
                matchScore: Math.floor(Math.random() * (99 - 70) + 70), // Random score 70-99
                completedTasks: [] // Start with no tasks completed
            }));
            setAdoptions(enhancedData);
            setFilteredAdoptions(enhancedData);
        } catch (error) {
            console.error('Failed to fetch adoptions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdoptions();
    }, []);

    useEffect(() => {
        const lowerTerm = searchTerm.toLowerCase();
        const filtered = adoptions.filter(ad =>
            ad.applicant.toLowerCase().includes(lowerTerm) ||
            ad.catName.toLowerCase().includes(lowerTerm)
        );
        setFilteredAdoptions(filtered);
    }, [searchTerm, adoptions]);

    const handleUpdateAdoption = async (updatedAdoption) => {
        // Optimistic update
        setAdoptions(prev => prev.map(ad => ad.id === updatedAdoption.id ? updatedAdoption : ad));

        if (selectedAdoption && selectedAdoption.id === updatedAdoption.id) {
            setSelectedAdoption(updatedAdoption);
        }

        try {
            await api.put(`/api/adoptions/${updatedAdoption.id}`, {
                completed_tasks: updatedAdoption.completedTasks,
                match_score: updatedAdoption.matchScore,
                stage: updatedAdoption.stage,
                status: updatedAdoption.status
            });
        } catch (error) {
            console.error('Failed to update adoption details:', error);
            // Revert or fetch fresh data
            fetchAdoptions();
        }
    };

    const handleStageChange = async (adoptionId, newStage) => {
        if (newStage < 1 || newStage > 4) return;

        // Optimistic update
        setAdoptions(prev => prev.map(a =>
            a.id === adoptionId ? { ...a, stage: newStage } : a
        ));

        // Note: filteredAdoptions will auto-update via re-render if we depended on it differently,
        // but here we might need to sync if we aren't careful.
        // Actually, filteredAdoptions is derived from adoptions in the useEffect above, but
        // setState is async. For optimistic UI on drag, we update 'adoptions' state.
        // The useEffect [searchTerm, adoptions] will trigger and update filteredAdoptions.

        try {
            await api.put(`/api/adoptions/${adoptionId}`, { stage: newStage });
        } catch (error) {
            console.error('Failed to update stage:', error);
            fetchAdoptions(); // Revert on failure
            alert('Failed to move to next stage.');
        }
    };

    // Drag and Drop Handlers
    const onDragStart = (e, adoption) => {
        setDraggedItem(adoption);
        e.dataTransfer.effectAllowed = "move";
        // Make ephemeral drag image nice if possible, or default
    };

    const onDragOver = (e) => {
        e.preventDefault(); // Necessary to allow dropping
    };

    const onDrop = (e, targetStageId) => {
        e.preventDefault();

        if (!draggedItem) return;

        // Blocking Logic: Check if moving forward
        if (targetStageId > draggedItem.stage) {
            // Check requirements of the CURRENT stage (the gate to leave)
            const requirements = STAGE_REQUIREMENTS[draggedItem.stage] || [];
            const completed = draggedItem.completedTasks || [];

            const missingTasks = requirements.filter(req => !completed.includes(req));

            if (missingTasks.length > 0) {
                alert(`Cannot move to next stage!\n\nPlease complete the following tasks:\n- ${missingTasks.join('\n- ')}`);
                setDraggedItem(null);
                return;
            }
        }

        if (draggedItem.stage !== targetStageId) {
            handleStageChange(draggedItem.id, targetStageId);
        }
        setDraggedItem(null);
    };

    const handleViewDetails = (adoption) => {
        setSelectedAdoption(adoption);
    };

    const stages = [
        { id: 1, name: 'New Application', color: 'bg-blue-50/50 border-blue-100 text-blue-900', icon: User },
        { id: 2, name: 'Pending Review', color: 'bg-yellow-50/50 border-yellow-100 text-yellow-900', icon: Clock },
        { id: 3, name: 'Interview', color: 'bg-purple-50/50 border-purple-100 text-purple-900', icon: Calendar },
        { id: 4, name: 'Approved', color: 'bg-green-50/50 border-green-100 text-green-900', icon: CheckCircle },
    ];

    const getScoreColor = (score) => {
        if (score >= 90) return 'bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-emerald-200';
        if (score >= 80) return 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white shadow-blue-200';
        return 'bg-gray-100 text-gray-600';
    };

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-6 space-y-6 transition-colors duration-200">
            {/* Extended Header with Search */}
            <div className="sticky top-0 z-40 flex flex-col gap-6 md:flex-row md:items-center md:justify-between bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-sm transition-all duration-200">
                <div>
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                        Adoption Pipeline
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">AI-Assisted Adoption Tracking</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500 group-focus-within:text-indigo-500 transition-colors" />
                        <Input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search applicants..."
                            className="pl-10 w-full md:w-[250px] bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-800 transition-all dark:text-white dark:placeholder-gray-500"
                        />
                    </div>
                    <Button variant="outline" className="gap-2 text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 dark:border-gray-700 dark:hover:bg-gray-800">
                        <Filter className="h-4 w-4" /> Filter
                    </Button>
                </div>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-6 items-start h-[calc(100vh-220px)]">
                {stages.map((stage) => {
                    const stageAdoptions = filteredAdoptions.filter(a => a.stage === stage.id);
                    // Adjust column colors for dark mode.
                    // Note: stage.color contains Tailwind classes like 'bg-blue-50/50'. We need to override or map them.
                    // For simplicity, we'll strip the bg/text/border classes and apply custom ones or use a mapping.
                    // Current stage.color: "bg-blue-50/50 border-blue-100 text-blue-900"

                    let darkClasses = "";
                    if (stage.name.includes("New")) darkClasses = "dark:bg-blue-900/10 dark:border-blue-900/30 dark:text-blue-200";
                    else if (stage.name.includes("Pending")) darkClasses = "dark:bg-yellow-900/10 dark:border-yellow-900/30 dark:text-yellow-200";
                    else if (stage.name.includes("Interview")) darkClasses = "dark:bg-purple-900/10 dark:border-purple-900/30 dark:text-purple-200";
                    else if (stage.name.includes("Approved")) darkClasses = "dark:bg-green-900/10 dark:border-green-900/30 dark:text-green-200";

                    return (
                        <div
                            key={stage.id}
                            className={`min-w-[320px] flex-1 flex flex-col h-full rounded-2xl border-2 bg-white/30 backdrop-blur-sm transition-colors ${stage.color} ${darkClasses}`}
                            onDragOver={onDragOver}
                            onDrop={(e) => onDrop(e, stage.id)}
                        >
                            {/* Column Header */}
                            <div className={`p-4 rounded-t-2xl font-bold flex justify-between items-center border-b border-inherit`}>
                                <div className="flex items-center gap-2">
                                    <stage.icon className="h-5 w-5 opacity-75" />
                                    <span>{stage.name}</span>
                                </div>
                                <span className="bg-white/60 dark:bg-black/20 px-2.5 py-0.5 rounded-full text-xs box-border border border-black/5 dark:border-white/5 shadow-sm">
                                    {stageAdoptions.length}
                                </span>
                            </div>

                            {/* Drop Area */}
                            <div className="flex-1 p-3 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                                {stageAdoptions
                                    .map((adoption) => {
                                        const required = STAGE_REQUIREMENTS[adoption.stage] || [];
                                        const completed = adoption.completedTasks || [];
                                        const isLocked = required.some(r => !completed.includes(r));

                                        return (
                                            <div
                                                key={adoption.id}
                                                draggable
                                                onDragStart={(e) => onDragStart(e, adoption)}
                                                onClick={() => handleViewDetails(adoption)}
                                                className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-grab active:cursor-grabbing group relative overflow-hidden"
                                            >
                                                <div className="absolute top-4 right-4 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                    <GripVertical className="h-4 w-4" />
                                                </div>

                                                <div className="flex justify-between items-start mb-3 relative z-10">
                                                    <div>
                                                        <h3 className="font-bold text-gray-900 dark:text-white">{adoption.applicant}</h3>
                                                        <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">#{adoption.id}</p>
                                                    </div>
                                                    {/* AI Match Badge */}
                                                    {adoption.matchScore && (
                                                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm ${getScoreColor(adoption.matchScore)}`}>
                                                            <Sparkles className="h-2.5 w-2.5" />
                                                            {adoption.matchScore}% Match
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="space-y-2 relative z-10">
                                                    <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg border border-gray-100 dark:border-gray-700">
                                                        <CatIcon className="h-3.5 w-3.5 mr-2 text-indigo-500 dark:text-indigo-400" />
                                                        <span>{adoption.catName}</span>
                                                    </div>

                                                    <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 pt-2">
                                                        <div className="flex items-center">
                                                            <Calendar className="h-3 w-3 mr-1" />
                                                            <span>{adoption.date}</span>
                                                        </div>
                                                        {isLocked && adoption.stage < 4 && (
                                                            <div className="flex items-center text-amber-500" title="Tasks pending">
                                                                <Lock className="h-3 w-3 mr-1" />
                                                                <span>Locked</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Quick Actions on Hover (Desktop) */}
                                                <div className="mt-4 pt-3 border-t border-gray-50 dark:border-gray-700 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
                                                    <button className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors" title="Email">
                                                        <Mail className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button className="p-1.5 text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-full transition-colors" title="Call">
                                                        <Phone className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 ml-2">
                                                        View
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                                {stageAdoptions.length === 0 && (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 bg-gray-50/30 dark:bg-gray-800/10">
                                        <p className="text-sm">No applications</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <AdoptionDetailModal
                adoption={selectedAdoption}
                isOpen={!!selectedAdoption}
                onClose={() => setSelectedAdoption(null)}
                stageRequirements={STAGE_REQUIREMENTS}
                onUpdateAdoption={handleUpdateAdoption}
                onStageChange={handleStageChange}
            />
        </div>
    );
}
