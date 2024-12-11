import { createContext, useContext, useState, ReactNode } from "react";

interface FormContextType {
  keyword: string | null;
  isLoading: boolean;
  error: string | null;
  setKeyword: (value: string | null) => void;
  setIsLoading: (value: boolean) => void;
  setError: (value: string | null) => void;
}

interface FormProviderProps {
  children: ReactNode;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [keyword, setKeyword] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <FormContext.Provider
      value={{
        keyword,
        isLoading,
        error,
        setKeyword,
        setIsLoading,
        setError,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
