/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import type { IndexHtmlTransform } from '@angular/build/src/utils/index-file/index-html-generator';
import { Target } from '@angular-devkit/architect';
import { logging } from '@angular-devkit/core';
import { loadModule } from '../common/src/load-module';

export async function loadIndexHtmlTransformer(
  indexHtmlTransformerPath: string,
  tsConfig: string,
  logger: logging.LoggerApi,
  target: Target,
): Promise<IndexHtmlTransform> {
  const transformer = await loadModule<(indexHtml: string, target: Target) => Promise<string>>(
    indexHtmlTransformerPath,
    tsConfig,
    logger,
  );

  return (indexHtml: string) => transformer(indexHtml, target);
}
