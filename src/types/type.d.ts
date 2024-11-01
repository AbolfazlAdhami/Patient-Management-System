import {} from "react";
declare interface ButtonProps {
  title: string;
  variant?: "primary" | "outline" | "success" | "danger";
  loading?: false;
  onClick: () => void;
  className?: string;
}

declare interface InputProps {
  value: string;
  onChange: () => void;
  lable: string;
}
