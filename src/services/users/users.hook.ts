import { UsersService } from "./users.service";
import { GetUsersRequest, GetUsersResponse } from "types/auth/user.type";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";


const usersKeys = {
    users: 'users',
    searchUsers: 'searchUsers',
}

export const useGetUsersQuery = (
    params: {
        query?: Partial<GetUsersRequest>,
    },
    options?: Partial<UseQueryOptions<GetUsersResponse>> 
) => {
    return useQuery({
        queryKey: [usersKeys.users, params?.query],
        queryFn: () => UsersService.getAllUsers({ query: params.query ?? {}}),
        ...options
    })
}

// export const useSearchAdminUsersQuery = (
//     params: {
//         payload?: Partial<GetUsersRequest>,
//         query?: Partial<GetUsersRequest>,
//     },
//     options?: Partial<UseQueryOptions<GetUsersResponse>> 
// ) => {
//     return useQuery({
//         queryKey: [usersKeys.searchUsers, params?.payload],
//         queryFn: () => UsersService.searchUsers({ payload: params.payload ?? {}, query: params.query ?? {}}),
//         ...options
//     })
// }