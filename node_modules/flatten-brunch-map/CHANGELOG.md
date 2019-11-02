# flatten-brunch-map Changes

## \[2.10.1] - 2018-12-13

### Fixed

- Regression of the source map library version due to breaking changes that break this module.

## \[2.10.0] - 2018-10-14

- Update devDependencies
- Minimum node.js version is 6
- Avoid throw when sourceMap mappings is an empty string (because empty code)

## \[2.8.2] - 2017-02-01

- Try to normalize the new source map.
- The `sources` property defaults to the received file path.

## \[2.8.1] - 2016-11-06

- Rewrite to not depend on filename, now the plugin does not normalizes file names.
- The format of `map` in the returned object matches the received format.

This helps compatibility between different tools, but the caller must ensure consistency of the filenames.

## [2.8.0] - 2016-10-24

- Initial release.
