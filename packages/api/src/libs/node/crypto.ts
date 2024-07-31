import crypto from 'node:crypto'

/**ハッシュ化を行う関数。比較的高速です。 */
export const hashValue = (value: string, salt: string) => {
  const hash = crypto.createHash('sha256')

  hash.update(`${salt}${value}`)

  return hash.digest('hex')
}

/**よりセキュアなハッシュ化を行う関数。計算効率は落ちます。 */
export const hashPassword = (password: string, salt: string) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex')
}

export const generateSalt = (length: number = 16) => {
  return crypto.randomBytes(length).toString('hex')
}

/**
 * アルファベットと数字のみを含むランダムな文字列を生成する関数
 * @param {number} length - 生成する文字列の長さ
 * @returns {string} - ランダムな文字列
 */
export const generateAlphanumericString = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const bytes = crypto.randomBytes(length)
  let randomString = ''

  for (let i = 0; i < length; i++) {
    randomString += chars[bytes[i] % chars.length]
  }

  return randomString
}
