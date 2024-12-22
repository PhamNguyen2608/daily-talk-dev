"use client"

import React from "react"
import { cn } from "@/utils/util"
import { useTabs } from "@/hooks/useTabs"

interface TabsProps {
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  className?: string
  children?: React.ReactNode
}

interface TabsListProps {
  className?: string
  children?: React.ReactNode
}

interface TabsTriggerProps {
  value: string
  className?: string
  children?: React.ReactNode
}

interface TabsContentProps {
  value: string
  className?: string
  children?: React.ReactNode
}

const TabsContext = React.createContext<{
  activeTab?: string
  setActiveTab: (value: string) => void
}>({
  setActiveTab: () => {}
})

const Tabs = ({ value, onValueChange, defaultValue, className, children }: TabsProps) => {
  const { activeTab, setActiveTab } = useTabs(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("w-full", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

const TabsList = ({ className, children }: TabsListProps) => {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500",
        className
      )}
    >
      {children}
    </div>
  )
}

const TabsTrigger = ({ value, className, children }: TabsTriggerProps) => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext)

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        activeTab === value && "bg-white text-slate-950 shadow-sm",
        className
      )}
    >
      {children}
    </button>
  )
}

const TabsContent = ({ value, className, children }: TabsContentProps) => {
  const { activeTab } = React.useContext(TabsContext)

  if (activeTab !== value) return null

  return (
    <div
      className={cn(
        "mt-2 ring-offset-white",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
        className
      )}
    >
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }

