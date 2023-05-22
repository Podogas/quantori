import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:{proteins:[],next:string|null,totalResultsCount:string | null, query:string|undefined} = {
  proteins: [],
  next: null,
  totalResultsCount: '',
  query:'',
};

const proteinsSlice = createSlice({
  name: "proteins",
  initialState,
  reducers: {
    setProteinChunk: (state, action: PayloadAction<{ proteins: []; next: string | null,totalResultsCount:string | null, query:string|undefined }> ) => {
      state.proteins.push(...action.payload.proteins);
      state.next = action.payload.next;
      state.totalResultsCount = action.payload.totalResultsCount;
      if(action.payload.query){
        action.payload.query === '*' ?
        state.query = '':
        state.query = action.payload.query;
      }
      console.log(state, 'afre changes')
    },
    resetProteinData:(state) => {
      state.proteins = [];
      state.next = null;
      state.totalResultsCount = '';
      state.query = '';
      console.log('reset', state)
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