import { forwardRef } from "react";
import type { AppProps } from "../types/types";

type Props = {
  onChange?: AppProps["onChange"];
  type?: string;
  placeholder?: string;
  required?: boolean;
};

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <input ref={ref} {...props} />;
});

export default Input;
