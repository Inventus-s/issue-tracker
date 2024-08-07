import { IssueStatusBadge, Link } from '@/app/components';
import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueActionButton from './IssueAction';

const issuePage = async () => {
  const issues = await prisma.issue.findMany();
  // await delay(2000); // using to test skeleton

  return (
    <div>
      <IssueActionButton />
      <Table.Root variant='surface' >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell' >
              Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell' >
              Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>

              <Table.Cell>
                <Link href={`/issues/${issue.id}`} >
                  {issue.title}
                </Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell' ><IssueStatusBadge status={issue.status} /></Table.Cell>
              <Table.Cell className='hidden md:table-cell' >{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div >
  )
}

export const dynamic = 'force-dynamic';
export default issuePage