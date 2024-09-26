import React, { MouseEventHandler } from 'react'
import { TableContainer, Table as ChakraTable, Tbody, Td, Th, Thead, Tr, HStack, TableProps as ChakraTableProps, BoxProps, StackProps, TextProps, Flex, Box, TableHeadProps, TableBodyProps } from '@chakra-ui/react'
import EmptyListHero from 'common/Hero/EmptyListHero'
import MenuDropdown from 'common/Menu/MenuDropdown'
import TableSk from 'common/Skeleton/TableSk'
import { Text } from '../Text/Text'
import { BrandColor, TextColor } from 'constants/theme'
import { formatJson } from 'utils/utils'
import Popup from '../Popup/Popup'
import { TbArrowNarrowDown, TbArrowNarrowUp } from 'react-icons/tb'
import { SortType } from 'types/general'
import { DeleteIcon, EditIcon } from '../Icon/Icon'


interface TableProps extends ChakraTableProps {
    tableFields: { name: string; display?: string; key: string; key1?: string; key2?: string; }[];
    tableData?: any[];
    loading: boolean;
    emptyText: string;
    options?: { name: string; onUse: (x: any) => void; icon?: React.ReactElement; color?: string; reverse?: boolean }[];
    numbered?: boolean;
    onClickHeading?: (x: string) => void;
    sortBy?: string;
    sortOrder?: string;
    onClickRow?: MouseEventHandler<HTMLTableRowElement>;
    headerBg?: string;
    headerColor?: string;
    children?: React.ReactNode;
    currentPage?: number;
    perPage?: number;
    title?: string;
    containerProps?: BoxProps;
    tableProps?: ChakraTableProps;
    tableHeadProps?: TableHeadProps;
    tableBodyProps?: TableBodyProps;
    edit?: boolean;
}

export function Table({
    tableFields = [],
    tableData = [],
    loading,
    emptyText,
    options = [],
    numbered,
    onClickHeading,
    onClickRow,
    headerBg,
    headerColor,
    children,
    currentPage = 1,
    perPage = 20,
    title,
    containerProps,
    tableProps,
    tableHeadProps,
    tableBodyProps,
    edit,
    sortBy,
    sortOrder,
    ...props
}: TableProps) {
    return (
        <TableContainer
            w='full'
            bgColor={BrandColor.white}
            overflowX='scroll'
            className='scroll-custom'
            borderRadius='lg'
            py={0}
            {...props}
            {...containerProps}
        >
            {title && <Text size='lg' fontWeight={600} mb={2}>{title}</Text>}
                
            <ChakraTable variant='simple' {...tableProps}>
                <Thead bgColor={headerBg ?? BrandColor.primary} {...tableHeadProps}>
                    <Tr>
                        {numbered &&
                            <Th
                                // className={Fonts.inter}
                            >
                                <Text color={headerColor ?? TextColor.white} fontWeight={400}>S/N</Text>
                            </Th>
                        }
                        {tableFields.map((heading, index) => heading.name === '' ? <Th key={index}></Th> :
                            <Th
                                key={index}
                                textTransform='none'
                                paddingLeft={0}
                                // paddingLeft={index === 0 ? 5 : ''}
                                // className={Fonts.inter}
                            >
                                <HStack align='center' justify='space-between' minW='max-content' onClick={() => (onClickHeading && !!heading['key']) && onClickHeading(heading['key'])} cursor={!!onClickHeading ? 'pointer' : 'default'} spacing={2}>
                                    <Text color={headerColor ?? TextColor.white} fontWeight={400}>
                                        {heading?.display ?? heading?.name ?? heading}
                                    </Text>
                                    
                                    {(onClickHeading && !!heading['key']) && (
                                        <HStack spacing='-1rem'>
                                            <TbArrowNarrowUp
                                                size={18}
                                                color={(sortBy === heading?.key && sortOrder === SortType.asc) ? BrandColor.white : BrandColor.offWhite}
                                            />
                                            <TbArrowNarrowDown
                                                size={18}
                                                color={(sortBy === heading?.key && sortOrder === SortType.desc) ? BrandColor.white : BrandColor.offWhite}
                                            />
                                        </HStack>
                                    )
                                    }
                                </HStack>
                            </Th>
                        )}
                    </Tr>
                </Thead>
                
                {!loading && tableData.length > 0 &&
                    <Tbody {...tableBodyProps}>
                        {children}
                    </Tbody>
                }
            </ChakraTable>

            {loading && <TableSk />}
            
            {!loading && tableData.length === 0 && <EmptyListHero text={emptyText} />}
        </TableContainer>
    )
}


interface TableRowProps {
    index: number;
    row: any;
    rowData: any[];
    rowValue?: string;
    cellProps?: StackProps;
    cellTextProps?: TextProps;
    onClick?: MouseEventHandler<HTMLTableRowElement>;
    options?: { name: string; onUse: (x: any) => void; icon?: React.ReactElement, reverse?: boolean }[];
    numbered?: boolean;
    colored?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
    currentPage?: number;
    perPage?: number;
}

