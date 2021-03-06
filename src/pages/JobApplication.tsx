import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Button, Heading, PageWrapper } from '../components/Elements'
import EmbedDocument from '../components/EmbedDocument'

const JobApplication: React.FC<RouteComponentProps> = () => {
  React.useEffect(() => window.scrollTo(0, 0), [])
  const [open, setOpen] = React.useState(true)
  return (
    <PageWrapper>
      <Heading>Job Application</Heading>
      <Button style={{ margin: '0 auto', display: 'block' }} onClick={() => setOpen(true)}>
        View Application
      </Button>
      <EmbedDocument
        url="https://res.cloudinary.com/four-hmpp/raw/upload/v1550011741/4-H_Student_PD.docx"
        open={open}
        setOpen={setOpen}
        title="4-H Military Partnership Job Application"
      />
    </PageWrapper>
  )
}

export default JobApplication
