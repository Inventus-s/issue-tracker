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
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof newIssueSchema>

const NewIssuePage = () => {
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