// data/customers.js - Mock customer data for development

const mockCustomerData = [
    {
        id: 'C00001',
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '555-123-4567',
        membershipLevel: 'Gold',
        joinDate: '2024-01-15',
        totalSpent: 1258.76,
        loyaltyPoints: 325
    },
    {
        id: 'C00002',
        name: 'Emma Johnson',
        email: 'emma.j@email.com',
        phone: '555-234-5678',
        membershipLevel: 'Silver',
        joinDate: '2024-02-03',
        totalSpent: 756.42,
        loyaltyPoints: 185
    },
    {
        id: 'C00003',
        name: 'Michael Chen',
        email: 'mchen@email.com',
        phone: '555-345-6789',
        membershipLevel: 'Bronze',
        joinDate: '2024-03-10',
        totalSpent: 321.89,
        loyaltyPoints: 80
    },
    {
        id: 'C00004',
        name: 'Sarah Williams',
        email: 'swilliams@email.com',
        phone: '555-456-7890',
        membershipLevel: 'Gold',
        joinDate: '2023-11-22',
        totalSpent: 1785.36,
        loyaltyPoints: 450
    },
    {
        id: 'C00005',
        name: 'David Rodriguez',
        email: 'd.rodriguez@email.com',
        phone: '555-567-8901',
        membershipLevel: 'Silver',
        joinDate: '2024-01-08',
        totalSpent: 645.12,
        loyaltyPoints: 160
    },
    {
        id: 'C00006',
        name: 'Lisa Garcia',
        email: 'lisag@email.com',
        phone: '555-678-9012',
        membershipLevel: 'Bronze',
        joinDate: '2024-02-17',
        totalSpent: 258.75,
        loyaltyPoints: 65
    },
    {
        id: 'C00007',
        name: 'Robert Kim',
        email: 'rkim@email.com',
        phone: '555-789-0123',
        membershipLevel: 'Gold',
        joinDate: '2023-10-05',
        totalSpent: 2145.98,
        loyaltyPoints: 540
    },
    {
        id: 'C00008',
        name: 'Jennifer Patel',
        email: 'jpatel@email.com',
        phone: '555-890-1234',
        membershipLevel: 'Silver',
        joinDate: '2023-12-12',
        totalSpent: 892.47,
        loyaltyPoints: 225
    },
    {
        id: 'C00009',
        name: 'Thomas Wilson',
        email: 'twilson@email.com',
        phone: '555-901-2345',
        membershipLevel: 'Bronze',
        joinDate: '2024-03-25',
        totalSpent: 175.32,
        loyaltyPoints: 45
    },
    {
        id: 'C00010',
        name: 'Maria Lopez',
        email: 'mlopez@email.com',
        phone: '555-012-3456',
        membershipLevel: 'Gold',
        joinDate: '2023-09-18',
        totalSpent: 3210.65,
        loyaltyPoints: 805
    },
    {
        id: 'C00011',
        name: 'James Taylor',
        email: 'jtaylor@email.com',
        phone: '555-123-7890',
        membershipLevel: 'Silver',
        joinDate: '2024-01-30',
        totalSpent: 542.89,
        loyaltyPoints: 135
    },
    {
        id: 'C00012',
        name: 'Sophia Brown',
        email: 'sbrown@email.com',
        phone: '555-234-8901',
        membershipLevel: 'Bronze',
        joinDate: '2024-02-27',
        totalSpent: 298.45,
        loyaltyPoints: 75
    },
    {
        id: 'C00013',
        name: 'Daniel Lee',
        email: 'dlee@email.com',
        phone: '555-345-9012',
        membershipLevel: 'Gold',
        joinDate: '2023-08-14',
        totalSpent: 2765.23,
        loyaltyPoints: 690
    },
    {
        id: 'C00014',
        name: 'Olivia Martinez',
        email: 'omartinez@email.com',
        phone: '555-456-0123',
        membershipLevel: 'Silver',
        joinDate: '2023-12-05',
        totalSpent: 879.56,
        loyaltyPoints: 220
    },
    {
        id: 'C00015',
        name: 'William Thompson',
        email: 'wthompson@email.com',
        phone: '555-567-1234',
        membershipLevel: 'Bronze',
        joinDate: '2024-01-19',
        totalSpent: 356.78,
        loyaltyPoints: 90
    }
];

// Get unique membership levels from customers
const getMembershipLevels = () => {
    const levels = new Set();
    mockCustomerData.forEach(customer => levels.add(customer.membershipLevel));
    return Array.from(levels);
};

// If using in module format (ES6)
// export default mockCustomerData;

// If using in script tags (non-module)
// Uncomment if needed:
// const customerData = mockCustomerData;