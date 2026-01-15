import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import styles from './Panels.module.css'
import shop from '../../../App-main/internet-shop/App-shop.module.css'

export const DevPanel = () => {
  const users = useSelector(
    s => s.authUserShopState.usersList
  )

  const [menu, setMenu] = useState(null)
  const [time, setTime] = useState('')
  const [reason, setReason] = useState('')
  const menuRef = useRef(null)

  const openMenu = (e, user) => {
    e.preventDefault()
    setMenu({
      x: e.pageX,
      y: e.pageY,
      user
    })
    setTime('')
    setReason('')
  }

  // 🔥 ЗАКРЫТИЕ ПО ЛКМ ВНЕ МЕНЮ (КАК У АДМИНА)
  useEffect(() => {
    const close = e => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setMenu(null)
      }
    }

    document.addEventListener('click', close)
    return () =>
      document.removeEventListener('click', close)
  }, [])

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
  }

  const unBan = () =>
    axios.patch(
      `http://localhost:2026/users/${menu.user.id}`,
      { banUntil: null, banReason: null }
    )

  const unMute = () =>
    axios.patch(
      `http://localhost:2026/users/${menu.user.id}`,
      { muteUntil: null, muteReason: null }
    )

  const changeRole = role =>
    axios.patch(
      `http://localhost:2026/users/${menu.user.id}`,
      { role }
    )

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>🧑‍💻 Developer Panel</h2>

      {users.map(u => (
        <div
          key={u.id}
          className={styles.userRow}
          onContextMenu={e => openMenu(e, u)}
        >
          {u.login} — {u.role}
        </div>
      ))}

      {menu && (
        <div
          ref={menuRef}
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
            className={`${shop.shopBtn} ${shop.shopBtnDanger}`}
            onClick={() => applyPunishment('ban')}
          >
            🚫 Бан
          </button>

          <button
            className={`${shop.shopBtn} ${shop.shopBtnDark}`}
            onClick={() => applyPunishment('mute')}
          >
            🔇 Мут
          </button>

          <button
            className={shop.shopBtn}
            onClick={unBan}
          >
            ♻ Снять бан
          </button>

          <button
            className={shop.shopBtn}
            onClick={unMute}
          >
            ♻ Снять мут
          </button>

          <hr />

          <button onClick={() => changeRole('user')}>
            user
          </button>
          <button onClick={() => changeRole('admin')}>
            admin
          </button>
          <button onClick={() => changeRole('developer')}>
            developer
          </button>
        </div>
      )}
    </div>
  )
}


{/*
  import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import styles from './Panels.module.css'
import shop from '../../../App-main/internet-shop/App-shop.module.css'

export const DevPanel = () => {
  const users = useSelector(
    s => s.authUserShopState.usersList || []
  )

  const [menu, setMenu] = useState(null)
  const [time, setTime] = useState('')
  const [reason, setReason] = useState('')
  const menuRef = useRef(null)

  const openMenu = (e, user) => {
    e.preventDefault()
    setMenu({
      x: e.pageX,
      y: e.pageY,
      user
    })
    setTime('')
    setReason('')
  }

  // 🔥 закрытие по ЛКМ
  useEffect(() => {
    const close = e => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setMenu(null)
      }
    }

    document.addEventListener('click', close)
    return () =>
      document.removeEventListener('click', close)
  }, [])

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
  }

  const clearPunishment = type =>
    axios.patch(
      `http://localhost:2026/users/${menu.user.id}`,
      {
        [`${type}Until`]: null,
        [`${type}Reason`]: null
      }
    )

  const changeRole = role =>
    axios.patch(
      `http://localhost:2026/users/${menu.user.id}`,
      { role }
    )

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>🧑‍💻 Developer Panel</h2>

      {users.map(u => (
        <div
          key={u.id}
          className={styles.userRow}
          onContextMenu={e => openMenu(e, u)}
        >
          {u.login} — {u.role}
        </div>
      ))}

      {menu && (
        <div
          ref={menuRef}
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
            className={`${shop.shopBtn} ${shop.shopBtnDanger}`}
            onClick={() => applyPunishment('ban')}
          >
            Бан
          </button>

          <button
            className={`${shop.shopBtn} ${shop.shopBtnDark}`}
            onClick={() => applyPunishment('mute')}
          >
            Мут
          </button>

          <button
            className={shop.shopBtn}
            onClick={() => clearPunishment('ban')}
          >
            ♻ Снять бан
          </button>

          <button
            className={shop.shopBtn}
            onClick={() => clearPunishment('mute')}
          >
            ♻ Снять мут
          </button>

          <hr />

          <button onClick={() => changeRole('user')}>user</button>
          <button onClick={() => changeRole('admin')}>admin</button>
          <button onClick={() => changeRole('developer')}>
            developer
          </button>
        </div>
      )}
    </div>
  )
}

  */}