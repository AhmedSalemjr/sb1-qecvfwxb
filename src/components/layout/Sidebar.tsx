import { MouseEvent } from 'react';
import { Box, Store } from 'lucide-react';

interface SidebarProps {
  navigation: Array<{
    name: string;
    icon: React.ComponentType<any>;
    id: string;
  }>;
  activePage: string;
  setActivePage: (page: string) => void;
  isOpen: boolean;
}

export default function Sidebar({ navigation, activePage, setActivePage, isOpen }: SidebarProps) {
  const handleNavigation = (e: MouseEvent, id: string) => {
    e.preventDefault();
    setActivePage(id);
  };

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col`}>
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <div className={`flex items-center ${isOpen ? 'px-4' : 'justify-center'}`}>
          <Box className="h-8 w-8 text-blue-600" />
          {isOpen && <span className="ml-2 text-xl font-bold text-gray-800">ComSys</span>}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="mt-5 px-2 space-y-1">
          {navigation.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavigation(e, item.id)}
              className={`
                ${activePage === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                ${isOpen ? 'px-3' : 'justify-center px-2'}
                group flex items-center py-2 text-sm font-medium rounded-md transition-all duration-200
              `}
            >
              <item.icon
                className={`
                  ${activePage === item.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}
                  flex-shrink-0 h-6 w-6
                `}
                aria-hidden="true"
              />
              {isOpen && <span className="ml-3">{item.name}</span>}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}