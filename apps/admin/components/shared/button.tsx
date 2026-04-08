import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/utils/cn';

const buttonVariants = cva('inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition', {
  variants: {
    variant: {
      default: 'bg-brand text-white hover:bg-brand-dark',
      outline: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
      ghost: 'text-slate-700 hover:bg-slate-100',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type Props = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, ...props }: Props) {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />;
}
