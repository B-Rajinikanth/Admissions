import React from 'react'
import PageTitle from "../components/PageTitle"
import EntryForm from "../components/EntryForm"

const HomePage = () => {
  return (
    <>
        <PageTitle message= "New Applicant Enquiry" />
        <EntryForm />
    </>
  )
}

export default HomePage
