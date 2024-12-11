import api from "../config/api";
import { Character } from "../interfaces/character";
import { PaginatedResponse } from "../interfaces/pagination";

const BASE_PATH = "/character";

export const getCharacters = (keyword?: string | null, page: number = 1) => {
  const params: Record<string, string | number> = { page };
  if (keyword) {
    params.name = keyword;
  }
  return api.get<PaginatedResponse<Character[]>>(BASE_PATH, { params });
};

export const getCharacter = (id: number) =>
  api.get<Character>(`${BASE_PATH}/${id}`);
