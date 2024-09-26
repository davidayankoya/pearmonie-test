import * as Api from 'utils/api'
import { GetUsersRequest, GetUsersResponse } from "types/auth/user.type";
import { constructQueryFromParams } from 'hooks/useNavigate';


export class UsersService {
    static getAllUsers = async ({ query }: {
        query: Partial<GetUsersRequest>,
    }) => {
        return await Api.getReq<GetUsersResponse>(`/users/search${constructQueryFromParams(query)}`)
            .then(res => {
                return res.data
            })
            .catch(err => {
                throw err
            })
    };

}