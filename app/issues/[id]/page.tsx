import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react'
import Markdown from 'react-markdown';

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
        <div>
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
        </div>
    )
}

export default IssueDetailsPage