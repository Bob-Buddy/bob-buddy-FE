import { ReactNode } from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form';

interface InputContainerProp {
  label: string;
  children: ReactNode;
}

const InputContainer = ({ label, children }: InputContainerProp) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>{children}</FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default InputContainer;
