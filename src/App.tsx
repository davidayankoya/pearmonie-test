import React from 'react';
import { Provider } from 'react-redux';
import { ChakraProvider, useColorMode } from '@chakra-ui/react'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useScreenHeightReset } from 'hooks/useScreen'
import { theme } from 'constants/theme';
import Routes from 'routes';
import store from 'store';
import { authLogout, authCheckReq } from 'store/authSlice';

store.dispatch(authCheckReq());


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
    queryCache: new QueryCache({
        onError: (err: any) => {
            if ([400, 401].includes(err?.statusCode)) {
                store?.dispatch && store.dispatch(authLogout()) 
            }
        },
    }),
    mutationCache: new MutationCache({
        onError: (err: any) => {
            if ([400, 401].includes(err?.statusCode)) {
                store?.dispatch && store.dispatch(authLogout()) 
            }
        },
    })
})


function App() {
    const { colorMode } = useColorMode()
    // const userColorMode = useColorModePreference()
    useScreenHeightReset()

    return (
        <Provider store={store}>
            <ChakraProvider theme={theme[colorMode ?? 'light']}>
                <QueryClientProvider client={queryClient}>
                    <Routes/>
                </QueryClientProvider>
            </ChakraProvider>
        </Provider>
    )
}

export default App;