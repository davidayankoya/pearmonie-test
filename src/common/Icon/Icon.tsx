import { BrandColor } from "constants/theme";
import { Center, CenterProps } from "@chakra-ui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";


interface IconProps extends CenterProps {
    onClick?: (e: any) => void;
}

const sharedProps: CenterProps = {
    cursor: 'pointer',
    w: 'min-content',
    borderRadius: '.5rem',
    p: 2,
}

export function EditIcon({ onClick, ...props }: IconProps) {
    return (
        <Center {...sharedProps} onClick={onClick} _hover={{ bgColor: BrandColor.hover }} {...props}>
            <MdModeEditOutline color={BrandColor.dark} size={18} />
        </Center>
    )
}

export function DeleteIcon({ onClick, ...props }: IconProps) {
    return (
        <Center {...sharedProps} onClick={onClick} _hover={{ bgColor: BrandColor.active100 }} {...props}>
            <FaRegTrashAlt color={BrandColor.crimson} size={16} />
        </Center>
    )
}