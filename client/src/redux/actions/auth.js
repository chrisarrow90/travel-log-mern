import { AUTH } from './actionTypes'
import * as api from '../../api'

export const signin = (formData, history) => async (dispatch) => {
  try {
    // log in user
    history.push('/')
  } catch (err) {
    console.log(err)
  }
}

export const signup = (formData, history) => async (dispatch) => {
  try {
    // sign up user
    history.push('/')
  } catch (err) {
    console.log(err)
  }
}
