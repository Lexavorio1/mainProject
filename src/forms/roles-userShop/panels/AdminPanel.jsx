import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import styles from './Panels.module.css'

export const AdminPanel = () => {
  const users = useSelector(
    s => s.authUserShopState.usersList
  )

  const [menu, setMenu] = useState(null)
  const [time, setTime] = useState('')
  const [reason, setReason] = useState('')

  const openMenu = (e, user) => {
    e.preventDefault()
    setMenu({
      x: e.pageX,
      y: e.pageY,
      user
    })
  }

  const applyPunishment = type => {
    const until =
      time === 'permanent'
        ? 'permanent'
        : Date.now() + Number(time) * 60000

    axios.patch(
      `http://localhost:2026/users/${menu.user.id}`,
      {
        [`${type}Until`]: until,
        [`${type}Reason`]: reason
      }
    )

    setMenu(null)
    setTime('')
    setReason('')
  }

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>🛡 Admin Panel</h2>

      {users
        .filter(u => u.role === 'user')
        .map(u => (
          <div
            key={u.id}
            className={styles.userRow}
            onContextMenu={e => openMenu(e, u)}
          >
            {u.login}
          </div>
        ))}

      {menu && (
        <div
          className={styles.contextMenu}
          style={{ top: menu.y, left: menu.x }}
        >
          <input
            placeholder="Время (мин / permanent)"
            value={time}
            onChange={e => setTime(e.target.value)}
          />

          <textarea
            placeholder="Причина"
            value={reason}
            onChange={e => setReason(e.target.value)}
          />

          <button
            className={`${styles.shopBtn} ${styles.shopBtnDanger}`}
            onClick={() => applyPunishment('ban')}
          >
            Бан
          </button>

          <button
            className={`${styles.shopBtn} ${styles.shopBtnDark}`}
            onClick={() => applyPunishment('mute')}
          >
            Мут
          </button>
        </div>
      )}
    </div>
  )
}
