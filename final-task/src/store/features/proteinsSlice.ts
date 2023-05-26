import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:{proteins:[],next:string|null,totalResultsCount:string | null, query:string|undefined, url:string} = {
  proteins: [],
  next: null,
  totalResultsCount: '',
  query:'',
  url: ''
};

const proteinsSlice = createSlice({
  name: "proteins",
  initialState,
  reducers: {
    setProteinChunk: (state, action: PayloadAction<{ proteins: []; next: string | null,totalResultsCount:string | null, query:string|undefined, url:string}> ) => {
      state.proteins.push(...action.payload.proteins);
      state.next = action.payload.next;
      state.totalResultsCount = action.payload.totalResultsCount;
      if(action.payload.url !== state.url) {state.url = action.payload.url}
      if(action.payload.query){
        action.payload.query === '*' ?
        state.query = '':
        state.query = action.payload.query;
      }
    },
    resetProteinData:(state) => {
      state.proteins = [];
      state.next = null;
      state.totalResultsCount = '';
      state.query = '';
    }
}
});

const {
  setProteinChunk,
  resetProteinData
} = proteinsSlice.actions;

export {
  proteinsSlice,
  setProteinChunk,
  resetProteinData
};