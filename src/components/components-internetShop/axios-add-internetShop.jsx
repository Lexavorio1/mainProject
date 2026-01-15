import { useState } from 'react'
import axios from 'axios'

export const useAddShopUser = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState(null)

  const addUser = async userData => {
    setIsCreating(true)
    setError(null)

    try {
      const response = await axios.post(
        'http://localhost:2026/users',
        {
          role: 'user',
          ...userData,
          createdAt: Date.now()
        }
      )

      // ❗ ВАЖНО: возвращаем ТО, ЧТО СОЗДАЛ BACKEND
      return response.data
    } catch (e) {
      setError(e.message)
      return null
    } finally {
      setIsCreating(false)
    }
  }

  return { addUser, isCreating, error }
}
