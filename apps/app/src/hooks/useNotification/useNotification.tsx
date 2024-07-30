import { Toast } from '@/components/ui'
import { useCallback } from 'react'
import { toast, ToastOptions, ToastType } from 'react-hot-toast'

type Props = Pick<ToastOptions, 'id'> & {
  theme: 'success' | 'error' | 'warning'
  message: string
  subMessage?: string
}

const DURATION: { [key in Props['theme']]: number } = {
  success: 13000,
  error: Infinity,
  warning: 6000
}

export const useNotification = () => {
  const notify = useCallback(
    ({ theme, id, message, subMessage }: Props) => {
      toast.custom(
        (t) => (
          <Toast
            key={t.id}
            theme={theme ?? 'success'}
            message={message}
            subMessage={subMessage}
            isVisible={t.visible}
            onClose={() => toast.dismiss(t.id)}
          />
        ),
        {
          id,
          duration: DURATION[theme ?? 'success']
        }
      )
    },
    []
  )
  return { notify }
}
