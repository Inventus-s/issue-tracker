'use client'
import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const IssueDeleteButton = ({ issueId }: { issueId: number }) => {
    const router  = useRouter();
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color='red' > <TrashIcon /> Delete Issue</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                <AlertDialog.Description>Are you sure you want to delete this issue?</AlertDialog.Description>
                <Flex mt='4' gap='4'>
                    <AlertDialog.Cancel>
                        <Button variant='soft' color='gray' >Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button color='red' onClick={async()=>{
                            await axios.delete('/api/issues/'+issueId);
                            router.push('/issues');
                            router.refresh();
                        }} >Confirm</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default IssueDeleteButton