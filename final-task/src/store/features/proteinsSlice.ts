import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  proteins: [];
  next: string | null;
  totalResultsCount: number;
  query: string | undefined;
  url: string;
} = {
  proteins: [],
  next: null,
  totalResultsCount: 0,
  query: "",
  url: "",
};

const proteinsSlice = createSlice({
  name: "proteins",
  initialState,
  reducers: {
    setProteinChunk: (
      state,
      action: PayloadAction<{
        proteins: [];
        next: string | null;
        totalResultsCount: number;
        query: string | undefined;
        url: string;
      }>
    ) => {
      state.proteins.push(...action.payload.proteins);
      state.next = action.payload.next;
      state.totalResultsCount = Number(action.payload.totalResultsCount);
      if (action.payload.url === state.url) {
        state.url = action.payload.url;
      }
      if (action.payload.query) {
        action.payload.query === "*"
          ? (state.query = "")
          : (state.query = action.payload.query);
      }
    },
    setInitialProtein: (
      state,
      action: PayloadAction<{
        proteins: [];
        next: string | null;
        totalResultsCount: number;
        query: string | undefined;
        url: string;
      }>
    ) => {
      state.proteins = action.payload.proteins;
      state.next = "";
      state.totalResultsCount = Number(action.payload.totalResultsCount);
      if (action.payload.url === state.url) {
        state.url = action.payload.url;
      }
      if (action.payload.query) {
        action.payload.query === "*"
          ? (state.query = "")
          : (state.query = action.payload.query);
      }
    },
    resetProteinData: (state) => {
      state.proteins = [];
      state.next = null;
      state.totalResultsCount = 0;
      state.query = "";
    },
    setNextUrl: (state, action: PayloadAction<string>) => {
      state.next = action.payload;
    },
  },
});

const { setProteinChunk, resetProteinData, setNextUrl, setInitialProtein } =
  proteinsSlice.actions;

export {
  proteinsSlice,
  setProteinChunk,
  resetProteinData,
  setNextUrl,
  setInitialProtein,
};
