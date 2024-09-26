import { Container as ChakraContainer } from "@chakra-ui/react"


function Container({ children }: { children: React.ReactNode }) {
    return (
        <ChakraContainer maxW={['full', 'full', 'full', '1600px']} mx='auto' minH='full' p={0}>
            {children}
        </ChakraContainer>
    )
}

export default Container