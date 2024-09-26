import { Box } from "@chakra-ui/react";
import { NavigationLink } from "types/general";
import MobileHeader from "./mobile"

const HeaderWrapper = ({ children }: { children: React.ReactNode }) => (
    <Box w='full' className='app-header' as='header' pos='relative' top={0} zIndex={3}>
        {children}
    </Box>
)

function Header({
    children,
    menu,
    bgColor,
    sidebarBg,
    showBreadcrumb,
 }: { 
    children?: React.ReactNode,
    options?: any[],
    menu: NavigationLink[];
    bgColor?: string;
    sidebarBg?: string;
    showBreadcrumb?: boolean;
}) {
    return (
        <HeaderWrapper>
            {/* <DesktopHeader bgColor={bgColor} showBreadcrumb={showBreadcrumb}>{children}</DesktopHeader> */}
            <MobileHeader menu={menu} bgColor={bgColor} sidebarBg={sidebarBg}>{children}</MobileHeader>
        </HeaderWrapper>
    )
}

export default Header