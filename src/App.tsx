import FetchData from 'FetchData'
import React from 'react'

type Props = {}

const MOCK_REQUEST = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ name: 'AMIR' }), 5000)
  })

function App({}: Props) {
  return (
    <FetchData request={MOCK_REQUEST} deps={[]}>
      {(data, { loading }) =>
        loading ? <div>loading ...</div> : <div>name: {data?.name || '-'}</div>
      }
    </FetchData>
  )
}

export default App
