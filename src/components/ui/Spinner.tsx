import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const spinner = cva('w-12 h-12 border-4 border-t-transparent rounded-full animate-spin', {
  variants: {
    color: {
      blue: 'border-blue-500',
      white: 'border-white',
      black: 'border-black',
      yellow: 'border-yellow-500',
    },
    size: {
      sm: 'w-6 h-6',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
    },
  },
  defaultVariants: {
    color: 'blue',
    size: 'md',
  },
});

export interface SpinnerProps extends VariantProps<typeof spinner> {}

const Spinner: React.FC<SpinnerProps> = ({ color, size }) => {
  return <div className={spinner({ color, size })} />;
};

export default Spinner;

