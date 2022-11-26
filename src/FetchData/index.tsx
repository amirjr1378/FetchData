import classNames from 'classnames'
import React, { ReactNode, useEffect, useState } from 'react'

type StateType = {
  data?: any
  setData: (payload?: any) => void
  error?: any
  setError?: () => void
  loading?: any
  setLoading?: () => void
  fetchData?: () => void
}

type Props = {
  request?: () => any
  children: (data: any, state: StateType) => ReactNode
  defaultValue?: any
  deps?: any[]
  resetDataBeforeFetch?: boolean
}

function FetchData(props: Props) {
  const { deps, request, defaultValue, children, resetDataBeforeFetch } = props
  const [data, setData] = useState(defaultValue)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchData = () => {
    setLoading(true)
    setError(null)
    if (typeof request === 'function') {
      if (resetDataBeforeFetch) {
        setData(defaultValue)
      }
      request()
        .then(setData)
        .catch((er: any) => setError(er.toString()))
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const states = {
    data,
    setData,
    error,
    setError,
    loading,
    setLoading,
    fetchData,
  }

  useEffect(() => {
    fetchData()
  }, deps)

  // default return
  return (
    <>{typeof children === 'function' ? children(data, states as any) : null}</>
  )
}

export default FetchData
