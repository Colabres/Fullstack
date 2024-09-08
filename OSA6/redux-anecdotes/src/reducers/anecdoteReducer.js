import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import anecdotes from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const anObject = action.payload
      state.push(anObject)
    },
    like(state, action) {
      const updatedAnecdote = action.payload

      return state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote 
      )     
    },
    setData(state, action) {
      return action.payload
    },
    appendAn(state, action) {
      state.push(action.payload)
    }
  },
})


export const { like, setData,appendAn } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const createAnecdote = content => {
  return async dispatch => {

    const newAn = await anecdoteService.createNew(content)
    dispatch(appendAn(newAn))
  }
}

export const likeAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.addLike(anecdote)
    dispatch(like(updatedAnecdote))
  }
}

