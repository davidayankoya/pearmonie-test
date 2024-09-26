import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, BoxProps } from '@chakra-ui/react'
import { BrandColor } from 'constants/theme'


interface ModalCenterProps {
    isOpen: boolean;
    onClose?: () => void;
    size?: string;
    width?: BoxProps['w'];
    height?: BoxProps['h'];
    header?: string;
    body?: React.ReactNode;
    footer?: React.ReactNode;
    noClose?: boolean;
    dark?: boolean;
    headerColor?: string;
    noHeader?: boolean;
    noFooter?: boolean;
    bodyProps?: BoxProps;
    contentProps?: BoxProps;
}

function ModalCenter({
    isOpen,
    onClose,
    size,
    width,
    height,
    header,
    body,
    footer,
    noClose,
    dark,
    bodyProps,
    contentProps,
}: ModalCenterProps) {
    return (
        <React.Fragment>
            <Modal
                isOpen={isOpen}
                onClose={onClose ? onClose : () => null}
                size={!width ? 'lg' : size ?? 'max-content'}
                scrollBehavior='outside'
                isCentered
            >
                <ModalOverlay
                    backdropFilter='blur(8px)'
                    bg={BrandColor.hover}
                />
                <ModalContent w={width} h={height} fontFamily='Inter' bgColor={dark ? 'transparent' : ''} maxW='96vw' maxH={height ?? '96vh'} boxShadow={dark ? 'none' : ''} {...contentProps}>
                    {header && <ModalHeader fontSize='xl' fontFamily='Inter'>{header}</ModalHeader>}
                    {!noClose && <ModalCloseButton color={dark ? 'white' : ''} size={dark ? 'lg' : 'md'} />}
                    <ModalBody maxH={['88vh', '88vh', '100vh']} h={height} overflow='auto' className='scroll-custom' {...bodyProps}>
                        {body}
                    </ModalBody>
                    {footer && <ModalFooter>{footer}</ModalFooter>}
                </ModalContent>
            </Modal>
        </React.Fragment>
    )
}

export default ModalCenter