import { useSelector } from 'react-redux'
import axios from 'axios'

export const DevPanel = () => {
  const users = useSelector(
    s => s.authUserShopState.usersList
  )

  const setRole = async (id, role) => {
    await axios.patch(`http://localhost:2026/users/${id}`, { role })
    window.location.reload()
  }

  return (
    <div>
      <h2>🧑‍💻 Developer Panel</h2>

      {users.map(u => (
        <div key={u.id}>
          {u.login} — {u.role}
          <button onClick={() => setRole(u.id, 'user')}>user</button>
          <button onClick={() => setRole(u.id, 'admin')}>admin</button>
          <button onClick={() => setRole(u.id, 'developer')}>dev</button>
        </div>
      ))}
    </div>
  )
}
