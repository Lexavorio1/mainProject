import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:2026', // json-server
  headers: {
    'Content-Type': 'application/json'
  }
})
