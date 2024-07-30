import fs from "fs";
import path from "path";

import { addPropsToElement } from "./addProps";

/**先頭を大文字にする */
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/** パスカルケースに変換する */
function modifyToPascal(inputString: string): string {
  return inputString.replace(/(_|-)./g, (match) =>
    match.charAt(1).toUpperCase()
  );
}

/** ディレクトリ内のファイルの情報を取得する */
export function getFileInformation(directoryPath: string): [string, string][] {
  const files = fs.readdirSync(directoryPath);
  const fileInformation: [string, string][] = [];

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      const fileName = modifyToPascal(
        capitalize(path.basename(file, path.extname(file)))
      );
      const fileContent = addPropsToElement(fs.readFileSync(filePath, "utf-8"));
      fileInformation.push([fileName, fileContent]);
    }
  });

  return fileInformation;
}
