import { VStack } from '@chakra-ui/react'
import React from 'react'
import { Text } from '../Text/Text'
import { TextColor } from 'constants/theme'


interface ErrorToastProps {
    errors: { [k: string | number]: string }
}
function ErrorToast({ errors }: ErrorToastProps) {
    return (
        <VStack w='full' align='start'>
            <Text mb={1} color={TextColor.white} fontFamily='Inter'>Missing fields</Text>
            <VStack w='full' align='start'>
                {Object.keys(errors).map((e, index) =>
                    <Text key={`error-text-${index}`} color={TextColor.white} fontFamily='Inter'>{`${e}: ${errors[e][0]}`}</Text>
                )}
            </VStack>
        </VStack>
    )
}

export default ErrorToast