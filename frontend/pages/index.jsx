import React, { useContext, useEffect } from 'react'
import MyContext from '../src/context'
import { useRouter } from 'next/router'

export default function Home() {
  const { isLoggedIn } = useContext(MyContext)
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn) {
      return router.push('/dashboard')
    }
    return router.push('/login')
  }, [isLoggedIn])

  return null
}
