import dynamic from 'next/dynamic';
const IssueForm = dynamic(() => import('../_components/IssueForm'), { ssr: false });

const NewIssuePage = () => {
  return (
    <IssueForm />
  )
}

export default NewIssuePage