export function TableRow({
    index,
    row,
    rowData,
    rowValue,
    cellProps,
    cellTextProps,
    onClick,
    options = [],
    numbered = false,
    currentPage = 1,
    perPage = 20,
    onEdit,
    onDelete,
    colored,
} : TableRowProps) {
    const stopPropagation: MouseEventHandler<HTMLButtonElement | HTMLDivElement> = (e) => {
        e.stopPropagation()
    }

    return (
        <Tr
            onClick={e => { onClick ? onClick(row) : stopPropagation(e); }}
            bgColor={colored ? index % 2 === 0 ? BrandColor.border : '' : ''}
            cursor={onClick ? 'pointer' : ''}
            _hover={{ bgColor: onClick ? BrandColor.active50 : undefined }}
            borderBottom={`1px solid '#C2C2C2'`}
        >
            {numbered &&
                <Td py={5}>
                    <Text size='sm' color={TextColor.light}>{index + 1 + (currentPage * perPage) - perPage}</Text>
                </Td>
            }
            {rowData.map((datum: any, ind) => (
                <Td key={ind} paddingLeft={0} py={5} minW='max-content' verticalAlign='middle'>
                    {
                    // STATUS_MAP.positive.includes(allLower(rowValue ? datum[rowValue] : datum)) ? (
                    //     <Tag colorScheme='whatsapp' size='sm'>{allCaps(rowValue ? datum[rowValue] : datum)}</Tag>
                    // ) : STATUS_MAP.pending.includes(allLower(rowValue ? datum[rowValue] : datum)) ? (
                    //     <Tag colorScheme='blackAlpha' size='sm'>{allCaps(rowValue ? datum[rowValue] : datum)}</Tag>
                    // ) : STATUS_MAP.negative.includes(allLower(rowValue ? datum[rowValue] : datum)) ? (
                    //     <Tag colorScheme='red' size='sm'>{allCaps(rowValue ? datum[rowValue] : datum)}</Tag>
                    // ) : STATUS_MAP.other.includes(allLower(rowValue ? datum[rowValue] : datum)) ? (
                    //     <Tag colorScheme='purple' size='sm'>{allCaps(rowValue ? datum[rowValue] : datum)}</Tag>
                    // ) :
                    ['string', 'number'].includes(typeof (rowValue ? datum[rowValue] : datum)) ? (
                        <HStack
                            minW='max-content'
                            w='full'
                            h='full'
                            py={1}
                            bgColor={datum.custom ? BrandColor.border : ''}
                            border={datum.custom ? `1px solid ${BrandColor.border}` : ''}
                            borderRadius={datum.custom ? '.3rem' : ''}
                            cursor={datum.custom ? 'pointer' : ''}
                            {...cellProps}
                        >
                            {datum.custom ? (
                                <Popup
                                    content={
                                        <Flex w='19rem' h='auto' m={2} borderRadius='.4rem' bgColor='#011627'>
                                            <pre
                                                dangerouslySetInnerHTML={{
                                                    __html: formatJson(rowValue ? datum[rowValue] : datum)
                                                }}
                                                style={{ display: 'grid', width: '19rem', maxWidth: '19rem', maxHeight: '15rem', overflow: 'auto', backgroundColor: '#011627' }}
                                                className='scroll-custom'
                                            />
                                        </Flex>
                                    }
                                    autoFocus={true}
                                    hasArrow={true}
                                    bodyProps={{ boxShadow: `0px 0px 10px ${BrandColor.shadow}` }}
                                >
                                    <Box w='full' overflow='hidden'>
                                        <Text size='sm' color={TextColor.black} weight={600} {...cellTextProps}>{rowValue ? datum[rowValue] : datum}</Text>
                                    </Box>
                                </Popup>
                            ) : (
                                <Text size='sm' color={TextColor.black} weight={600} {...cellTextProps}>{rowValue ? datum[rowValue] : datum}</Text>
                            )}
                        </HStack>
                    ) : datum?.options?.length > 0 ? (
                        <HStack minW='max-content' w='full' h='full' justify='start'>
                            <MenuDropdown
                                data={row}
                                options={datum.options}
                                placement='bottom-start'
                            />
                        </HStack>
                    ) : datum?.edit ? (
                        datum.onEdit && (
                            <EditIcon onClick={(e) => { e.stopPropagation(); datum.onEdit() }} w='min-content' />
                        )
                    ) : datum?.delete ? (
                        datum.onDelete && (
                            <DeleteIcon onClick={(e) => { e.stopPropagation(); datum.onDelete() }} w='min-content' />
                        )
                    ) : datum?.edit_delete ? (
                        <HStack minW='max-content' w='full' h='full' spacing={2} justify='start' onClick={(e) => e.stopPropagation()}>
                            {datum.onEdit && (
                                <EditIcon onClick={(e) => { e.stopPropagation(); datum.onEdit() }} w='min-content' />          
                            )}
                            {datum.onDelete && (
                                <DeleteIcon onClick={(e) => { e.stopPropagation(); datum.onDelete() }} w='min-content' />               
                            )}              
                        </HStack>
                    ) : (
                        <HStack minW='max-content' w='full' justify='center' py={1} {...cellProps}>
                            {rowValue ? datum[rowValue] : datum}
                        </HStack>
                    )}
                </Td>
            ))}
            {(onEdit || onDelete) &&
                <Td py={2}>
                    <HStack minW='max-content' w='full' justify='center'>
                        {onEdit && (
                            <EditIcon onClick={(e) => { e.stopPropagation(); onEdit() }} w='min-content' /> 
                        )}
                        {onDelete && (
                            <DeleteIcon onClick={(e) => { e.stopPropagation(); onDelete() }} w='min-content' />  
                        )}
                        {options.length > 0 && 
                            <MenuDropdown
                                data={row}
                                options={options}
                            />
                        }
                    </HStack>
                </Td>
            }
        </Tr>

    )
}