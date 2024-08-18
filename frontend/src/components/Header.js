import Link from 'next/link';

const Header = () => {
    return (
      <header className="flex justify-between items-center py-4 px-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-slideIn">
        <h1 className="text-white text-2xl font-bold">Blitiz Protocol</h1>
        <nav>
          <Link href="/playground">
            <span className="text-white text-lg font-medium hover:underline">Launch Playground</span>
          </Link>
        </nav>
      </header>
    );
  };
  
  export default Header;
  
