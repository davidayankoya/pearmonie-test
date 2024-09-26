import { Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'
import HeaderRight from '../desktop/right'
import { BrandColor } from 'constants/theme'
import { MobileAndTablet } from 'common/Container/Breakpoints'
import { NavigationLink } from 'types/general'
import HeaderLeft from './left'


function Wrapper({ children, ...props } : {
    children: React.ReactNode
} & FlexProps) {
    return (
        <Flex
            w='full'
            h='70px'
            alignItems='center'
            justifyContent='space-between'
            py={1}
            px='10px'
            borderBottom={`1px solid brand.lightShadow`}
            bg={props?.bgColor ?? BrandColor.primary}
            {...props}
        >
            {children}
        </Flex>
    )
}

function MobileHeader({
    children,
    menu,
    bgColor,
    sidebarBg,
} : {
    children?: React.ReactNode,
    options?: any[],
    menu: NavigationLink[];
    bgColor?: string;
    sidebarBg?: string;
}) {
    return (
        <MobileAndTablet>
            <Wrapper bgColor={bgColor}>
                <HeaderLeft menu={menu} bgColor={bgColor} sidebarBg={sidebarBg} />
                <HeaderRight />
            </Wrapper>
        </MobileAndTablet>
    )
}

export default MobileHeader