// data/products.js
const PRODUCTS = [
    {
        id: "P001",
        name: "Rice (5kg)",
        category: "Groceries",
        price: 12.99,
        location: "Aisle 2, Shelf A",
        discount: 0
    },
    {
        id: "P002",
        name: "Milk (1L)",
        category: "Dairy",
        price: 1.99,
        location: "Aisle 3, Shelf B",
        discount: 0
    },
    {
        id: "P003",
        name: "Whole Wheat Bread",
        category: "Bakery",
        price: 2.49,
        location: "Aisle 1, Shelf C",
        discount: 0
    },
    {
        id: "P004",
        name: "Fresh Tomatoes (1kg)",
        category: "Produce",
        price: 3.99,
        location: "Aisle 4, Shelf A",
        discount: 0
    },
    {
        id: "P005",
        name: "Chicken Breast (1kg)",
        category: "Meat",
        price: 8.99,
        location: "Aisle 5, Shelf B",
        discount: 0
    },
    {
        id: "P006",
        name: "Chocolate Bar",
        category: "Confectionery",
        price: 1.49,
        location: "Aisle 7, Shelf D",
        discount: 0
    },
    {
        id: "P007",
        name: "Toilet Paper (12 rolls)",
        category: "Household",
        price: 6.99,
        location: "Aisle 8, Shelf A",
        discount: 0
    },
    {
        id: "P008",
        name: "Dish Soap",
        category: "Cleaning",
        price: 2.99,
        location: "Aisle 8, Shelf C",
        discount: 0
    },
    {
        id: "P009",
        name: "Orange Juice (2L)",
        category: "Beverages",
        price: 4.49,
        location: "Aisle 3, Shelf D",
        discount: 0
    },
    {
        id: "P010",
        name: "Eggs (12 pack)",
        category: "Dairy",
        price: 3.99,
        location: "Aisle 3, Shelf A",
        discount: 0
    },
    {
        id: "P011",
        name: "Potato Chips",
        category: "Snacks",
        price: 2.49,
        location: "Aisle 6, Shelf B",
        discount: 0
    },
    {
        id: "P012",
        name: "Pasta (500g)",
        category: "Groceries",
        price: 1.99,
        location: "Aisle 2, Shelf C",
        discount: 0
    },
    {
        id: "P013",
        name: "Pasta Sauce",
        category: "Groceries",
        price: 2.99,
        location: "Aisle 2, Shelf C",
        discount: 0
    },
    {
        id: "P014",
        name: "Toothpaste",
        category: "Personal Care",
        price: 3.49,
        location: "Aisle 9, Shelf A",
        discount: 0
    },
    {
        id: "P015",
        name: "Shampoo",
        category: "Personal Care",
        price: 4.99,
        location: "Aisle 9, Shelf B",
        discount: 0
    }
];

// Get unique categories from products
const getCategories = () => {
    const categories = new Set();
    PRODUCTS.forEach(product => categories.add(product.category));
    return Array.from(categories);
};