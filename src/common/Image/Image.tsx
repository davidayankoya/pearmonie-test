import { Image as ChakraImage, ImageProps } from '@chakra-ui/react'


function Image({ alt, ...props }: ImageProps) {
    return (
        <ChakraImage
            alt={alt ?? 'pic'}
            h={props.h ?? 'auto'}
            {...props}
        />
    )
}

export default Image