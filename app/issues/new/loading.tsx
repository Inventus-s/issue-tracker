import { Box } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingNewIssuePage = () => {
    return (
        <Box className='w-2/3'>
            <Skeleton />
            <Skeleton height='50vh' />
        </Box>

    )
}

export default LoadingNewIssuePage