import { useTranslation } from 'react-i18next'

interface MessageProps {
  title?: string
  message: string
  onClick?: any
}

export const SuccessMessage = ({ message, title }: MessageProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center">
      <i className="material-icons" style={{ fontSize: 30, color: 'green' }}>
        check_circle_outline
      </i>

      <div className="px-12 vds-toast__msg" style={{ color: '#242424' }}>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: '500' }}>
          {title ?? t('message.success')}
        </h3>

        <p style={{ color: '#747475', fontSize: '12px', marginTop: '0.5rem' }}>
          {message}
        </p>
      </div>
    </div>
  )
}
