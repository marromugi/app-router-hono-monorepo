import fs from 'fs'

/**ファイル情報をもとにコンポーネントファイルを生成する */
export function generateComponentFiles(
  fileInfo: [string, string][]
): void {
  let indexContent = ''
  fileInfo.forEach(([fileName, fileContent]) => {
    const componentPart = `export const ${fileName}Icon = ({...props}: SVGProps<SVGSVGElement>) => {
  return (
    ${fileContent}
  )
}`

    const importPart = `import type { SVGProps } from "react";\n`

    const result = `${importPart}
${componentPart}
`

    const outputComponentDirPath = `src/components/icons/${fileName}` // ディレクトリのパスを指定してください
    const outputComponentFilePath = `${outputComponentDirPath}/index.tsx` // ファイル名を指定してください
    fs.mkdirSync(outputComponentDirPath, { recursive: true })
    fs.writeFileSync(outputComponentFilePath, result)

    indexContent += `export * from './${fileName}';\n`
    console.log(`Generated ${outputComponentFilePath}`)
  })

  // index.ts 作成
  const outputIndexFilePath = `src/components/icons/index.ts`
  fs.writeFileSync(outputIndexFilePath, indexContent)
}
