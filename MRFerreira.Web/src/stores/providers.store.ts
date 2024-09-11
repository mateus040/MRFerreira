import { create } from "zustand";
import FornecedorModel from "../interface/models/FornecedorModel";

type ProviderStore = {
  providers: FornecedorModel[];
  setProviders: (provider: FornecedorModel[]) => void;
};

export const useProviderStore = create<ProviderStore>()((set) => ({
  providers: [],
  setProviders: (provider: FornecedorModel[]) =>
    set((state) => ({ ...state, providers: provider })),
}));
