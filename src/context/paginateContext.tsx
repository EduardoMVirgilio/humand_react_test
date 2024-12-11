import { createContext, useContext, useState, ReactNode } from "react";

interface PaginateContextType {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  setTotalPages: (total: number) => void;
}

interface PaginateProviderProps {
  children: ReactNode;
}

const PaginateContext = createContext<PaginateContextType | undefined>(
  undefined
);

export const PaginateProvider: React.FC<PaginateProviderProps> = ({
  children,
}) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  return (
    <PaginateContext.Provider
      value={{ page, setPage, totalPages, setTotalPages }}
    >
      {children}
    </PaginateContext.Provider>
  );
};

export const usePaginate = (): PaginateContextType => {
  const context = useContext(PaginateContext);
  if (!context) {
    throw new Error("usePaginate must be used within a PaginateProvider");
  }
  return context;
};
