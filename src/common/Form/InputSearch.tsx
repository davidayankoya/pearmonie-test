import React, { useEffect } from 'react'
import { Input } from 'common/Form'
import Popup from 'common/Popup/Popup'
import { BrandColor } from 'constants/theme'
import { BoxProps, Center, VStack, useDisclosure } from '@chakra-ui/react'
import { FormikValues } from 'formik'
import { IoSearch } from 'react-icons/io5'
import { RxCross2 } from "react-icons/rx";


interface InputSearchProps {
    onSearch: (x: string) => void;
    isLoading: boolean;
    results: any[];
    renderResult: (x: any, index: number) => React.ReactElement;
    emptyResultText: string;
    placeholderText: string;
    formik: FormikValues;
    value: string;
    w?: BoxProps['w'];
    minW?: BoxProps['minW'];
}
export function InputSearch({ onSearch, isLoading, results, renderResult, emptyResultText, placeholderText, formik, value, w, minW }: InputSearchProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        if (value === formik.values.search && (!!value || formik.values.changes)) {
            onSearch(value)
        }
        if (!formik.values.changes) {
            formik.setFieldValue('changes', true)
        }
        //eslint-disable-next-line
    }, [value, formik.values])


    return (
        <Popup
            isOpen={isOpen}
            controlled={true}
            content={
                <VStack
                    align='start'
                    spacing={0}
                    p={3}
                    zIndex={2}
                    bgColor={BrandColor.white}
                    borderRadius='md'
                    maxH='60vh'
                    overflowY='auto'
                    className='scroll-custom'
                >
                    {/* {renderResult(res, index)} */}
                    {/* <BasicSk loading={[isLoading]}>
                        {results.length === 0 ? (
                            <Text>{!!formik.values.search ? emptyResultText : placeholderText}</Text>
                        ) : results.map((res, index) => (
                            null
                        ))}
                    </BasicSk> */}
                </VStack>
            }
        >
            <Input
                leftIcon={<IoSearch size={18} color={BrandColor.active} />}
                placeholder='Search'
                name='search'
                formik={formik}
                value={formik.values.search}
                radius='20px'
                minW={minW ? minW : w ? 'auto' : '200px'}
                w={w ?? 'auto'}
                onFocus={onOpen}
                onBlur={onClose}
                autoComplete="off"
                caps={false}
                rightIcon={!!formik.values.search ? <Center onClick={() => formik.setFieldValue('search', '')}><RxCross2 size={18} color={BrandColor.dark} /></Center> : undefined}
            />
        </Popup>
    )
}