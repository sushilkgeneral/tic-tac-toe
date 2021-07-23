import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// Import your own reducer
import { reducer } from './store/store';

const customRender = (
    ui,
    {
        preloadedState,
        store = configureStore({ reducer: reducer, preloadedState }),
        ...renderOptions
    } = {}
    ) => {
        const Wrapper = ({ children }) => {
            return <Provider store={store}>{children}</Provider>
        }
        return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
    }

// re-export everything
export * from '@testing-library/react'
// export customRender method
export { customRender }