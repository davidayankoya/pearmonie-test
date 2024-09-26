import { BrandColor } from "constants/theme"
import { Avatar as ChakraAvatar, AvatarProps as ChakraAvatarProps } from "@chakra-ui/react"
import React from 'react'


function Avatar(props: ChakraAvatarProps) {
    return (
        <ChakraAvatar
            {...props}
            // bgColor={props.bgColor ?? BrandColor.white}
            // color={props.color ?? BrandColor.primary}
        />
    )
}

export default Avatar