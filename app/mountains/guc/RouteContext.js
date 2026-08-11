'use client'
import { createContext, useContext, useState } from 'react'

const RouteContext = createContext(null)

export function RouteProvider({ children }) {
  const [route, setRoute] = useState('south')
  return <RouteContext.Provider value={{ route, setRoute }}>{children}</RouteContext.Provider>
}

export function useRoute() {
  const ctx = useContext(RouteContext)
  if (!ctx) throw new Error('useRoute must be used within a RouteProvider')
  return ctx
}
