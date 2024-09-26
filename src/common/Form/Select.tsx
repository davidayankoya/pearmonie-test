'use client'

import React from 'react'
import { Select as ChakraSelect, SelectProps as ChakraSelectProps, FormControl, FormLabel, BoxProps, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { BrandColor, TextColor } from 'constants/theme'
import { Text } from '../Text/Text';
import { FormikValues } from "formik";
import { getNestedValue } from 'utils/utils';
const dontTranslate = ['year', 'country', 'state', 'lga', 'admin_id', 'registration_id', 'order_number', 'default_gateway']


interface SelectProps extends ChakraSelectProps {
    formik?: FormikValues;
    name: string;
    value?: any;
    label?: string;
    labelStyle?: any;
    w?: BoxProps['w'];
    h?: BoxProps['h'];
    options?: any[];
    displayValues?: any[];
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    loading?: boolean;
    border?: string;
    margin?: string;
    radius?: string;
    error?: string;
    color?: string;
    leftIcon?: React.ReactNode;
    labelColor?: string;
    focusBorder?: string;
    style?: any;
    placeholder?: string;
    placeholderStyle?: any;
    custom?: boolean;
    layout?: string;
    noPlaceholder?: boolean;
    containerProps?: BoxProps;
    customOption?: (x: any) => React.ReactNode;
    afterChange?: (val: string) => void;
}

export function Select({ 
    label,
    labelStyle,
    options = [],
    displayValues,
    onChange,
    value,
    color,
    className,
    style,
    name,
    height,
    disabled,
    required,
    border,
    error,
    radius,
    labelColor,
    bgColor,
    placeholder,
    noPlaceholder,
    placeholderStyle,
    focusBorder,
    leftIcon,
    custom,
    formik,
    loading,
    customOption,
    afterChange,
    ...props
}: SelectProps) {

    const formikChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        formik?.setFieldValue(name, value);
        afterChange && afterChange(value === placeholder ? '' : value)
    };
    const formError = error ? error : getNestedValue(formik?.errors, name) ?? ''

    return (
        <FormControl w={props.w ?? 'full'} cursor='pointer'>
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
                {leftIcon &&
                    <InputLeftElement
                        left={0.5}
                        cursor='pointer'
                        h='full'
                    >
                        {leftIcon}
                    </InputLeftElement>
                }
                <ChakraSelect
                    id={`${name} ${label}`}
                    name={name}
                    fontSize='md'
                    onChange={e => onChange ? onChange(e) : formikChange(e)}
                    isDisabled={disabled}
                    isRequired={required}
                    // isReadOnly={disabled}
                    h={props.h || '44px'}
                    color={color || TextColor.dark}
                    bgColor={bgColor ?? BrandColor.offWhite}
                    borderStyle='inset'
                    _focus={{ border: '' }}
                    _focusVisible={{ border: '', boxShadow: `0 0 0 2.5px ${BrandColor.highlight}` }}
                    _placeholder={{ color: TextColor.grey, fontSize: "sm" }}
                    border={formError ? "2px solid crimson" : border || `1px solid gray.100`}
                    borderRadius={radius || '6px'}
                    value={value}
                    cursor='pointer'
                    sx={{ paddingInlineStart: leftIcon ? '42px' : '12px' }}
                    {...props}
                    w='full'
                >
                    {!noPlaceholder && <option value='' style={placeholderStyle}>{placeholder}</option>}
                    {loading && <option value='' style={placeholderStyle}>Loading..</option>}
                    {options.map((optionValue, index) =>
                        <option key={index} value={optionValue} style={{ color: TextColor.dark }}>
                            {customOption ? customOption(optionValue) : displayValues ? (dontTranslate.some(e => name.includes(e)) ? displayValues[index] : displayValues[index]) : (dontTranslate.some(e => name.includes(e)) ? optionValue : optionValue)}
                        </option>
                    )}
                </ChakraSelect>
            </InputGroup>

            {!!formError &&
                <Text size='sm' mt='6px' mb={0} color='crimson'>
                    {formError}
                </Text>
            }
        </FormControl>
    )
}