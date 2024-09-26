import { NavigationLink } from "types/general";
import UsersIcon from 'assets/img/menu-users.svg'
import HelpIcon from 'assets/img/menu-help.svg'


export const navLinks: NavigationLink[] = [
    {
        isGroup: true,
        name: 'Users',
        to: '/users',
        imgIcon: UsersIcon,
        inactive: true,
        subItems: [
            {
                isGroup: false,
                name: 'Add User',
                to: '/users/add',
            },
        ]
    },
    {
        isGroup: true,
        name: 'Help',
        to: '/help',
        imgIcon: HelpIcon,
        inactive: true,
        subItems: [
            {
                isGroup: false,
                name: 'Support',
                to: '/help/support',
            },
        ]
    },
]

export const minNavLinks = navLinks.reduce((prev, curr: NavigationLink) => [...prev, curr, ...(curr.subItems ?? [])], [] as NavigationLink[])