import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import IssueDetails from './IssueDetails';
import IssueEditButton from './IssueEditButton';
import IssueDeleteButton from './IssueDeleteButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';

interface Props {
    params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions);
    // if(typeof params.id !== 'string') notFound(); // need to look into this

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!issue)
        notFound();

    return (
        <Grid columns={{ initial: '1', sm: '5' }} gap='4' >
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
               { session && <Flex direction='column' gap='4'  className='max-w-[200px] md:w-auto' >
                    <AssigneeSelect />
                    <IssueEditButton issueId={issue.id} />
                    <IssueDeleteButton issueId={issue.id} />
                </Flex>}
            </Box>
        </Grid>
    )
}

export default IssueDetailsPage