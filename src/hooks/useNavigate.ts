import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useMemo } from 'react';


export function constructQueryFromParams(params: {
  [key: string]: any;
}): string {
    const queryParams: string[] = [];

    for (const key in params) {
        if (params.hasOwnProperty(key) && params[key] !== undefined) {
            queryParams.push(`${key}=${encodeURIComponent(params[key])}`);
        }
    }

    return queryParams.length > 0 ? `?${queryParams.join("&")}` : ``;
}

export function constructParamsFromQuery(queryString: string): {
    [key: string]: string;
} {
    const queryObject: { [key: string]: string } = {};

    if (queryString.startsWith("?")) {
        queryString = queryString.slice(1);
    }

    const keyValuePairs = queryString.split("&");

    for (const pair of keyValuePairs) {
        const [key, value] = pair.split("=");
        if (key && value) {
            queryObject[key] = decodeURIComponent(value);
        }
    }

  return queryObject;
}


export function useQueryParams<T>(pathname?: string, replace?: boolean) {
    const push = useNavigate();
    const { pathname: routerPathname } = useLocation();
    const searchString = useSearchParams().toString();
    const parsedSearch = useMemo(() => constructParamsFromQuery(searchString) ?? {}, [searchString])
    
    const urlSearchParams = new URLSearchParams(searchString);

    const setQueryParams = (params: Partial<T>) => {
        Object.entries(params).forEach(([key, value]) => {
            if (value === undefined || value === null) {
                urlSearchParams.delete(key);
            } else {
                urlSearchParams.set(key, String(value));
            }
        })

        const search = urlSearchParams.toString();
        const query = search ? `?${search}` : '';

        if (replace) {
            push(`${pathname ?? routerPathname as string}${query}`, { replace: true });
        } else {
            push(`${pathname ?? routerPathname as string}${query}`);
        }
    }

  return { queryParams: parsedSearch, setQueryParams };
}