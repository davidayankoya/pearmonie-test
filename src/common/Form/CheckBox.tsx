'use client'

import React from 'react'
import { BoxProps, Checkbox as ChakraCheckbox, CheckboxProps as ChakraCheckboxProps, FormControl, FormLabel, FormLabelProps, HStack } from '@chakra-ui/react'
import { BrandColor, TextColor } from 'constants/theme'
import { Text } from '../Text/Text';
import { FormikValues } from "formik";
import { getNestedValue } from 'utils/utils';


export interface CheckBoxProps extends Omit<ChakraCheckboxProps, 'value'> {
    formik?: FormikValues;
    name: string;
    value?: string | number | boolean;
    label?: string;
    labelProps?: FormLabelProps;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    radius?: string;
    error?: any;
    labelColor?: string;
    placeholderStyle?: any;
    custom?: boolean;
    noPlaceholder?: boolean;
    containerProps?: BoxProps;
}

export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(({
    label,
    name,
    labelColor,
    labelProps,
    value,
    onChange,
    border,
    error,
    required,
    disabled,
    readOnly,
    custom,
    formik,
    containerProps,
    ...props
}, ref) => {
    const formikChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        formik?.setFieldValue(name, checked);
    };
    const formError = error ? error : getNestedValue(formik?.errors, name) ?? ''

    return (
        <FormControl w={props.w}>
            <HStack spacing={3} align='center' {...containerProps}>
                <ChakraCheckbox
                    ref={ref}
                    id={`${name} ${label}`}
                    name={name}
                    onChange={onChange ? onChange : formikChange}
                    border={formError ? "2px solid crimson" : border}
                    size='md'
                    isChecked={Boolean(value)}
                    isReadOnly={readOnly}
                    isDisabled={disabled}
                    isRequired={required}
                    // value={String(value)}
                    {...props}
                />
                {label &&
                    <FormLabel
                        htmlFor={`${name} ${label}`}
                        color={custom ? BrandColor.crimson : labelColor || TextColor.grey}
                        fontSize='sm'
                        minWidth={150}
                        fontWeight={400}
                        cursor='pointer'
                        mb={0}
                        {...labelProps}
                    >
                        {label}{required && <Text size='sm' as='span' color='crimson'> *</Text>}
                    </FormLabel>
                }
            </HStack>
            
            {!!formError &&
                <Text size='sm' mt='6px' mb={0} color='crimson'>
                    {formError}
                </Text>
            }
        </FormControl>
    )
})

CheckBox.displayName = 'CheckBox'