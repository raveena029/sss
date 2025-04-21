// inventory.js - Mock inventory data for development
const mockInventoryData = [
    {
        productId: 'P00001',
        quantity: 150,
        location: 'Aisle 1, Shelf A',
        reorderLevel: 30,
        lastRestocked: '2025-03-15',
        supplier: 'FreshFoods Inc.'
    },
    {
        productId: 'P00002',
        quantity: 85,
        location: 'Aisle 1, Shelf B',
        reorderLevel: 20,
        lastRestocked: '2025-03-17',
        supplier: 'FreshFoods Inc.'
    },
    {
        productId: 'P00003',
        quantity: 42,
        location: 'Aisle 1, Shelf C',
        reorderLevel: 15,
        lastRestocked: '2025-03-10',
        supplier: 'FreshFoods Inc.'
    },
    {
        productId: 'P00004',
        quantity: 8,
        location: 'Aisle 2, Shelf A',
        reorderLevel: 10,
        lastRestocked: '2025-03-05',
        supplier: 'Dairy Delight'
    },
    {
        productId: 'P00005',
        quantity: 65,
        location: 'Aisle 2, Shelf B',
        reorderLevel: 15,
        lastRestocked: '2025-03-12',
        supplier: 'Dairy Delight'
    },
    {
        productId: 'P00006',
        quantity: 120,
        location: 'Aisle 3, Shelf A',
        reorderLevel: 25,
        lastRestocked: '2025-03-18',
        supplier: 'Meat Masters'
    },
    {
        productId: 'P00007',
        quantity: 35,
        location: 'Aisle 3, Shelf B',
        reorderLevel: 10,
        lastRestocked: '2025-03-14',
        supplier: 'Meat Masters'
    },
    {
        productId: 'P00008',
        quantity: 200,
        location: 'Aisle 4, Shelf A',
        reorderLevel: 40,
        lastRestocked: '2025-03-20',
        supplier: 'Cleaning Kings'
    },
    {
        productId: 'P00009',
        quantity: 15,
        location: 'Aisle 4, Shelf B',
        reorderLevel: 20,
        lastRestocked: '2025-03-01',
        supplier: 'Cleaning Kings'
    },
    {
        productId: 'P00010',
        quantity: 95,
        location: 'Aisle 5, Shelf A',
        reorderLevel: 30,
        lastRestocked: '2025-03-16',
        supplier: 'Bakery Best'
    },
    {
        productId: 'P00011',
        quantity: 25,
        location: 'Aisle 5, Shelf B',
        reorderLevel: 10,
        lastRestocked: '2025-03-19',
        supplier: 'Bakery Best'
    },
    {
        productId: 'P00012',
        quantity: 75,
        location: 'Aisle 6, Shelf A',
        reorderLevel: 20,
        lastRestocked: '2025-03-11',
        supplier: 'Tech Titans'
    },
    {
        productId: 'P00013',
        quantity: 5,
        location: 'Aisle 6, Shelf B',
        reorderLevel: 5,
        lastRestocked: '2025-03-02',
        supplier: 'Tech Titans'
    },
    {
        productId: 'P00014',
        quantity: 110,
        location: 'Aisle 7, Shelf A',
        reorderLevel: 25,
        lastRestocked: '2025-03-21',
        supplier: 'Book Buddies'
    },
    {
        productId: 'P00015',
        quantity: 55,
        location: 'Aisle 7, Shelf B',
        reorderLevel: 15,
        lastRestocked: '2025-03-08',
        supplier: 'Book Buddies'
    }
];

// If using in module format (ES6)
// export default mockInventoryData;

// If using in script tags (non-module)
// Uncomment if needed:
// const inventoryData = mockInventoryData;