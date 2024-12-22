'use client'

import { useAppSelector, useAppDispatch } from '@/global/hooks'
import { useEffect } from 'react'

export default function ReduxTest() {
  const dispatch = useAppDispatch()
  const testValue = useAppSelector((state) => state.test.value)
  
  useEffect(() => {
    // Dispatch một test action để xem trong DevTools
    dispatch({ type: 'TEST_ACTION', payload: 'Testing Redux!' })
  }, [dispatch])
  
  return (
    <div className="p-4">
      <h2>Redux Test Component</h2>
      <pre className="bg-gray-100 p-2 rounded">
        Test Value: {testValue}
      </pre>
    </div>
  )
} 