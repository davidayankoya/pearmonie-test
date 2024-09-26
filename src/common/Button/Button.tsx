'use client'

import React from 'react'
import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react'
import { BrandColor, TextColor } from 'constants/theme'


export interface ButtonProps extends ChakraButtonProps {
    text: string,
    loading?: boolean,
    disabled?: boolean,
    radius?: string,
    colorScheme?: ChakraButtonProps['colorScheme'];
    iconType?: string;
    onClick?: (e?: any) => void;
    bgColor?: string;
}

function Button({
    children,
    text,
    loading,
    disabled,
    fontSize,
    radius,
    margin,
    color,
    bgColor,
    fontWeight,
    colorScheme,
    variant,
    iconType,
    ...props
}: ButtonProps) {
    return (
        <ChakraButton
            size={props.size ?? 'sm'}
            isLoading={loading}
            isDisabled={disabled}
            bg={colorScheme ? undefined : variant === 'outline' ? 'white' : bgColor || BrandColor.primary}
            color={colorScheme ? undefined : color ?? bgColor ?? TextColor.black}
            variant={variant === 'outline' ? 'solid' : undefined}
            colorScheme={colorScheme}
            borderRadius={radius || "22px"}
            margin={margin || '0px'}
            fontWeight={fontWeight || 600}
            fontSize={fontSize || 'md'}
            px={[4, 4, 4]}
            py={[5, 5, 5]}
            minW='140px'
            _hover={{ filter: disabled ? undefined : "invert(15%)" }}
            transition='all .2s ease-in-out'
            lineHeight={1}
            borderColor={variant === 'outline' ? bgColor : undefined}
            borderWidth={variant === 'outline' ? '1.5px' : undefined}
            {...props}
        >
            {text ?? children}
        </ChakraButton>
    )
}

export default Button