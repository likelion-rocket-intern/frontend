import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[6px] transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default_primary:
          "bg-primary-500 text-white hover:bg-primary-400 active:bg-primary-200 disabled:bg-gray-300",
        default:
          "bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-400 disabled:bg-gray-300",
        outline_primary:
          "bg-primary-50 border border-primary-500 text-primary-500 hover:text-primary-600 active:text-primary-300 active:bg-primary-300 disabled:bg-gray-200 disabled:border disabled:border-gray-300",
        outline_default:
          "bg-white border border-gray-200 text-gray-700 hover:border-gray-300 active:border-gray-400 disabled:bg-gray-200 disabled:border disabled:border-gray-300",
        link_primary:
          "text-primary-600 hover:text-primary-800 active:text-primary-300 disabled:text-gray-300",
        link_default:
          "text-gray-500 hover:text-gray-600 active:text-gray-400 disabled:text-gray-300",
      },
      size: {
        fit: "text-[16px] font-semibold leading-[1.4] tracking-[-0.4px]",
        small:
          "px-5 py-[10px] text-[16px] font-semibold leading-[1.4] tracking-[-0.4px]",
        medium:
          "px-[54px] py-[10px] text-[20px] font-semibold leading-[1.4] tracking-[-0.5px]",
        large:
          "px-[86px] py-5 text-[24px] font-bold leading-[1.4] tracking-[-0.6px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "small",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
