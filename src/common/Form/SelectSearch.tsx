'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FormikValues } from "formik";
import { BoxProps, Input as ChakraInput, FormControl, FormLabel, HStack, InputGroup, InputLeftElement, InputRightElement, useDisclosure } from '@chakra-ui/react';
import Autocomplete from 'react-autocomplete';
import { BrandColor, TextColor } from 'constants/theme';
import { Text } from '../Text/Text';
import { allLower, getNestedValue } from 'utils/utils';
import { PiCaretDownBold } from "react-icons/pi";
import Popup from 'common/Popup/Popup';
// import { useTranslations } from 'next-intl';
const dontTranslate = ['country', 'state', 'lga', 'local', 'admin_id', 'registration_id', 'registration_center', 'occupation', 'profession' , 'ethnic_origin', 'role_id', 'reporting_id']


export interface SelectSearchProps extends Omit<BoxProps, 'onChange'> {
    formik?: FormikValues;
    name: string;
    label?: string;
    labelStyle?: any;
    w?: BoxProps['w'];
    h?: BoxProps['h'];
    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
    loading?: boolean;
    value?: string;
    onChange?: (x: string, y: string) => void; // should be alt controller(name, value)
    afterChange?: (val: string) => void;
    options?: any[];
    selectValue?: string;
    displayValue?: string;
    onBlur?: () => void;
    onFocus?: () => void;
    border?: string;
    margin?: string;
    radius?: string;
    error?: string;
    focusBorder?: string;
    color?: string;
    bgColor?: string;
    style?: any;
    placeholder?: string;
    placeholderStyle?: any;
    noPlaceholder?: boolean;
    leftElement?: React.ReactNode;
    rightIcon?: React.ReactNode;
    rightIconProps?: BoxProps;
    onRightIconClick?: VoidFunction;
    noTranslate?: boolean;
}

