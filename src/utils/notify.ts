import { createStandaloneToast } from '@chakra-ui/react'
const { toast } = createStandaloneToast()
const position = 'top'


const Notify = {
    success(msg: string, title?: string, options?: any) {
        return toast({
            title: title,
            description: msg,
            status: 'success',
            duration: 8000,
            isClosable: true,
            position: position,
        })
    },

    error(msg: React.ReactNode, title?: React.ReactNode, options?: any) {
        return toast({
            title: title,
            description: msg,
            status: 'error',
            duration: 8000,
            isClosable: true,
            position: position,
        })
    },

    warning(msg: string, title?: string, options?: any) {
        return toast({
            title: title,
            description: msg,
            status: 'warning',
            duration: 8000,
            isClosable: true,
            position: position,
        })
    },

    info(msg: string, title?: string, options?: any) {
        return toast({
            title: title,
            description: msg,
            status: 'info',
            duration: 8000,
            isClosable: true,
            position: position,
        })
    },
}

export default Notify