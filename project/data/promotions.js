// data/promotions.js - Mock promotions data for development

const mockPromotionData = [
    {
        id: 'PROMO001',
        name: 'Spring Sale',
        type: 'Seasonal',
        discount: 15, // percentage
        startDate: '2025-03-01',
        endDate: '2025-04-15',
        applicableCategories: ['Produce', 'Bakery', 'Dairy'],
        minimumPurchase: 25.00,
        description: '15% off all spring products'
    },
    {
        id: 'PROMO002',
        name: 'Buy One Get One Free',
        type: 'BOGO',
        discount: 50, // effectively 50% when buying 2
        startDate: '2025-03-10',
        endDate: '2025-03-25',
        applicableProducts: ['P003', 'P006', 'P011'],
        minimumPurchase: 0,
        description: 'Buy one, get one free on select items'
    },
    {
        id: 'PROMO003',
        name: 'Loyalty Member Discount',
        type: 'Membership',
        discount: 10, // percentage
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        membershipLevel: ['Gold', 'Silver'],
        minimumPurchase: 50.00,
        description: '10% off purchases over $50 for Gold and Silver members'
    },
    {
        id: 'PROMO004',
        name: 'Weekend Special',
        type: 'Limited Time',
        discount: 20, // percentage
        startDate: '2025-03-22',
        endDate: '2025-03-23',
        applicableCategories: ['Meat', 'Seafood'],
        minimumPurchase: 0,
        description: '20% off all meat and seafood this weekend only'
    },
    {
        id: 'PROMO005',
        name: 'First Time Customer',
        type: 'Welcome',
        discount: 15, // percentage
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        firstPurchaseOnly: true,
        minimumPurchase: 0,
        description: '15% off your first purchase'
    },
    {
        id: 'PROMO006',
        name: 'Bundle Deal - Pasta Night',
        type: 'Bundle',
        discount: 25, // percentage
        startDate: '2025-03-15',
        endDate: '2025-04-15',
        requiredProducts: ['P012', 'P013'],
        minimumPurchase: 0,
        description: '25% discount when buying pasta and sauce together'
    },
    {
        id: 'PROMO007',
        name: 'Clearance Sale',
        type: 'Clearance',
        discount: 40, // percentage
        startDate: '2025-03-20',
        endDate: '2025-03-31',
        applicableProducts: ['P001', 'P009', 'P015'],
        minimumPurchase: 0,
        description: '40% off selected items while supplies last'
    },
    {
        id: 'PROMO008',
        name: '100 Bonus Points',
        type: 'Loyalty',
        bonusPoints: 100,
        startDate: '2025-03-01',
        endDate: '2025-03-31',
        minimumPurchase: 75.00,
        description: 'Earn 100 bonus loyalty points on purchases over $75'
    },
    {
        id: 'PROMO009',
        name: 'Happy Hour',
        type: 'Limited Time',
        discount: 10, // percentage
        startDate: '2025-03-01',
        endDate: '2025-04-30',
        applicableCategories: ['Beverages', 'Snacks'],
        timeRestriction: {
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            startTime: '16:00',
            endTime: '18:00'
        },
        minimumPurchase: 0,
        description: '10% off beverages and snacks weekdays 4-6pm'
    },
    {
        id: 'PROMO010',
        name: 'Household Essentials',
        type: 'Category',
        discount: 15, // percentage
        startDate: '2025-03-15',
        endDate: '2025-04-15',
        applicableCategories: ['Household', 'Cleaning', 'Personal Care'],
        minimumPurchase: 30.00,
        description: '15% off household essentials when you spend $30 or more'
    },
    {
        id: 'PROMO011',
        name: 'Birthday Special',
        type: 'Birthday',
        discount: 20, // percentage
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        birthdayMonth: true,
        minimumPurchase: 0,
        description: '20% off one purchase during your birthday month'
    },
    {
        id: 'PROMO012',
        name: 'Points Multiplier',
        type: 'Loyalty',
        pointsMultiplier: 2,
        startDate: '2025-03-25',
        endDate: '2025-03-27',
        minimumPurchase: 0,
        description: 'Earn double loyalty points on all purchases'
    },
    {
        id: 'PROMO013',
        name: 'Senior Discount Day',
        type: 'Demographic',
        discount: 10, // percentage
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        dayOfWeek: 'Tuesday',
        demographicRestriction: 'Senior',
        minimumPurchase: 0,
        description: '10% off every Tuesday for seniors'
    },
    {
        id: 'PROMO014',
        name: 'App Download Bonus',
        type: 'Digital',
        discount: 5, // percentage
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        firstAppPurchase: true,
        minimumPurchase: 0,
        description: '5% off your first purchase through our app'
    },
    {
        id: 'PROMO015',
        name: 'Email Subscriber Offer',
        type: 'Digital',
        couponCode: 'EMAIL25',
        discount: 10, // percentage
        startDate: '2025-03-01',
        endDate: '2025-05-31',
        minimumPurchase: 25.00,
        description: '10% off purchases over $25 for email subscribers'
    }
];

// Get unique promotion types
const getPromotionTypes = () => {
    const types = new Set();
    mockPromotionData.forEach(promo => types.add(promo.type));
    return Array.from(types);
};

// Filter active promotions
const getActivePromotions = (date = new Date()) => {
    const currentDate = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    return mockPromotionData.filter(promo => 
        promo.startDate <= currentDate && promo.endDate >= currentDate
    );
};

// If using in module format (ES6)
// export default mockPromotionData;

// If using in script tags (non-module)
// Uncomment if needed:
// const promotionData = mockPromotionData;