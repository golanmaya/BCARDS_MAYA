import { ReactNode, createContext, useState } from "react"


interface SearchContextType {
    setTerm(term: string): void,
    term: string | undefined,
}
export const SearchContext = createContext<SearchContextType | undefined>(undefined)
export default function SearchProvider({ children }: { children: ReactNode }) {
    const [term, setTerm] = useState<string | undefined>('')
    return (
        <SearchContext.Provider value={{ setTerm, term }}>
            {children}
        </SearchContext.Provider>
    )
}