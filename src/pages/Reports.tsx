import { useState } from 'react';
import Card from '../components/common/Card';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import PieChart from '../components/charts/PieChart';
import { useAppContext } from '../context/AppContext';

export default function Reports() {
  const { calculateProfits, getRevenueByPeriod, getExpensesByCategory } = useAppContext();
  const [period, setPeriod] = useState<'daily' | 'monthly' | 'yearly'>('monthly');

  const profitData = calculateProfits(period);
  const revenueData = getRevenueByPeriod(period);
  const expenseData = getExpensesByCategory();

  const profitChartData = profitData.map(item => ({
    label: item.period,
    value: item.netProfit
  }));

  const revenueChartData = revenueData.map(item => ({
    label: item.period,
    value: item.amount
  }));

  const expenseChartData = expenseData.map((item, index) => ({
    label: item.category,
    value: item.amount,
    color: [
      '#3B82F6', // blue
      '#10B981', // green
      '#F59E0B', // amber
      '#EF4444', // red
      '#8B5CF6'  // purple
    ][index % 5]
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Financial Reports</h2>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as 'daily' | 'monthly' | 'yearly')}
          className="mt-1 block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Net Profit Trend">
          <div className="h-80">
            <LineChart 
              data={profitChartData}
              height={320}
              valueFormatter={(value) => new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact',
                compactDisplay: 'short'
              }).format(value)}
            />
          </div>
        </Card>

        <Card title="Revenue Trend">
          <div className="h-80">
            <LineChart 
              data={revenueChartData}
              height={320}
              valueFormatter={(value) => new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact',
                compactDisplay: 'short'
              }).format(value)}
            />
          </div>
        </Card>

        <Card title="Expense Distribution">
          <div className="flex items-center justify-center h-80">
            <PieChart 
              data={expenseChartData}
              valueFormatter={(value) => new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact',
                compactDisplay: 'short'
              }).format(value)}
            />
          </div>
        </Card>

        <Card title="Financial Summary">
          <div className="space-y-4">
            {profitData.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                <h4 className="text-sm font-medium text-gray-500">{item.period}</h4>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Revenue</p>
                    <p className="text-lg font-medium text-gray-900">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(item.revenue)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cost of Goods</p>
                    <p className="text-lg font-medium text-gray-900">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(item.costOfGoodsSold)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gross Margin</p>
                    <p className="text-lg font-medium text-gray-900">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(item.grossMargin)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Net Profit</p>
                    <p className="text-lg font-medium text-gray-900">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(item.netProfit)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}