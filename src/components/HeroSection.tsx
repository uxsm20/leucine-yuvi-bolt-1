import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-base text-indigo-400 font-semibold tracking-wide uppercase mb-4">
          Your Vision, Our Mission
        </p>
        <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
          <span className="block">Transform Ideas into</span>
          <span className="block text-indigo-400">Intelligent Applications</span>
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-base text-gray-300 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl">
          Harness the power of multi-agent AI research and automated workflows to turn your ideas into production-ready applications with unprecedented speed and precision.
        </p>
        <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
          <div className="rounded-md shadow">
            <Link
              to="/login"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              Start Building
            </Link>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <a
              href="#"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-gray-300 bg-gray-800 hover:bg-gray-700 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              Watch Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;