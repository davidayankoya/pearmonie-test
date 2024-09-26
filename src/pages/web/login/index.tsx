import { HStack, VStack } from '@chakra-ui/react'
import Image from 'common/Image/Image'
import React from 'react'
import LoginHero from 'assets/img/login-hero.png'
import Blob from 'assets/img/blob.svg'
import { BrandColor, TextColor } from 'constants/theme'
import { SubHeading } from 'common/Text/Text'
import LoginForm from './components/LoginForm'


function Login() {
  return (
        <HStack w='full' h='full' bg={BrandColor.offWhite} spacing={0}>
            <VStack h='full' w='68%' justify='center' overflow='hidden' display={['none', 'none', 'flex']} pos='relative'>
                <Image
                    alt='login hero'
                    src={LoginHero}
                    w='55rem'
                    h='auto'
                />
                <Image
                    alt='blob'
                    src={Blob}
                    w='25rem'
                    h='auto'
                    pos='absolute'
                    top='-6rem'
                    left='-7.5rem'
                />
                <Image
                    alt='blob'
                    src={Blob}
                    w='15rem'
                    h='auto'
                    pos='absolute'
                    top='90%'
                    left='75%'
                    overflow='visible'
                />
            </VStack>
          
            <VStack
                w={['full', 'full', '32%']}
                h='full'
                bg={BrandColor.white}
                align="center"
                justify='center'
                spacing="4rem"
                px={['1rem', '1rem', '3rem']}
                py='3rem'
                overflowY='auto'
                className="scroll-custom"
            >
                <SubHeading weight={600} color={TextColor.dark}>Login into your Account</SubHeading>
                
                <LoginForm />
            </VStack>
        </HStack>
    )
}

export default Login