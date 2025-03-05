import { useTranslation } from 'react-i18next'

interface MessageProps {
  title?: string
  message: string
  onClick?: any
}

export const ErrorMessage = ({ message, title }: MessageProps) => {
  const { t } = useTranslation('common')

  return (
    <div className="flex items-center">
      <i className="material-icons" style={{ fontSize: 30, color: 'red' }}>
        highlight_off
      </i>
      
      <div className="px-6 vds-toast__msg" style={{ color: '#242424' }}>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: '500' }}>
          {title ?? t('message.fail')}
        </h3>

        <p style={{ color: '#747475', fontSize: '12px', marginTop: '0.5rem' }}>
          {message}
        </p>
      </div>

      <hr style={{ border: '1px solid #dcdcdc', width: '100%' }} />
    </div>
  )
}
