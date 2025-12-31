import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, Plus, MapPin, Clock } from 'lucide-react';
import EventModal from './EventModal';

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const calendarDays = [];
        // Add empty slots for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            calendarDays.push(null);
        }
        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            calendarDays.push(new Date(year, month, i));
        }
        return calendarDays;
    };

    const calendarDays = getDaysInMonth(currentDate);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await window.axios.get('/api/events');
            setEvents(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching events:', error);
            setLoading(false);
        }
    };

    const handleCreateEvent = async (formData) => {
        try {
            const response = await window.axios.post('/api/events', formData);
            setEvents([...events, response.data]);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const handleUpdateEvent = async (formData) => {
        try {
            const response = await window.axios.put(`/api/events/${editingEvent.id}`, formData);
            setEvents(events.map(e => e.id === editingEvent.id ? response.data : e));
            setIsModalOpen(false);
            setEditingEvent(null);
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleDeleteEvent = async (id) => {
        // if (!confirm('Are you sure you want to delete this event?')) return;
        try {
            await window.axios.delete(`/api/events/${id}`);
            setEvents(events.filter(e => e.id !== id));
            setIsModalOpen(false);
            setEditingEvent(null);
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const getEventsForDate = (date) => {
        if (!date) return [];
        return events.filter(event => {
            const eventDate = new Date(event.start_date);
            return eventDate.getDate() === date.getDate() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getFullYear() === date.getFullYear();
        });
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const handleDayClick = (event) => {
        setEditingEvent(event);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Shelter Calendar</h1>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setCurrentDate(new Date())}>Today</Button>
                    <Button onClick={() => { setEditingEvent(null); setIsModalOpen(true); }} className="bg-brand-cream text-brand-mocha hover:bg-[#E5D4A0]">
                        <Plus className="h-4 w-4 mr-2" /> New Event
                    </Button>
                </div>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-xl text-brand-mocha dark:text-brand-cream">
                        {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </CardTitle>
                    <div className="flex gap-1">
                        <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={handleNextMonth}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-7 text-center mb-4">
                        {days.map(day => (
                            <div key={day} className="font-medium text-gray-500 dark:text-gray-400 text-sm py-2">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        {calendarDays.map((date, idx) => {
                            const dayEvents = getEventsForDate(date);
                            const isToday = date && new Date().toDateString() === date.toDateString();

                            return (
                                <div
                                    key={idx}
                                    className={`
                                        min-h-[120px] p-2 relative transition-all duration-200
                                        ${date ? 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750' : 'bg-gray-50 dark:bg-gray-900/50'}
                                    `}
                                >
                                    {date && (
                                        <>
                                            <span className={`
                                                text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full mb-1
                                                ${isToday ? 'bg-brand-cream text-brand-mocha' : 'text-gray-700 dark:text-gray-300'}
                                            `}>
                                                {date.getDate()}
                                            </span>
                                            <div className="space-y-1">
                                                {dayEvents.map(event => (
                                                    <button
                                                        key={event.id}
                                                        onClick={(e) => { e.stopPropagation(); handleDayClick(event); }}
                                                        className={`w-full text-left p-1.5 text-xs rounded font-medium truncate shadow-sm hover:shadow transition-all group
                                                            ${event.type === 'adoption_drive' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' :
                                                                event.type === 'fundraiser' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                                                                    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'}
                                                        `}
                                                    >
                                                        <div className="flex items-center gap-1">
                                                            <span className="truncate">{event.title}</span>
                                                        </div>
                                                        <div className="opacity-0 group-hover:opacity-100 text-[10px] flex items-center gap-1 mt-0.5 transition-opacity">
                                                            <Clock size={10} />
                                                            {new Date(event.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            <EventModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingEvent(null); }}
                onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
                editingEvent={editingEvent}
                onDelete={handleDeleteEvent}
            />
        </div>
    );
}
