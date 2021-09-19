import axios from 'axios'

const API = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://travel-mern-project.herokuapp.com/api/v1'
      : 'http://localhost:5000/api/v1'
})

export const fetchPosts = () => API.get('/posts')
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/like`)

export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)
