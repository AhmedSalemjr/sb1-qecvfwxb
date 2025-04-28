import { useState } from 'react';
import { Plus, FileText } from 'lucide-react';
import Card from '../components/common/Card';
import DataTable from '../components/common/DataTable';
import { useAppContext } from '../context/AppContext';
import { Sale } from '../types';

export default function Sales() {
  const { sales, customers } = useAppContext();
  const [showForm, setShowForm] = useState(false);

  // Columns for the sales table
  const columns = [
    {
      header: 'Order #',
      accessor: 'orderNumber',
    },
    {
      header: 'Customer',
      accessor: 'customerName',
    },
    {
      header: 'Date',
      accessor: 'saleDate',
      render: (value: Date) => value.toLocaleDateString(),
    },
    {
      header: 'Total Amount',
      accessor: 'totalAmount',
      render: (value: number) => new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
      }).format(value),
    },
    {
      header: 'Delivery Status',
      accessor: 'deliveryStatus',
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'delivered' 
            ? 'bg-green-100 text-green-800' 
            : value === 'pending' 
              ? 'bg-yellow-100 text-yellow-800' 
              : 'bg-red-100 text-red-800'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      header: 'Billing Status',
      accessor: 'billingStatus',
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'paid' 
            ? 'bg-green-100 text-green-800' 
            : value === 'billed' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: (row: Sale) => (
        <div className="flex space-x-2">
          <button 
            className="text-blue-600 hover:text-blue-900"
            onClick={() => console.log('View sale details', row.id)}
          >
            <FileText className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Sales</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Sale
          </button>
        </div>

        {/* Form to add new sale - would be shown/hidden based on state */}
        {showForm && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium mb-4">New Sales Order</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
                  Customer
                </label>
                <select
                  id="customer"
                  name="customer"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Select a customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">
                  Order Number
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  name="orderNumber"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="saleDate" className="block text-sm font-medium text-gray-700">
                  Sale Date
                </label>
                <input
                  type="date"
                  id="saleDate"
                  name="saleDate"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              
              <div className="md:col-span-2">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Items</h4>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-3 py-2">
                        <select className="block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                          <option value="">Select a product</option>
                          {/* Map products here */}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          min="1"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-3 py-2">
                        $0.00
                      </td>
                      <td className="px-3 py-2 text-right">
                        <button type="button" className="text-red-600 hover:text-red-900">
                          Remove
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5} className="px-3 py-2">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Item
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <label htmlFor="deliveryStatus" className="block text-sm font-medium text-gray-700">
                  Delivery Status
                </label>
                <select
                  id="deliveryStatus"
                  name="deliveryStatus"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="pending">Pending</option>
                  <option value="delivered">Delivered</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="billingStatus" className="block text-sm font-medium text-gray-700">
                  Billing Status
                </label>
                <select
                  id="billingStatus"
                  name="billingStatus"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="pending">Pending</option>
                  <option value="billed">Billed</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Notes
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
                  Save Sale
                </button>
              </div>
            </form>
          </div>
        )}

        <DataTable
          data={sales}
          columns={columns}
          keyField="id"
          searchable={true}
          pagination={true}
        />
      </Card>
    </div>
  );
}