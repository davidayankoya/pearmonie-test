import { VStack } from '@chakra-ui/react'
import React from 'react'
import GuestMiddleware from 'middlewares/GuestMiddleware'
import { BrandColor } from 'constants/theme';


function FullScreenLayout({
    children,
    params,
    bgColor,
    redirectTo,
}: { children: React.ReactNode; params: { locale: string }; bgColor?: string; redirectTo?: string }) {
    return (
        <GuestMiddleware params={params} redirectTo={redirectTo}>
            <VStack
                w='full'
                h='var(--doc-height)'
                spacing={0}
                className='app-container'
                bg={bgColor ?? BrandColor.white}
            >
                {children}
            </VStack>
        </GuestMiddleware>
    )
}

export default FullScreenLayout