export function SelectSearch({ 
    label,
    labelStyle,
    options = [],
    selectValue,
    displayValue,
    onChange,
    afterChange,
    value,
    style,
    name,
    disabled,
    required,
    readOnly,
    border,
    error,
    radius,
    color,
    bgColor,
    placeholder,
    noPlaceholder,
    placeholderStyle,
    focusBorder,
    leftElement,
    rightIcon,
    onRightIconClick,
    rightIconProps,
    formik,
    loading,
    noTranslate,
    ...props
}: SelectSearchProps) {
    // const t = useTranslations('global')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const containerRef = useRef<HTMLDivElement | null>(null)
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<Autocomplete | null>(null)
    const [search, setSearch] = useState('')

    const placeholderOption = useMemo(() => ({
        [selectValue ?? 'code']: '',
        [displayValue ?? 'name']: loading ? 'Loading' : 'Select --',
    }), [displayValue, selectValue, loading])

    const placeholderText = loading ? 'Loading' : 'Select --'

    const formikChange = (name: string, val: string) => {
        formik?.setFieldValue(name, val === 'Select --' ? '' : val);
        afterChange && afterChange(val === 'Select --' ? '' : val)
        onClose()
    }

    const handleChange = (name: string, val: string) => {
        onChange && onChange(name, val)
        afterChange && afterChange(val)
        onClose()
    }

    const finalVal = () => {
        const finder = selectValue ? options.find((e: any) => e[selectValue] === value) : undefined
        return (displayValue && finder) ? finder[displayValue] : value
    }

    const getWidth = containerRef?.current ? containerRef?.current.clientWidth : ['', '', '21rem']

    const formError = error ? error : getNestedValue(formik?.errors, name) ?? ''

    const handleOutsideClick = (ev: any) => {
        if ((containerRef.current && !containerRef.current.contains(ev.target)) && (wrapperRef.current && !wrapperRef.current.contains(ev.target))) {
            onClose();
        }
    }

    // const memoOptions = useMemo(() => {
    //     const newObj: any = {}
    //     if (selectValue) {
    //         options.forEach((opt: any) => {
    //             newObj[opt[selectValue]] = opt
    //         })
    //     }
    //     return newObj
    // }, [options, selectValue])

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick)
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (isOpen && inputRef.current) {
            const focusInterval = setTimeout(() => {
                inputRef.current?.focus()
            }, 0)
            return () => clearTimeout(focusInterval)
        }
    }, [isOpen])
    

    return (
        <Popup
            isOpen={isOpen}
            onClose={onClose}
            controlled={true}
            placement='bottom-start'
            contentProps={{ minW: getWidth, h: 'max-content', border: 'none', boxShadow: 'none' }}
            content={
                <Autocomplete
                    ref={el => { inputRef.current = el }}
                    items={selectValue ? [placeholderOption, ...options.map(e => ({ ...e, [selectValue]: String(e[selectValue]) }))].slice(noPlaceholder ? 1 : 0) : [placeholderText, ...options.map(e => String(e))].slice(noPlaceholder ? 1 : 0)}
                    renderItem={(item, isHighlighted) => {
                        const isActive = selectValue ? allLower(item[selectValue]) === allLower(value) : item === value
                        return (
                            <HStack bgColor={isActive ? BrandColor.active100 : 'white'} _hover={{ bgColor: BrandColor.hover }} p={2} cursor='pointer'>
                                <Text size='sm'>{displayValue ? ((dontTranslate.some(e => name.includes(e)) || noTranslate) ? item[displayValue] : item[displayValue]) : ((dontTranslate.some(e => name.includes(e)) || noTranslate) ? item : item)}</Text>
                            </HStack>
                        )
                    }}
                    shouldItemRender={(item, value) =>
                        displayValue ? allLower(item[displayValue]).indexOf(allLower(value)) > -1 :
                        allLower(item).indexOf(allLower(value)) > -1
                    }
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    getItemValue={(item) => selectValue ? item[selectValue] : item}
                    onSelect={(val) => onChange ? handleChange(name, val) : formikChange(name, val)}
                    open={true}
                    menuStyle={{
                        width: '100%',
                        maxHeight: '15rem',
                        overflowY: 'auto',
                    }}
                    wrapperProps={{ className: `select-search-wrapper`, ref: wrapperRef }}
                    wrapperStyle={{
                        width: '100%',
                        zIndex: 2,
                        border: `1px solid ${BrandColor.border}`,
                        borderRadius: '6px',
                        padding: '0',
                        overflow: 'hidden',
                        backgroundColor: BrandColor.white,
                        boxShadow: `0px 5px 15px ${BrandColor.shadow}`,
                    }}
                />
            }
        >
            <FormControl w={props.w ?? 'full'} h='max-content' cursor='pointer' pos='relative' ref={containerRef} gridColumnStart={props.gridColumnStart}>
                {label &&
                    <FormLabel
                        htmlFor={`${name} ${label}`}
                        color={TextColor.grey}
                        fontSize='sm'
                        mb='6px'
                        sx={labelStyle}
                    >
                        {label}{required && <Text size='sm' as='span' color='crimson'> *</Text>}
                    </FormLabel>
                }
                <InputGroup>
                    {leftElement &&
                        <InputLeftElement
                            left={1}
                            top={2}
                            cursor='pointer'
                        >
                            {leftElement}
                        </InputLeftElement>
                    }
                    <ChakraInput
                        id={`${name} ${label}`}
                        name={name}
                        value={finalVal()}
                        isDisabled={disabled}
                        isRequired={required}
                        isReadOnly={true}
                        onClick={disabled ? undefined : onOpen}
                        size='md'
                        fontSize='md'
                        color={color ?? TextColor.dark}
                        bgColor={BrandColor.offWhite}
                        pl={leftElement ? '42px' : '12px'}
                        pr={rightIcon ? '42px' : '10px'}
                        h={props.h || '44px'}
                        borderStyle='inset'
                        _focus={{ border: `` }}
                        _focusVisible={{ border: '', boxShadow: `0 0 0 2.5px ${BrandColor.highlight}` }}
                        placeholder={placeholder}
                        _placeholder={{ color: TextColor.grey, fontSize: "md" }}
                        border={formError ? "2px solid crimson" : isOpen ? `1px solid ${BrandColor.highlight}` : border || `1px solid ${BrandColor.border}`}
                        borderRadius={radius || '6px'}
                        sx={style}
                        cursor='pointer'
                        {...props}
                        w='full'
                    />
                    {!disabled &&
                        <InputRightElement
                            right={1}
                            top={0.5}
                            cursor='pointer'
                            onClick={onOpen}
                            {...rightIconProps}
                        >
                            {rightIcon ?? <PiCaretDownBold size={14} color={BrandColor.grey} />}
                        </InputRightElement>
                    }
                </InputGroup>
                
                {!!formError &&
                    <Text size='sm' mt='6px' mb={0} color='crimson'>
                        {formError}
                    </Text>
                }
            </FormControl>
        </Popup>
    )
}