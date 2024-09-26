// 'use client'
import React from 'react'
import { Box, BoxProps, Tooltip as ChakraTooltip, TooltipProps as ChakraTooltipProps } from '@chakra-ui/react'

interface TooltipProps {
    children: React.ReactNode;
    containerProps?: BoxProps;
}

function Tooltip({ children, containerProps, ...props }: TooltipProps & ChakraTooltipProps) {
    return (
        <ChakraTooltip fontSize='sm' hasArrow {...props}>
            <Box {...containerProps}>
                {children}
            </Box>
        </ChakraTooltip>
    )
}

export default Tooltip