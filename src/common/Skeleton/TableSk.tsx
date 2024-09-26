import { Box, Skeleton } from '@chakra-ui/react'
import { BrandColor } from 'constants/theme'
import React from 'react'
const h = '4.8rem'


function TableSk() {
    return (
        <Box bgColor={BrandColor.white} w='full' borderRadius='md' py={1}>
            <Skeleton borderRadius='md' h={h} mb={1} />
            <Skeleton borderRadius='md' h={h} mb={1} />
            <Skeleton borderRadius='md' h={h} mb={1} />
            <Skeleton borderRadius='md' h={h} mb={1} />
            <Skeleton borderRadius='md' h={h} mb={1} />
            <Skeleton borderRadius='md' h={h} mb={1} />
            <Skeleton borderRadius='md' h={h} mb={1} />
            <Skeleton borderRadius='md' h={h} mb={1} />
        </Box>
    )
}

export default TableSk