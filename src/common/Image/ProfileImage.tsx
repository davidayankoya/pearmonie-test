import { BrandColor } from 'constants/theme';
import { Box, BoxProps, Center } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { MdModeEditOutline } from 'react-icons/md';


interface ProfileImageProps extends BoxProps {
    w?: BoxProps['w'];
    h?: BoxProps['h'];
    imgSrc?: string | Blob | MediaSource;
    editable?: boolean;
    onEdit?: () => void;
}
function ProfileImage({ w, h, imgSrc, editable, onEdit, children, ...props }: ProfileImageProps) {
    const fileUrl = useMemo(() => {
        if (typeof imgSrc === 'string') {
            return imgSrc.includes('/') ? imgSrc : ''
        } else {
            return imgSrc ? URL.createObjectURL(imgSrc) : ''
        }
    }, [imgSrc])

    return (
        <Box
            borderRadius='full'
            border={`1px solid ${BrandColor.dark}`}
            w={['8.5rem']}
            h={['8.5rem']}
            bg={`url(${!!fileUrl ? fileUrl : '/assets/img/grey-bg.png'})`}
            bgSize='cover'
            {...props}
        >
            {children}
            {editable &&
                <Center pos='absolute' bottom='.2rem' right='.2rem' bgColor={BrandColor.active} borderRadius='full' p={2} onClick={onEdit} cursor='pointer' _hover={{ filter: 'grayscale(30%)' }}>
                    <MdModeEditOutline color={BrandColor.white} size={16} />
                </Center>

            }
        </Box>
    )
}

export default ProfileImage