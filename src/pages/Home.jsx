import React, { useState } from 'react'
import Add from '../components/Add'
import View from '../components/View'

const Home = () => {
  const [uploadDataResponse, setUploadDataResponse] = useState("")
  return (
    <>
      <Add setUploadDataResponse={setUploadDataResponse} />
      <h3>Employee Details</h3>
      <View uploadDataResponse={uploadDataResponse} />
    </>
  )
}

export default Home