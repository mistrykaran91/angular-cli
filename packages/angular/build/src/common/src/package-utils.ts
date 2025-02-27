// eslint-disable-next-line header/header
import { dirname, join } from 'path';

export function resolvePackagePath(packageName: string, subPath: string) {
  try {
    const packageJsonPath = require.resolve(`${packageName}/package.json`);
    const packageDir = dirname(packageJsonPath);

    return join(packageDir, subPath);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(`Failed to resolve path for package ${packageName}: ${error.message}`);
    process.exit(1);
  }
}
