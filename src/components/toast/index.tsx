import { toast } from 'react-toastify'
import { ErrorMessage } from './componets/error'
import { SuccessMessage } from './componets/success'

export const toastSuccess = (
  msg: string,
  title?: string,
  onClick?: () => void
) => {
  if (msg)
    toast(
      <SuccessMessage
        message={msg}
        title={title}
        onClick={onClick && onClick()}
      />,
      {
        closeButton: () => (
          <div className='px-12 my-auto border-l'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-x-circle"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
        ),
        className: 'vds-toast__success',
        autoClose: onClick ? 99999 : 5000,
      }
    )
}

export const errorMsgWithClick = (
  message: any,
  title?: any,
  onClick?: () => void
) => {
  toast(<ErrorMessage title={title} message={message} onClick={onClick} />, {
    closeButton: () => (
      <div className='px-12 my-auto border-l'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          width="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-x-circle"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      </div>
    ),
    className: 'vds-toast__error',
    autoClose: 99999,
  })
}

export const toastError = (error: any, setError?: any) => {
  if (Array.isArray(error) && error.length > 0) {
    error.forEach((item) => {
      if (item && Array.isArray(item.fields) && setError) {
        item.fields.forEach((ele: any) => {
          if (ele !== 'orgId')
            setError(ele, {
              type: 'be',
              message: item.message,
            })
        })
      } else toastError(item.message)
    })
  } else if (typeof error === 'string') {
    toast(<ErrorMessage message={error} />, {
      closeButton: () => (
        <div className='px-12 my-auto border-l'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
      ),
      className: 'vds-toast__error',
    })
  } else
    toast(<ErrorMessage message='Có lỗi xảy ra' />, {
      closeButton: () => (
        <div className='px-12 my-auto border-l'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
      ),
      className: 'vds-toast__error',
    })
}
