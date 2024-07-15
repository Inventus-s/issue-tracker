import { Skeleton } from '@/app/components';
import { Box } from '@radix-ui/themes';


const LoadingNewIssuePage = () => {
    return (
        <Box className='w-2/3'>
            <Skeleton />
            <Skeleton height='50vh' />
        </Box>

    )
}

export default LoadingNewIssuePage