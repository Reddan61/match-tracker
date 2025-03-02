import { create } from "zustand";
import { IMatch } from "@/api/transformers/Match";
import { MATCH_STATUS } from "@/api/transformers/Status";

export const FILTER_ALL = "FILTER_All";

export type TFilter = MATCH_STATUS | typeof FILTER_ALL;

interface IState {
  matches: IMatch[];
  filteredMatches: IMatch[];
  filter: TFilter;
  isError: boolean;
  isLoading: boolean;
}

interface IActions {
  setStartLoading: () => void;
  setFilter: (filter: TFilter) => void;
  setError: (error: boolean) => void;
  setMatches: (matches: IState["matches"]) => void;
}

const filterMatches = (matches: IMatch[], filter: TFilter) => {
  if (filter === FILTER_ALL) return matches;

  return matches.filter((match) => {
    return match.status === filter;
  });
};

export const useMatches = create<IState & IActions>((set) => ({
  matches: [],
  filteredMatches: [],
  filter: FILTER_ALL,
  isError: false,
  isLoading: false,

  setFilter: (filter) =>
    set((state) => ({
      filter,
      filteredMatches: filterMatches(state.matches, filter),
    })),
  setMatches: (matches) =>
    set((state) => ({
      matches,
      filteredMatches: filterMatches(matches, state.filter),
      isError: false,
      isLoading: false,
    })),
  setError: (isError) => set(() => ({ isError, isLoading: false })),
  setStartLoading: () => set(() => ({ isLoading: true, isError: false })),
}));
