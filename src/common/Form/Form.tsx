'use client'

import { StackProps, VStack } from '@chakra-ui/react';
import React, { CSSProperties, FormEvent, FormEventHandler }  from 'react'

interface FormProps extends Omit<StackProps, 'onSubmit'> {
    onSubmit?: (e?: FormEvent<HTMLFormElement>) => void;
    containerStyle?: CSSProperties;
}

export function Form({
    onSubmit,
    children,
    spacing,
    containerStyle,
    ...props
} : FormProps) {
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        onSubmit && onSubmit(e)
    }
    return (
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', justifyContent: 'center', ...containerStyle }}>
            <VStack w='full' align='start' spacing={spacing} {...props}>
                {children}
            </VStack>
        </form>
    )
}