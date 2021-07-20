import {usersAPI} from "../../api/Api";
import {Dispatch} from "redux";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_USERS_TOTAL_COUNT = 'SET-USERS-TOTAL-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'


type toggleIsFetchingAT = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
type toggleIsFollowingProgressAT = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
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
    userID: number
}
type unfollowAT = {
    type: typeof UNFOLLOW
    userID: number
}
type setUsersAT = {
    type: typeof SET_USERS
    users: UserType[]
}
type UsersReducerAT = unfollowAT | followAT
    | setUsersAT | setCurrentPageAT
    | setUsersTotalCountAT | toggleIsFetchingAT | toggleIsFollowingProgressAT
type InitialState = typeof initialState;
export type UserType = {
    name: string
    id: number
    followed: boolean
    uniqueUrLName: null
    status: string
    photos: {
        small: string
        large: string
    }
}
let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as number[]
}


const userReducer = (state: InitialState = initialState, action: UsersReducerAT): InitialState => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u;
                })
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
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)

            }
        }
        case SET_USERS_TOTAL_COUNT: {
            return {
                ...state,
                totalUsersCount: action.count
            }
        }

        default:
            return state;
    }
}
export const acceptFollow = (userID: number): followAT => {
    return {
        type: FOLLOW,
        userID: userID
    }
}
export const acceptUnfollow = (userID: number): unfollowAT => {
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
export const setCurrentPage = (page: number): setCurrentPageAT => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: page
    }
}
export const setUsersTotalCount = (count: number): setUsersTotalCountAT => {
    return {
        type: SET_USERS_TOTAL_COUNT,
        count: count
    }
}
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingAT => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching
    }
}
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number): toggleIsFollowingProgressAT => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching, userId
    }
}

const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleIsFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowingProgress(false, userId))

}
export const getUsers = (page: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))
    let response = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(response.data.items))
    dispatch(setUsersTotalCount(response.data.totalCount))

}
export const unfollowTC = (userId: number) => async (dispatch: Dispatch) => {
    const apiMethod = usersAPI.unfollow.bind(usersAPI)
    const actionCreator = acceptUnfollow
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}
export const followTC = (userId: number) => async (dispatch: Dispatch) => {
    const apiMethod = usersAPI.follow.bind(usersAPI)
    const actionCreator = acceptFollow
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}
export default userReducer;