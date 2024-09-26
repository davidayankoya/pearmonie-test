'use client'

import { Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'
import HeaderLeft from './left'
import HeaderRight from './right'
import { BrandColor } from 'constants/theme'
import { DesktopOnly } from 'common/Container/Breakpoints'


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
            // pl='10px'
            pr='20px'
            borderBottom={`1px solid brand.lightShadow`}
            bg={props?.bgColor ?? BrandColor.primary}
            {...props}
        >
            {children}
        </Flex>
    )
}

function DesktopHeader({
    children,
    bgColor,
    showBreadcrumb,
} : {
    children?: React.ReactNode,
    options?: any[],
    bgColor?: string;
    showBreadcrumb?: boolean;
}) {
    return (
        <DesktopOnly>
            <Wrapper bgColor={bgColor}>
                <HeaderLeft showBreadcrumb={showBreadcrumb} />
                {/* <HeaderCenter>{children}</HeaderCenter> */}
                <HeaderRight />
            </Wrapper>
        </DesktopOnly>
    )
}

export default DesktopHeader