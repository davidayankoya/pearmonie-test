import React from 'react'
import DesktopSidebarLeft from './desktop'
import { Box } from '@chakra-ui/react'
import { NavigationLink } from 'types/general'


const SidebarWrapper = ({ children }: { children: React.ReactNode }) => (
    <Box as='nav' zIndex={3} h='full'>
        {children}
    </Box>
)


function Index({ menu, bgColor }: { menu: NavigationLink[]; bgColor?: string; }) {
    return (
        <SidebarWrapper>
            <DesktopSidebarLeft menu={menu} bgColor={bgColor}/>
        </SidebarWrapper>
    )
}

export default Index