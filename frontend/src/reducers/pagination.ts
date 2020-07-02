

import { ActionPagination } from '../type'


export const setPagination = (start: number, last: number, searchvalue: string, currentPage: number) => {

    return { type: 'SET', data: { start: start, last: last, searchvalue: searchvalue, currentPage: currentPage  } }
}

export const updatePagination = (start: number, last: number, currentPage: number) => {

    return { type: 'UPDATE', data: { start: start, last: last, currentPage: currentPage } }
}

export const setPage = (currentPage: number) => {

    return { type: 'SETPAGE', data: { currentPage: currentPage } }
}


const reducer = (state = { start: 1, last: 10, searchvalue: '', currentPage: 1 }, action: ActionPagination) => {

    switch (action.type) {
        case 'SET':
            return {
                start: action.data.start,
                last: action.data.last,
                searchvalue: action.data.searchvalue,
                currentPage: action.data.currentPage
            }
        case 'UPDATE':
            return {
                start: action.data.start,
                last: action.data.last,
                searchvalue: state.searchvalue,
                currentPage: action.data.currentPage
            }
        case 'SETPAGE':
            return {
                start: state.start,
                last: state.last,
                searchvalue: state.searchvalue,
                currentPage: action.data.currentPage
            }

        default:
            return state
    }

}

export default reducer