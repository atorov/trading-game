// import initState from './init-state'

export default function (state, action) {
    switch (action.type) {
        // Init
        // case ':appsState/INIT:':
        //     return { ...initState }

        // General
        case ':appsState/SET_DATASET:':
            return {
                ...state,
                dataset: action.payload,
            }

        // Do not match
        default:
            console.warn('::: action.type:', action.type)
            throw new Error('Action type does not match!')
        // return state
    }
}
