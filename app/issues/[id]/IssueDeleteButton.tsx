'use client'
import { Spinner } from '@/app/components'
import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const IssueDeleteButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    const deleteIssue = async () => {
        try {
            // throw new Error();
            setDeleting(true);
            await axios.delete('/api/issues/' + issueId);
            router.push('/issues');
            router.refresh();
        } catch (error) {
            setDeleting(false);
            setError(true)
        }

    }
    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color='red' disabled={isDeleting} > <TrashIcon /> Delete Issue {isDeleting && <Spinner />} </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description>Are you sure you want to delete this issue?</AlertDialog.Description>
                    <Flex mt='4' gap='4'>
                        <AlertDialog.Cancel>
                            <Button variant='soft' color='gray' >Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button color='red' onClick={deleteIssue} >Confirm</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error} >
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>This issue cannot be deleted</AlertDialog.Description>
                    <Button mt='2' variant='soft' color='gray' onClick={() => setError(false)} >OK</Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default IssueDeleteButton