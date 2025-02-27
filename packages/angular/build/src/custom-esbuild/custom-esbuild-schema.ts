/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ApplicationBuilderOptions } from '../builders/application';
import { DevServerBuilderOptions } from '../builders/dev-server';

export type PluginConfig = string | { path: string; options?: Record<string, unknown> };

export type CustomEsbuildApplicationSchema = ApplicationBuilderOptions & {
  plugins?: string[];
  indexHtmlTransformer?: string;
};

export type CustomEsbuildDevServerSchema = DevServerBuilderOptions & {
  middlewares?: string[];
};
