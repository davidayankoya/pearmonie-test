import React, { useState, useEffect } from 'react'
import { Text } from 'common/Text/Text'
import { BrandColor, TextColor } from 'constants/theme'
import { Box, Center, HStack, Icon, useDisclosure, VStack } from '@chakra-ui/react'
import Tooltip from 'common/Tooltip/Tooltip'
import { NavigationLink } from 'types/general'
import { BiCaretDown } from 'react-icons/bi'
import { motion } from 'framer-motion'
import Image from 'common/Image/Image'
import { useScreenSize } from 'hooks/useScreen'
import { useAppSelector } from 'hooks/useApp'
import { Link } from 'common/Link/Link'
import { useLocation } from 'react-router-dom'
import Button from 'common/Button/Button'
import Avatar from 'common/Avatar/Avatar'
import { PiCaretDown } from 'react-icons/pi'


export interface ItemProps {
    item: NavigationLink;
    isActive: boolean;
    isMenuOpen?: boolean;
    onToggleMenu: () => void;
    index?: number;
    isOpenSub?: boolean;
    onToggleSub?: (index: number) => void;
    helpPage?: boolean;
}

function ItemGroup({ index, item, isOpenSub, onToggleSub, isActive, isMenuOpen, onToggleMenu, helpPage }: ItemProps) {
    const { pathname } = useLocation()
    const { isMobile } = useScreenSize()
    const { isOpen: hovered, onOpen: onEnter, onClose: onLeave } = useDisclosure()

    return (
        <li style={{ width: '100%', listStyleType: 'none', backgroundColor: isActive ? '' : '' }}>
            <Tooltip label={item.name} placement='right' isDisabled={isMenuOpen}>
                <HStack
                    w='full'
                    p={!isMenuOpen ? '15px 10px' : ['15px', '15px', '15px 15px 15px 15px']}
                    _hover={{ bgColor: isActive ? BrandColor.secondary : BrandColor.secondary }}
                    justify={!isMenuOpen ? 'center' : 'space-between'}
                    onClick={() => onToggleSub && onToggleSub(index || 0)}
                    cursor='pointer'
                    transition='0.1s all ease-out'
                    borderRadius='lg'
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                >
                    <HStack spacing={6}>
                        <Box>
                            {item.imgIcon ? (
                                <Image
                                    alt={`${item.name}-icon`}
                                    src={item.imgIcon}
                                    w='30px'
                                    h='auto'
                                />
                            ) : item.icon ? (
                                <item.icon
                                    color={BrandColor.white}
                                    size={item?.iconSize ?? 22}
                                />
                            ) : null}
                        </Box>
                        {isMenuOpen && <Text fontWeight={400} color={hovered ? TextColor.white : TextColor.dark}>{item.name}</Text>}
                    </HStack>
                    {isMenuOpen &&
                        <Center transform={isOpenSub ? "rotateZ(180deg)" : ""}>
                            <Icon as={BiCaretDown} color={hovered ? BrandColor.white : BrandColor.grey} fontSize={10} />
                        </Center>
                    }
                </HStack>
            </Tooltip>

            {isOpenSub &&
                <motion.div
                    initial={{ height: '0px' }}
                    animate={{ height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                >
                    <VStack
                        w='full'
                        align='start'
                        spacing={0}
                    >
                        {item.subItems?.map((sub, index) => {
                            const is_active = pathname.startsWith(sub?.to ?? '')
                            return (
                                <Box w='full' key={index}>
                                    <Tooltip key={index} label={sub.name} placement='right' isDisabled={isMenuOpen}>
                                        <Link href={sub.inactive ? '#' : sub.to!} w='full' _hover={{ textDecor: 'none' }} onClick={() => isMobile ? onToggleMenu() : undefined}>
                                            <HStack
                                                w='full'
                                                justify={isMenuOpen ? '' : 'center'}
                                                pl={isMenuOpen ? '4.4rem' : ''}
                                                py='15px'
                                                spacing={4}
                                                // _hover={{ bgColor: is_active ? undefined : BrandColor.primary }}
                                                className={is_active ? 'active-link' : ''}
                                            >
                                                {sub.imgIcon ? (
                                                    <Image
                                                        alt={`${sub.name}-icon`}
                                                        src={sub.imgIcon}
                                                        w='30px'
                                                        h='auto'
                                                    />
                                                ) : sub.icon ? (
                                                    <sub.icon
                                                        color={BrandColor.white}
                                                        size={sub?.iconSize ?? 22}
                                                    />
                                                ) : null}
                                                
                                                <Text size='sm' color={TextColor.dark} fontWeight={400}>
                                                    {isMenuOpen ? (sub.name) : (sub.name).slice(0, 1)}
                                                </Text>
                                            </HStack>
                                        </Link>
                                    </Tooltip>
                                </Box>
                            )
                        })}
                    </VStack>
                </motion.div>
            }
        </li>
    )
}

function Item({ item, isActive, isMenuOpen, helpPage }: ItemProps) {
    return (
        <Tooltip isDisabled={isMenuOpen} label={item.name} placement='right'>
            <li style={{ width: '100%', listStyleType: 'none', position: 'relative' }}>
                <Link href={item.inactive ? '#' : item.to!} style={{ width: '100%' }}>
                    <HStack
                        w='full'
                        p={!isMenuOpen ? '15px 10px' : ['15px 15px 15px 17px', '15px 15px 15px 17px', '15px 15px 15px 27px']}
                        justify={!isMenuOpen ? 'center' : 'start'}
                        spacing={6}
                        // _hover={{ bgColor: isActive ? undefined : BrandColor.primary100 }}
                        className={isActive ? 'active-link' : ''}
                    >
                        {item.icon &&
                            <item.icon
                                color={BrandColor.white}
                                size={item?.iconSize ?? 22}
                            />
                        }
                        {isMenuOpen && <Text size='sm' fontWeight={400} color={TextColor.dark}>{item.name}</Text>}
                    </HStack>
                </Link>
            </li>
        </Tooltip>
    )
}

interface MenuProps {
    isOpen: boolean;
    navLinks: NavigationLink[];
    onToggle: () => void;
}

function Menu({
    isOpen,
    navLinks,
    onToggle
}: MenuProps) {
    const { user } = useAppSelector(s => s.auth)
    const { pathname } = useLocation()

    const [state, setState] = useState({
        open: null
    } as { open: number | null })
    
    const onToggleSub = (index: number) => {
        setState(prev => ({ ...prev, open: prev.open === index ? null : index }))
    }

    const links = navLinks

    useEffect(() => {
        if(!isOpen) setState(prev => ({ ...prev, open: null }))
    }, [isOpen])

    
    return (
        <VStack w='full' overflowY='auto' h='full' pt={['2rem', '2rem', '4rem']} className='no-scrollbar' justify='space-between'>
            <ul style={{ width: '100%', height: 'auto', listStyleType: 'none' }}>
                {links.map((item, index) => (
                    item.isGroup ? (
                        <ItemGroup
                            key={index}
                            index={index}
                            item={item}
                            isMenuOpen={isOpen}
                            onToggleMenu={onToggle}
                            isActive={!!item.to && pathname.startsWith(item.to ?? '')}
                            isOpenSub={state.open === index}
                            onToggleSub={onToggleSub}
                        />
                    ) : (
                        <Item
                            key={index}
                            item={item}
                            isMenuOpen={isOpen}
                            onToggleMenu={onToggle}
                            isActive={!!item.to && pathname.startsWith(item.to ?? '')}
                        />
                    )
                ))}
            </ul>

            <VStack justify='center' spacing='2rem' pb='2rem'>
                {isOpen && 
                    <VStack w='full' align='center' bg={BrandColor.purpleGrade} borderRadius='1.5rem' px='2rem' py='1.5rem' spacing='2rem'>
                        <Text color={TextColor.white} weight={500} textAlign='center'>Upgrade to  PRO to get access all Features!</Text>
                        <Button
                            text='Get Pro Now!'
                            color={BrandColor.purple}
                            bgColor={BrandColor.white}
                            boxShadow='md'
                            w='full'
                        />
                    </VStack>
                }

                <HStack w='full' spacing='1rem' justify='space-between' align='center' py='1rem' px="1rem" _hover={{ bgColor: BrandColor.hover }} borderRadius='lg'>
                    <HStack w='full'>
                        <Avatar name='Ryan Florence' src={user?.image} size='sm' />

                        {isOpen && 
                            <VStack w='max' align='start' spacing='0rem'>
                                <Text weight={600} color={TextColor.black}>{user?.firstName}</Text>
                                <Text size='sm' color={TextColor.grey}>{user?.company?.title ?? 'Project Manager'}</Text>
                            </VStack>
                        }
                    </HStack>

                    {isOpen && <Icon as={PiCaretDown} color={BrandColor.grey} />}
                </HStack>
            </VStack>
        </VStack>
    )
}

export default Menu