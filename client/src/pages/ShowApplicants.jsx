import React from 'react'
import DisplayAll from '../components/DisplayAll'
import PageTitle from '../components/PageTitle'

const ShowApplicants = () => {
  return (
    <>
        <PageTitle message="List of all applicants" />
        <DisplayAll />
    </>
  )
}

export default ShowApplicants
