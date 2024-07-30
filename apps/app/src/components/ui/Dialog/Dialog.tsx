'use client'

import clsx from 'clsx'
import { DialogProps } from './type'
import * as BaseDialog from '@radix-ui/react-dialog'
import { DIALOG_CONTENT_VARIANTS } from './const'

export const Dialog = ({
  isOpen,
  onChange,
  children,
  size = 'lg'
}: DialogProps) => {
  return (
    <BaseDialog.Root open={isOpen} onOpenChange={onChange}>
      <BaseDialog.Portal>
        <BaseDialog.Overlay
          className={clsx(
            'mg-fixed mg-top-0 mg-left-0 mg-bg-gray-900-alpha',
            'mg-p-4',
            'mg-w-screen mg-h-screen',
            'mg-opacity-0',
            'mg-animate-fade-in'
          )}
          onClick={() => onChange(false)}
        />
        <BaseDialog.Content
          className={clsx(
            'mg-fixed mg-top-0 mg-left-0',
            'mg-flex mg-flex-col mg-justify-center mg-items-center',
            'mg-w-screen mg-h-screen mg-p-4'
          )}
          onClick={() => onChange(false)}
        >
          <div
            className={DIALOG_CONTENT_VARIANTS({ size })}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {children}
          </div>
        </BaseDialog.Content>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}
