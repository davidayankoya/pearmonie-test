import React from 'react'
import { HStack, StackProps, TextProps } from '@chakra-ui/react'
import { BrandColor, TextColor } from 'constants/theme'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Text } from '../Text/Text';


interface CrumbProps {
    onClick: () => void;
    color?: string;
    text?: string;
    textProps?: TextProps;
    containerProps?: StackProps;
    reverse?: boolean;
}

function Crumb({ onClick, color, text, textProps, containerProps, reverse }: CrumbProps) {
    return (
        <HStack _hover={{ textDecor: 'underline' }} spacing={0} cursor='pointer' onClick={onClick} {...containerProps}>
            {!reverse && <MdOutlineKeyboardArrowLeft size={20} color={color ?? BrandColor.white} />}
            <Text color={color ?? TextColor.white} fontWeight={500} {...textProps}>{text ?? 'Back'}</Text>
            {reverse && <MdOutlineKeyboardArrowRight size={20} color={color ?? BrandColor.white} />}
        </HStack>
    )
}

export default Crumb