import { HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import { BrandColor } from 'constants/theme'
import SidebarLeft from '../Sidebar/left'
import { navLinks } from './menu'
import Header from '../Header'
import AuthMiddleware from 'middlewares/AuthMiddleware'


function AuthLayout({ children, params, redirectTo }: { children: React.ReactNode; params: { locale: string }; redirectTo?: string }) {
    return (
        <AuthMiddleware params={params} redirectTo={redirectTo}>
            <HStack
                bgColor={BrandColor.white}
                w='full'
                h='var(--doc-height)'
                spacing={0}
                justifyItems='start'
            >
                <SidebarLeft menu={navLinks ?? []} bgColor={BrandColor.white} />
                <VStack w='full' align='start' h='100vh' spacing={0} className='scroll-custom'>
                    <Header menu={navLinks ?? []} bgColor='transparent' sidebarBg={BrandColor.white} />
                    {children}
                </VStack>
            </HStack>
        </AuthMiddleware>
    )
}

export default AuthLayout