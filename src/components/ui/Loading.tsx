import React, { memo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import Spinner, { SpinnerProps } from './Spinner';
const loading = cva('flex items-center justify-center h-full', {
  variants: {
    backgroundColor: {
      light: 'bg-gray-100',
      dark: 'bg-gray-900',
    },
    cursor: {
      pointer: 'cursor-pointer',
      default: 'cursor-default',
    },
  },
  defaultVariants: {
    backgroundColor: 'light',
    cursor: 'default',
  },
});

export interface LoadingProps extends VariantProps<typeof loading>, SpinnerProps {
  className?: string;
  onClick?: () => void;
}

const Loading: React.FC<LoadingProps> = ({
  color,
  size,
  backgroundColor,
  className = '',
  onClick,
}) => {
  return (
    <div
      className={loading({
        backgroundColor,
        cursor: onClick ? 'pointer' : 'default',
        class: className,
      })}
      onClick={onClick}
    >
      <Spinner color={color} size={size} />
    </div>
  );
};

export default memo(Loading);

