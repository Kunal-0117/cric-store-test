"use client"

import { createContext, useContext, useState } from 'react'
import { createStore, useStore as useZustandStore } from 'zustand'
const StoreContext = createContext(null)

export const StoreProvider = ({ children, initialBears }) => {
    const [store] = useState(() =>
        createStore((set) => ({
            bears: initialBears,
            actions: {
                increasePopulation: (by) =>
                    set((state) => ({ bears: state.bears + by })),
                removeAllBears: () => set({ bears: 0 }),
            },
        }))
    )

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStore = (selector) => {

    const store = useContext(StoreContext)

    if (!store) {

        throw new Error('Missing StoreProvider')

    }

    return useZustandStore(store, selector)

}