import React from 'react'
import { Flex } from '@chakra-ui/react'


function HeaderCenter({
    children
}: { children?: React.ReactNode }) {
    return (
        <Flex w='55%' align='center'>
            {children}
        </Flex>
    )
}

export default HeaderCenter