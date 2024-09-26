import { Flex, FlexProps, Icon, IconButton } from '@chakra-ui/react'
import React from 'react'
import { DesktopOnly } from 'common/Container/Breakpoints'
import { BrandColor } from 'constants/theme'
import { toggleLeftSide } from 'store/uiSlice'
import { useAppDispatch, useAppSelector } from 'hooks/useApp'
import { NavigationLink } from 'types/general'
import Menu from './menu'
import Image from 'common/Image/Image'
import { Link } from 'common/Link/Link'
import BasicSk from 'common/Skeleton/BasicSk'
import Logo from 'assets/img/logo.svg'
import BrandLogo from 'assets/img/brand.svg'
import { PiCaretCircleLeftFill } from 'react-icons/pi'


function SidebarStyle({
    children,
    isOpen,
    onToggle,
    ...props
}: { children: React.ReactNode; isOpen: boolean; onToggle: () => void; } & FlexProps) {
    
    return (
        <Flex
            h='calc(100vh)'
            w={isOpen ? '350px' : '82px'}
            transition='width .2s ease-out'
            direction='column'
            align={isOpen ? 'start' : 'center'}
            pos='relative'
            pt={10}
            pb={6}
            px={isOpen ? '1.5rem' : '1rem'}
            overflowX='visible'
            bg={props?.bgColor ?? BrandColor.primary}
            // gap={2}
            // {...props}
        >
            <Link href='/dashboard'>
                <Image
                    alt='brand logo'
                    src={isOpen ? BrandLogo : Logo}
                    w={isOpen ? '90%' : 'full'}
                    h={isOpen ? 'auto' : 'auto'}
                    ml={isOpen ? '.8rem' : '0'}
                />
            </Link>
            <IconButton
                variant="unstyled"
                icon={<Icon as={PiCaretCircleLeftFill} fontSize={26} color={BrandColor.primary} transform={isOpen ? '' : 'rotateZ(180deg)'} />}
                aria-label="open menu"
                onClick={onToggle}
                pos='absolute'
                right='-1.3rem'
                top='2.5rem'
                display={['none', 'none', 'initial']}
            />
            {children}
        </Flex>
    )
}

function SidebarLeft({ menu, bgColor }: { menu: NavigationLink[]; bgColor?: string; }) {
    const dispatch = useAppDispatch()
    const { isLeftToggled } = useAppSelector(s => s.ui)

    const onToggle = () => {
        dispatch(toggleLeftSide(!isLeftToggled))
    }
    
    return (
        <DesktopOnly>
            <SidebarStyle
                isOpen={isLeftToggled}
                onToggle={onToggle}
                bgColor={bgColor}
            >
                <BasicSk count={7} loading={[menu.length === 0]} p={4}>
                    <Menu
                        isOpen={isLeftToggled}
                        navLinks={menu}
                        onToggle={onToggle}
                    />
                </BasicSk>
            </SidebarStyle>
        </DesktopOnly>
    )
}

export default SidebarLeft