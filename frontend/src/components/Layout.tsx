import React, { useState } from 'react';
import { Search, User, ShoppingBag, Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-sinsay-black font-sans">
      {/* 1. Promo Bar */}
      <div className="bg-sinsay-red text-white text-[10px] md:text-xs font-bold uppercase tracking-widest text-center py-2 px-4">
        Darmowa dostawa od 150 PLN | 30 dni na zwrot
      </div>

      {/* 2. Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          {/* Mobile Menu & Search (Left) */}
          <div className="flex items-center md:hidden gap-4">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>
            <Search className="w-6 h-6" strokeWidth={1.5} />
          </div>

          {/* Logo (Center on Mobile, Left on Desktop) */}
          <div className="flex-shrink-0 cursor-pointer">
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase">
              Sinsay
            </h1>
          </div>

          {/* Desktop Search (Center) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-auto">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Szukaj produktu"
                className="sinsay-search-input"
              />
              <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Icons (Right) */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity">
              <User className="w-6 h-6" strokeWidth={1.5} />
              <span className="text-xs font-bold uppercase hidden lg:block">
                Konto
              </span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity">
              <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
              <span className="text-xs font-bold uppercase hidden lg:block">
                Koszyk
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Main Content */}
      <main className="flex-1 w-full bg-white">{children}</main>

      {/* 4. Footer */}
      <footer className="bg-black text-white pt-12 pb-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">
                Pomoc i kontakt
              </h4>
              <ul className="space-y-3 text-xs text-gray-300">
                <li className="hover:text-white cursor-pointer transition-colors">
                  Jak kupować
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Koszty dostawy
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Zwroty i reklamacje
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Tabela rozmiarów
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">
                Polityka
              </h4>
              <ul className="space-y-3 text-xs text-gray-300">
                <li className="hover:text-white cursor-pointer transition-colors">
                  Polityka prywatności
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Polityka cookies
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Ustawienia cookies
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">
                O nas
              </h4>
              <ul className="space-y-3 text-xs text-gray-300">
                <li className="hover:text-white cursor-pointer transition-colors">
                  Marka Sinsay
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Kariera
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Pressroom
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Coming Soon
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">
                Newsletter
              </h4>
              <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                Zapisz się do newslettera i otrzymaj -15% na pierwsze zakupy
                online!
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Twój e-mail"
                  className="flex-1 bg-white text-black px-4 py-2 text-xs outline-none"
                />
                <button
                  type="button"
                  className="bg-sinsay-gray text-black px-6 py-2 text-xs font-bold uppercase hover:bg-white transition-colors"
                >
                  Zapisz
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 uppercase tracking-wider">
            <p>© 2026 Sinsay. Wszelkie prawa zastrzeżone</p>
            <div className="mt-4 md:mt-0 flex gap-4">
              <span>Polska / Poland</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
