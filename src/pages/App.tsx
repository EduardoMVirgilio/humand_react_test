import { Fragment, useCallback, useEffect, useState } from "react";
import FormSearch from "../components/Form";
import { useForm } from "../context/formContext";
import { getCharacters } from "../services/character";
import { Character } from "../interfaces/character";
import { PaginateProvider, usePaginate } from "../context/paginateContext";
import Paginate from "../components/Paginate";

function App() {
  const { keyword, setIsLoading, setError } = useForm();
  const [characters, setCharacters] = useState<Character[]>([]);
  const { page, setTotalPages } = usePaginate();
  const request = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await getCharacters(keyword, page);

      setTotalPages(data.info.pages);
      setCharacters(data.results);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch characters.");
    } finally {
      setIsLoading(false);
    }
  }, [keyword, page, setIsLoading, setError]);

  useEffect(() => {
    request();
  }, [request]);

  return (
    <>
      <FormSearch />

      {characters.length > 0 && (
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,minmax(320px,1fr))",
            gap: "1rem",
            listStyle: "none",
          }}
        >
          {characters.map(({ id, name, species, image }) => (
            <Fragment key={id}>
              <li>
                <img src={image} alt="" />
                {name}-{species}
              </li>
            </Fragment>
          ))}
        </ul>
      )}
      <Paginate />
    </>
  );
}

export default App;
