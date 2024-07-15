import { IssueStatusBadge } from '@/app/components';
import prisma from '@/prisma/client';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

interface Props {
    params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
    // if(typeof params.id !== 'string') notFound(); // need to look into this

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!issue)
        notFound();

    return (
        <Grid columns={{ initial: '1', md: '2' }} gap='4' >
            <Box>
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
            </Box>
            <Box>
                <Button>
                    <Pencil2Icon />
                    <Link href={`/issues/${issue.id}/edit`} >Edit Issue</Link>
                    </Button>
            </Box>
        </Grid>
    )
}

export default IssueDetailsPage