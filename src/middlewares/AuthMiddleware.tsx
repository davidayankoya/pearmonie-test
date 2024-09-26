'use client'

import React, { ReactElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/useApp";
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { authCheckReq } from "store/authSlice";
import { constructQueryFromParams, useQueryParams } from "hooks/useNavigate";


interface MiddleWareProps {
    children: ReactElement;
    params: { locale: string };
    redirectTo?: string;
}

export default function AuthMiddleware({ children, redirectTo, params }: MiddleWareProps) {
    const dispatch = useAppDispatch()
    const push = useNavigate()
    const { pathname } = useLocation()
    const { queryParams } = useQueryParams()
    const { isLoading, isAuthenticated, checkedAuth } = useAppSelector(s => s.auth)
    const newParams = constructQueryFromParams(queryParams)

    useEffect(() => {
        if (!isAuthenticated && !isLoading && !checkedAuth) {
            dispatch(authCheckReq())
        }
        //eslint-disable-next-line
    }, [])

    // useEffect(() => {
    //     if (!isAuthenticated && !isLoading && checkedAuth) {
    //         push(`/login?redirect=${pathname as string}${newParams.length > 1 ? newParams : ''}`)
    //     }
    //     //eslint-disable-next-line
    // }, [isAuthenticated, checkedAuth])

    return isAuthenticated ? children : <Navigate to={redirectTo ?? '#'} />;
}
