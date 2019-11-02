# Changelog of @jsbits/deep-clone

For global changes, see the [changelog of jsbits](https://github.com/ProJSLib/jsbits/blob/master/CHANGELOG.md)

## \[1.1.1] - 2018-12-29

### Changed

- Replace BSD-2 with the MIT license.
- Update badges.

### Fixed

- Mention to `Symbol` in description and example.
- Description of the parameter "exact".

## \[1.1.0] - 2018-12-06

### Added

- Support for `Symbol` property names.
- Support for `Error`, `Set`, `Map`, and other ES6/ES7 types.
- Argument is copied as an object without prototype.
- Unsupported types are copied by reference.
- Enhance performance in some internal operations.

### Fixed

- Issues with codebeat linters.
- Fix the description to match the current behavior.

## \[1.0.1] - 2018-11-12

### Added

- Badges in the Readme.

### Fixed

- Wrong `export default` in typings, the correct one is `export =`.
- Coverage report.

## \[1.0.0] - 2018-11-09

Initial release.
