import { LineChartIcon, TrendingUp, DollarSign, Store, Tag, Wallet } from 'lucide-react';
import Card from '../components/common/Card';
import StatsCard from '../components/common/StatsCard';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import PieChart from '../components/charts/PieChart';
import { useAppContext } from '../context/AppContext';

export default function Dashboard() {
  const { 
    getRevenueByPeriod, 
    getExpensesByCategory,
    products,
    getTopSellingProducts,
    getLowStockProducts
  } = useAppContext();

  const revenueData = getRevenueByPeriod('monthly');
  const expensesByCategory = getExpensesByCategory();
  const topProducts = getTopSellingProducts(5);
  const lowStockProducts = getLowStockProducts();

  const revenueChartData = revenueData.map(item => ({
    label: item.period,
    value: item.amount
  }));

  const expensesChartData = expensesByCategory.map((item, index) => ({
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

  const topProductsChartData = topProducts.map(product => ({
    label: product.productName,
    value: product.revenue
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Monthly Revenue"
          value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(140000)}
          icon={<DollarSign className="h-6 w-6" />}
          change={{ value: 12, isPositive: true }}
          colorClass="bg-blue-500"
        />
        <StatsCard
          title="Monthly Expenses"
          value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(30000)}
          icon={<Wallet className="h-6 w-6" />}
          change={{ value: 5, isPositive: false }}
          colorClass="bg-amber-500"
        />
        <StatsCard
          title="Net Profit"
          value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(20000)}
          icon={<TrendingUp className="h-6 w-6" />}
          change={{ value: 8, isPositive: true }}
          colorClass="bg-green-500"
        />
        <StatsCard
          title="Products in Stock"
          value={products.length}
          icon={<Store className="h-6 w-6" />}
          footer={`${lowStockProducts.length} products below minimum stock level`}
          colorClass="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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

        <Card title="Expenses by Category">
          <div className="flex items-center justify-center h-80">
            <PieChart 
              data={expensesChartData}
              valueFormatter={(value) => new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: 'USD',
                notation: 'compact',
                compactDisplay: 'short'
              }).format(value)}
            />
          </div>
        </Card>

        <Card title="Top Selling Products">
          <div className="h-64">
            <BarChart 
              data={topProductsChartData}
              height={250}
              valueFormatter={(value) => new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: 'USD',
                notation: 'compact',
                compactDisplay: 'short'
              }).format(value)}
            />
          </div>
        </Card>

        <Card title="Low Stock Products">
          <div className="divide-y divide-gray-200">
            {lowStockProducts.length > 0 ? (
              lowStockProducts.slice(0, 5).map((product) => (
                <div key={product.id} className="py-3 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-900">{product.name}</span>
                    <p className="text-sm text-gray-500">{product.reference}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.quantityInStock === 0
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.quantityInStock} in stock
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-gray-500">
                No products below minimum stock level
              </div>
            )}
            {lowStockProducts.length > 5 && (
              <div className="py-2 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View all {lowStockProducts.length} low stock products
                </button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}