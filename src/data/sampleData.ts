import { Supplier, Customer, Product, Purchase, Sale, Expense } from '../types';

// Sample Suppliers
export const sampleSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Tech Solutions Inc.',
    contactPerson: 'John Doe',
    phone: '123-456-7890',
    email: 'john@techsolutions.com',
    address: '123 Tech St, Silicon Valley, CA',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  },
  {
    id: '2',
    name: 'Global Electronics',
    contactPerson: 'Jane Smith',
    phone: '987-654-3210',
    email: 'jane@globalelectronics.com',
    address: '456 Global Ave, New York, NY',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: '3',
    name: 'Supply Depot',
    contactPerson: 'Robert Johnson',
    phone: '555-123-4567',
    email: 'robert@supplydepot.com',
    address: '789 Supply Rd, Chicago, IL',
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2023-02-01')
  }
];

// Sample Customers
export const sampleCustomers: Customer[] = [
  {
    id: '1',
    name: 'Retail Giant',
    contactPerson: 'Alice Williams',
    phone: '111-222-3333',
    email: 'alice@retailgiant.com',
    address: '321 Retail Blvd, Los Angeles, CA',
    createdAt: new Date('2023-01-05'),
    updatedAt: new Date('2023-01-05')
  },
  {
    id: '2',
    name: 'Online Store Pro',
    contactPerson: 'Bob Anderson',
    phone: '444-555-6666',
    email: 'bob@onlinestorepro.com',
    address: '654 Digital St, Seattle, WA',
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2023-01-20')
  },
  {
    id: '3',
    name: 'Local Shop',
    contactPerson: 'Carol Martin',
    phone: '777-888-9999',
    email: 'carol@localshop.com',
    address: '987 Main St, Austin, TX',
    createdAt: new Date('2023-02-05'),
    updatedAt: new Date('2023-02-05')
  }
];

// Sample Products
export const sampleProducts: Product[] = [
  {
    id: '1',
    reference: 'PROD-001',
    name: 'Smartphone XYZ',
    description: 'Latest smartphone with 128GB storage',
    quantityInStock: 25,
    averagePurchasePrice: 400,
    sellingPrice: 599.99,
    minimumStockLevel: 10,
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-01-10')
  },
  {
    id: '2',
    reference: 'PROD-002',
    name: 'Laptop ABC',
    description: 'High-performance laptop with 16GB RAM',
    quantityInStock: 15,
    averagePurchasePrice: 1200,
    sellingPrice: 1699.99,
    minimumStockLevel: 5,
    createdAt: new Date('2023-01-12'),
    updatedAt: new Date('2023-01-12')
  },
  {
    id: '3',
    reference: 'PROD-003',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling headphones',
    quantityInStock: 50,
    averagePurchasePrice: 120,
    sellingPrice: 199.99,
    minimumStockLevel: 20,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: '4',
    reference: 'PROD-004',
    name: 'Smart Watch',
    description: 'Fitness tracker and smartwatch',
    quantityInStock: 30,
    averagePurchasePrice: 150,
    sellingPrice: 249.99,
    minimumStockLevel: 15,
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2023-01-20')
  },
  {
    id: '5',
    reference: 'PROD-005',
    name: 'Tablet Pro',
    description: '10-inch tablet with 64GB storage',
    quantityInStock: 20,
    averagePurchasePrice: 300,
    sellingPrice: 449.99,
    minimumStockLevel: 8,
    createdAt: new Date('2023-01-25'),
    updatedAt: new Date('2023-01-25')
  }
];

