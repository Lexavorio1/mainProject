import { useSelector } from 'react-redux'
import { isBanned, getRemainingDays } from '../../App-main/internet-shop/profile/others/punishment'

export const BanBanner = () => {
  const user = useSelector(
    s => s.authUserShopState.user
  )

  if (!isBanned(user)) return null

  const days = getRemainingDays(user.banUntil)

  return (
    <div
      style={{
        background: '#5b0000',
        color: '#fff',
        padding: '12px',
        textAlign: 'center',
        fontWeight: 'bold'
      }}
    >
      ⛔ Вы забанены ({user.role}, {user.login}) <br />

      {user.banUntil === 'permanent' ? (
        <>⏳ Навсегда</>
      ) : (
        <>⏳ Осталось {days} дней</>
      )}

      <br />
      ❗ Причина: {user.banReason || 'не указана'}
    </div>
  )
}
