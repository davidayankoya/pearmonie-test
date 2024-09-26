import { Link as AppLink } from 'react-router-dom';
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react'


interface LinkProps extends ChakraLinkProps {
    href: string;
    children: React.ReactNode;
}

export function Link({ children, ...props }: LinkProps) {
    return (
        <ChakraLink
            as={AppLink}
            {...props}
        >
            {children}
        </ChakraLink>
    )
}

export function ExternalLink({ children, ...props }: LinkProps) {
    return (
        <ChakraLink
            target="_blank"
            rel='noreferrer'
            {...props}
        >
            {children}
        </ChakraLink>
    )
}