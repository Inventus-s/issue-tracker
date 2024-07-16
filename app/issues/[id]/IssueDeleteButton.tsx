import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import React from 'react'

const IssueDeleteButton = ({ issueId }: { issueId: number }) => {
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
                        <Button color='red' >Confirm</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default IssueDeleteButton