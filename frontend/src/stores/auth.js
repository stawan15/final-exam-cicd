import { defineStore } from 'pinia'
import { supabase } from '../services/supabase'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        session: null,
        loading: true,
    }),

    getters: {
        isAuthenticated: (state) => !!state.session,
    },

    actions: {
        async initialize() {
            // Check if we have a demo session in local storage first
            const demoSessionStr = localStorage.getItem('demo_session')
            if (demoSessionStr) {
                const parts = demoSessionStr.split(':')
                if (parts[1] > Date.now()) {
                    this.user = { email: 'admin@financeflow.io', id: 'demo-user-123' }
                    this.session = { user: this.user, access_token: 'demo-token' }
                    this.loading = false
                    return
                } else {
                    localStorage.removeItem('demo_session')
                }
            }

            // Get initial session
            const { data: { session } } = await supabase.auth.getSession()
            this.session = session
            this.user = session?.user || null
            this.loading = false

            // Listen for auth changes
            supabase.auth.onAuthStateChange((_event, session) => {
                // Ignore if we are in demo mode
                if (localStorage.getItem('demo_session')) return
                this.session = session
                this.user = session?.user || null
            })
        },

        async signIn(email, password) {
            // Demo credentials bypass
            if (email === 'admin@financeflow.io' && password === 'password123') {
                this.user = { email: 'admin@financeflow.io', id: 'demo-user-123' }
                this.session = { user: this.user, access_token: 'demo-token' }
                // Set fake session for 1 hour
                localStorage.setItem('demo_session', `true:${Date.now() + 3600000}`)
                return { user: this.user, session: this.session }
            }

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) throw error
            return data
        },

        async signUp(email, password) {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            })
            if (error) throw error
            return data
        },

        async signOut() {
            // Check demo session first
            if (localStorage.getItem('demo_session')) {
                localStorage.removeItem('demo_session')
                this.user = null
                this.session = null
                return
            }

            const { error } = await supabase.auth.signOut()
            if (error) throw error
        }
    }
})
