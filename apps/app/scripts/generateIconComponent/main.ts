import { generateComponentFiles } from "./componentFile";
import { getFileInformation } from "./componentFileInfo";

function main() {
  try {
    const directoryPath = "scripts/generateIconComponent/svgs";
    const filesInfo = getFileInformation(directoryPath);

    generateComponentFiles(filesInfo);
    console.log("✨ Icon files have been successfully generated!");
  } catch (err) {
    console.error("🙅 Failed to generate icon files.");
    console.error(err);
  }
}

main();
