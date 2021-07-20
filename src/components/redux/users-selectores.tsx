import {AppStateType} from "./redux-store";
import {createSelector} from "reselect";

export const getIsFetching = (state: AppStateType) => state.usersPage.isFetching

const getUsers = (state: AppStateType) => state.usersPage.users
export const getUsersSuperSelector = createSelector(getUsers,getIsFetching, (users, isFetching) => users.filter(u => true))

export const gePageSize = (state: AppStateType) => state.usersPage.pageSize
export const getTotalUsersCount = (state: AppStateType) => state.usersPage.totalUsersCount
export const getCurrentPage = (state: AppStateType) => state.usersPage.currentPage
export const getFollowingInProgress = (state: AppStateType) => state.usersPage.followingInProgress