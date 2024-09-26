import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import uiReducer from './uiSlice'
import authReducer from './authSlice'
import { injectAppStore } from 'utils/api';


function activateReduxDevtools() {
    if (typeof window !== "undefined") {
        const _window: any = window;
        _window.__REDUX_DEVTOOLS_EXTENSION__ &&
            _window.__REDUX_DEVTOOLS_EXTENSION__();
    }
}

const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
    },
})

activateReduxDevtools();

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;

injectAppStore(store)

export default store
export type StoreType = typeof store