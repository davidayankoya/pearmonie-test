import { Skeleton, SkeletonProps } from '@chakra-ui/react'
import React from 'react'


function ImageSk({ ...props }: SkeletonProps) {
    return (
        <Skeleton
            h='140px'
            w={['90px', '120px', '140px']}
            borderRadius='md'
            mb={2}
            startColor='white.600'
            endColor='gray.300'
            {...props}
        />
    )
}

export default ImageSk