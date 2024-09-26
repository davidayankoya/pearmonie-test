import React from 'react'
import { Text as ChakraText, TextProps as ChakraTextProps } from '@chakra-ui/react'
import { TextColor } from 'constants/theme';

export interface TextProps extends ChakraTextProps {
    clip?: boolean;
    weight?: ChakraTextProps['fontWeight'];
}

export function Text({
    children,
    clip,
    size,
    weight,
    color,
    ...props
}: TextProps) {
    return (
        <ChakraText
            // fontFamily='Inter'
            fontSize={size ?? 'md'}
            fontWeight={weight ?? 400}
            color={color ?? TextColor.black}
            textOverflow={clip ? 'ellipsis' : 'initial'}
            overflow={clip ? 'hidden' : ''}
            lineHeight={props.lineHeight ?? 1.5}
            whiteSpace={clip ? 'nowrap' : 'normal'}
            {...props}
        >
            {children}
        </ChakraText>
    )
}

export function Heading({
    children,
    clip,
    size,
    weight,
    color,
    ...props
}: TextProps) {
    return (
        <ChakraText
            fontSize={size ?? '2xl'}
            fontWeight={weight ?? 600}
            color={color ?? TextColor.black}
            textOverflow={clip ? 'ellipsis' : 'initial'}
            overflow={clip ? 'hidden' : ''}
            lineHeight={props.lineHeight ?? 1.5}
            whiteSpace={clip ? 'nowrap' : 'normal'}
            {...props}
        >
            {children}
        </ChakraText>
    )
}

export function SubHeading({
    children,
    clip,
    size,
    weight,
    color,
    ...props
}: TextProps) {
    return (
        <ChakraText
            fontSize={size ?? 'lg'}
            fontWeight={weight ?? 500}
            color={color ?? TextColor.black}
            textOverflow={clip ? 'ellipsis' : 'initial'}
            overflow={clip ? 'hidden' : ''}
            lineHeight={props.lineHeight ?? 1.5}
            whiteSpace={clip ? 'nowrap' : 'normal'}
            {...props}
        >
            {children}
        </ChakraText>
    )
}