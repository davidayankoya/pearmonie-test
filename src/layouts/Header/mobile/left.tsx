import React from 'react'
import { Flex, IconButton } from '@chakra-ui/react'
import { TiThMenu } from 'react-icons/ti'
import { useAppDispatch, useAppSelector } from 'hooks/useApp'
import { toggleLeftSide } from 'store/uiSlice'
import { BrandColor } from 'constants/theme'
import SidebarLeft from '../../Sidebar/left/mobile'
import { NavigationLink } from 'types/general'
import { useScreenSize } from 'hooks/useScreen'


function HeaderLeft({ menu, bgColor, sidebarBg }: { menu: NavigationLink[]; bgColor?: string; sidebarBg?: string; }) {
    const dispatch = useAppDispatch()
    const { isLeftToggled } = useAppSelector(s => s.ui)
    const { isMobile } = useScreenSize()

    const onToggle = () => {
        dispatch(toggleLeftSide(!isLeftToggled))
    }


    return (
        <Flex w='full' align='center'>
            <IconButton
                variant="unstyled"
                icon={<TiThMenu size={24} color={BrandColor.white} />}
                aria-label="open menu"
                onClick={onToggle}
            />

            {/* <Breadcrumb /> */}

            {isMobile && <SidebarLeft menu={menu} bgColor={sidebarBg ?? bgColor} />}
        </Flex>
    )
}

export default HeaderLeft