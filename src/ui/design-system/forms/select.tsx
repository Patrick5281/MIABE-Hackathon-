import React from 'react';
import { cn } from '@/lib/utils';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  required?: boolean;
  children: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, register, errors, id, required, children, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
        <select
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...register(id, {
            required: required ? "Ce champ est requis" : false
          })}
          {...props}
          ref={ref}
        >
          {children}
        </select>
        {errors[id] && (
          <p className="text-sm text-red-500">{errors[id]?.message as string}</p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';

interface SelectTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SelectTrigger = React.forwardRef<HTMLDivElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SelectTrigger.displayName = 'SelectTrigger';

interface SelectValueProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  children?: React.ReactNode;
}

export const SelectValue = React.forwardRef<HTMLDivElement, SelectValueProps>(
  ({ className, placeholder, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-sm', className)}
        {...props}
      >
        {children || placeholder}
      </div>
    );
  }
);
SelectValue.displayName = 'SelectValue';

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SelectContent.displayName = 'SelectContent';

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, value, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          className
        )}
        data-value={value}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SelectItem.displayName = 'SelectItem'; 