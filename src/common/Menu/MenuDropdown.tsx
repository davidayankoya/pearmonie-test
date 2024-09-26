'use client'

import React, { MouseEventHandler, CSSProperties } from 'react'
import { Menu, MenuButton, MenuList, MenuItem, HStack, Flex, MenuProps, MenuListProps } from '@chakra-ui/react'
import { BrandColor, TextColor } from 'constants/theme'
import { FaEllipsisV } from 'react-icons/fa'
import { IconType } from 'react-icons'
import { Text } from '../Text/Text'


interface MenuDropdownProps {
    options: { name: string; onUse?: (x?: any) => void; icon?: React.ReactElement; color?: string; reverse?: boolean }[];
    data?: any,
    heading?: string,
    buttonIcon?: IconType,
    buttonProps?: { size?: number; } & CSSProperties,
    itemProps?: CSSProperties,
    listProps?: MenuListProps;
    animateBtn?: boolean;
    isOpen?: boolean;
    shadow?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    placement?: MenuProps['placement'];
}

function MenuDropdown({
    data,
    options = [],
    heading,
    buttonIcon: ButtonIcon = FaEllipsisV,
    buttonProps,
    itemProps,
    listProps,
    animateBtn,
    isOpen,
    onOpen,
    onClose,
    shadow,
    placement,
}: MenuDropdownProps){
    const stopPropagation: MouseEventHandler<HTMLButtonElement | HTMLDivElement> = (e) => {
        e.stopPropagation()
    }

    return (
        <Menu autoSelect={false} placement={placement ?? 'bottom'} closeOnBlur={true} isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            {({ isOpen }) => (
                <React.Fragment>
                    <Flex justify='end' onClick={stopPropagation}>
                        <MenuButton justifyContent='center' onClick={stopPropagation} p={2} borderRadius='.5rem' _hover={{ bgColor: BrandColor.hover }}>
                            <ButtonIcon
                                color={BrandColor.dark}
                                style={{
                                    transform: (animateBtn && isOpen) ? 'rotateZ(180deg)' : 'rotateZ(0deg)',
                                    transition: '.1s ease-in',
                                    ...buttonProps
                                }}
                            />
                        </MenuButton>
                    </Flex>
                    <MenuList zIndex={3} mt={0} mr={1} boxShadow={shadow ? `0px 0px 10px ${BrandColor.shadow}` : ''} {...listProps}>
                        {heading && <Text mx={5} my={2} fontWeight={700} color={TextColor.grey}>{heading}</Text>}
                        {options?.map((option, index) =>
                            <MenuItem
                                key={index}
                                py={2}
                                px={4}
                                color={TextColor.dark}
                                onClick={(e) => { option.onUse && option.onUse(data); stopPropagation(e) }}
                                icon={option?.icon ? option.icon : undefined}
                                display='flex'
                                flexDir={option?.reverse ? 'row' : 'row-reverse'}
                                sx={{ ...itemProps }}
                            >
                                <HStack spacing={3}>
                                    <Text fontSize='14px' color={option?.color}>{option.name}</Text>
                                </HStack>
                            </MenuItem>
                        )}
                    </MenuList>
                </React.Fragment>
            )}
        </Menu>
    )
}

export default MenuDropdown
