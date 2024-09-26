import React from 'react'
import { Text, TextProps } from '../Text/Text'
import { TextColor } from 'constants/theme'
import { Flex } from '@chakra-ui/react';

interface TableCountProps {
    data?: {
        current_page: number;
        per_page: number;
        last_page: number;
        total: number;
    };
    textProps?: TextProps;
}
function TableCount({ data, textProps }: TableCountProps) {
    return (
        <Flex w='full' justify={['center', 'center', 'center', 'start']}>
            <Text size='sm' color={TextColor.dark} {...textProps}>
                {`Showing data ${(((data?.current_page ?? 1) - 1) * (data?.per_page ?? 20)) + 1} to ${(data?.per_page ?? 20) * (data?.current_page ?? 1)} of ${data?.total ?? 0} entries`}
            </Text>
        </Flex>
    )
}

export default TableCount