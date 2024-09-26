import React from 'react'
import { Flex } from '@chakra-ui/react'
import { TiThMenu } from 'react-icons/ti'
import { useAppDispatch, useAppSelector } from 'hooks/useApp'
import { toggleLeftSide } from 'store/uiSlice'
import Breadcrumb from 'common/Crumb/Breadcrumb'


function HeaderLeft({ showBreadcrumb = false }: { showBreadcrumb?: boolean; }) {
    const dispatch = useAppDispatch()
    const { isLeftToggled } = useAppSelector(s => s.ui)

    const onToggle = () => {
        dispatch(toggleLeftSide(!isLeftToggled))
    }

    return (
        <Flex w='full' align='center' overflowX='clip'>
            {/* <IconButton
                variant="unstyled"
                icon={<Icon as={PiCaretCircleLeftFill} fontSize={24} color={BrandColor.primary} transform={isLeftToggled ? '' : 'rotateZ(180deg)'} />}
                aria-label="open menu"
                onClick={onToggle}
                // mr='2rem'
                mt='3rem'
            /> */}

            {showBreadcrumb && <Breadcrumb />}
        </Flex>
    )
}

export default HeaderLeft