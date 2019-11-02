# @jsbits/deep-clone

_Part of the [JSBits][jsbits-url] suite._

[![License][license-badge]](LICENSE)
[![npm Version][npm-badge]][npm-url]
[![minified size][size-badge]][size-url]<br>
[![AppVeyor Test][appveyor-badge]][appveyor-url]
[![Travis Test][travis-badge]][travis-url]
[![coverage][codecov-badge]][codecov-url]
[![code quality][codacy-badge]][codacy-url]
[![maintainability][climate-badge]][climate-url]

Performs a deep cloning of an object own properties and symbols, with loosy or exact behavior.

## Install

For NodeJS and JS bundlers:

```bash
npm i @jsbits/deep-clone
# or
yarn add @jsbits/deep-clone
```

or load `deepClone` in the browser:

```html
<script src="https://unpkg.com/@jsbits/deep-clone/index.b.min.js"></script>
```

### Targets

- ES5 compatible browser
- NodeJS v4.2 or later

## `deepClone(value, [exact])` ⇒ `T` 

Performs a deep cloning of an object own properties and symbols, preserving
its prototype.

By default `cloneObject` works in "loosy mode", where it clones only
the object _enumerable_ properties and symbols.

To enable the "exact mode" and clone all, pass `true` in the second parameter.

Both modes retain all the attributes of the copied properties (enumerable,
configurable, writable) and correctly transfer the `get` and/or `set`
methods, although these, like the other function-type values,
_are copied by reference_.

Try to limit the usage of this function to POJOs, as this function does not
work for objects with constructor that requires parameters (other than
the most JS built-in Objects), nor objects with recursive references.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | `T` |  | Value to clone, mostly an object or array. |
| \[exact] | `boolean` | `false` | If `true`, also clone the non-enumerable properties |

**Returns**: `T` - The cloned object or value.  

Since 1.0.0<br>
Group: object<br>
Author/Maintainer: aMarCruz<br>

### Example

```ts
import deepClone from '@jsbits/deep-clone'

let obj = {
  foo: 1,
  bar: 'bar',
  baz: { date: new Date() },
}
let clone = deepClone(obj)

console.log('Success?',
  clone.baz.date instanceof Date && clone.baz.date !== obj.baz.date)
// ⇒ true

/*
  Using Symbol() as property name and the additional parameter
  to clone the non-enumerable property "abc".
*/
const baz = Symbol()
obj = {
  foo: 'Foo',
  arr: [{ bar: 'Bar' }],
  [baz]: 'Baz',
}
Object.defineProperty(obj, 'abc', {
  value: 'xyz',
  enumerable: false,
})
clone = deepClone(obj, true)

console.log(JSON.stringify(clone))  // ⇒ '{"foo":"Foo","arr":[{"bar":"Bar"}]}'
console.log(clone[baz])             // ⇒ 'Baz'
console.log(clone.abc)              // ⇒ 'xyz'

console.dir(Object.getOwnPropertyDescriptor(clone, 'abc'))
// ⇒ { value: 'xyz',
//      writable: false,
//      enumerable: false,
//      configurable: false }
```

### About getter and setters

Cloning of getters and setters work as expected, they are duplicated _by reference_. However, there' cases where cloning does not work.

Observe this fragment:

```ts
const createObj = function () {
  let _foo = 'bar' // in closure
  return Object.defineProperty({}, 'foo', {
    get () { return _foo },
    set (value) { _foo = value },
    enumerable: true,
  })
}

// This creates an object with a property `foo` with accessors that use the var `_foo` of its closure.
const obj = createObj()
// This will clone the object and the property `foo` with its accessors.
const clone = deepClone(obj)

// Looks like this works...
console.log(clone !== obj)      // ⇒ true
console.log(clone.foo)          // ⇒ 'bar'
clone.foo = 'BAZ'
console.log(clone.foo)          // ⇒ 'BAZ'
console.log(obj.foo)            // ⇒ 'BAZ' ...ups!
```

This is obvious if you look at the code of deepClone, getters and setters are copied but its closure is the same as the original object.

To date, I haven't found any way to solve this issue ...anyone?

A workaround is to keep the "hidden" variable in the object.
In this case, we move `_foo` to inside the object:

