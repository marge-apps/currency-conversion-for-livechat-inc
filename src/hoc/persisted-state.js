import { withProps,  } from 'recompose'
import { pick } from 'ramda'

const storeName = 'currency-converter-for-lc'

export const retrieveFromState = withProps(props => {
    const serializedState = window.localStorage.getItem(storeName) || `{}`
    return JSON.parse(serializedState)
})

export const storeToState = withProps(props => {
    window.localStorage.setItem(storeName, JSON.stringify(pick(['amount', 'base', 'converters'], props)))
    return {}
})