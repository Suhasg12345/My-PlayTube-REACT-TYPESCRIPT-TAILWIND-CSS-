import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
export const buttonStyle = cva(
  ["transition-colors"], // Base styles
  {
    variants: {
      variant: {
        default: ["bg-secondary", "hover:bg-secondary-hover"],
        ghost: ["hover:bg-gray-100"],
        dark: [
          "bg-secondary-dark",
          "hover:bg-secondary-dark-hover",
          "text-secondary",
        ],
      },
      size: {
        default: ["rounded", "p-2"], // Define default classes here
        icon: [
          "rounded-full",
          "w-10",
          "h-10",
          "flex",
          "items-center",
          "justify-center",
          "p-2.5",
        ], // Define icon-specific classes here
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default", // Set a default variant
    },
  }
);
type ButtonProps = VariantProps<typeof buttonStyle> & ComponentProps<"button">;

const Button = ({ variant, size, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(buttonStyle({ variant, size }), className)}
    />
  );
};

export default Button;
