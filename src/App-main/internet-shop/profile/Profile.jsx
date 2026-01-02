import { useState } from "react"
import { useAuth } from "../../../components"
import { ProfileCard } from "./profile-card"

export const Profile = () => {
  const { user } = useAuth()
  const [openProfile, setOpenProfile] = useState(false)

  if (!user) return null

  return (
    <>
      <button onClick={() => setOpenProfile(true)}>
        Профиль
      </button>

      {openProfile && (
        <ProfileCard onClose={() => setOpenProfile(false)} />
      )}
    </>
  )
}
