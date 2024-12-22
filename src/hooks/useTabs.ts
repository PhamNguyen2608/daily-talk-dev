import { useState } from "react"

export function useTabs(defaultValue?: string) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return {
    activeTab,
    setActiveTab
  }
} 