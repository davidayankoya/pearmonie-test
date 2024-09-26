import { Box, Flex } from '@chakra-ui/react'
import { SyncLoader } from 'react-spinners'


function TransparentLoader({ text }: { text?: React.ReactNode }) {
    return (
        <Box
            as='div' 
            width='full'
            height='full'
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            position='fixed'
            backgroundColor='rgba(0,0,0,0.6)'
            backdropFilter={{ blur: '6px' }}
            top={0}
            left={0}
            zIndex={9999}
        >
            <Flex>
                {text}
            </Flex>
            <SyncLoader
				color='#32B526'
				size={14}
				// height={20}
				// width={10}
				// radius={2}
				// margin={2}
			/>
        </Box>
    )
}

export default TransparentLoader