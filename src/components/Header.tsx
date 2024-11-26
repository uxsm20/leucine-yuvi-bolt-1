import { Link, useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';

const productLinks = [
  { name: 'Batch Record Reviewer', path: '/products/batch-record-reviewer' },
  { name: 'Electronic Batch Record', path: '/products/electronic-batch-record' },
  { name: 'Batch Recipe Builder', path: '/products/batch-recipe-builder' },
  { name: 'Material Management', path: '/products/material-management' },
  { name: 'Shop Floor Monitoring', path: '/products/shop-floor-monitoring' },
  { name: 'Electronic Logbook', path: '/products/elogbook' }
];

const Header = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="bg-gray-800 p-2 rounded-lg">
            <img 
              src="https://demo-app-builder.leucine.ai/assets/img/logos/yuvi-logo-dark.svg" 
              alt="Yuvi Logo" 
              className="h-8"
            />
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {!isAuthenticated ? (
            <>
              <Link 
                to="/solutions" 
                className={`${
                  location.pathname === '/solutions' 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                } transition-colors`}
              >
                Solutions
              </Link>

              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center text-gray-300 hover:text-white transition-colors">
                  Products
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg border border-gray-700 focus:outline-none">
                    <div className="py-1">
                      {productLinks.map((product) => (
                        <Menu.Item key={product.path}>
                          {({ active }) => (
                            <Link
                              to={product.path}
                              className={`${
                                active ? 'bg-gray-700 text-white' : 'text-gray-300'
                              } block px-4 py-2 text-sm`}
                            >
                              {product.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <Link 
                to="/applications"
                className={`${
                  location.pathname === '/applications' 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                } transition-colors`}
              >
                Applications
              </Link>
              <Link 
                to="/use-cases"
                className={`${
                  location.pathname === '/use-cases' 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                } transition-colors`}
              >
                Use Cases
              </Link>
              <Link 
                to="/success-stories"
                className={`${
                  location.pathname === '/success-stories' 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                } transition-colors`}
              >
                Success Stories
              </Link>
              <Link 
                to="/security"
                className={`${
                  location.pathname === '/security' 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                } transition-colors`}
              >
                Security
              </Link>
              <Link 
                to="/login"
                className="bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-600 transition-colors"
              >
                Sign In
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                localStorage.removeItem('isAuthenticated');
                window.location.href = '/login';
              }}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Sign Out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;