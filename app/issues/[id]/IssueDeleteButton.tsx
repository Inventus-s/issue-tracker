import { Button } from '@radix-ui/themes'
import React from 'react'

const IssueDeleteButton = ({ issueId }: { issueId: number }) => {
    return (
        <Button color='red' >Delete Issue</Button>
    )
}

export default IssueDeleteButton