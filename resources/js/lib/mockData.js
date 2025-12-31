export const mockCats = [
    { id: 'C001', name: 'Luna', breed: 'Siamese', age: '2 years', sex: 'Female', status: 'Available', location: 'Zone A', riskScore: 12, intakeDate: '2023-10-15', image: '/api/placeholder/400/300' },
    { id: 'C002', name: 'Oliver', breed: 'Tabby', age: '4 years', sex: 'Male', status: 'Medical Hold', location: 'Quarantine', riskScore: 85, intakeDate: '2023-11-01', image: '/api/placeholder/400/300' },
    { id: 'C003', name: 'Leo', breed: 'Maine Coon', age: '1 year', sex: 'Male', status: 'Adopted', location: 'Home', riskScore: 5, intakeDate: '2023-09-20', image: '/api/placeholder/400/300' },
    { id: 'C004', name: 'Milo', breed: 'Domestic Short Hair', age: '3 months', sex: 'Male', status: 'Foster', location: 'Foster Home #12', riskScore: 45, intakeDate: '2023-12-05', image: '/api/placeholder/400/300' },
    { id: 'C005', name: 'Bella', breed: 'Persian', age: '5 years', sex: 'Female', status: 'Available', location: 'Zone B', riskScore: 22, intakeDate: '2023-08-10', image: '/api/placeholder/400/300' },
];

export const mockAdoptions = [
    { id: 'A101', applicant: 'Sarah Johnson', catName: 'Luna', date: '2023-12-10', status: 'Pending Review', stage: 2 },
    { id: 'A102', applicant: 'Michael Chen', catName: 'Oliver', date: '2023-12-12', status: 'Interview Scheduled', stage: 3 },
    { id: 'A103', applicant: 'Emily Davis', catName: 'Milo', date: '2023-12-14', status: 'Approved', stage: 4 },
    { id: 'A104', applicant: 'James Wilson', catName: 'Bella', date: '2023-12-15', status: 'New Application', stage: 1 },
];

export const mockFinances = {
    monthlyRevenue: [
        { name: 'Jan', donations: 4000, adopttionFees: 2400 },
        { name: 'Feb', donations: 3000, adopttionFees: 1398 },
        { name: 'Mar', donations: 2000, adopttionFees: 9800 },
        { name: 'Apr', donations: 2780, adopttionFees: 3908 },
        { name: 'May', donations: 1890, adopttionFees: 4800 },
        { name: 'Jun', donations: 2390, adopttionFees: 3800 },
    ],
    funds: [
        { name: 'General Medical Fund', current: 15450, target: 20000, color: 'bg-blue-600' },
        { name: 'Kitten Season Support', current: 3200, target: 5000, color: 'bg-pink-500' },
        { name: 'Facility Upgrades', current: 8500, target: 30000, color: 'bg-purple-600' },
    ]
};

export const mockIncidents = [
    { id: 1, type: 'Injured Cat', location: [3.2535, 101.7346], severity: 'Critical', description: 'Cat with leg injury near cafeteria', time: '10:30 AM' }, // Coordinates near IIUM approximate
    { id: 2, type: 'Lost Cat', location: [3.2545, 101.7356], severity: 'Medium', description: 'Orange tabby sighted near library', time: '02:15 PM' },
    { id: 3, type: 'Kitten Found', location: [3.2525, 101.7336], severity: 'High', description: 'Box of kittens found behind sports complex', time: '09:00 AM' },
];

export const mockAnalytics = {
    efficiency: [
        { name: 'Intake Process', manual: 45, digital: 15 },
        { name: 'Adoption Review', manual: 120, digital: 40 },
        { name: 'Medical Logging', manual: 30, digital: 5 },
    ],
    population: [
        { name: 'Available', value: 45, fill: '#10B981' },
        { name: 'Foster', value: 25, fill: '#3B82F6' },
        { name: 'Medical', value: 15, fill: '#EF4444' },
        { name: 'Quarantine', value: 10, fill: '#F59E0B' },
    ]
};

export const mockMessages = [
    { id: 1, sender: 'Dr. Aminah', avatar: 'DA', preview: 'Vaccination schedule for Oliver updated', time: '10:30 AM', unread: true },
    { id: 2, sender: 'Sarah Johnson', avatar: 'SJ', preview: 'Checking on my adoption application', time: 'Yesterday', unread: false },
    { id: 3, sender: 'Volunteer Group', avatar: 'VG', preview: 'Who can cover the Saturday shift?', time: 'Yesterday', unread: false },
];

export const mockEvents = [
    { id: 1, title: 'Vaccination Drive', date: '2023-12-30', type: 'medical' },
    { id: 2, title: 'Adoption Fair', date: '2024-01-05', type: 'adoption' },
    { id: 3, title: 'Volunteer Training', date: '2024-01-07', type: 'training' },
];
