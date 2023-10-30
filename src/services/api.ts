import axios from "axios";
import {parseCookies} from 'nookies'

const {"FeedbackBooks_Token": Token} = parseCookies()

const baseURL = import.meta.env.VITE_BASE_URL
const api = axios.create({
  baseURL,
  headers:{
    "Content-Type": "application/json"
  }
})

api.defaults.headers['Authorization'] = `Bearer ${Token}`

export {api}