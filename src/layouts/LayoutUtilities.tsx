'use client'

import React from 'react'
import { createStandaloneToast } from '@chakra-ui/react'
import { useAppSelector } from 'hooks/useApp'
import TransparentLoader from 'common/Loader/TransparentLoader'
const { ToastContainer } = createStandaloneToast()


function LayoutUtilities() {
    const { isLoading, loadingText } = useAppSelector(s => s.ui)

    return (
        <React.Fragment>
            <ToastContainer />
            {isLoading && <TransparentLoader text={loadingText} />}
        </React.Fragment>
    )
}

export default LayoutUtilities