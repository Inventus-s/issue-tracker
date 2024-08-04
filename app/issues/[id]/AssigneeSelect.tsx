'use client'
import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';

const AssigneeSelect = () => {
    const {data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/user').then(res => res.data),
        staleTime: 60 * 1000, // 60 Seconds
        retry: 3
    });

    if(isLoading) return <Skeleton />;

    if(error) return null;

    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign..' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestion</Select.Label>
                    {users?.map(user => <Select.Item key={user.id} value={user.id} >{user.name}</Select.Item>)}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect