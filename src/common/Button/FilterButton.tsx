import { HStack } from '@chakra-ui/react';
import React from 'react'
import { IoSearch } from 'react-icons/io5'
import { CgSortAz } from 'react-icons/cg'
import { BrandColor } from 'constants/theme';


interface FilterButtonProps {
    onClick: () => void;
}
function FilterButton({ onClick }: FilterButtonProps) {
    return (
        <HStack
            as='button'
            borderRadius="3rem"
            py={1.5}
            px={4}
            border={`1px solid ${BrandColor.active}`}
            cursor="pointer"
            onClick={onClick}
            _hover={{ bgColor: 'gray.50' }}
            transition='all .2s ease-in-out'
        >
            <IoSearch color={BrandColor.active} size={20} />
            <CgSortAz color={BrandColor.active} size={26} />
        </HStack>
    )
}

export default FilterButton