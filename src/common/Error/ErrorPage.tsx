import Button from 'common/Button/Button'
import { Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import PageMain from 'layouts/PageMain'
import Container from 'common/Container/Container'
import FullScreenLayout from 'layouts/FullScreenLayout'
import { BrandColor, TextColor } from 'constants/theme'


function ErrorPageMain() {
    return (
        <Container>
            <VStack h='100%' alignItems='center' justifyContent='center' spacing={4}>
                <Text as='h1' fontWeight={800} fontSize={['40px', '80px']}>404: Oops</Text>
                <Text fontSize={['16px', '25px']} m='0px'>Page does not exist</Text>
                <Link to='/'>
                    <Button
                        text="Go Home"
                        size='lg'
                        bg={BrandColor.primary}
                        color={TextColor.white}
                    />
                </Link>
            </VStack>
        </Container>
    )
}

export default function ErrorPage() {
    return (
        <FullScreenLayout params={{ locale: 'en' }}>
            <PageMain title='Page Not Found' description='Error 404: Page Not Found' fullPage>
                <ErrorPageMain />
            </PageMain>
        </FullScreenLayout>
    )
}