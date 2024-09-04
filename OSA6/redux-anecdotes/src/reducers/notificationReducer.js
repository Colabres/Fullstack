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


export const setNotification = (text,time) => {
    
let timeoutId
    return async dispatch => {   
        if (timeoutId) {
            clearTimeout(timeoutId)
          }
        dispatch(clearNotification())   
        dispatch(notify(text))
        timeoutId = setTimeout(() => {
        dispatch(clearNotification());
        }, time*1000)
    }
  }