import ModalDrawer from "common/Modal/ModalDrawer";
import { useAppDispatch, useAppSelector } from "hooks/useApp";
import { toggleLeftSide } from "store/uiSlice";
import { VStack } from "@chakra-ui/react";
import Menu from "./menu";
import { NavigationLink } from "types/general";
import { BrandColor } from "constants/theme";
import Image from "common/Image/Image";
import { Link } from "common/Link/Link";
import BasicSk from "common/Skeleton/BasicSk";
import Logo from 'assets/img/logo.svg'
import BrandLogo from 'assets/img/brand.svg'


function Content({ menu, isOpen, onToggle, bgColor }: { menu: NavigationLink[]; isOpen: boolean; onToggle: () => void; bgColor?: string; }) {

    return (
        <VStack w='full' h='full' bg={bgColor ?? BrandColor.primary} pt='2rem' align='center'>
            <Link href='/dashboard' onClick={onToggle}>
                <Image
                    // w={isOpen ? '90px' : '50px'}
                    // h={isOpen ? '90px' : '50px'}
                    alt='brand logo'
                    src={isOpen ? BrandLogo : Logo}
                    w={isOpen ? '90%' : 'full'}
                    h={isOpen ? 'auto' : 'auto'}
                    ml={isOpen ? '.8rem' : '0'}
                />
            </Link>
            <Menu
                isOpen={isOpen}
                navLinks={menu}
                onToggle={onToggle}
            />
        </VStack>
    )
}

function SidebarLeft({ menu, bgColor }: { menu: NavigationLink[]; bgColor?: string; }) {
    const dispatch = useAppDispatch()
    const { isLeftToggled } = useAppSelector(s => s.ui)
    
    const onToggle = () => {
        dispatch(toggleLeftSide(!isLeftToggled))
    }

    return (
        <ModalDrawer
            isOpen={isLeftToggled}
            onClose={onToggle}
            bg={bgColor ?? BrandColor.primary}
            body={
                <BasicSk count={7} loading={[menu.length === 0]} mt={10}>
                    <Content
                        isOpen={isLeftToggled}
                        onToggle={onToggle}
                        menu={menu}
                        bgColor={bgColor}
                    />
                </BasicSk>
            }
        />
    )
}

export default SidebarLeft;