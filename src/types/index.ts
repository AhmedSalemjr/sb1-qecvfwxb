// Common Types
export interface BaseItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Supplier Types
export interface Supplier extends BaseItem {
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
}

// Customer Types
export interface Customer extends BaseItem {
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
}

// Product Types
export interface Product extends BaseItem {
  reference: string;
  name: string;
  description: string;
  quantityInStock: number;
  averagePurchasePrice: number;
  sellingPrice: number;
  minimumStockLevel: number;
}

// Purchase Types
export interface PurchaseItem {
  productId: string;
  productReference: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Purchase extends BaseItem {
  supplierId: string;
  supplierName: string;
  purchaseDate: Date;
  orderNumber: string;
  expectedDeliveryDate?: Date;
  deliveryStatus: 'pending' | 'delivered' | 'canceled';
  items: PurchaseItem[];
  totalAmount: number;
  notes?: string;
}

// Sale Types
export interface SaleItem {
  productId: string;
  productReference: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Sale extends BaseItem {
  customerId: string;
  customerName: string;
  saleDate: Date;
  orderNumber: string;
  expectedDeliveryDate?: Date;
  deliveryStatus: 'pending' | 'delivered' | 'canceled';
  billingStatus: 'pending' | 'billed' | 'paid';
  items: SaleItem[];
  totalAmount: number;
  notes?: string;
}

// Expense Types
export type ExpenseCategory = 'rent' | 'salary' | 'marketing' | 'utilities' | 'supplies' | 'services' | 'taxes' | 'other';

export interface Expense extends BaseItem {
  date: Date;
  category: ExpenseCategory;
  description: string;
  amount: number;
  supplier?: string;
  notes?: string;
}

// Stock Movement Types
export type StockMovementType = 'purchase' | 'sale' | 'adjustment';

export interface StockMovement extends BaseItem {
  productId: string;
  type: StockMovementType;
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  relatedDocumentId?: string;
  notes?: string;
}

// Financial Reports
export interface ProfitData {
  period: string;
  revenue: number;
  costOfGoodsSold: number;
  grossMargin: number;
  expenses: number;
  netProfit: number;
}

export interface SalesByProduct {
  productId: string;
  productName: string;
  quantitySold: number;
  revenue: number;
}