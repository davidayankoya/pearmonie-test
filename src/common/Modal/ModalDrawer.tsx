import { TextColor } from 'constants/theme';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerProps, BoxProps, ButtonProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ModalDrawerProps extends BoxProps {
    isOpen: boolean,
    onClose: () => void,
    header?: ReactNode,
    body: ReactNode,
    footer?: ReactNode,
    headerProps?: BoxProps,
    closeProps?: ButtonProps,
    size?: DrawerProps['size'];
    placement?: DrawerProps['placement']
}

function ModalDrawer({ isOpen, onClose, header, body, footer, headerProps, closeProps, size, ...props }: ModalDrawerProps) {
    return (
        <Drawer
            isOpen={isOpen}
            placement={props.placement ?? 'left'}
            onClose={onClose}
            size={size ?? 'sm'}
        >
            <DrawerOverlay />
            <DrawerContent fontFamily='Inter' maxW={['90vw', 'sm']} {...props}>
                <DrawerCloseButton {...closeProps} />
                {header && <DrawerHeader color={TextColor.dark} fontSize='lg' {...headerProps}>{header}</DrawerHeader>}
                <DrawerBody className='scroll-custom'>{body}</DrawerBody>
                {footer && <DrawerFooter justifyContent='center'>{footer}</DrawerFooter>}
            </DrawerContent>
        </Drawer>
    )
}

export default ModalDrawer