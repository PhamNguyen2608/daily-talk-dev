import { useState, useRef, useEffect } from "react"

export interface SelectOption {
  value: string
  label: string
}

export function useSelect(initialValue?: string) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(initialValue)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (value: string) => {
    setSelectedValue(value)
    setIsOpen(false)
  }

  return {
    isOpen,
    setIsOpen,
    selectedValue,
    selectRef,
    handleSelect
  }
} 