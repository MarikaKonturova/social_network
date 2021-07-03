import {profileAPI, usersAPI} from "../../api/Api";
import {Dispatch} from "redux";

type addPostActionType = {
    type: typeof ADD_POST,
    newPostText: string
}
type setUserProfileAT = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
type setUserStatusAT = {
    type: typeof SET_USER_STATUS
    status: string
}
type ProfileActionTypes = setUserProfileAT | addPostActionType | setUserStatusAT
type InitialState = typeof initialState;

export type PostType = { likes: number, message: string, id: string }

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_USER_STATUS = 'SET-USER-STATUS'

export const addPostActionCreator = (newPostText: string): addPostActionType => {
    return {
        type: ADD_POST,
        newPostText
    }
}
export const setUserProfile = (profile: ProfileType): setUserProfileAT => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}
export const setUserStatus = (status: string): setUserStatusAT => {
    return {
        type: SET_USER_STATUS,
        status
    }
}
export type ProfileType={
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github : string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string    },
    photos: {
        small: string
        large: string    }
}
let initialState = {
    postsData: [
        {likes: 12, message: 'Hi, how are you?', id: "1"},
        {likes: 21, message: 'It\'s my first post', id: "2"},
        {likes: 3, message: 'Yo', id: "3"},
        {likes: 4, message: 'Yo', id: "4"},
        {likes: 5, message: 'Yo', id: "5"}
    ],
    newPostText: 'it-kamasutra',
    profile: {
        userId: 2,
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: '',
        contacts: {
            github : '',
            vk: '',
            facebook: '',
            instagram: '',
            twitter: '',
            website: '',
            youtube: '',
            mainLink: ''
        },
        photos: {
            small: '',
            large: ''
        }
    },
    status:''

}

const profileReduser = (state: InitialState = initialState, action: ProfileActionTypes): InitialState => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: "5",
                message: action.newPostText,
                likes: 0
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state,
               status: action.status
            }
        }
        default:
            return state;
    }


}
export const getUserProfile = (userId: number) => {
    debugger
    return (dispatch: Dispatch) => {
        usersAPI.getUserProfile(userId).then(response => {
            dispatch(setUserProfile(response.data))
        })
    }
}
export const getUserStatus = (userId: number) => {
    debugger
    return (dispatch: Dispatch) => {
        profileAPI.getUserStatus(userId).then(response => {
            dispatch(setUserStatus(response.data))
        })
    }
}
export const updateUserStatus = (status: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.updateStatus(status).then(response => {
            if(response.data.resultCode === 0){
            dispatch(setUserStatus(status))}
        })
    }
}
export default profileReduser;