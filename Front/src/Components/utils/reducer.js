export const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_FAVS':
            return {...state, favs: [...state.favs, action.payload] }
        case 'CLEAR_FAVS':
            return {...state, favs: [] };
        case 'REMOVE_FAVS':
            return {
                ...state,
                favs: state.favs.filter(tour => tour.id !== action.payload.id)
            }
        case 'LOGIN':
            return {...state, isLoggedIn: true, userData: action.payload };
        case 'SET_USER_DATA':
            return {...state, userData: {...state.userData, ...action.payload } };
        case 'LOGOUT':
            return {...state, isLoggedIn: false, userData: null };
        default:
            throw new Error()
    }
}

export default reducer