import React, { Suspense, useMemo } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import routes from "./routes";
import AuthLayout from "layouts/AuthLayout/AuthLayout";
import FullScreenLayout from "layouts/FullScreenLayout";
import Loader from "common/Loader/Loader";
import ErrorPage from "common/Error/ErrorPage";
import LayoutUtilities from "layouts/LayoutUtilities";
const params = { locale: 'en' }


const Routes = React.memo(() => {
    const renderRoutes = useMemo(() =>
        routes.map((route, index) =>
            route.auth ? (
                <Route key={index} path={route.path} element={
                    <AuthLayout params={params} redirectTo={'/login'}>
                        <route.component/>
                    </AuthLayout>
                    }
                />
            ) : (
                <Route key={index} path={route.path} element={
                    <FullScreenLayout params={params} redirectTo={route.redirect}>
                        <route.component/>
                    </FullScreenLayout>
                    }
                />
            )
        )
    , [])

    return (
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                <LayoutUtilities />
                <RouterRoutes>
                    {renderRoutes}
                    <Route path='*' element={<ErrorPage/>} />        
                </RouterRoutes>
            </Suspense>
        </BrowserRouter>
    )
})

export default Routes