'use client'

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Moon, Menu, X } from 'lucide-react';
import { Button } from '../Button';

interface NavLinkProps {
  to: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ to, children, onClick }: NavLinkProps) => (
  <Link
    href={to}
    onClick={onClick}
    className="group flex items-center gap-1 text-text! font-medium transition-all duration-300 hover:translate-x-2 py-2"
  >
    <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-accent">
      <ArrowRight size={15} />
    </span>
    <span>{children}</span>
  </Link>
);

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full bg-background border-b-2 border-black z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0">
            <h1 className="text-xl font-bold">
              <Link href="/" className="text-text!">
                bloguiery
              </Link>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/about">about</NavLink>
            <NavLink to="/posts">posts</NavLink>
            <NavLink to="/contact">contact</NavLink>
            <Button>
              <Moon className="size-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <Button>
              <Moon className="size-4" />
            </Button>

            <button
              onClick={toggleMenu}
              className="text-text! hover:text-accent focus:outline-none transition-transform duration-300"
              style={{
                transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`
          md:hidden 
          absolute left-0 w-full bg-background
          border-b-black overflow-hidden
          transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'max-h-96 border-b-2' : 'max-h-0 border-b-0'}
        `}
      >
        <div className="px-4 py-6 flex flex-col gap-4">
          <NavLink to="/about" onClick={toggleMenu}>
            about
          </NavLink>
          <NavLink to="/posts" onClick={toggleMenu}>
            posts
          </NavLink>
          <NavLink to="/contact" onClick={toggleMenu}>
            contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
