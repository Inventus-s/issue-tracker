import { Skeleton } from '@/app/components';
import { Box, Card, Flex, Heading } from '@radix-ui/themes';


const LoadingIssueDetailsPage = async () => {
    return (
        <Box>
            <Heading>
                <Skeleton width='5rem' />
            </Heading>
            <Flex >
                <Skeleton width='8rem' />
            </Flex>
            <Card>
                <Skeleton count={3} />
            </Card>
        </Box>

    )
}

export default LoadingIssueDetailsPage