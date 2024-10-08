import { Table, TableRow } from 'common/Table/Table'
import { VStack } from '@chakra-ui/react';
import { SortType } from 'types/general';
import { UserResponse } from 'types/auth/user.type';
import { TextColor } from 'constants/theme';
import Tag from 'common/Tag/Tag';

const tableFields = [
    { name: "User's Name", key: 'firstName', show: true },
    { name: 'Company', key: 'email', show: true },
    { name: 'Phone Number', key: 'phone', show: true },
    { name: 'Email', key: 'email', show: true },
    { name: 'Country', key: 'email', show: true },
    { name: 'Status', key: 'email', show: true },
]


interface RegCentersTableProps {
    data?: UserResponse[],
    loading: boolean;
    sortBy?: string;
    sortOrder?: SortType;
    onSearch?: (x: string) => void;
    onSort?: (key: string, order: SortType) => void;
}

function UsersTable({ data = [], loading, onSearch, sortBy, sortOrder, onSort }: RegCentersTableProps) {
    return (
        <VStack w='full' align='start'>
            <Table
                tableFields={tableFields}
                tableData={data}
                loading={loading}
                emptyText='No users found'
                // onClickHeading={(x) => onSort && sortOrder && onSort(x, sortOrder)}
                sortBy={sortBy}
                sortOrder={sortOrder}
                headerBg='transparent'
                headerColor={TextColor.light}
            >
                {data.map((reg, index) =>
                    <TableRow
                        key={`reg-${index}`}
                        index={index}
                        row={reg}
                        rowData={[
                            { name: "User's Name", value: `${reg?.firstName} ${reg?.lastName}` },
                            { name: 'Company', value: reg?.company?.title },
                            { name: 'Phone Number', value: reg?.phone },
                            { name: 'Email', value: reg?.email },
                            { name: 'Country', value: reg?.address?.country },
                            { name: 'Status', value: <Tag label={'Active'} color='#008767' bgColor='rgba(22,192,152,0.38)' size='lg' borderColor='#00B087' borderWidth='1px' fontWeight={500} /> },
                        ]}
                        rowValue='value'
                    />
                )}
            </Table>
        </VStack>
    )
}

export default UsersTable