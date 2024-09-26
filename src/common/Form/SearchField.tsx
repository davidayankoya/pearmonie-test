import { HStack, StackProps } from "@chakra-ui/react";
import { TextProps, Text } from "../Text/Text";
import { TextColor } from "constants/theme";


interface SearchFieldProps {
    title: string;
    value: string;
    containerProps?: StackProps;
    titleProps?: TextProps;
    valueProps?: TextProps;
}
export function SearchField({ title, value, containerProps, titleProps, valueProps }: SearchFieldProps) {
    return (
        <HStack w='full' align='start' spacing={2} {...containerProps}>
            <Text size='xs' color={TextColor.grey} w='40%' {...titleProps}>{`${title}:`}</Text>
            <Text size='xs' w='60%' {...valueProps}>{value}</Text>
        </HStack>
    )
}