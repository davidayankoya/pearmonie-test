import React, { ReactElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/useApp";
import { useQueryParams } from "hooks/useNavigate";
import { Navigate, useNavigate } from "react-router-dom";
import { authCheckReq } from "store/authSlice";
import { AppRoutes } from "constants/routes";


interface MiddleWareProps {
    children: ReactElement;
    params: { locale: string; };
    redirectTo?: string;
}

export default function GuestMiddleware({ children, redirectTo, params }: MiddleWareProps) {
    const dispatch = useAppDispatch()
    const push = useNavigate()
    const { queryParams } = useQueryParams()
    const { isAuthenticated, isLoading, checkedAuth } = useAppSelector(s => s.auth)

    useEffect(() => {
        if (!isAuthenticated && !isLoading && !checkedAuth) {
            dispatch(authCheckReq())
        }
        //eslint-disable-next-line
    }, [])
    
    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            if (queryParams?.redirect) {
                push(`${queryParams?.redirect}`, { replace: true })
            } else {
                push(AppRoutes.dashboard)
            }
        }
        //eslint-disable-next-line
    }, [isAuthenticated, isLoading, queryParams?.redirect])

    return redirectTo ? <Navigate to={redirectTo}/> : children;
}
