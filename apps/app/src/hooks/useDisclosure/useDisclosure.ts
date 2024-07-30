import { useCallback, useState } from 'react'

export const useDisclosure = () => {
  const [isOpen, setOpen] = useState(false)

  const onOpen = useCallback(() => setOpen(true), [setOpen])
  const onClose = useCallback(() => setOpen(false), [setOpen])
  const onToggle = useCallback(
    () => setOpen((prev) => !prev),
    [setOpen]
  )
  const onChange = useCallback(
    (isOpen: boolean) => setOpen(isOpen),
    [setOpen]
  )

  return {
    isOpen,
    onOpen,
    onChange,
    onClose,
    onToggle
  }
}
