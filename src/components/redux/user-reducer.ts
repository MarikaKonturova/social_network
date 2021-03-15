const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_USERS_TOTAL_COUNT = 'SET-USERS-TOTAL-COUNT'
const TOGGLE_ISFETCHING = 'TOGGLE-ISFETCHING'
type toggleIsFetchingAT = {
    type: typeof TOGGLE_ISFETCHING
    isFetching: boolean
}
type setCurrentPageAT = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
type setUsersTotalCountAT = {
    type: typeof SET_USERS_TOTAL_COUNT
    count: number
}
type followAT = {
    type: typeof FOLLOW
    userID: string
}
type unfollowAT = {
    type: typeof UNFOLLOW
    userID: string
}
type setUsersAT = {
    type: typeof SET_USERS
    users: UserType[]
}
type UsersReducerAT = unfollowAT | followAT | setUsersAT | setCurrentPageAT | setUsersTotalCountAT | toggleIsFetchingAT
type InitialState = typeof initialState;
export type UserType = {
    fullName: string
    id: string
    followed: boolean
    status: string
    location?: {
        city: string
        country: string
    }
    avatarPhoto: string
}
let initialState = {
    users: [ ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
}


const userReduser = (state: InitialState = initialState, action: UsersReducerAT): InitialState => {
    switch (action.type) {
        case FOLLOW: {

            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u;
                }) /*глубокая копия каждого объекта массива(...state.users)*/
            }

        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        }

        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return{
                ...state,
                currentPage: action.currentPage
            }
        }
        case TOGGLE_ISFETCHING:{
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case SET_USERS_TOTAL_COUNT:{
            return {
                ...state,
                totalUsersCount: action.count
            }
        }

        default:
            return state;
    }
}
export const follow = (userID: string): followAT => {
    return {
        type: FOLLOW,
        userID: userID
    }
}
export const unfollow = (userID: string): unfollowAT => {
    return {
        type: UNFOLLOW,
        userID: userID
    }
}
export const setUsers = (users: Array<UserType>): setUsersAT => {
    return {
        type: SET_USERS,
        users: users
    }
}
export const setCurrentPage = (page:number):setCurrentPageAT =>{
    return{
        type: SET_CURRENT_PAGE,
        currentPage: page
    }
}
export const setUsersTotalCount = (count:number):setUsersTotalCountAT =>{
    return{
        type: SET_USERS_TOTAL_COUNT,
        count: count
    }
}
export const toggleIsFetching = (isFetching:boolean):toggleIsFetchingAT =>{
    return{
        type: TOGGLE_ISFETCHING,
        isFetching: isFetching
    }
}


export default userReduser;