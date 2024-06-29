'use client'

import { Callout, TextField } from '@radix-ui/themes'
import React, { useState } from 'react';
import { Button, Text } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { newIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';

type IssueForm = z.infer<typeof newIssueSchema>

const NewIssuePage = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const { register, control, handleSubmit, 
    formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(newIssueSchema)
  });

  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-3' >
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
      <form className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setError("An Unexpected error occurred");
          }
        })} >
        <TextField.Root placeholder='Title' {...register("title")} />
       {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
        <Controller name='description' control={control}
          render={({ field }) => 
          <SimpleMDE placeholder={'Description'} {...field} />} />
       {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}

        <Button>Create New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage