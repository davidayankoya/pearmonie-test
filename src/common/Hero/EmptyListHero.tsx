import React from 'react'
import { Flex, Center } from '@chakra-ui/react'
import { Text } from '../Text/Text';
import { TextColor } from 'constants/theme';
import Image from '../Image/Image';
import EmptyHero from "assets/img/stop-sign.png"

interface EmptyListHeroProps {
    text: string;
    w?: string;
    h?: string;
}

function EmptyListHero({ text, w, h }: EmptyListHeroProps) {
    return (
        <Flex bg='transparent' direction='column' py='50px' w='full'>
            <Center mb={3}>
                <Image
                    src={EmptyHero}
                    w={w ?? 110}
                    h={h ?? 110}
                    alt='empty list'
                />
            </Center>
            <Text size='lg' fontWeight={500} color={TextColor.grey} textAlign='center'>{text}</Text>
        </Flex>
    )
}

export default EmptyListHero