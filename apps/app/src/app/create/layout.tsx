import clsx from 'clsx'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className={clsx('mg-w-screen mg-min-h-screen', 'mg-bg-gray-50', 'mg-p-4')}>{children}</main>
}
