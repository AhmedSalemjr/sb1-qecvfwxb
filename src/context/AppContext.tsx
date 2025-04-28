import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Supplier,
  Customer,
  Product,
  Purchase,
  Sale,
  Expense,
  StockMovement,
  ProfitData,
  SalesByProduct
} from '../types';
import { sampleSuppliers, sampleCustomers, sampleProducts, samplePurchases, sampleSales, sampleExpenses } from '../data/sampleData';

interface AppContextType {
  // Data
  suppliers: Supplier[];
  customers: Customer[];
  products: Product[];
  purchases: Purchase[];
  sales: Sale[];
  expenses: Expense[];
  stockMovements: StockMovement[];
  
  // Methods
  addSupplier: (supplier: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addPurchase: (purchase: Omit<Purchase, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addSale: (sale: Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => void;
  
  // Calculations
  calculateProfits: (period: 'daily' | 'monthly' | 'yearly') => ProfitData[];
  getTopSellingProducts: (limit: number) => SalesByProduct[];
  getLowStockProducts: () => Product[];
  getRevenueByPeriod: (period: 'daily' | 'monthly' | 'yearly') => { period: string; amount: number }[];
  getExpensesByCategory: () => { category: string; amount: number }[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // State for all main data types
  const [suppliers, setSuppliers] = useState<Supplier[]>(sampleSuppliers);
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [purchases, setPurchases] = useState<Purchase[]>(samplePurchases);
  const [sales, setSales] = useState<Sale[]>(sampleSales);
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);

  // Methods for adding new data
  const addSupplier = (supplierData: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSupplier: Supplier = {
      ...supplierData,
      id: uuidv4().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setSuppliers(prev => [...prev, newSupplier]);
  };

  const addCustomer = (customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: uuidv4().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setCustomers(prev => [...prev, newCustomer]);
  };

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: uuidv4().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const addPurchase = (purchaseData: Omit<Purchase, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPurchase: Purchase = {
      ...purchaseData,
      id: uuidv4().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setPurchases(prev => [...prev, newPurchase]);
    
    // Update stock levels
    newPurchase.items.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        const updatedProduct = {
          ...product,
          quantityInStock: product.quantityInStock + item.quantity,
          updatedAt: new Date()
        };
        setProducts(prev => prev.map(p => p.id === product.id ? updatedProduct : p));
        
        // Record stock movement
        const stockMovement: StockMovement = {
          id: uuidv4().toString(),
          productId: product.id,
          type: 'purchase',
          quantity: item.quantity,
          previousQuantity: product.quantityInStock,
          newQuantity: product.quantityInStock + item.quantity,
          relatedDocumentId: newPurchase.id,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        setStockMovements(prev => [...prev, stockMovement]);
      }
    });
  };

  const addSale = (saleData: Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSale: Sale = {
      ...saleData,
      id: uuidv4().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setSales(prev => [...prev, newSale]);
    
    // Update stock levels
    newSale.items.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        const updatedProduct = {
          ...product,
          quantityInStock: product.quantityInStock - item.quantity,
          updatedAt: new Date()
        };
        setProducts(prev => prev.map(p => p.id === product.id ? updatedProduct : p));
        
        // Record stock movement
        const stockMovement: StockMovement = {
          id: uuidv4().toString(),
          productId: product.id,
          type: 'sale',
          quantity: -item.quantity,
          previousQuantity: product.quantityInStock,
          newQuantity: product.quantityInStock - item.quantity,
          relatedDocumentId: newSale.id,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        setStockMovements(prev => [...prev, stockMovement]);
      }
    });
  };

  const addExpense = (expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: uuidv4().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setExpenses(prev => [...prev, newExpense]);
  };

  // Calculation methods
  const calculateProfits = (period: 'daily' | 'monthly' | 'yearly'): ProfitData[] => {
    // Simplified implementation for now
    return [
      {
        period: 'Jan 2023',
        revenue: 120000,
        costOfGoodsSold: 80000,
        grossMargin: 40000,
        expenses: 25000,
        netProfit: 15000
      },
      {
        period: 'Feb 2023',
        revenue: 130000,
        costOfGoodsSold: 85000,
        grossMargin: 45000,
        expenses: 27000,
        netProfit: 18000
      },
      {
        period: 'Mar 2023',
        revenue: 140000,
        costOfGoodsSold: 90000,
        grossMargin: 50000,
        expenses: 30000,
        netProfit: 20000
      }
    ];
  };

  const getTopSellingProducts = (limit: number): SalesByProduct[] => {
    // Simplified implementation for now
    return [
      {
        productId: '1',
        productName: 'Smartphone XYZ',
        quantitySold: 50,
        revenue: 25000
      },
      {
        productId: '2',
        productName: 'Laptop ABC',
        quantitySold: 30,
        revenue: 45000
      },
      {
        productId: '3',
        productName: 'Headphones Premium',
        quantitySold: 100,
        revenue: 15000
      }
    ].slice(0, limit);
  };

  const getLowStockProducts = (): Product[] => {
    return products.filter(product => product.quantityInStock <= product.minimumStockLevel);
  };

  const getRevenueByPeriod = (period: 'daily' | 'monthly' | 'yearly') => {
    // Simplified implementation for now
    return [
      { period: 'Jan', amount: 120000 },
      { period: 'Feb', amount: 130000 },
      { period: 'Mar', amount: 140000 },
      { period: 'Apr', amount: 125000 },
      { period: 'May', amount: 135000 },
      { period: 'Jun', amount: 145000 }
    ];
  };

  const getExpensesByCategory = () => {
    // Simplified implementation for now
    return [
      { category: 'Rent', amount: 50000 },
      { category: 'Salaries', amount: 120000 },
      { category: 'Marketing', amount: 30000 },
      { category: 'Utilities', amount: 15000 },
      { category: 'Other', amount: 25000 }
    ];
  };

  const value = {
    suppliers,
    customers,
    products,
    purchases,
    sales,
    expenses,
    stockMovements,
    addSupplier,
    addCustomer,
    addProduct,
    addPurchase,
    addSale,
    addExpense,
    calculateProfits,
    getTopSellingProducts,
    getLowStockProducts,
    getRevenueByPeriod,
    getExpensesByCategory
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};