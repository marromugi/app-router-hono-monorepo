export type IntroductionProps = {
  sheet: {
    id: string
    createdAt: string
    sheetUsers: {
      id: string
      color: 'red' | 'blue' | 'green' | 'purple' | 'yellow' | 'lime'
      nickname: string
    }[]
    title?: string | undefined
  }
  isLoggedIn: boolean
}
