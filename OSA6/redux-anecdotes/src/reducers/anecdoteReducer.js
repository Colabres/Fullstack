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
      // const id = action.payload
      // const anecdoteToLike = state.find(a => a.id === id)
      // const likedAnecdote = { 
      //   ...anecdoteToLike, 
      //   votes: anecdoteToLike.votes + 1
      // }
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
    //newAn is a rdy to use obect with content,votes set to 0 and id
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

