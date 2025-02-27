/* eslint-disable header/header */
import type { ApplicationBuilderExtensions } from '@angular/build/src/builders/application/options';
import { BuilderContext, createBuilder } from '@angular-devkit/architect';

import { getSystemPath, json, normalize } from '@angular-devkit/core';
import * as path from 'node:path';
import { defer, switchMap } from 'rxjs';

import { buildApplication } from '../../builders/application';
import { CustomEsbuildApplicationSchema } from '../custom-esbuild-schema';
import { loadIndexHtmlTransformer } from '../load-index-html-transformer';
import { loadPlugins } from '../load-plugins';

export function buildCustomEsbuildApplication(
  options: CustomEsbuildApplicationSchema,
  context: BuilderContext,
) {
  const workspaceRoot = getSystemPath(normalize(context.workspaceRoot));
  const tsConfig = path.join(workspaceRoot, options.tsConfig);

  return defer(async () => {
    const codePlugins = await loadPlugins(options.plugins, workspaceRoot, tsConfig, context.logger);

    const indexHtmlTransformer = options.indexHtmlTransformer
      ? await loadIndexHtmlTransformer(
          path.join(workspaceRoot, options.indexHtmlTransformer),
          tsConfig,
          context.logger,
          context.target,
        )
      : undefined;

    return { codePlugins, indexHtmlTransformer } as ApplicationBuilderExtensions;
  }).pipe(switchMap((extensions) => buildApplication(options, context, extensions)));
}

export default createBuilder<json.JsonObject & CustomEsbuildApplicationSchema>(
  buildCustomEsbuildApplication,
);
