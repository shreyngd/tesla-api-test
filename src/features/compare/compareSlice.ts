import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { LaunchHistory } from '../../components/LaunchesListContainer';

export interface CompareState {
    compareData: Record<string, LaunchHistory>;
    maximized: boolean;
}

const initialState: CompareState = {
    compareData: {},
    maximized: false,
};

export const compareSlice = createSlice({
    name: 'compare',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        addToComapare: (
            state: CompareState,
            action: PayloadAction<LaunchHistory>,
        ) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.compareData[action.payload.id] = action.payload;
        },
        deleteFromCompare: (state, action: PayloadAction<string>) => {
            delete state.compareData[action.payload];
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(incrementAsync.pending, (state) => {
    //             state.status = 'loading';
    //         })
    //         .addCase(incrementAsync.fulfilled, (state, action) => {
    //             state.status = 'idle';
    //             state.value += action.payload;
    //         });
    // },
});

export const { addToComapare, deleteFromCompare } = compareSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCompareData = (
    state: RootState,
): Record<string, LaunchHistory> => state.compare.compareData;
export const selectCompareState = (state: RootState): boolean =>
    state.compare.maximized;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//     (amount: number): AppThunk =>
//     (dispatch, getState) => {
//         const currentValue = selectCount(getState());
//         if (currentValue % 2 === 1) {
//             dispatch(incrementByAmount(amount));
//         }
//     };

export default compareSlice.reducer;
