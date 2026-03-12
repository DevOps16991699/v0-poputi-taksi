"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type UserRole = "driver" | "passenger" | null

interface RoleContextType {
  role: UserRole
  setRole: (role: UserRole) => void
  isRoleSelected: boolean
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") as UserRole
    if (savedRole) {
      setRoleState(savedRole)
    }
    setIsHydrated(true)
  }, [])

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole)
    if (newRole) {
      localStorage.setItem("userRole", newRole)
    } else {
      localStorage.removeItem("userRole")
    }
  }

  if (!isHydrated) {
    return null
  }

  return (
    <RoleContext.Provider value={{ role, setRole, isRoleSelected: role !== null }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider")
  }
  return context
}
