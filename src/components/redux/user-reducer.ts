const follow = 'FOLLOW'
const unfollow = 'UNFOLLOW'
const setusers = 'SET-USERS'
type followAT = {
    type: typeof follow
    userID: string
}
type unfollowAT = {
    type: typeof unfollow
    userID: string
}
type setUsersAT = {
    type: typeof setusers
    users: []
}
type UsersReducerAT = unfollowAT | followAT | setUsersAT
type InitialState = typeof initialState;
 export type UserType = {
     fullName: string
     id: string
     followed: boolean
     status: string
     location: {
         city: string
         country: string}
     avatarPhoto: string
 }
let initialState = {
    users: [
        {   avatarPhoto:'https://i.ytimg.com/vi/fW2GeLXiLVM/hqdefault_live.jpg',
            fullName: 'Batya',
            id: "1",
            followed: true,
            status: 'I\'m a batya',
            location: {city: 'Misk', country: "Belarus"}
        },
        {avatarPhoto:'https://i.ytimg.com/vi/fW2GeLXiLVM/hqdefault_live.jpg',
            fullName: 'Ahmed',
            id: "2",
            followed: false,
            status: 'I\'m a moscow-city boss',
            location: {city: 'Moscow', country: "Russia"}
        },
        {avatarPhoto:'https://i.ytimg.com/vi/fW2GeLXiLVM/hqdefault_live.jpg',
            fullName: 'Leonardo',
            id: "3",
            followed: true,
            status: 'I\'m a hot boss',
            location: {city: 'Valencia', country: "Spain"}
        },
        {avatarPhoto:'https://i.ytimg.com/vi/fW2GeLXiLVM/hqdefault_live.jpg',
            fullName: 'Vasya',
            id: "4",
            followed: true,
            status: 'I\'m a  russian boss',
            location: {city: 'Novgorod', country: "Russia"}
        },
        {avatarPhoto:'https://i.ytimg.com/vi/fW2GeLXiLVM/hqdefault_live.jpg',
            fullName: 'Desire',
            id: "5",
            followed: false,
            status: 'I\'m a paradise boss',
            location: {city: 'Bora-Bora', country: "Paradise"}
        },

    ]
}


const userReduser = (state: InitialState = initialState, action: UsersReducerAT): InitialState => {
    switch (action.type) {
        case follow: {

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
        case unfollow: {
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

        case setusers: {
            return {
                ...state,
                users : [...state.users, ...action.users]
            }
        }
        default:
            return state;
    }
}
export const followAC = (userID: string): followAT => {
    return {
        type: follow,
        userID: userID
    }
}
export const unfollowAC = (userID: string): unfollowAT => {
    return {
        type: unfollow,
        userID: userID
    }
}
export const setUsersAC = (users: []): setUsersAT => {
    return {
        type: setusers,
        users: users
    }
}


export default userReduser;