import { create } from "zustand";
import { IMatch } from "@/api/transformers/Match";

interface IState {
  matches: IMatch[];
  isError: boolean;
  isLoading: boolean;
}

interface IActions {
  setMatches: (matches: IState["matches"]) => void;
  setError: (error: boolean) => void;
  setStartLoading: () => void;
}

export const useMatches = create<IState & IActions>((set) => ({
  matches: [],
  isError: false,
  isLoading: false,
  setMatches: (matches) =>
    set(() => ({ matches, isError: false, isLoading: false })),
  setError: (isError) => set(() => ({ isError, isLoading: false })),
  setStartLoading: () => set(() => ({ isLoading: true, isError: false })),
}));
