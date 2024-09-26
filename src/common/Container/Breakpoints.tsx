import { Box, BoxProps } from '@chakra-ui/react';


export const AllSizes = ({ children, type, ...props }: {
    children: React.ReactNode;
    type: string;
}) => {
    const displayType = (type: string) => {
        switch (type) {
            case 'desktop': return ['none', 'none', 'none', 'initial'];
            case 'desktop-tablet': return ['none', 'initial', 'initial', 'initial'];
            case 'mobile': return ['initial', 'none', 'none', 'none'];
            case 'mobile-tablet': return ['initial', 'initial', 'initial', 'none'];
            default: return ''
        }
    }

    return (
        <Box w='full' display={displayType(type)} {...props}>
            {children}    
        </Box>
    )
}

export const DesktopOnly = ({ children, ...props }: BoxProps) => <AllSizes type='desktop' className='desktop-only' {...props}>{children}</AllSizes>
export const DesktopAndTablet = ({ children, ...props }: BoxProps) => <AllSizes type='desktop-tablet' className='desktop-tablet' {...props}>{children}</AllSizes>
export const MobileOnly = ({ children, ...props }: BoxProps) => <AllSizes type='mobile' className='mobile' {...props}>{children}</AllSizes>
export const MobileAndTablet = ({ children, ...props }: BoxProps) => <AllSizes type='mobile-tablet' className='mobile-tablet' {...props}>{children}</AllSizes>