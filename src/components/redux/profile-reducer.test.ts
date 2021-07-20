import profileReduser, {addPostActionCreator, InitialState} from "./profile-reducer";
const initialState : InitialState = {
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

test('new post should be added', () => {
    const action = addPostActionCreator('Bla bla bla')

    const newState = profileReduser(initialState,action)

    expect(newState.postsData.length).toBe(6 );
    expect(newState.postsData[5].likes).toBe(0);
    expect(newState.postsData[5].message).toBe('Bla bla bla' );
});
