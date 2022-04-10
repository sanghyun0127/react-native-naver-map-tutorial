import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface Props {
  markerList: Array<any>;
  markerRequestList: Array<any>;
}

const initialState: Props = {
  markerList: [],
  markerRequestList: [],
};

export const markerSlice = createSlice({
  name: 'marker',
  initialState,
  reducers: {
    setMarkerList: (state, action: PayloadAction<any>) => {
      state.markerList = action.payload;
    },
    setMarkerRequestList: (state, action: PayloadAction<any>) => {
      state.markerRequestList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMarkerList, setMarkerRequestList } = markerSlice.actions;
export const markerListStatus = (state: RootState) => state.marker.markerList;
export const markerRequestListStatus = (state: RootState) =>
  state.marker.markerRequestList;

export default markerSlice.reducer;
