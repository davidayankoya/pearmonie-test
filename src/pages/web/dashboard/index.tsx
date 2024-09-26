import { Icon, SimpleGrid, Stack, VStack } from '@chakra-ui/react'
import { Input, Select } from 'common/Form'
import { Heading, Text } from 'common/Text/Text'
import { BrandColor, TextColor } from 'constants/theme';
import { useFormik } from 'formik';
import { useAppSelector } from 'hooks/useApp';
import PageMain from 'layouts/PageMain';
import React, { useState } from 'react'
import { LuMonitor, LuSearch } from "react-icons/lu";
import StatBox from './components/StatBox';
import { LuUsers2 } from "react-icons/lu";
import { TbUserCheck } from "react-icons/tb";
import Pagination from 'common/Pagination/Pagination';
import UsersTable from './components/UsersTable';
import { SortType } from 'types/general';
import { useGetUsersQuery } from 'services/users/users.hook';
import TableCount from 'common/Table/TableCount';
import { GetUsersResponse } from 'types/auth/user.type';
import { useDebounce } from 'use-debounce';
const per_page = 8
const initFilter = {
    page: 1,
    search: '',
    column_name: '',
    sort_type: SortType.desc,
}


function Dashboard() {
    const { user } = useAppSelector(s => s.auth)
    const formik = useFormik({
        initialValues: {
            search: '',
            userSearch: '',
            sortBy: '',
        },
        validateOnChange: false,
        onSubmit: (values: any) => {
        },
    });

    const [filter, setFilter] = useState(initFilter)

    const formatFilter = (payload: typeof filter) => {
        return {
            limit: per_page,
            skip: (payload.page - 1) * per_page,
            sortBy: payload.column_name,
            order: payload.sort_type,
            q: payload.search ?? '',
        }
    }
    const formatResponse = (payload: GetUsersResponse) => {
        return {
            current_page: filter.page,
            per_page: per_page,
            last_page: (payload?.total ?? 0) / per_page ,
            total: payload?.total ?? 0,
        }
    }

    const [value] = useDebounce(formik.values.userSearch, 1000)
    
    const handlePageChange = ({ selected }: { selected: number }) => {
        setFilter(prev => ({ ...prev, page: selected + 1 }))
    }

    const { data: statsResponse } = useGetUsersQuery({ query: formatFilter({ ...initFilter }) })
    const { data: usersResponse, isLoading: usersLoading } = useGetUsersQuery({ query: formatFilter({ ...filter, search: value }) })
    

    return (
        <PageMain fullPage px={['1.5rem', '1.5rem', '3.5rem']} py='2rem' pb='4rem' spacing={['2rem', '2rem', '3rem']}>
            <Stack direction={['column', 'column', 'row']} w='full' py='1rem' justify='space-between' spacing={['1.5rem', '1.5rem', '0']}>
                <Heading size='2xl'>Hello {`${user?.firstName} ${user?.lastName}`}👋🏼</Heading>
                <Input
                    placeholder="Search"
                    name="search"
                    formik={formik}
                    value={formik.values.search}
                    leftIcon={<Icon as={LuSearch} color={BrandColor.dark} />}
                    w={['full', 'full', '30%']}
                    bgColor={BrandColor.white}
                    sx={{ border: 'none' }}
                />
            </Stack>

            <SimpleGrid columns={[1, 1, 2, 3]} gap={['3rem', '3rem', '3rem',  '0']} borderRadius='2rem' px={['2.5rem', '2.5rem', '4rem']} py='2.5rem' bgColor={BrandColor.white}>
                <StatBox
                    icon={<Icon as={LuUsers2} color={BrandColor.green} fontSize={50} />}
                    title='Total Users'
                    count={statsResponse?.total!}
                    type='variation'
                    variation={16}
                    frequency='this month'
                    loading={usersLoading}
                />
                <StatBox
                    icon={<Icon as={TbUserCheck} color={BrandColor.green} fontSize={50} />}
                    title='Members'
                    count={statsResponse?.total!}
                    type='variation'
                    variation={-1}
                    frequency='this month'
                    loading={usersLoading}
                />
                <StatBox
                    icon={<Icon as={LuMonitor} color={BrandColor.green} fontSize={50} />}
                    title='Active Now'
                    count={statsResponse?.total!}
                    type='profiles'
                    loading={usersLoading}
                />
            </SimpleGrid>

            <VStack w='full' align='start' px={['2.5rem', '2.5rem', '4rem']} py={['4rem']} borderRadius='2rem' bgColor={BrandColor.white}>
                <Stack w='full' direction={['column', 'column', 'row']} justify='space-between' mb='2rem' spacing={['2rem', '2rem', '']}>
                    <VStack minW='max-content' align='start'>
                        <Heading>All Users</Heading>
                        <Text weight={500} color={BrandColor.green}>Active Members</Text>
                    </VStack>

                    <Stack w='full' direction={['column', 'column', 'row']} justify='end'>
                        <Input
                            placeholder="Search"
                            name="userSearch"
                            formik={formik}
                            value={formik.values.userSearch}
                            leftIcon={<Icon as={LuSearch} color={BrandColor.dark} />}
                            w={['full', 'full', '30%']}
                            bgColor={BrandColor.offWhite}
                            sx={{ border: 'none' }}
                        />
                        <Select
                            name="sortBy"
                            options={['Newest', 'Oldest']}
                            formik={formik}
                            value={formik.values.sortBy}
                            leftIcon={<Text size='sm' minW='max-content' ml='3rem'>Sort By:</Text>}
                            w={['full', 'full', '30%']}
                            bgColor={BrandColor.offWhite}
                            sx={{ border: 'none', pl: '5.5rem' }}
                        />
                    </Stack>
                </Stack>

                <VStack w='full' spacing='2rem'>
                    <UsersTable
                        data={usersResponse?.users}
                        loading={usersLoading}
                        // onSearch={handleFilterSearch}
                        // sortBy={filter.column_name}
                        // sortOrder={filter.sort_type}
                        // onSort={handleSort}
                    />
                    <Stack w='full' direction={['column', 'column', 'column', 'row']} spacing={['2rem', '2rem', '2rem', '']}>
                        <TableCount data={formatResponse(usersResponse!)} textProps={{ color: TextColor.light }} />
                        <Pagination
                            onPageChange={handlePageChange}
                            pageCount={formatResponse(usersResponse!)?.last_page}
                            loading={usersLoading}
                        />
                    </Stack>
                </VStack>
            </VStack>
        </PageMain>
    )
}

export default Dashboard