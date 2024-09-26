import React from 'react'
import { Tag as ChakraTag, TagProps as ChakraTagProps, TagCloseButton, TagLabel } from '@chakra-ui/react'



interface TagProps extends ChakraTagProps {
    label: string;
    value?: string;
    closeIcon?: boolean;
    onClose?: () => void;
}
function Tag({ label, value, closeIcon, onClose, ...props }: TagProps) {
    return (
        <ChakraTag size='sm' {...props} justifyContent='space-between'>
            <TagLabel>{label}</TagLabel>
            {closeIcon && <TagCloseButton onClick={onClose} />}
        </ChakraTag>
    )
}

export default Tag