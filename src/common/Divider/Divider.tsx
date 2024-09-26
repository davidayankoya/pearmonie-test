import React from 'react'
import { Divider as ChakraDivider, DividerProps as ChakraDividerProps, HStack, StackProps } from '@chakra-ui/react'
import { Text, TextProps } from '../Text/Text';

interface DividerProps extends ChakraDividerProps {
    text?: string;
    textProps?: TextProps;
    containerProps?: StackProps;
}
function Divider({ color, text, textProps, containerProps, ...props }: DividerProps) {
    return (text ? (
        <HStack w='full' {...containerProps}>
            <ChakraDivider
                opacity={1}
                borderColor={color}
                {...props}
            />
            <Text size='sm' minW='max-content' {...textProps}>{text}</Text>
            <ChakraDivider
                opacity={1}
                borderColor={color}
                {...props}
            />
        </HStack>
    ) : (
        <ChakraDivider
            opacity={1}
            borderColor={color}
            {...props}
        />  
    ))
}

export default Divider