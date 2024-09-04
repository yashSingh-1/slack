"use client"

import { Provider } from "jotai"

interface JotaiPRoviderProps {
    children: React.ReactNode
}

export const JotaiProvider = ({ children }: JotaiPRoviderProps) => {
    return (
        <Provider>
            {children}
        </Provider>
    )

}