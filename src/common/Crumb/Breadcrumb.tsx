import { BrandColor } from 'constants/theme'
import { BreadcrumbItem, Flex, FlexProps, Breadcrumb as ChakraBreadcrumb } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { BiChevronRight } from 'react-icons/bi'
import { HiOutlineHome } from 'react-icons/hi'
import { useScreenSize } from 'hooks/useScreen'
import { minNavLinks } from 'layouts/AuthLayout/menu'
import { Link } from 'common/Link/Link'
import { useLocation } from 'react-router-dom'


interface BreadcrumbProps {
    containerProps?: FlexProps
}
function Breadcrumb({ containerProps }: BreadcrumbProps) {
    const { pathname } = useLocation()
    const splitPath = useMemo(() => {
        const path = pathname.slice(1, pathname.length - 1)
        return path.split('/').filter(e => e !== 'profile' && isNaN(Number(e)))
    }, [pathname])
    const currentPath = useMemo(() => {
        const path = pathname.slice(1, pathname.length - 1).split('/')[0]
        return minNavLinks.find(e => e.to === `/${path}`)?.name ?? path
    }, [pathname])

    const { isMobile } = useScreenSize()
    // const t = useTranslations('global')


    return (
        <Flex {...containerProps} gap='.5rem' align='center'>
            <Link href='/dashboard'>
                <HiOutlineHome size={22} color={BrandColor.white} />
            </Link>

            {!isMobile && <BiChevronRight color={BrandColor.white} size={20} />}

            {!isMobile &&
                <ChakraBreadcrumb separator={<BiChevronRight color={BrandColor.white} />}>
                    {splitPath.map((path, index) =>
                        <BreadcrumbItem key={`path-${index}`}>
                            {/* <BreadcrumbLink as={Link} href=''> */}
                            {/* {index === 0 ? (
                                <Text size='sm' color={TextColor.white} textTransform='uppercase'>{isMobile ? capCase(t(currentPath))[0] : capCase(t(currentPath))}</Text>
                            ) : (
                                <Text size='sm' color={TextColor.white} textTransform='uppercase'>{isMobile ? t(capCase(path, '-'))[0] : t(capCase(path, '-'))}</Text>
                            )} */}
                            {/* </BreadcrumbLink> */}
                        </BreadcrumbItem>
                    )}
                </ChakraBreadcrumb>
            }
        </Flex>
    )
}

export default Breadcrumb