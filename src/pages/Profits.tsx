import React from 'react';

const Profits = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Profits Overview</h2>
        <p className="text-gray-600">This page will display profit analysis and metrics for your business.</p>
        
        <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-medium text-green-700">Gross Profit</h3>
            <p className="text-2xl font-bold text-green-800">$24,500</p>
            <p className="text-sm text-green-600">+12% from last month</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-700">Net Profit</h3>
            <p className="text-2xl font-bold text-blue-800">$18,200</p>
            <p className="text-sm text-blue-600">+8% from last month</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-medium text-purple-700">Profit Margin</h3>
            <p className="text-2xl font-bold text-purple-800">32%</p>
            <p className="text-sm text-purple-600">+2% from last month</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Profit Trends</h2>
        <p className="text-gray-600 mb-6">Monthly profit analysis will be displayed here.</p>
        
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Profit chart visualization will be implemented here</p>
        </div>
      </div>
    </div>
  );
};

export default Profits;