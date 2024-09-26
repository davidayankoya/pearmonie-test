// 'use client'

import { BoxProps, Skeleton, Stack } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

interface BasicSkProps extends BoxProps {
    count?: number;
    loading?: boolean[];
    h?: string | number;
    children: ReactElement;
}

function BasicSk({ count = 1, loading = [false], h, children, ...props }: BasicSkProps) {
    const num = Array(count).fill(0)

    return (loading.some(e => e === true) ? (
            <Stack w='full' direction='column' {...props}>
                {num.map((e, index) =>
                    <Skeleton
                        key={index}
                        h={h ?? '40px'}
                        borderRadius='md'
                        // bgColor={BrandColor.grey100}
                        mb={2}
                    />
                )}
            </Stack>
        ) : children
    )
}

export default BasicSk