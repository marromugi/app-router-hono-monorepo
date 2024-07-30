'use client'

import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { DeleteModalProps } from './type'

export const DeleteModal = ({ isOpen, onChange }: DeleteModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={clsx(
            'mg-fixed mg-top-0 mg-left-0 mg-bg-gray-900-alpha',
            'mg-w-screen mg-h-screen',
            'mg-transition-all',
            'mg-animate-fade-in'
          )}
          onClick={() => onChange(false)}
        />
        <Dialog.Content
          className={clsx(
            'mg-fixed mg-top-0 mg-left-0',
            'mg-flex mg-flex-col mg-justify-center mg-items-center',
            'mg-w-screen mg-h-screen mg-p-4',
            'mg-animate-popover-top-fade-in'
          )}
        ></Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
