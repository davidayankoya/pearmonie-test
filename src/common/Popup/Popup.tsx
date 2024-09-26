'use client'

import React from 'react'
import { BrandColor } from "constants/theme";
import { Popover, PopoverProps, PopoverTrigger, PopoverContent, PopoverContentProps, PopoverArrow, PopoverBody, Portal, PopoverBodyProps, PopoverAnchor } from "@chakra-ui/react"

interface PopupProps extends Omit<PopoverProps, 'trigger' | 'children'> {
    content: React.ReactNode;
    children: React.ReactNode;
    hasArrow?: boolean;
    portal?: boolean;
    controlled?: boolean;
    autoFocus?: boolean;
    contentProps?: PopoverContentProps;
    bodyProps?: PopoverBodyProps;
    bgColor?: string;
    w?: string;
}


function Popup({
    placement,
    isOpen,
    onClose,
    onOpen,
    content,
    children,
    contentProps,
    bodyProps,
    bgColor = BrandColor.white,
    defaultIsOpen = false,
    hasArrow = false,
    portal = false,
    controlled = false,
    closeOnBlur = true,
    autoFocus = false,
    w,
}: PopupProps) {
    return (
        <Popover placement={placement} defaultIsOpen={defaultIsOpen} isOpen={isOpen} onClose={onClose} onOpen={onOpen} closeOnBlur={closeOnBlur} autoFocus={autoFocus}>
            {children && controlled ? (
                <PopoverAnchor>
                    {children}
                </PopoverAnchor>
            ) : (
                <PopoverTrigger>
                    {children}
                </PopoverTrigger>  
            )}
            {portal ? (
                <Portal>
                    <PopoverContent
                        w={w}
                        boxShadow={`0px 0px 10px ${BrandColor.shadow}`}
                        _focusVisible={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                        {...contentProps}
                    >
                        {hasArrow && <PopoverArrow bgColor={bgColor} />}
                        <PopoverBody
                            bgColor={bgColor}
                            borderRadius='lg'
                            p={0}
                            w={w}
                            outline='none'
                            h='max-content'
                            mt={placement === 'bottom-start' ? '-8px' : undefined}
                            _focusVisible={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                            {...bodyProps}
                        >
                            {content}
                        </PopoverBody>
                    </PopoverContent>
                </Portal>
            ) : (
                <PopoverContent
                    boxShadow={`0px 0px 10px ${BrandColor.shadow}`}
                    w={w}
                    {...contentProps}
                    h='max-content'
                    mt={placement === 'bottom-start' ? '-8px' : undefined}
                    _focusVisible={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                >
                    {hasArrow && <PopoverArrow bgColor={bgColor} />}
                    <PopoverBody
                        bgColor={bgColor}
                        borderRadius='lg'
                        p={0}
                        outline='none'
                        w={w}
                        h='max-content'
                        _focusVisible={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                        {...bodyProps}
                    >
                        {content}
                    </PopoverBody>
                </PopoverContent>
            )}
        </Popover>
    )
}

export default Popup