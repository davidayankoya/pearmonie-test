import webRoutes from '../pages/web/routes'

interface CustomRoute {
    auth: boolean;
    // component: () => React.ElementType | React.ReactNode | LazyExoticComponent<any>;
    component: any;
    path: string;
    redirect?: string | undefined;
}

const routes : CustomRoute[] = [
    ...webRoutes,
]

export default routes