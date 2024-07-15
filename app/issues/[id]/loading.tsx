import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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