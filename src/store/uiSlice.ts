import { ColorMode } from "@chakra-ui/react";
import { createSlice } from "@reduxjs/toolkit";

interface UIState {
    isLoading: boolean;
    loadingText: React.ReactNode;
    isLeftToggled: boolean;
    isRightToggled: boolean;
    colorMode: ColorMode;
}
const initialState: UIState = {
    isLoading: false,
    loadingText: null,
    isLeftToggled: true,
    isRightToggled: false,
    colorMode: 'light',
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleLeftSide: (state, { payload }: { payload: boolean | undefined }) => {
            state.isLeftToggled = payload ? payload : !state.isLeftToggled
        },
        toggleRightSide: (state, { payload }: { payload: boolean | undefined }) => {
            state.isRightToggled = payload ? payload : !state.isRightToggled
        },
        toggleLoading: (state, { payload }: { payload: boolean | { loading: boolean; text: React.ReactNode; } }) => {
            if (typeof payload === 'boolean') {
                state.isLoading = payload
            } else {
                state.isLoading = payload.loading
                state.loadingText = payload.text
            }
        },
        toggleColorMode: (state, { payload }: { payload: ColorMode }) => {
            state.colorMode = payload
        },
    },
});

export const { toggleLeftSide, toggleRightSide, toggleLoading } = uiSlice.actions
export default uiSlice.reducer;