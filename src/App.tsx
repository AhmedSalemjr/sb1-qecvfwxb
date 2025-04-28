import { useState } from 'react';
import { BriefcaseIcon, LineChartIcon, MenuIcon, PanelLeftClose, PanelLeftOpen, ShoppingCartIcon, Store, Tag, Wallet } from 'lucide-react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Purchases from './pages/Purchases';
import Sales from './pages/Sales';
import Inventory from './pages/Inventory';
import Expenses from './pages/Expenses';
import Profits from './pages/Profits';
import Reports from './pages/Reports';
import './index.css';
import { AppProvider } from './context/AppContext';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: 'Dashboard', icon: LineChartIcon, id: 'dashboard' },
    { name: 'Purchases', icon: ShoppingCartIcon, id: 'purchases' },
    { name: 'Sales', icon: Tag, id: 'sales' },
    { name: 'Inventory', icon: Store, id: 'inventory' },
    { name: 'Expenses', icon: Wallet, id: 'expenses' },
    { name: 'Profits', icon: BriefcaseIcon, id: 'profits' },
    { name: 'Reports', icon: LineChartIcon, id: 'reports' },
  ];

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'purchases':
        return <Purchases />;
      case 'sales':
        return <Sales />;
      case 'inventory':
        return <Inventory />;
      case 'expenses':
        return <Expenses />;
      case 'profits':
        return <Profits />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AppProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar
          navigation={navigation}
          activePage={activePage}
          setActivePage={setActivePage}
          isOpen={sidebarOpen}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title={navigation.find(item => item.id === activePage)?.name || 'Dashboard'}>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              {sidebarOpen ? (
                <PanelLeftClose className="h-6 w-6" />
              ) : (
                <PanelLeftOpen className="h-6 w-6" />
              )}
            </button>
          </Header>

          <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
            <div className="container mx-auto">
              {renderPage()}
            </div>
          </main>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;