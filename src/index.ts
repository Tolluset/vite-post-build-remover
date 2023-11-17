import path from "path";
import fs from "fs";

export default function postBuildRemover({
  buildDir = "dist",
  filePaths,
}: {
  buildDir: string;
  filePaths: string[] | undefined;
}) {
  return {
    name: "remove-files-after-bundled",
    writeBundle() {
      if (!filePaths) {
        return;
      }

      const outDir = path.resolve(__dirname, buildDir);

      filePaths.forEach((file: string) => {
        const fileToRemove = path.resolve(outDir, file);

        if (!fs.existsSync(fileToRemove)) {
          return;
        }

        fs.unlink(fileToRemove, (err) => {
          if (err) {
            console.error("fail to remove file:", file, err);
            return;
          }
        });
      });
    },
  };
}
