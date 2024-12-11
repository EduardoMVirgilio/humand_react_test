import React, { useRef } from "react";
import { useForm } from "../context/formContext";
import style from "./Form.module.css";
import { usePaginate } from "../context/paginateContext";
const FormSearch: React.FC = () => {
  const keywordRef = useRef<HTMLInputElement>(null);
  const { setKeyword, setIsLoading, setError, error, isLoading } = useForm();
  const { setPage } = usePaginate();

  const handleKeywordChange = () => {
    const inputElement = keywordRef.current;
    if (!inputElement) return;

    const value = inputElement.value.trim();
    if (value.length <= 3) {
      setError("Keyword must be longer than 3 characters.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setPage(1);
    setKeyword(value.toLowerCase());
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleSearch = () => {
    const inputElement = keywordRef.current;
    if (!inputElement) return;
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  return (
    <form onSubmit={(e) => e.preventDefault()} id={style.search}>
      <input
        type="text"
        onChange={handleKeywordChange}
        ref={keywordRef}
        placeholder="Enter keyword..."
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="button" disabled={isLoading} onClick={handleSearch}>
        {isLoading ? "Loading..." : "Search"}
      </button>
    </form>
  );
};

export default FormSearch;
