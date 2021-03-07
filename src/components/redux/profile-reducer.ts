type addPostActionType = {
    type: typeof addpost
}
type updateNewPostTextActionType = {
    type: typeof updatenewposttext
    newText: string
}
type ProfileActionTypes = updateNewPostTextActionType | addPostActionType
export const addPostActionCreator = (): addPostActionType => {
    return {
        type: addpost
    }
}
export const updateNewPostTextActionCreator = (text: string): updateNewPostTextActionType => {
    return {
        type: updatenewposttext, newText: text
    }

}
const addpost = "ADD-POST";
const updatenewposttext = 'UPDATE-NEW-POST-TEXT';
type InitialState = typeof initialState;
export type PostType = {likes: number, message: string, id: string}
let initialState = {
    postsData: [
        {likes: 12, message: 'Hi, how are you?', id: "1"},
        {likes: 21, message: 'It\'s my first post', id: "2"},
        {likes: 3, message: 'Yo', id: "3"},
        {likes: 4, message: 'Yo', id: "4"},
        {likes: 5, message: 'Yo', id: "5"}
    ],
    newPostText: 'it-kamasutra'
}

const profileReduser = (state: InitialState = initialState, action: ProfileActionTypes): InitialState => {
    switch (action.type) {
        case addpost: {
            let newPost = {
                id: "5",
                message: state.newPostText,
                likes: 0
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            }

        }
        case updatenewposttext: {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        default:
            return state;
    }


}
export default profileReduser;