'use client'

import { Modal, ModalHeader, ModalBody, ModalFooter, ModalOverlay, ModalContent, HStack } from '@chakra-ui/react'
import Button from 'common/Button/Button'
import { BrandColor, TextColor } from 'constants/theme'
import { Text } from '../Text/Text';


interface ConfirmModalProps {
    isOpen: boolean;
    onConfirm: Function;
    onClose?: () => void;
    message?: string | number;
    subMessage?: string | number;
}

function ConfirmModal({
    isOpen,
    onConfirm,
    onClose,
    message,
    subMessage,
}: ConfirmModalProps) {

    const handleYes = (e: any) => {
        e.stopPropagation()
        onClose && onClose()
        onConfirm()
    }
    const handleNo = (e: any) => {
        e.stopPropagation()
        onClose && onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={() => onClose && onClose()} size='md' isCentered>
            <ModalOverlay backdropFilter='blur(8px)' />
            <ModalContent w='sm' maxW='90vw'>
                <ModalHeader></ModalHeader>
                <ModalBody textAlign='center' fontFamily='Inter' px={8}>
                    <Text
                        color={TextColor.grey}
                        fontWeight={500}
                    >
                        {message ?? 'Are you sure ?'}
                    </Text>
                    {subMessage &&
                        <Text
                            color={TextColor.grey}
                            padding='10px'
                        >
                            {subMessage}
                        </Text>
                    }
                </ModalBody>
                <ModalFooter fontFamily='Inter'>
                    <HStack justifyContent='space-between' w='full'>
                        <Button
                            text='Yes'
                            onClick={handleYes}
                            bg={BrandColor.primary}
                            w='50%'
                            size='md'
                        />
                        <Button
                            text='No'
                            variant='outline'
                            color={BrandColor.crimson}
                            onClick={handleNo}
                            w='50%'
                            size='md'
                        />
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ConfirmModal