```ts
const createObj = function () {
  // _foo as property
  return Object.defineProperties({}, {
    _foo: {
      value: 'bar',
      writable: true, // writable, but no enumerable
    },
    foo: {
      get () { return this._foo },
      set (value) { this._foo = value },
      enumerable: true,
    },
  })
}

const obj = createObj()
const clone = deepClone(obj)

// Now this works
console.log(clone !== obj)      // ⇒ true
console.log(clone.foo)          // ⇒ 'bar'
clone.foo = 'BAZ'
console.log(clone.foo)          // ⇒ 'BAZ'
console.log(obj.foo)            // ⇒ 'bar' :)

// and...
console.log(JSON.stringify(obj)) // ⇒ '{"foo":"bar"}' +1
```

## Imports

All the [JSBits][jsbits-url] functions works in _strict mode_ and are compatible with:

- ES5 browsers, through the [jQuery](https://jquery.com/) `$.jsbits` object or the global `jsbits`.
- ESM Bundlers, like [webpack](http://webpack.github.io/) and [Rollup](https://rollupjs.org/).
- [ES modules](http://2ality.com/2014/09/es6-modules-final.html) for modern browsers or NodeJS with the `--experimental-modules` flag.
- [CommonJS](https://nodejs.org/docs/latest/api/modules.html#modules_modules) modules of NodeJS, jspm, and others.
- [Babel](https://babeljs.io/) and [TypeScript](www.typescriptlang.org/), through ES Module Interop.

Please see the [Distribution Formats][jsbits-formats] in the JSBits README to know about all the variants.

## Known Issues

This types are copied by reference:

- Function
- AsyncFunction
- Getters and Setters
- GeneratorFunction
- Iterators
- SharedArrayBuffer (ES2017, has a shered data block)
- Atomics object (ES2017)
- JSON object
- Math object
- WeakMap
- WeakSet
- XMLHttpRequest

`arguments` object is cloned as an object without prototype.

Untested types:

- Workers
- WebAssembly

The [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) object and other classes are cloned as generic Objects.

## Support my Work

I'm a full-stack developer with more than 20 year of experience and I try to share most of my work for free and help others, but this takes a significant amount of time and effort so, if you like my work, please consider...

[<img src="https://amarcruz.github.io/images/kofi_blue.png" height="36" title="Support Me on Ko-fi" />][kofi-url]

Of course, feedback, PRs, and stars are also welcome 🙃

Thanks for your support!

## License

The [MIT](LICENSE) License.

&copy; 2018-2019 Alberto Martínez &ndash; Readme powered by [jscc](https://github.com/aMarCruz/jscc) and [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)

[license-badge]:  https://img.shields.io/badge/license-MIT-blue.svg?style=flat
[npm-badge]:      https://img.shields.io/npm/v/@jsbits/deep-clone.svg
[npm-url]:        https://www.npmjs.com/package/@jsbits/deep-clone
[appveyor-badge]: https://img.shields.io/appveyor/ci/aMarCruz/jsbits/master.svg?label=appveyor
[appveyor-url]:   https://ci.appveyor.com/project/aMarCruz/jsbits/branch/master
[travis-badge]:   https://img.shields.io/travis/ProJSLib/jsbits/master.svg?label=travis
[travis-url]:     https://travis-ci.org/ProJSLib/jsbits
[codecov-badge]:  https://img.shields.io/codecov/c/github/ProJSLib/jsbits/master.svg
[codecov-url]:    https://codecov.io/gh/ProJSLib/jsbits/branch/master
[codacy-badge]:   https://img.shields.io/codacy/grade/b9374fca91d64b75aafac26682df8fd0/master.svg
[codacy-url]:     https://www.codacy.com/app/ProJSLib/jsbits?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ProJSLib/jsbits&amp;utm_campaign=Badge_Grade
[climate-badge]:  https://img.shields.io/codeclimate/maintainability/ProJSLib/jsbits.svg
[climate-url]:    https://codeclimate.com/github/ProJSLib/jsbits/maintainability
[size-badge]:     https://img.shields.io/bundlephobia/min/@jsbits/deep-clone.svg
[size-url]:       https://bundlephobia.com/result?p=@jsbits/deep-clone
[jsbits-url]:     https://github.com/ProJSLib/jsbits
[jsbits-formats]: https://github.com/ProJSLib/jsbits#distribution-formats
[kofi-url]:       https://ko-fi.com/C0C7LF7I
