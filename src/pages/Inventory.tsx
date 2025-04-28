import { useState } from 'react';
import { Plus, AlertTriangle } from 'lucide-react';
import Card from '../components/common/Card';
import DataTable from '../components/common/DataTable';
import { useAppContext } from '../context/AppContext';
import { Product } from '../types';

export default function Inventory() {
  const { products } = useAppContext();
  const [showForm, setShowForm] = useState(false);

  // Columns for the products table
  const columns = [
    {
      header: 'Reference',
      accessor: 'reference',
    },
    {
      header: 'Name',
      accessor: 'name',
    },
    {
      header: 'Description',
      accessor: 'description',
    },
    {
      header: 'Quantity',
      accessor: 'quantityInStock',
      render: (value: number, row: Product) => (
        <div className="flex items-center">
          <span className={`font-medium ${value <= row.minimumStockLevel ? 'text-red-600' : 'text-gray-900'}`}>
            {value}
          </span>
          {value <= row.minimumStockLevel && (
            <AlertTriangle className="h-4 w-4 text-amber-500 ml-2" />
          )}
        </div>
      ),
    },
    {
      header: 'Purchase Price',
      accessor: 'averagePurchasePrice',
      render: (value: number) => new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
      }).format(value),
    },
    {
      header: 'Selling Price',
      accessor: 'sellingPrice',
      render: (value: number) => new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
      }).format(value),
    },
    {
      header: 'Min. Stock',
      accessor: 'minimumStockLevel',
    },
    {
      header: 'Actions',
      accessor: (row: Product) => (
        <div className="flex space-x-2">
          <button 
            className="text-blue-600 hover:text-blue-900"
            onClick={() => console.log('Edit product', row.id)}
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Inventory</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Product
          </button>
        </div>

        {/* Form to add new product - would be shown/hidden based on state */}
        {showForm && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium mb-4">New Product</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
                  Reference
                </label>
                <input
                  type="text"
                  id="reference"
                  name="reference"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="quantityInStock" className="block text-sm font-medium text-gray-700">
                  Initial Quantity
                </label>
                <input
                  type="number"
                  id="quantityInStock"
                  name="quantityInStock"
                  min="0"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="minimumStockLevel" className="block text-sm font-medium text-gray-700">
                  Minimum Stock Level
                </label>
                <input
                  type="number"
                  id="minimumStockLevel"
                  name="minimumStockLevel"
                  min="0"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="averagePurchasePrice" className="block text-sm font-medium text-gray-700">
                  Purchase Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="averagePurchasePrice"
                    name="averagePurchasePrice"
                    min="0"
                    step="0.01"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700">
                  Selling Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="sellingPrice"
                    name="sellingPrice"
                    min="0"
                    step="0.01"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2 flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        )}

        <DataTable
          data={products}
          columns={columns}
          keyField="id"
          searchable={true}
          pagination={true}
        />
      </Card>
    </div>
  );
}