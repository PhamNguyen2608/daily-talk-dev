"use client"

import React from "react"
import { cn } from "@/utils/util"
import { useSelect, SelectOption } from "@/hooks/useSelect"

interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  icon?: React.ReactNode
}

const Select = ({ options, value, onChange, placeholder = "Select an option", className, icon }: SelectProps) => {
  const { isOpen, setIsOpen, selectedValue, selectRef, handleSelect } = useSelect(value)
  const selectedOption = options.find(opt => opt.value === selectedValue)

  const onSelectOption = (value: string) => {
    handleSelect(value)
    onChange?.(value)
  }

  return (
    <div className="relative" ref={selectRef}>
      <div
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm",
          "cursor-pointer hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? "text-slate-900" : "text-slate-400"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg">
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "flex items-center px-3 py-2 text-sm cursor-pointer",
                  "hover:bg-slate-100",
                  selectedValue === option.value && "bg-slate-100"
                )}
                onClick={() => onSelectOption(option.value)}
              >
                <span className="flex-grow">{option.label}</span>
                {selectedValue === option.value && (
                  <svg
                    className="w-4 h-4 text-slate-900"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export { Select }
