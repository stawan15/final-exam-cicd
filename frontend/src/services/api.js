import axios from 'axios'
import { supabase } from './supabase'

const api = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Attach auth token to all requests
api.interceptors.request.use(async (config) => {
    // Check if demo session bypass is active
    if (localStorage.getItem('demo_session')) {
        config.headers.Authorization = 'Bearer demo-token'
        return config
    }

    // Otherwise get real Supabase session
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
        config.headers.Authorization = `Bearer ${session.access_token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('API Error:', error.response?.data || error.message)
        return Promise.reject(error)
    }
)

export default api
