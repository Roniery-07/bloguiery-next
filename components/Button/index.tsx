import type React from 'react';
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button = ({ children, className }: ButtonProps) => {
  return (
    <div className="relative inline-block group">
      <div
        aria-hidden="true"
        className={`absolute inset-0 
          bg-black border-2 border-black
          translate-x-[6px] translate-y-[6px] z-10`}
      ></div>

      <button
        className={cn(
          `
            cursor-pointer
          relative z-10
          border-2 border-black bg-background
          px-3 py-3 font-bold text-text uppercase tracking-wider
          transition-transform duration-150 ease-out
          active:translate-x-[6px] active:translate-y-[6px]
          hover:translate-x-[5px] hover:translate-y-[5px]
        `,
          className,
        )}
      >
        {children}
      </button>
    </div>
  );
};
