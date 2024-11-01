import { ButtonProps } from "@/types/type";
import React from "react";

function Button({ title, onClick, className, loading, variant }: ButtonProps) {
  return <div onClick={onClick}>{title}</div>;
}

export default Button;
