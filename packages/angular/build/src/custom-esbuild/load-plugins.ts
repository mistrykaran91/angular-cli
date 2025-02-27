/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import type { logging } from '@angular-devkit/core';
import type { Plugin } from 'esbuild';
import * as path from 'node:path';
import { loadModule } from '../common/src';
import { PluginConfig } from './custom-esbuild-schema';

export async function loadPlugins(
  pluginConfig: PluginConfig[] | undefined,
  workspaceRoot: string,
  tsConfig: string,
  logger: logging.LoggerApi,
): Promise<Plugin[]> {
  const plugins = await Promise.all(
    (pluginConfig || []).map(async (pluginConfig) => {
      if (typeof pluginConfig === 'string') {
        return loadModule<Plugin | Plugin[]>(
          path.join(workspaceRoot, pluginConfig),
          tsConfig,
          logger,
        );
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pluginFactory = await loadModule<(...args: any[]) => Plugin>(
          path.join(workspaceRoot, pluginConfig.path),
          tsConfig,
          logger,
        );

        return pluginFactory(pluginConfig.options);
      }
    }),
  );

  return plugins.flat();
}
