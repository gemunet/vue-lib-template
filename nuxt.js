/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// https://github.com/nuxt/components#readme
import { join } from 'path';

export default function () {
  this.nuxt.hook('components:dirs', (dirs) => {
    // Add ./components dir to the list
    dirs.push({
      path: join(__dirname, './dist/lib/components'),
      prefix: 'vlt', // Change components prefix
    });
  });
}
