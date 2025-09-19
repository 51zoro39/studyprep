"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface TodoItem {
  id: string
  task: string
  completed: boolean
  priority: "high" | "medium" | "low"
  type: "daily" | "weekly"
}

interface DailyData {
  dailyImage: string
  dailyQuote: string
  dailyTodos: TodoItem[]
}

interface DailyContextType {
  dailyData: DailyData
  setDailyImage: (image: string) => void
  setDailyQuote: (quote: string) => void
  setDailyTodos: (todos: TodoItem[]) => void
  addDailyTodo: (todo: TodoItem) => void
  toggleDailyTodo: (id: string) => void
  deleteDailyTodo: (id: string) => void
}

const DailyContext = createContext<DailyContextType | undefined>(undefined)

export function DailyProvider({ children }: { children: ReactNode }) {
  const [dailyData, setDailyData] = useState<DailyData>({
    dailyImage: "",
    dailyQuote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    dailyTodos: [
      { id: "1", task: "Complete Physics Chapter 15", completed: true, priority: "high", type: "daily" },
      { id: "2", task: "Solve 30 Chemistry MCQs", completed: false, priority: "medium", type: "daily" },
      { id: "3", task: "Review Math formulas", completed: false, priority: "medium", type: "daily" },
    ],
  })

  const setDailyImage = (image: string) => {
    setDailyData((prev) => ({ ...prev, dailyImage: image }))
  }

  const setDailyQuote = (quote: string) => {
    setDailyData((prev) => ({ ...prev, dailyQuote: quote }))
  }

  const setDailyTodos = (todos: TodoItem[]) => {
    setDailyData((prev) => ({ ...prev, dailyTodos: todos }))
  }

  const addDailyTodo = (todo: TodoItem) => {
    setDailyData((prev) => ({ ...prev, dailyTodos: [...prev.dailyTodos, todo] }))
  }

  const toggleDailyTodo = (id: string) => {
    setDailyData((prev) => ({
      ...prev,
      dailyTodos: prev.dailyTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    }))
  }

  const deleteDailyTodo = (id: string) => {
    setDailyData((prev) => ({
      ...prev,
      dailyTodos: prev.dailyTodos.filter((todo) => todo.id !== id),
    }))
  }

  return (
    <DailyContext.Provider
      value={{
        dailyData,
        setDailyImage,
        setDailyQuote,
        setDailyTodos,
        addDailyTodo,
        toggleDailyTodo,
        deleteDailyTodo,
      }}
    >
      {children}
    </DailyContext.Provider>
  )
}

export function useDailyContext() {
  const context = useContext(DailyContext)
  if (context === undefined) {
    throw new Error("useDailyContext must be used within a DailyProvider")
  }
  return context
}
