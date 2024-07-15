'use client'

import { ErrorMessage, Spinner } from '@/app/components';
import { newIssueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import { z } from 'zod';

type IssueForm = z.infer<typeof newIssueSchema>

const NewIssuePage = async () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, control, handleSubmit,
    formState: { errors } } = useForm<IssueForm>({
      resolver: zodResolver(newIssueSchema)
    });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setLoading(false);
      setError("An Unexpected error occurred");
    }
  })

  // await delay(2000);
  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-3' >
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
      <form className='space-y-3'
        onSubmit={onSubmit} >
        <TextField.Root placeholder='Title' {...register("title")} />
        {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller name='description' control={control}
          render={({ field }) =>
            <SimpleMDE placeholder={'Description'} {...field} />} />
        {<ErrorMessage>
          {errors.description?.message}</ErrorMessage>}
        <Button disabled={loading} >Create New Issue
          {loading && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default NewIssuePage