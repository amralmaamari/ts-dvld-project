import React, { FC } from "react";
import { formModel } from "../../assets/assets";

export type ButtonType = "Create" | "Update" | "Delete" | "View";
export type Variant =
  | "primary"
  | "danger"
  | "success"
  | "warning"
  | "secondary";
export type Size = "sm" | "md" | "lg";

export interface IButtonProps {
  /** The text displayed inside the button; if provided, a text button is rendered. */
  text?: string;
  /** The type for icon buttons. Used as a key to lookup an icon in formModel. */
  type?: ButtonType;
  /** Visual style variant. Default is "primary". */
  variant?: Variant;
  /** Size of the button. Default is "md". */
  size?: Size;
  /** Callback when the button is clicked. */
  onClick?: () => void;
  /** Disables the button if true. Default is false. */
  disabled?: boolean;
  /** Optional icon rendered to the left of the text. */
  iconLeft?: React.ReactNode;
  /** Optional icon rendered to the right of the text. */
  iconRight?: React.ReactNode;
  /** If true, the button spans the full width of its container. Default is false. */
  fullWidth?: boolean;
}

const Button: FC<IButtonProps> = ({
  text,
  type,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  iconLeft,
  iconRight,
  fullWidth = false,
}) => {
  // Base styles common to all buttons.
  const baseStyles =
    "flex items-center justify-center gap-2 font-medium focus:outline-none transition-all duration-200";

  // Size-specific styles.
  const sizeStyles: Record<Size, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  // Variant-specific styles.
  const variantStyles: Record<Variant, string> = {
    primary: "bg-primary hover:bg-blue-700 text-white",
    danger: "bg-danger hover:bg-red-700 text-white",
    success: "bg-success hover:bg-green-700 text-white",
    warning: "bg-warning hover:bg-yellow-600 text-white",
    secondary: "bg-gray-300 hover:bg-gray-400 text-black",
  };

  // Styles when the button is disabled.
  const disabledStyles = "opacity-50 cursor-not-allowed";

  // Helper to return background style for icon buttons based on the type.
  const getIconButtonBackground = (): string => {
    switch (type) {
      case "Create":
        return "bg-green-100";
      case "Update":
        return "bg-blue-100";
      case "Delete":
      case "View":
        return "bg-red-100";
      default:
        return "bg-red-100";
    }
  };

  // If text is provided, render a text button.
  if (text) {
    return (
      <button
        type="button"
        className={`
          cursor-pointer
          ${baseStyles}
          ${sizeStyles[size]}
          ${variantStyles[variant]}
          ${fullWidth ? "w-full" : "w-auto rounded-lg"}
          ${disabled ? disabledStyles : ""}
        `}
        onClick={!disabled ? onClick : undefined}
        disabled={disabled}
        aria-label={text}
      >
        {iconLeft && <span>{iconLeft}</span>}
        {text}
        {iconRight && <span>{iconRight}</span>}
      </button>
    );
  }

  // If type is provided, render an icon button.
  if (type) {
    return (
      <button
        type="button"
        title={type}
        className={`
          p-2
          ${getIconButtonBackground()}
          w-fit
          cursor-pointer
          rounded-full
          ${disabled ? disabledStyles : ""}
        `}
        onClick={!disabled ? onClick : undefined}
        disabled={disabled}
        aria-label={type}
      >
        <img
          src={formModel[type]}
          alt={`${type} Icon`}
          width={30}
          height={30}
        />
      </button>
    );
  }

  // If neither text nor type is provided, render nothing.
  return null;
};

export default Button;