// Sample Purchases
export const samplePurchases: Purchase[] = [
  {
    id: '1',
    supplierId: '1',
    supplierName: 'Tech Solutions Inc.',
    purchaseDate: new Date('2023-01-15'),
    orderNumber: 'PO-2023-001',
    expectedDeliveryDate: new Date('2023-01-25'),
    deliveryStatus: 'delivered',
    items: [
      {
        productId: '1',
        productReference: 'PROD-001',
        productName: 'Smartphone XYZ',
        quantity: 10,
        unitPrice: 400,
        totalPrice: 4000
      },
      {
        productId: '3',
        productReference: 'PROD-003',
        productName: 'Wireless Headphones',
        quantity: 20,
        unitPrice: 120,
        totalPrice: 2400
      }
    ],
    totalAmount: 6400,
    notes: 'Regular stock replenishment',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: '2',
    supplierId: '2',
    supplierName: 'Global Electronics',
    purchaseDate: new Date('2023-02-05'),
    orderNumber: 'PO-2023-002',
    expectedDeliveryDate: new Date('2023-02-15'),
    deliveryStatus: 'delivered',
    items: [
      {
        productId: '2',
        productReference: 'PROD-002',
        productName: 'Laptop ABC',
        quantity: 5,
        unitPrice: 1200,
        totalPrice: 6000
      },
      {
        productId: '5',
        productReference: 'PROD-005',
        productName: 'Tablet Pro',
        quantity: 8,
        unitPrice: 300,
        totalPrice: 2400
      }
    ],
    totalAmount: 8400,
    notes: 'Quarterly order',
    createdAt: new Date('2023-02-05'),
    updatedAt: new Date('2023-02-05')
  }
];

// Sample Sales
export const sampleSales: Sale[] = [
  {
    id: '1',
    customerId: '1',
    customerName: 'Retail Giant',
    saleDate: new Date('2023-01-20'),
    orderNumber: 'SO-2023-001',
    expectedDeliveryDate: new Date('2023-01-25'),
    deliveryStatus: 'delivered',
    billingStatus: 'paid',
    items: [
      {
        productId: '1',
        productReference: 'PROD-001',
        productName: 'Smartphone XYZ',
        quantity: 3,
        unitPrice: 599.99,
        totalPrice: 1799.97
      },
      {
        productId: '3',
        productReference: 'PROD-003',
        productName: 'Wireless Headphones',
        quantity: 5,
        unitPrice: 199.99,
        totalPrice: 999.95
      }
    ],
    totalAmount: 2799.92,
    notes: 'Regular customer order',
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2023-01-20')
  },
  {
    id: '2',
    customerId: '2',
    customerName: 'Online Store Pro',
    saleDate: new Date('2023-02-10'),
    orderNumber: 'SO-2023-002',
    expectedDeliveryDate: new Date('2023-02-15'),
    deliveryStatus: 'delivered',
    billingStatus: 'paid',
    items: [
      {
        productId: '2',
        productReference: 'PROD-002',
        productName: 'Laptop ABC',
        quantity: 2,
        unitPrice: 1699.99,
        totalPrice: 3399.98
      },
      {
        productId: '4',
        productReference: 'PROD-004',
        productName: 'Smart Watch',
        quantity: 4,
        unitPrice: 249.99,
        totalPrice: 999.96
      }
    ],
    totalAmount: 4399.94,
    notes: 'Online order with express shipping',
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-02-10')
  }
];

// Sample Expenses
export const sampleExpenses: Expense[] = [
  {
    id: '1',
    date: new Date('2023-01-05'),
    category: 'rent',
    description: 'Office rent for January 2023',
    amount: 2500,
    notes: 'Paid on time',
    createdAt: new Date('2023-01-05'),
    updatedAt: new Date('2023-01-05')
  },
  {
    id: '2',
    date: new Date('2023-01-15'),
    category: 'salary',
    description: 'Employee salaries for January 2023',
    amount: 12000,
    notes: 'For 5 employees',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: '3',
    date: new Date('2023-01-20'),
    category: 'marketing',
    description: 'Digital marketing campaign',
    amount: 1500,
    supplier: 'Marketing Agency XYZ',
    notes: 'Social media and Google Ads',
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2023-01-20')
  },
  {
    id: '4',
    date: new Date('2023-02-05'),
    category: 'utilities',
    description: 'Electricity bill for January 2023',
    amount: 350,
    notes: 'Higher than usual due to winter',
    createdAt: new Date('2023-02-05'),
    updatedAt: new Date('2023-02-05')
  },
  {
    id: '5',
    date: new Date('2023-02-10'),
    category: 'supplies',
    description: 'Office supplies and stationery',
    amount: 250,
    supplier: 'Office Supplies Store',
    notes: 'Quarterly purchase',
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-02-10')
  }
];