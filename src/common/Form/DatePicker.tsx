import { InputProps as ChakraInputProps, FormControl, FormLabel } from '@chakra-ui/react'
import { TextColor } from 'constants/theme'
import React from 'react'
import { FormikValues } from "formik";
import { Text } from '../Text/Text'
import ReactDatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './style.scss';
import { Dayjs } from 'dayjs';
import { IoCalendarOutline } from 'react-icons/io5';
import { dayDate, getNestedValue } from 'utils/utils';


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface DatePickerProps extends Omit<ChakraInputProps, 'onChange'| 'min' | 'max' |'value'> {
    formik?: FormikValues;
    name: string;
    value?: string;
    min?: string | Dayjs;
    max?: string | Dayjs;
    onChange?: (name: string, value: string) => void;
    format?: string;
    label?: string;
    labelStyle?: any;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    border?: string;
    margin?: string;
    radius?: string;
    error?: string;
    color?: string;
    leftElement?: React.ReactNode;
    style?: any;
    placeholderStyle?: any;
    showOnly?: 'year' | 'month';
}

export function DatePicker({
    label,
    name,
    value,
    onChange,
    min = '01/01/1950',
    max,
    format='dd/MM/y',
    placeholder,
    placeholderStyle,
    required,
    disabled,
    readOnly,
    border,
    radius,
    style,
    error,
    labelStyle,
    bgColor,
    color,
    formik,
    showOnly,
    ...props
}: DatePickerProps) {
    const formikChange = (name: string, val: Value) => {
        formik?.setFieldValue(name, val ? dayDate(val?.toString()).format() : '')
    }
    const dateChange = (name: string, val: Value) => {
        onChange && onChange(name, val ? dayDate(val?.toString()).format() : '')
    }
    const formError = error ? error : getNestedValue(formik?.errors, name) ?? ''

    return (
        <FormControl w={props.w} cursor='pointer' pos='relative'>
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
                <ReactDatePicker
                    id={`${name} ${label}`}
                    onChange={(val: any) => onChange ? dateChange(name, val) : formikChange(name, val)}
                    value={!!value ? dayDate(value).toDate() : undefined}
                    minDate={min ? dayDate(min).toDate() : undefined}
                    maxDate={max ? dayDate(max).toDate() : undefined}
                    required={required}
                    disabled={disabled}
                    format={format}
                    maxDetail={showOnly === 'year' ? 'decade' : showOnly === 'month' ? 'year' : undefined}
                    clearIcon={null}
                    calendarIcon={<IoCalendarOutline size={20} />}
                    className={`datepicker-container${formError ? ' error' : ''} ${disabled ? ' disabled' : ''}`}
                />
            {!!formError &&
                <Text size='sm' mt='6px' mb={0} color='crimson'>
                    {formError}
                </Text>
            }
        </FormControl>
    )
}