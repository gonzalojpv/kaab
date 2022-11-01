import { Client } from 'appwrite'

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APP_ENDPOINT) // Your API Endpoint
  .setProject(import.meta.env.VITE_APP_PROJECT) // Your project ID

export default client
