/**
 * 日付に日数、月数、年数を加算または減算します。
 * @param date - 基準日
 * @param days - 加算または減算する日数（負の値を指定すると減算）
 * @param months - 加算または減算する月数（負の値を指定すると減算）
 * @param years - 加算または減算する年数（負の値を指定すると減算）
 * @returns 演算後の日付
 */
export const adjustDate = (
  date: Date,
  days: number = 0,
  months: number = 0,
  years: number = 0
): Date => {
  const result = new Date(date)

  // 年を加算または減算
  result.setFullYear(result.getFullYear() + years)

  // 月を加算または減算
  result.setMonth(result.getMonth() + months)

  // 日を加算または減算
  result.setDate(result.getDate() + days)

  return result
}
