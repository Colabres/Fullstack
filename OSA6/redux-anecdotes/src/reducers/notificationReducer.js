import { createSlice } from '@reduxjs/toolkit'
const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notify(state, action) {
            return action.payload 
            },

        clearNotification(state, action) {
            return ''
            }
        }
        })



export const { notify, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

var timer
export const setNotification = (text,time) => {
    clearTimeout(timer)
    return async dispatch => {   
        dispatch(clearNotification())   
        dispatch(notify(text))
        timer = setTimeout(() => {
        dispatch(clearNotification());
        }, time*1000)
    }
  }