"use client"

import { createContext, useContext, useState } from 'react'
import { createStore, useStore as useZustandStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'
const StoreContext = createContext(null)

export const StoreProvider = ({ children }) => {
    const [store] = useState(() =>
        createStore(immer((set) => ({

            cart: {},
            actions: {
                addItem: (item) => {
                    set((state) => {
                        const id = item.id;
                        state.cart[id] = {
                            ...item,
                            count: 1
                        }
                    })
                },
                incrementItem: (id) => {
                    set((state) => {
                        state.cart[id].count += 1;
                    })
                },

                decrementItem: (id) => {
                    set((state) => {
                        state.cart[id].count -= 1;
                        if (state.cart[id].count <= 1) {
                            delete state.cart[id];
                        }
                    })
                },
                removeItem: (id) => {
                    set(state => {
                        delete state.cart[id];
                    })
                }
            },

        }))))

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