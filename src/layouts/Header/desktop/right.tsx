import React from 'react';
import { HStack } from '@chakra-ui/react';
import Button from 'common/Button/Button';
// import Avatar from 'common/Avatar/Avatar';
import { useAppSelector } from 'hooks/useApp';
// import { BrandColor, TextColor } from 'constants/theme';
import { UserModel } from 'types/auth/auth.type';
// import { Text } from 'common/Text/Text';
// import { PiCaretDownBold } from "react-icons/pi";
// import { MdOutlineLogout } from "react-icons/md";
// import { logoutReq } from 'store/authSlice';
import { Link } from 'common/Link/Link';
// import MenuDropdown from 'common/Menu/MenuDropdown';
// import { useLocation, useNavigate } from 'react-router-dom';


export const Authenticated = ({
    user,
}: { user: UserModel | null; }) => {
    // const dispatch = useAppDispatch()
    // const push = useNavigate()
    // const { pathname } = useLocation()
    // const { isOpen, onOpen, onClose } = useDisclosure()

    // const logout = () => {
    //     dispatch(logoutReq())
    // }

    // const menuOptions = [
    //     { name: 'Log Out', icon: <MdOutlineLogout size={20} style={{ transform: 'translateX(2px)'}} />, onUse: logout },
    // ]

    return (
        <HStack w={['full', 'full', 'max-content']} alignItems='center' justify='end' spacing={4}>
            {/* <Link href='#'>
                <IoNotifications size={26} color={BrandColor.white} />
            </Link> */}
            
            {/* <HStack>
                <Avatar
                    src={user?.profile_image}
                    name={user?.full_name}
                    size='md'
                    color={BrandColor.crimson}
                    onClick={onOpen}
                    cursor='pointer'
                    mr={1}
                />
                <Text
                    size='sm'
                    color={TextColor.white}
                    onClick={onOpen}
                    cursor='pointer'
                    w='max-content'
                    textTransform='uppercase'
                >
                    {user?.full_name}
                </Text>
                <MenuDropdown
                    options={menuOptions}
                    buttonIcon={PiCaretDownBold}
                    buttonProps={{ fontSize: '1rem', color: BrandColor.white }}
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    listProps={{ mt: 3 }}
                    itemProps={{ fontWeight: 500 }}
                    shadow
                />
            </HStack> */}
        </HStack>
    )
}


const Unauthenticated = () => {
    
    return (
        <HStack w='max-content' align='center' justify='end' spacing={4}>
            <Link href="/login">
                <Button
                    text={'Log In'}
                    py={3}
                />
            </Link>
        </HStack>
    )
};


function HeaderRight({
    options,
}: { options?: any[] }) {
    const { isAuthenticated, user } = useAppSelector(s => s.auth)  

    return (
        <React.Fragment>
            {isAuthenticated ?
                <Authenticated
                    user={user}
                /> :
                <Unauthenticated />
            }
        </React.Fragment>
    );
}

export default HeaderRight