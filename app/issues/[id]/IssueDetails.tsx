import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import Markdown from 'react-markdown'

const IssueDetails = ({issue}: {issue: Issue}) => {
    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex gap="3" my="3" >
                <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card>
                <Markdown className='prose'>
                    {issue.description}
                </Markdown>
            </Card>
        </>
    )
}

export default IssueDetails