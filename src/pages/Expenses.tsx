import { useState } from 'react';
import { Plus } from 'lucide-react';
import Card from '../components/common/Card';
import DataTable from '../components/common/DataTable';
import { useAppContext } from '../context/AppContext';
import { Expense } from '../types';

export default function Expenses() {
  const { expenses } = useAppContext();
  const [showForm, setShowForm] = useState(false);

  // Function to capitalize the first letter of a string
  const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Columns for the expenses table
  const columns = [
    {
      header: 'Date',
      accessor: 'date',
      render: (value: Date) => value.toLocaleDateString(),
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (value: string) => capitalize(value),
    },
    {
      header: 'Description',
      accessor: 'description',
    },
    {
      header: 'Amount',
      accessor: 'amount',
      render: (value: number) => new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
      }).format(value),
    },
    {
      header: 'Supplier',
      accessor: 'supplier',
      render: (value: string | undefined) => value || '-',
    },
    {
      header: 'Actions',
      accessor: (row: Expense) => (
        <div className="flex space-x-2">
          <button 
            className="text-blue-600 hover:text-blue-900"
            onClick={() => console.log('Edit expense', row.id)}
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  // Categories for the dropdown
  const categories: { value: string; label: string }[] = [
    { value: 'rent', label: 'Rent' },
    { value: 'salary', label: 'Salary' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'supplies', label: 'Supplies' },
    { value: 'services', label: 'Services' },
    { value: 'taxes', label: 'Taxes' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Expenses</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Expense
          </button>
        </div>

        {/* Form to add new expense - would be shown/hidden based on state */}
        {showForm && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium mb-4">New Expense</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    min="0"
                    step="0.01"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">
                  Supplier (Optional)
                </label>
                <input
                  type="text"
                  id="supplier"
                  name="supplier"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                ></textarea>
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
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        )}

        <DataTable
          data={expenses}
          columns={columns}
          keyField="id"
          searchable={true}
          pagination={true}
        />
      </Card>
    </div>
  );
}