import { IconType } from "react-icons"


export type FormElementTypes = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement | HTMLFormElement


export interface NavigationLink {
    name: string,
    to?: string,
    isGroup: boolean,
    icon?: IconType,
    iconSize?: number,
    imgIcon?: string;
    subItems?: NavigationLink[],
    inactive?: boolean,
    // module?: number,
    // permission?: PermissionTypes,
}

export interface BaseModel {
    [k: string]: string | undefined;
}

export enum SortType {
    asc = 'asc',
    desc = 'desc',
}

export enum AllFileTypes {
    jpeg = 'image/jpeg',
    bmp = 'image/bmp',
    png = 'image/png',
    webp = 'image/webp',
    gif = 'image/gif',
    pdf = 'application/pdf'
}