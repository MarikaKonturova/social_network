import {profileAPI, usersAPI} from "../../api/Api";
import {Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {getAuthUserData, setLoginError} from "./auth-reducer";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_USER_STATUS = 'SET-USER-STATUS'
const SET_USER_PHOTO = 'SET-USER-PHOTO'
const SET_PROFILE_DATAFORM_ERROR = 'SET-PROFILE-DATAFORM-ERROR'

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
export const setUserPhoto = (photos: PhotosType): setUserPhotoAT => {
    return {
        type: SET_USER_PHOTO,
        photos
    }
}
export const setProfileDataFormError = (error: null | string): setProfileDataFormErrorAT => {
    return {
        type: SET_PROFILE_DATAFORM_ERROR,
        error
    }
}
export type ProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    },
    photos: PhotosType,
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
        aboutMe: '',
        userId: 2,
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: '',
        contacts: {
            github: '',
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
    status: '',
    errorDataForm: null as null | string

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
        case SET_USER_PHOTO: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        }
        case SET_PROFILE_DATAFORM_ERROR: {
            return {
                ...state,
                errorDataForm: action.error
            }
        }

        default:
            return state;
    }


}
export const getUserProfile = (userId: number) => async (dispatch: Dispatch) => {
    const response = await usersAPI.getUserProfile(userId)
    dispatch(setUserProfile(response.data))

}
export const getUserStatus = (userId: number) => async (dispatch: Dispatch) => {
    const response = await profileAPI.getUserStatus(userId)
    dispatch(setUserStatus(response.data))

}
export const updateUserStatus = (status: string) => async (dispatch: Dispatch) => {
    try {
        const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setUserStatus(status))
        }
    } catch (e) {
// dispatch server error or global error Handler in APP
    }
}
export const savePhoto = (image: string | Blob) => async (dispatch: Dispatch) => {
    const response = await profileAPI.savePhoto(image)
    if (response.data.resultCode === 0) {
        dispatch(setUserPhoto(response.data.data.photos))
    }
}
export const saveProfile = (formData: ProfileType) => async (dispatch: ThunkDispatch<AppStateType, unknown, ProfileActionTypes>, getState: () => AppStateType) => {
    await dispatch(setProfileDataFormError(null))
    const user = getState().auth.data.id
    const response = await profileAPI.saveProfile(formData)
    if (response.data.resultCode === 0) {
        await dispatch(getUserProfile(user as number))
    } else {
        const message = response.data.messages.length > 0 ? response.data.messages.join('\n') : 'something is wrong'
        await dispatch(setProfileDataFormError(message))
        return Promise.reject(response.data.messages.join('\n'))
    }
}

//types


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
type setUserPhotoAT = {
    type: typeof SET_USER_PHOTO
    photos: PhotosType
}
type setProfileDataFormErrorAT = {
    type: typeof SET_PROFILE_DATAFORM_ERROR
    error: null | string
}
type ProfileActionTypes =
    setUserProfileAT
    | addPostActionType
    | setUserStatusAT
    | setUserPhotoAT
    | setProfileDataFormErrorAT
export type InitialState = typeof initialState;

export type PostType = { likes: number, message: string, id: string }
export type PhotosType = {
    small: string,
    large: string
}
export default profileReduser;