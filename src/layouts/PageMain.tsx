import React from 'react';
import { Stack, StackProps } from '@chakra-ui/react';
import { BrandColor } from 'constants/theme';


interface MainProps extends StackProps {
    children: React.ReactNode;
    className?: string;
    fullPage?: boolean;
    bgColor?: StackProps['bgColor'];
}

function Main({ children, className, fullPage, bgColor, ...props }: MainProps) {
    return (
        <Stack
            as='main'
            w='full'
            spacing={0}
            direction='column'
            alignContent='center'
            justify='start'
            minH={fullPage ? 'var(--doc-height)' : 'calc(var(--doc-height))'}
            pt={fullPage ? 0 : 2}
            pb={fullPage ? 0 : 0}
            pl={fullPage ? 0 : '.5rem'}
            pr={fullPage ? 0 : ['0', '0', '0', '.1rem']}
            bg={bgColor ?? BrandColor.offWhite}
            overflowY='scroll'
            className={`${className ?? ''} scroll-custom-large`}
            {...props}
        >
            {children}
        </Stack>
    )
}

interface PageMainProps extends StackProps {
    children: React.ReactNode;
    pageClassName?: string;
    fullPage?: boolean;
    bgColor?: StackProps['bgColor'];
    title?: string;
    description?: string;
}

function PageMain ({ pageClassName, title, children, fullPage, bgColor, ...props } : PageMainProps) {
    return (
        <Main className={`page-main-${pageClassName ?? ''}`} fullPage={fullPage} bgColor={bgColor} {...props}>
            {children}
        </Main>
    )
}

export default PageMain;