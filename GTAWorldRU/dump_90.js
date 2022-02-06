{
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],2:[function(require,module,exports){
(function (Buffer){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this,require("buffer").Buffer)
},{"base64-js":1,"buffer":2,"ieee754":3}],3:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],4:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("../utilities/globals");
var debugMode = false;
var carrierAnimDict = 'missfinale_c2mcs_1';
var carrierAnim = 'fin_c2_mcs_1_camman';
var carrierFlag = 49;
var carriedanimDict = 'nm';
var carriedAnim = 'firemans_carry';
var carriedFlag = 33;
mp.events.add('CarrySystem::SyncCarryPair', function (remoteIDCarrier, remoteIDCarried) { return __awaiter(void 0, void 0, void 0, function () {
    var carrier, carried;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pushDebug("Start sync pair " + remoteIDCarrier + " - " + remoteIDCarried);
                carrier = mp.players.atRemoteId(remoteIDCarrier);
                carried = mp.players.atRemoteId(remoteIDCarried);
                if (!!util.IsAnimDictLoaded(carrierAnimDict)) return [3, 2];
                pushDebug("---Loading anim dict " + carrierAnimDict + "...");
                return [4, util.TryLoadAnimDict(carrierAnimDict)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                if (!!util.IsAnimDictLoaded(carriedanimDict)) return [3, 4];
                pushDebug("---Loading anim dict " + carriedanimDict + "...");
                return [4, util.TryLoadAnimDict(carriedanimDict)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                pushDebug("---Double null check: [Carried: " + carried + " | Carrier: " + carrier + "}");
                if (carried !== undefined && carried !== null && carried.doesExist() &&
                    carried !== undefined && carried !== null && carried.doesExist()) {
                    pushDebug("----Carrier " + remoteIDCarrier + " and Carried " + remoteIDCarried + " both exist.");
                    pushDebug("----Checking attach status on pair " + carrier.remoteId + " - " + carried.remoteId + ".");
                    if (!carried.isAttachedTo(carrier.handle)) {
                        pushDebug("-----Pair " + carrier.remoteId + " " + carried.remoteId + " wasn't attached, attaching.");
                        carried.attachTo(carrier.handle, 0, 0.27, 0.15, 0.63, 0.5, 0.5, 180, false, false, false, false, 2, false);
                    }
                    pushDebug("----Checking if carried " + carried.remoteId + " is playing animation " + carriedanimDict + " - " + carriedAnim + ".");
                    if (!carried.isPlayingAnim(carriedanimDict, carriedAnim, 3)) {
                        pushDebug("-----Carried " + carried.remoteId + " anim not playing... starting animation " + carriedanimDict + " - " + carriedAnim + ".");
                        carried.taskPlayAnim(carriedanimDict, carriedAnim, 8.0, -8.0, 10000, carriedFlag, 0, false, false, false);
                    }
                    pushDebug("----Checking if carrier " + carrier.remoteId + " is playing animation " + carrierAnimDict + " - " + carrierAnim + ".");
                    if (!carrier.isPlayingAnim(carrierAnimDict, carrierAnim, 3)) {
                        pushDebug("-----Carrier " + carried.remoteId + " anim not playing... starting animation " + carriedanimDict + " - " + carriedAnim + ".");
                        carrier.taskPlayAnim(carrierAnimDict, carrierAnim, 8.0, -8.0, 10000, carrierFlag, 0, false, false, false);
                    }
                }
                pushDebug("End sync sync pair " + remoteIDCarrier + " - " + remoteIDCarried);
                return [2];
        }
    });
}); });
mp.events.add('CarrySystem::SyncDetachCarryPair', function (remoteIDCarrier, remoteIDCarried) {
    pushDebug("Start detach on pair " + remoteIDCarrier + " - " + remoteIDCarried);
    var carrier = mp.players.atRemoteId(remoteIDCarrier);
    var carried = mp.players.atRemoteId(remoteIDCarried);
    pushDebug("---Checking Carrier " + remoteIDCarrier + " null status.");
    if (carrier !== undefined && carrier !== null && carrier.doesExist()) {
        pushDebug("----Carrier " + remoteIDCarrier + " not null -> detaching.");
        mp.game.invoke('0x176CECF6F920D707', carrier.handle);
        carrier.detach(true, false);
    }
    pushDebug("---Checking Carried " + remoteIDCarried + " null status.");
    if (carried !== undefined && carried !== null && carried.doesExist()) {
        pushDebug("----Carried " + remoteIDCarried + " not null -> detaching.");
        mp.game.invoke('0x176CECF6F920D707', carried.handle);
        carried.detach(true, false);
    }
    pushDebug("End detach on pair " + remoteIDCarrier + " - " + remoteIDCarried);
});
function pushDebug(str) {
    if (debugMode)
        mp.gui.chat.push(str);
}

},{"../utilities/globals":16}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetFollowing = exports.IsCTVEnabled = void 0;
var events = require("../utilities/eventswrapper");
var util = require("../utilities/globals");
var raycaster_1 = require("../utilities/raycaster");
var TooltipHandler_1 = require("../tooltip/TooltipHandler");
var debugMode = false;
var MaximumClickToWalkDistance = 100;
events.eventsHandler.addEventListener(events.event.render, function (_nametags) {
    if (mp.players.local.weapon != mp.game.joaat('weapon_unarmed'))
        return;
    if (!IsCTVEnabled())
        return;
    if (util.isCursorVisible())
        return;
    if (mp.game.controls.isDisabledControlJustPressed(0, 32) ||
        mp.game.controls.isDisabledControlJustPressed(0, 33) ||
        mp.game.controls.isDisabledControlJustPressed(0, 34) ||
        mp.game.controls.isDisabledControlJustPressed(0, 35)) {
        mp.players.local.clearTasks();
        destroyMarker();
    }
});
var shiftHeldDown = false;
mp.keys.bind(16, true, function () {
    shiftHeldDown = true;
    if (marker === undefined || marker == null)
        return;
    if (!IsCTVEnabled())
        return;
    mp.players.local.taskFollowNavMeshToCoord(marker.position.x, marker.position.y, marker.position.z, 2.0, -1, 1.0, false, 0);
});
mp.keys.bind(16, false, function () {
    shiftHeldDown = false;
    if (marker === undefined || marker == null)
        return;
    if (!IsCTVEnabled())
        return;
    mp.players.local.taskFollowNavMeshToCoord(marker.position.x, marker.position.y, marker.position.z, 1.0, -1, 1.0, false, 0);
});
events.eventsHandler.addEventListener(events.event.clientLeftClick, function (x, y) {
    pushDebug('CTVDEBUG: LeftClick');
    if (!util.isCursorVisible())
        return;
    pushDebug('CTVDEBUG: 1');
    if (!IsCTVEnabled())
        return;
    pushDebug('CTVDEBUG: 2');
    if (TooltipHandler_1.isToolTipOpen())
        return;
    pushDebug('CTVDEBUG: 3');
    pushDebug('CTVDEBUG: 4');
    if (util.isChatboxOpen() && util.clientClickedOnChatbox(x, y))
        return;
    pushDebug('CTVDEBUG: 5');
    if (util.clientIsRunningBlacklistedCEF())
        return;
    if (util.isChatboxOpen())
        return;
    if (util.isLocalPlayerInsideVehicle())
        return;
    pushDebug('CTVDEBUG: stw');
    var clickCoord = raycaster_1.screenCoordsToWorldCoords(x, y, raycaster_1.IntersectOptions.Everything, mp.players.local.handle);
    if (clickCoord === undefined)
        return;
    pushDebug('CTVDEBUG: clickcord!=undefined');
    var playerEntityDistance = util.getDistanceBetweenVectors3Mp(mp.players.local.position, clickCoord, true);
    if (playerEntityDistance > MaximumClickToWalkDistance || playerEntityDistance < 2.0)
        return;
    pushDebug('CTVDEBUG: setMarketAt');
    setMarkerAt(clickCoord, mp.players.local.dimension);
    if (shiftHeldDown) {
        pushDebug('CTVDEBUG: ctvRUN');
        mp.players.local.taskFollowNavMeshToCoord(clickCoord.x, clickCoord.y, clickCoord.z, 2.0, -1, 1.0, false, 0);
    }
    else {
        pushDebug('CTVDEBUG: ctvWALK');
        mp.players.local.taskFollowNavMeshToCoord(clickCoord.x, clickCoord.y, clickCoord.z, 1.0, -1, 1.0, false, 0);
    }
});
var marker = undefined;
function setMarkerAt(pos, dim) {
    pos.z += 0.33;
    if (marker === undefined) {
        marker = mp.markers.new(20, pos, 1.0, {
            color: [255, 255, 255, 95],
            visible: true,
            dimension: dim,
        });
    }
    else {
        marker.destroy();
        marker = mp.markers.new(20, pos, 1.0, {
            color: [255, 255, 255, 95],
            visible: true,
            dimension: dim,
        });
    }
}
function destroyMarker() {
    if (marker !== undefined) {
        marker.destroy();
        marker = undefined;
    }
}
function IsCTVEnabled() {
    var status = mp.players.local.getVariable('CTVEnabledDataKey');
    if (status !== undefined && status == true)
        return true;
    return false;
}
exports.IsCTVEnabled = IsCTVEnabled;
function pushDebug(msg) {
    if (debugMode)
        mp.gui.chat.push(msg.toString());
}
function SetFollowing(entity) {
    mp.players.local.taskFollowToOffsetOf(entity.handle, 0, 0, 0, 1.0, -1, 0, true);
    destroyMarker();
}
exports.SetFollowing = SetFollowing;
setInterval(function () {
    if (marker === undefined)
        return;
    var dist = util.getDistanceBetweenVectors3Mp(mp.players.local.position, marker.position, true);
    if (dist < 1.0 || dist > MaximumClickToWalkDistance + 5) {
        destroyMarker();
    }
}, 250);

},{"../tooltip/TooltipHandler":11,"../utilities/eventswrapper":15,"../utilities/globals":16,"../utilities/raycaster":17}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../utilities/enums");
var debug = false;
mp.keys.bind(enums_1.keyCode.NUMPAD_0, false, function () {
    if (!debug)
        return;
    pushDebug('Setting locked.');
    var pos = mp.players.local.position;
    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat('prop_com_ls_door_01'), pos.x, pos.y, pos.z, true, 0, false);
    var ret = mp.game.object.getStateOfClosestDoorOfType(mp.game.joaat('prop_com_ls_door_01'), pos.x, pos.y, pos.z, 0, 0);
    pushDebug("ret.locked\" = " + ret.locked + " | ret.heading = " + ret.heading);
});
mp.keys.bind(enums_1.keyCode.NUMPAD_1, false, function () {
    if (!debug)
        return;
    pushDebug('Setting unlocked.');
    var pos = mp.players.local.position;
    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat('prop_com_ls_door_01'), pos.x, pos.y, pos.z, false, 0, false);
    var ret = mp.game.object.getStateOfClosestDoorOfType(mp.game.joaat('prop_com_ls_door_01'), pos.x, pos.y, pos.z, 0, 0);
    pushDebug("ret.locked\" = " + ret.locked + " | ret.heading = " + ret.heading);
});
var currentUnlockID = 0;
mp.keys.bind(enums_1.keyCode.NUMPAD_2, false, function () {
    if (!debug)
        return;
    mp.players.local.position = new mp.Vector3(knownDoors[currentUnlockID].x, knownDoors[currentUnlockID].y, knownDoors[currentUnlockID].z);
    pushDebug("TPing to door " + currentUnlockID);
    currentUnlockID++;
    if (currentUnlockID >= knownDoors.length)
        currentUnlockID = 0;
});
var currentLockID = 0;
mp.keys.bind(enums_1.keyCode.NUMPAD_3, false, function () {
    if (!debug)
        return;
    var actualID = lockInsteadIDs[currentLockID];
    mp.players.local.position = new mp.Vector3(knownDoors[actualID].x, knownDoors[actualID].y, knownDoors[actualID].z);
    pushDebug("TPing to LOCK door ~r~ " + actualID);
    currentLockID++;
    if (currentLockID >= lockInsteadIDs.length)
        currentLockID = 0;
});
mp.events.add('DEV_TP_TO_DOOR', function (id) {
    if (id < 0 || id >= knownDoors.length) {
        mp.gui.chat.push('Out of bounds');
        return;
    }
    mp.players.local.position = new mp.Vector3(knownDoors[id].x, knownDoors[id].y, knownDoors[id].z);
    pushDebug("TPing to door " + id);
});
setInterval(function () {
    for (var i = 0; i < knownDoors.length; i++) {
        var door = knownDoors[i];
        var dist = mp.game.system.vdist(door.x, door.y, door.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z);
        if (dist > 50)
            continue;
        var ret = mp.game.object.getStateOfClosestDoorOfType(door.hash, door.x, door.y, door.z, 0, 0);
        pushDebug("index = " + i + ", state = " + ret.locked);
        if (lockInsteadIDs.includes(i)) {
            if (ret.locked)
                continue;
            mp.game.object.setStateOfClosestDoorOfType(door.hash, door.x, door.y, door.z, true, door.h, false);
            pushDebug("Locking " + door.hash + " at " + door.x + " " + door.y + " " + door.z + " | index=" + i + " [LockInsteadID]");
            continue;
        }
        else {
            if (!ret.locked)
                continue;
            mp.game.object.setStateOfClosestDoorOfType(door.hash, door.x, door.y, door.z, false, door.h, false);
            pushDebug("Unlocking " + door.hash + " at " + door.x + " " + door.y + " " + door.z + " | index=" + i);
        }
    }
}, 1000);
var lockInsteadIDs = [
    38, 39, 41, 42, 43, 44, 45, 46,
    47, 48, 49, 50,
    51, 52, 53,
    61,
    88, 89, 90, 91, 92, 93,
    114,
    115, 116, 117, 118, 119, 120,
    121, 122,
    125, 126,
    127, 128, 129, 130, 131,
    132, 152, 153, 154, 155, 156, 157, 158, 159, 208, 209, 210, 211, 212, 213, 214, 215,
    217, 218,
];
var knownDoors = [
    { hash: -1844444717, x: 133.000000, y: -1711.000000, z: 29.000000, h: 0.000000, unlocked: false },
    { hash: -1844444717, x: -1287.857056, y: -1115.741943, z: 7.140100, h: 0.000000, unlocked: false },
    { hash: -1844444717, x: 1932.952026, y: 3725.154053, z: 32.994400, h: 0.000000, unlocked: false },
    { hash: -1844444717, x: 1207.873047, y: -470.062988, z: 66.358002, h: 0.000000, unlocked: false },
    { hash: -1844444717, x: -29.869200, y: -148.157104, z: 57.226501, h: 0.000000, unlocked: false },
    { hash: -1844444717, x: -280.785095, y: 6232.782227, z: 31.845501, h: 0.000000, unlocked: false },
    { hash: -1663512092, x: -824.000000, y: -187.000000, z: 38.000000, h: 0.000000, unlocked: false },
    { hash: 145369505, x: -823.000000, y: -188.000000, z: 38.000000, h: 0.000000, unlocked: false },
    { hash: 868499217, x: 82.318604, y: -1392.751953, z: 29.526100, h: 0.000000, unlocked: false },
    { hash: -1148826190, x: 82.318604, y: -1390.475952, z: 29.526100, h: 0.000000, unlocked: false },
    { hash: 868499217, x: 1686.983032, y: 4821.741211, z: 42.213100, h: 0.000000, unlocked: false },
    { hash: -1148826190, x: 1687.281982, y: 4819.483887, z: 42.213100, h: 0.000000, unlocked: false },
    { hash: 868499217, x: 418.636993, y: -806.456970, z: 29.639601, h: 0.000000, unlocked: false },
    { hash: -1148826190, x: 418.636993, y: -808.732971, z: 29.639601, h: 0.000000, unlocked: false },
    { hash: 868499217, x: -1096.661011, y: 2705.446045, z: 19.257799, h: 0.000000, unlocked: false },
    { hash: -1148826190, x: -1094.964966, y: 2706.964111, z: 19.257799, h: 0.000000, unlocked: false },
    { hash: 868499217, x: 1196.824951, y: 2703.220947, z: 38.372601, h: 0.000000, unlocked: false },
    { hash: -1148826190, x: 1199.100952, y: 2703.220947, z: 38.372601, h: 0.000000, unlocked: false },
    { hash: 868499217, x: -818.764221, y: -1079.543945, z: 11.478100, h: 0.000000, unlocked: false },
    { hash: -1148826190, x: -816.793213, y: -1078.406006, z: 11.478100, h: 0.000000, unlocked: false },
    { hash: 868499217, x: -0.056400, y: 6517.460938, z: 32.027802, h: 0.000000, unlocked: false },
    { hash: -1148826190, x: -1.725300, y: 6515.914062, z: 32.027802, h: 0.000000, unlocked: false },
    { hash: 1780022985, x: -1201.435059, y: -776.856628, z: 17.991800, h: 0.000000, unlocked: false },
    { hash: 1780022985, x: 617.245789, y: 2751.021973, z: 42.757801, h: 0.000000, unlocked: false },
    { hash: 1780022985, x: 127.820099, y: -211.827393, z: 55.227501, h: 0.000000, unlocked: false },
    { hash: 1780022985, x: -3167.750000, y: 1055.536011, z: 21.532900, h: 0.000000, unlocked: false },
    { hash: -1922281023, x: -716.675415, y: -155.419998, z: 37.674900, h: 0.000000, unlocked: false },
    { hash: -1922281023, x: -715.615417, y: -157.256104, z: 37.674900, h: 0.000000, unlocked: false },
    { hash: -1922281023, x: -157.092407, y: -306.441315, z: 39.993999, h: 0.000000, unlocked: false },
    { hash: -1922281023, x: -156.402206, y: -304.436615, z: 39.993999, h: 0.000000, unlocked: false },
    { hash: -1922281023, x: -1454.781982, y: -231.792694, z: 50.056499, h: 0.000000, unlocked: false },
    { hash: -1922281023, x: -1456.201050, y: -233.368195, z: 50.056499, h: 0.000000, unlocked: false },
    { hash: 543652229, x: 321.809998, y: 178.360001, z: 103.680000, h: 0.000000, unlocked: false },
    { hash: -1212951353, x: 1859.890015, y: 3749.790039, z: 33.180000, h: 0.000000, unlocked: false },
    { hash: -1212951353, x: -289.175201, y: 6199.111816, z: 31.636999, h: 0.000000, unlocked: false },
    { hash: 543652229, x: -1155.453979, y: -1424.008057, z: 5.046100, h: 0.000000, unlocked: false },
    { hash: 543652229, x: 1321.286011, y: -1650.597046, z: 52.366299, h: 0.000000, unlocked: false },
    { hash: 543652229, x: -3167.789062, y: 1074.766968, z: 20.920900, h: 0.000000, unlocked: false },
    { hash: 159994461, x: -817.000000, y: 179.000000, z: 73.000000, h: 0.000000, unlocked: false },
    { hash: -1686014385, x: -816.000000, y: 178.000000, z: 73.000000, h: 0.000000, unlocked: false },
    { hash: 30769481, x: -815.000000, y: 186.000000, z: 73.000000, h: 6.500000, unlocked: false },
    { hash: -1454760130, x: -797.000000, y: 177.000000, z: 73.000000, h: 0.000000, unlocked: false },
    { hash: 1245831483, x: -795.000000, y: 178.000000, z: 73.000000, h: 0.000000, unlocked: false },
    { hash: -1454760130, x: -793.000000, y: 181.000000, z: 73.000000, h: 0.000000, unlocked: false },
    { hash: 1245831483, x: -794.000000, y: 183.000000, z: 73.000000, h: 0.000000, unlocked: false },
    { hash: -1568354151, x: -849.000000, y: 179.000000, z: 70.000000, h: 0.000000, unlocked: false },
    { hash: 1019527301, x: -802.733276, y: 167.504105, z: 77.582397, h: 0.000000, unlocked: false },
    { hash: 520341586, x: -14.000000, y: -1441.000000, z: 31.000000, h: 0.000000, unlocked: false },
    { hash: 1413743677, x: -15.000000, y: -1427.000000, z: 31.000000, h: 0.000000, unlocked: false },
    { hash: 703855057, x: -25.280001, y: -1431.060059, z: 30.840000, h: 0.000000, unlocked: false },
    { hash: 308207762, x: 7.520000, y: 539.530029, z: 176.179993, h: 0.000000, unlocked: false },
    { hash: 132154435, x: 1973.000000, y: 3815.000000, z: 34.000000, h: 0.000000, unlocked: false },
    { hash: 67910261, x: 1972.786987, y: 3824.553955, z: 32.583099, h: 12.000000, unlocked: false },
    { hash: -607040053, x: -1150.000000, y: -1521.000000, z: 11.000000, h: 0.000000, unlocked: false },
    { hash: -550347177, x: -1145.900024, y: -1991.140015, z: 14.180000, h: 25.000000, unlocked: false },
    { hash: 270330101, x: 723.119995, y: -1088.829956, z: 23.280001, h: 25.000000, unlocked: false },
    { hash: -550347177, x: -356.089996, y: -134.770004, z: 40.009998, h: 25.000000, unlocked: false },
    { hash: -822900180, x: 108.850197, y: 6617.875977, z: 32.673000, h: 25.000000, unlocked: false },
    { hash: -822900180, x: 114.320602, y: 6623.226074, z: 32.716099, h: 25.000000, unlocked: false },
    { hash: -822900180, x: 1182.305054, y: 2645.241943, z: 38.806999, h: 25.000000, unlocked: false },
    { hash: -822900180, x: 1174.654053, y: 2645.241943, z: 38.682598, h: 25.000000, unlocked: false },
    { hash: 486670049, x: -107.540100, y: -9.025800, z: 70.669601, h: 0.000000, unlocked: false },
    { hash: 245182344, x: 717.000000, y: -975.000000, z: 25.000000, h: 0.000000, unlocked: false },
    { hash: -681066206, x: 719.000000, y: -975.000000, z: 25.000000, h: 0.000000, unlocked: false },
    { hash: 551491569, x: 709.981323, y: -963.531128, z: 30.545300, h: 0.000000, unlocked: false },
    { hash: 933053701, x: 709.989380, y: -960.667480, z: 30.545300, h: 0.000000, unlocked: false },
    { hash: 426403179, x: 707.804626, y: -962.456421, z: 30.545300, h: 0.000000, unlocked: false },
    { hash: -1212951353, x: 1393.000000, y: 3599.000000, z: 35.000000, h: 0.000000, unlocked: false },
    { hash: -1212951353, x: 1395.000000, y: 3600.000000, z: 35.000000, h: 0.000000, unlocked: false },
    { hash: 1173348778, x: 1387.000000, y: 3614.000000, z: 39.000000, h: 0.000000, unlocked: false },
    { hash: -1428622127, x: 1083.546997, y: -1975.435059, z: 31.622200, h: 0.000000, unlocked: false },
    { hash: -1428622127, x: 1065.237061, y: -2006.078979, z: 32.232899, h: 0.000000, unlocked: false },
    { hash: -1428622127, x: 1085.307007, y: -2018.561035, z: 41.628899, h: 0.000000, unlocked: false },
    { hash: -353187150, x: -111.000000, y: 6464.000000, z: 32.000000, h: 0.000000, unlocked: false },
    { hash: -1666470363, x: -110.000000, y: 6462.000000, z: 32.000000, h: 0.000000, unlocked: false },
    { hash: 1145337974, x: 1274.000000, y: -1721.000000, z: 55.000000, h: 0.000000, unlocked: false },
    { hash: -1647153464, x: 1271.890015, y: -1707.569946, z: 53.790001, h: 0.000000, unlocked: false },
    { hash: -1647153464, x: 1270.770020, y: -1708.099976, z: 53.750000, h: 0.000000, unlocked: false },
    { hash: -2069558801, x: -127.500000, y: -1456.180054, z: 37.939999, h: 0.000000, unlocked: false },
    { hash: -190780785, x: 483.559998, y: -1316.079956, z: 32.180000, h: 0.000000, unlocked: false },
    { hash: -664582244, x: 483.000000, y: -1312.000000, z: 29.000000, h: 0.000000, unlocked: false },
    { hash: -1116041313, x: 128.000000, y: -1299.000000, z: 29.000000, h: 0.000000, unlocked: false },
    { hash: 668467214, x: 96.000000, y: -1285.000000, z: 29.000000, h: 0.000000, unlocked: false },
    { hash: -1306074314, x: 549.000000, y: -1773.000000, z: 34.000000, h: 0.000000, unlocked: false },
    { hash: -1375589668, x: 974.000000, y: -1839.000000, z: 36.000000, h: 0.000000, unlocked: false },
    { hash: -1375589668, x: 977.000000, y: -105.000000, z: 75.000000, h: 0.000000, unlocked: false },
    { hash: -1032171637, x: 1391.000000, y: 1163.000000, z: 114.000000, h: 0.000000, unlocked: false },
    { hash: -52575179, x: 1391.000000, y: 1161.000000, z: 114.000000, h: 0.000000, unlocked: false },
    { hash: 338220432, x: 1396.000000, y: 1143.000000, z: 115.000000, h: 0.000000, unlocked: false },
    { hash: 1075555701, x: 1396.000000, y: 1141.000000, z: 115.000000, h: 0.000000, unlocked: false },
    { hash: -1032171637, x: 1409.000000, y: 1146.000000, z: 114.000000, h: 0.000000, unlocked: false },
    { hash: -52575179, x: 1409.000000, y: 1148.000000, z: 114.000000, h: 0.000000, unlocked: false },
    { hash: -1032171637, x: 1408.000000, y: 1159.000000, z: 114.000000, h: 0.000000, unlocked: false },
    { hash: -52575179, x: 1408.000000, y: 1161.000000, z: 114.000000, h: 0.000000, unlocked: false },
    { hash: -1652821467, x: -1067.000000, y: -1666.000000, z: 5.000000, h: 0.000000, unlocked: false },
    { hash: 1013329911, x: -1065.000000, y: -1669.000000, z: 5.000000, h: 0.000000, unlocked: false },
    { hash: -502195954, x: -1104.660034, y: -1638.479980, z: 4.680000, h: 0.000000, unlocked: false },
    { hash: -2051651622, x: -31.719999, y: -1101.849976, z: 26.570000, h: 0.000000, unlocked: false },
    { hash: 464151082, x: 134.399994, y: -2204.100098, z: 7.520000, h: 0.000000, unlocked: false },
    { hash: -1081024910, x: 3628.000000, y: 3747.000000, z: 28.000000, h: 0.000000, unlocked: false },
    { hash: -1081024910, x: 3621.000000, y: 3752.000000, z: 28.000000, h: 0.000000, unlocked: false },
    { hash: 1099436502, x: -608.729980, y: -1610.319946, z: 27.160000, h: 0.000000, unlocked: false },
    { hash: -1627599682, x: -611.320007, y: -1610.089966, z: 27.160000, h: 0.000000, unlocked: false },
    { hash: 1099436502, x: -592.940002, y: -1631.579956, z: 27.160000, h: 0.000000, unlocked: false },
    { hash: -1627599682, x: -592.710022, y: -1628.989990, z: 27.160000, h: 0.000000, unlocked: false },
    { hash: 1173348778, x: 1991.000000, y: 3053.000000, z: 47.000000, h: 0.000000, unlocked: false },
    { hash: 479144380, x: 1988.353027, y: 3054.410889, z: 47.320400, h: 0.000000, unlocked: false },
    { hash: -2045308299, x: -700.169983, y: 47.310001, z: 44.299999, h: 0.000000, unlocked: false },
    { hash: -42303174, x: -697.940002, y: 48.349998, z: 44.299999, h: 0.000000, unlocked: false },
    { hash: -710818483, x: 241.357407, y: 361.048798, z: 105.896301, h: 0.000000, unlocked: false },
    { hash: 913904359, x: -689.109985, y: 506.970001, z: 110.639999, h: 0.000000, unlocked: false },
    { hash: -495720969, x: -1055.959961, y: -236.429993, z: 44.169998, h: 0.000000, unlocked: false },
    { hash: 668467214, x: 29.000000, y: 3661.000000, z: 41.000000, h: 0.000000, unlocked: false },
    { hash: 1342464176, x: 32.000000, y: 3667.000000, z: 41.000000, h: 0.000000, unlocked: false },
    { hash: 1436076651, x: 87.000000, y: -1959.000000, z: 21.000000, h: 0.000000, unlocked: false },
    { hash: 1413743677, x: 0.000000, y: -1823.000000, z: 30.000000, h: 0.000000, unlocked: false },
    { hash: -815851463, x: 23.340000, y: -1897.599976, z: 23.049999, h: 0.000000, unlocked: false },
    { hash: -684382235, x: 524.200012, y: 3081.139893, z: 41.160000, h: 0.000000, unlocked: false },
    { hash: 1378348636, x: -1910.579956, y: -576.010010, z: 19.250000, h: 0.000000, unlocked: false },
    { hash: -2076287065, x: -720.390015, y: 256.859985, z: 80.290001, h: 0.000000, unlocked: false },
    { hash: -374527357, x: -718.419983, y: 257.790009, z: 80.290001, h: 0.000000, unlocked: false },
    { hash: -1517873911, x: 106.379997, y: -742.700012, z: 46.180000, h: 0.000000, unlocked: false },
    { hash: -90456267, x: 105.760002, y: -746.650024, z: 46.180000, h: 0.000000, unlocked: false },
    { hash: -1207991715, x: -2343.530029, y: 3265.370117, z: 32.959999, h: 0.000000, unlocked: false },
    { hash: -1207991715, x: -2342.229980, y: 3267.620117, z: 32.959999, h: 0.000000, unlocked: false },
    { hash: -566611162, x: -1041.932983, y: -2748.166992, z: 22.030800, h: 0.000000, unlocked: false },
    { hash: -551602996, x: -1044.840942, y: -2746.489014, z: 22.030800, h: 0.000000, unlocked: false },
    { hash: -1033001619, x: -1042.569946, y: -240.600006, z: 38.110001, h: 0.000000, unlocked: false },
    { hash: 1104171198, x: -1045.119995, y: -232.003998, z: 39.437901, h: 0.000000, unlocked: false },
    { hash: -1425071302, x: -1046.515991, y: -229.358093, z: 39.437901, h: 0.000000, unlocked: false },
    { hash: -1679881977, x: -1083.619995, y: -260.416687, z: 38.186699, h: 0.000000, unlocked: false },
    { hash: -1045015371, x: -1080.973999, y: -259.020386, z: 38.186699, h: 0.000000, unlocked: false },
    { hash: -1023447729, x: 1385.258057, y: -2079.948975, z: 52.763802, h: 0.000000, unlocked: false },
    { hash: 73386408, x: 1656.569946, y: 4849.660156, z: 42.349998, h: 0.000000, unlocked: false },
    { hash: -1152174184, x: 1656.250000, y: 4852.240234, z: 42.349998, h: 0.000000, unlocked: false },
    { hash: -1184516519, x: -1051.401978, y: -474.684692, z: 36.619900, h: 0.000000, unlocked: false },
    { hash: -1184516519, x: -1049.285034, y: -476.637604, z: 36.758400, h: 0.000000, unlocked: false },
    { hash: 1230099731, x: -1210.957031, y: -580.876526, z: 27.237301, h: 0.000000, unlocked: false },
    { hash: 1230099731, x: -1212.444946, y: -578.440125, z: 27.237301, h: 0.000000, unlocked: false },
    { hash: 993120320, x: -565.171204, y: 276.625885, z: 83.286301, h: 0.000000, unlocked: false },
    { hash: 993120320, x: -561.286316, y: 293.504303, z: 87.777100, h: 0.000000, unlocked: false },
    { hash: 1425919976, x: -631.960022, y: -236.330002, z: 38.209999, h: 0.000000, unlocked: false },
    { hash: 9467943, x: -630.429993, y: -238.440002, z: 38.209999, h: 0.000000, unlocked: false },
    { hash: 1335309163, x: 258.320007, y: 203.839996, z: 106.430000, h: 0.000000, unlocked: false },
    { hash: 1335309163, x: 260.760010, y: 202.949997, z: 106.430000, h: 0.000000, unlocked: false },
    { hash: -1743257725, x: 231.619995, y: 216.229996, z: 106.400002, h: 0.000000, unlocked: false },
    { hash: -1743257725, x: 232.720001, y: 213.880005, z: 106.400002, h: 0.000000, unlocked: false },
    { hash: 1956494919, x: 266.359985, y: 217.570007, z: 110.430000, h: 0.000000, unlocked: false },
    { hash: -222270721, x: 256.309998, y: 220.660004, z: 106.430000, h: 0.000000, unlocked: false },
    { hash: -1501157055, x: -442.660004, y: 6015.222168, z: 31.866301, h: 0.000000, unlocked: false },
    { hash: -1501157055, x: -444.498505, y: 6017.060059, z: 31.866301, h: 0.000000, unlocked: false },
    { hash: -1765048490, x: 1855.685059, y: 3683.929932, z: 34.592800, h: 0.000000, unlocked: false },
    { hash: -403433025, x: -1223.349976, y: -172.410004, z: 39.980000, h: 0.000000, unlocked: false },
    { hash: 1308911070, x: -1220.930054, y: -173.679993, z: 39.980000, h: 0.000000, unlocked: false },
    { hash: -403433025, x: -1211.989990, y: -190.570007, z: 39.980000, h: 0.000000, unlocked: false },
    { hash: 1308911070, x: -1213.260010, y: -192.979996, z: 39.980000, h: 0.000000, unlocked: false },
    { hash: -403433025, x: -1217.770020, y: -201.539993, z: 39.980000, h: 0.000000, unlocked: false },
    { hash: 1308911070, x: -1219.040039, y: -203.949997, z: 39.980000, h: 0.000000, unlocked: false },
    { hash: -582278602, x: 2514.320068, y: -317.339996, z: 93.320000, h: 0.000000, unlocked: false },
    { hash: 1343686600, x: 2512.419922, y: -319.260010, z: 93.320000, h: 0.000000, unlocked: false },
    { hash: -26664553, x: 2333.229980, y: 2574.969971, z: 47.029999, h: 0.000000, unlocked: false },
    { hash: 914592203, x: 2329.649902, y: 2576.639893, z: 47.029999, h: 0.000000, unlocked: false },
    { hash: 97297972, x: 16.127899, y: -1114.604980, z: 29.946899, h: 0.000000, unlocked: false },
    { hash: -8873588, x: 18.572001, y: -1115.494995, z: 29.946899, h: 0.000000, unlocked: false },
    { hash: 452874391, x: 6.817900, y: -1098.208984, z: 29.946899, h: 0.000000, unlocked: false },
    { hash: 97297972, x: 1698.176025, y: 3751.506104, z: 34.855301, h: 0.000000, unlocked: false },
    { hash: -8873588, x: 1699.937012, y: 3753.419922, z: 34.855301, h: 0.000000, unlocked: false },
    { hash: 97297972, x: 244.727402, y: -44.079102, z: 70.910004, h: 0.000000, unlocked: false },
    { hash: -8873588, x: 243.837906, y: -46.523201, z: 70.910004, h: 0.000000, unlocked: false },
    { hash: 97297972, x: 845.362427, y: -1024.538940, z: 28.344801, h: 0.000000, unlocked: false },
    { hash: -8873588, x: 842.768372, y: -1024.538940, z: 23.344801, h: 0.000000, unlocked: false },
    { hash: 97297972, x: -326.112213, y: 6075.270020, z: 31.604700, h: 0.000000, unlocked: false },
    { hash: -8873588, x: -324.273010, y: 6077.108887, z: 31.604700, h: 0.000000, unlocked: false },
    { hash: 97297972, x: -665.242371, y: -944.325623, z: 21.979200, h: 0.000000, unlocked: false },
    { hash: -8873588, x: -662.641418, y: -944.325623, z: 21.979200, h: 0.000000, unlocked: false },
    { hash: 97297972, x: -1313.826050, y: -389.125885, z: 36.845699, h: 0.000000, unlocked: false },
    { hash: -8873588, x: -1314.464966, y: -391.647186, z: 36.845699, h: 0.000000, unlocked: false },
    { hash: 97297972, x: -1114.009033, y: 2689.770020, z: 18.704100, h: 0.000000, unlocked: false },
    { hash: -8873588, x: -1112.071045, y: 2691.504883, z: 18.704100, h: 0.000000, unlocked: false },
    { hash: 97297972, x: -3164.844971, y: 1081.391968, z: 20.988701, h: 0.000000, unlocked: false },
    { hash: -8873588, x: -3163.812012, y: 1083.777954, z: 20.988701, h: 0.000000, unlocked: false },
    { hash: 97297972, x: 2570.905029, y: 303.355591, z: 108.884804, h: 0.000000, unlocked: false },
    { hash: -8873588, x: 2568.303955, y: 303.355591, z: 108.884804, h: 0.000000, unlocked: false },
    { hash: 97297972, x: 813.177917, y: -2148.270020, z: 29.768900, h: 0.000000, unlocked: false },
    { hash: -8873588, x: 810.576904, y: -2148.270020, z: 29.768900, h: 0.000000, unlocked: false },
    { hash: 452874391, x: 827.534180, y: -2160.492920, z: 29.768801, h: 0.000000, unlocked: false },
    { hash: 546378757, x: -1107.010010, y: 289.380005, z: 64.760002, h: 0.000000, unlocked: false },
    { hash: -1249591818, x: -1101.619995, y: 290.359985, z: 64.760002, h: 0.000000, unlocked: false },
    { hash: 546378757, x: -1138.640015, y: 300.820007, z: 67.180000, h: 0.000000, unlocked: false },
    { hash: -1249591818, x: -1137.050049, y: 295.589996, z: 67.180000, h: 0.000000, unlocked: false },
    { hash: 1878909644, x: -2053.159912, y: 3239.489990, z: 30.500000, h: 0.000000, unlocked: false },
    { hash: 1709395619, x: -2054.389893, y: 3237.229980, z: 30.500000, h: 0.000000, unlocked: false },
    { hash: -1184592117, x: -108.910004, y: 6469.109863, z: 31.910000, h: 0.000000, unlocked: false },
    { hash: -1156020871, x: -182.910004, y: 6168.370117, z: 32.139999, h: 0.000000, unlocked: false },
    { hash: 2059227086, x: -39.130001, y: -1108.219971, z: 26.719999, h: 0.000000, unlocked: false },
    { hash: 1417577297, x: -37.330002, y: -1108.869995, z: 26.719999, h: 0.000000, unlocked: false },
    { hash: 2059227086, x: -59.889999, y: -1092.949951, z: 26.879999, h: 0.000000, unlocked: false },
    { hash: 1417577297, x: -60.549999, y: -1094.750000, z: 26.889999, h: 0.000000, unlocked: false },
    { hash: -1428622127, x: 1943.729980, y: 3803.629883, z: 32.310001, h: 0.000000, unlocked: false },
    { hash: 73386408, x: 316.390015, y: -276.489990, z: 54.520000, h: 0.000000, unlocked: false },
    { hash: -1152174184, x: 313.959991, y: -275.600006, z: 54.520000, h: 0.000000, unlocked: false },
    { hash: 73386408, x: -2965.709961, y: 484.220001, z: 16.049999, h: 0.000000, unlocked: false },
    { hash: -1152174184, x: -2965.820068, y: 481.630005, z: 16.049999, h: 0.000000, unlocked: false },
    { hash: 73386408, x: -348.809998, y: -47.259998, z: 49.389999, h: 0.000000, unlocked: false },
    { hash: -1152174184, x: -351.260010, y: -46.410000, z: 49.389999, h: 0.000000, unlocked: false },
    { hash: 1755793225, x: 962.099976, y: -2183.830078, z: 31.059999, h: 0.000000, unlocked: false },
    { hash: 239858268, x: 961.789978, y: -2187.080078, z: 31.059999, h: 0.000000, unlocked: false },
    { hash: 1742849246, x: 2508.429932, y: -336.630005, z: 115.760002, h: 0.000000, unlocked: false },
    { hash: -44475594, x: -2255.189941, y: 322.260010, z: 184.929993, h: 0.000000, unlocked: false },
    { hash: 1183182250, x: -2254.060059, y: 319.700012, z: 184.929993, h: 0.000000, unlocked: false },
    { hash: -44475594, x: -2301.129883, y: 336.910004, z: 184.929993, h: 0.000000, unlocked: false },
    { hash: 1183182250, x: -2298.570068, y: 338.049988, z: 184.929993, h: 0.000000, unlocked: false },
    { hash: -44475594, x: -2222.320068, y: 305.859985, z: 184.929993, h: 0.000000, unlocked: false },
    { hash: 1183182250, x: -2221.189941, y: 303.299988, z: 184.929993, h: 0.000000, unlocked: false },
    { hash: -44475594, x: -2280.600098, y: 265.429993, z: 184.929993, h: 0.000000, unlocked: false },
    { hash: 1183182250, x: -2278.040039, y: 266.570007, z: 184.929993, h: 0.000000, unlocked: false },
    { hash: -982531572, x: 778.309998, y: -1867.489990, z: 30.660000, h: 0.000000, unlocked: false },
    { hash: -1049302886, x: -721.349976, y: 91.010002, z: 56.680000, h: 0.000000, unlocked: false },
    { hash: 1653418708, x: -728.840027, y: 88.639999, z: 56.680000, h: 0.000000, unlocked: false },
    { hash: 650392296, x: -2287.620117, y: 363.899994, z: 174.929993, h: 0.000000, unlocked: false },
    { hash: -267139712, x: -2289.780029, y: 362.910004, z: 174.929993, h: 0.000000, unlocked: false },
    { hash: 650392296, x: -2289.860107, y: 362.880005, z: 174.929993, h: 0.000000, unlocked: false },
    { hash: -267139712, x: -2292.010010, y: 361.890015, z: 174.929993, h: 0.000000, unlocked: false },
    { hash: 1127922797, x: 1803.939941, y: 3929.010010, z: 33.720001, h: 0.000000, unlocked: false },
    { hash: -1468417022, x: 962.908386, y: -2105.813965, z: 34.643200, h: 0.000000, unlocked: false },
];
function pushDebug(message) {
    if (debug)
        mp.gui.chat.push(message);
}

},{"../utilities/enums":14}],7:[function(require,module,exports){
"use strict";
require('./sandbox/sandbox');
require('./tooltip/TooltipHandler');
require('./clicktowalk/ClickToWalkHandler');
require('./carry/carryscript');
require('./queue/queue');
require('./doorunlocker/doorunlocker');
require('./twofactor/twofactor');
require('./recoil/recoil');

},{"./carry/carryscript":4,"./clicktowalk/ClickToWalkHandler":5,"./doorunlocker/doorunlocker":6,"./queue/queue":8,"./recoil/recoil":9,"./sandbox/sandbox":10,"./tooltip/TooltipHandler":11,"./twofactor/twofactor":12}],8:[function(require,module,exports){
"use strict";
var debugMode = false;
var queueData = undefined;
mp.events.add('OnStreamQueueData', function (jsonstring) {
    queueData = JSON.parse(jsonstring);
});
mp.events.add('OnFinishedLogin', function () {
    queueData = undefined;
});
mp.events.add('render', function () {
    if (queueData == undefined || queueData == null)
        return;
    if (debugMode) {
        var time = '';
        if (queueData.MaxLoginTime != 0) {
            time = (queueData.CurrentTime | 0) + " / " + (queueData.MaxLoginTime | 0);
        }
        mp.game.graphics.drawText("~r~" + mp.gui.cursor.position[0] + " | " + mp.gui.cursor.position[1] + " ", [0.5, 0.04], {
            font: 0,
            centre: false,
            color: [255, 255, 255, 235],
            scale: [0.35, 0.35],
            outline: false,
        });
        mp.game.graphics.drawText("\u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0432 \u043E\u0447\u0435\u0440\u0435\u0434\u0438 ~r~" + queueData.Position + "~w~ | \u0442\u0435\u043F\u0435\u0440\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435: ~r~" + queueData.CanLogin + "~w~ | \u041E\u0447\u0435\u0440\u0435\u0434\u044C: ~r~" + queueData.QueueActive + "~w~ | \u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C \u0432\u0440\u0435\u043C\u0435\u043D\u0438: ~r~" + time, [0.5, 0.1], {
            font: 0,
            centre: false,
            color: [255, 255, 255, 255],
            scale: [0.45, 0.45],
            outline: false,
        });
    }
    else {
        if (queueData.QueueActive) {
            var box1X1 = 485;
            var box1Y1 = 55;
            var box1X2 = 1434;
            var box1Y2 = 169;
            var box2X1 = 584;
            var box2Y1 = 885;
            var box2X2 = 1330;
            var box2Y2 = 942;
            var box1CenterX = (box1X1 + box1X2) / 2.0;
            var box1CenterY = (box1Y1 + box1Y2) / 2.0;
            var box1Width = box1X2 - box1X1;
            var box1Height = box1Y2 - box1Y1;
            var box2CenterX = (box2X1 + box2X2) / 2.0;
            var box2CenterY = (box2Y1 + box2Y2) / 2.0;
            var box2Width = box2X2 - box2X1;
            var box2Height = box2Y2 - box2Y1;
            mp.game.graphics.drawRect(box1CenterX / 1920.0, box1CenterY / 1080.0, box1Width / 1920.0, box1Height / 1080.0, 0, 0, 0, 200);
            mp.game.graphics.drawRect(box2CenterX / 1914.0, box2CenterY / 1051.0, box2Width / 1914.0, box2Height / 1051.0, 0, 0, 0, 200);
            var offset1y = 0.02;
            mp.game.graphics.drawText("\u0412 \u0434\u0430\u043D\u043D\u044B\u0439 \u043C\u043E\u043C\u0435\u043D\u0442 \u043D\u0430 \u0441\u0438\u0441\u0442\u0435\u043C\u0443 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438 \u0438\u0434\u0435\u0442 \u0431\u043E\u043B\u044C\u0448\u0430\u044F \u043D\u0430\u0433\u0440\u0443\u0437\u043A\u0430.", [0.5, 0.04 + offset1y], {
                font: 0,
                centre: false,
                color: [255, 255, 255, 235],
                scale: [0.35, 0.35],
                outline: false,
            });
            mp.game.graphics.drawText("\u041C\u044B \u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E \u0432\u043A\u043B\u044E\u0447\u0438\u043B\u0438 \u0441\u0438\u0441\u0442\u0435\u043C\u0443 \u043E\u0447\u0435\u0440\u0435\u0434\u0438 \u0434\u043B\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u0434\u043B\u044F \u0433\u0440\u0430\u043C\u043E\u0442\u043D\u043E\u0433\u043E \u0440\u0430\u0441\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u044F \u043D\u0430\u0433\u0440\u0443\u0437\u043A\u0438.", [0.5, 0.06 + offset1y], {
                font: 0,
                centre: false,
                color: [255, 255, 255, 235],
                scale: [0.35, 0.35],
                outline: false,
            });
            mp.game.graphics.drawText("\u041A\u0430\u043A \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u044B \u043E\u043A\u0430\u0436\u0435\u0442\u0435\u0441\u044C \u043F\u0435\u0440\u0432\u044B\u043C \u0441\u0440\u0435\u0434\u0438 80 \u043D\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u0438\u0433\u0440\u043E\u043A\u043E\u0432, \u043C\u044B \u0434\u0430\u0434\u0438\u043C \u0432\u0430\u043C \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F.", [0.5, 0.08 + offset1y], {
                font: 0,
                centre: false,
                color: [255, 255, 255, 235],
                scale: [0.35, 0.35],
                outline: false,
            });
            mp.game.graphics.drawText("\u0415\u0441\u043B\u0438 \u0432\u044B \u043D\u0435 \u0431\u0443\u0434\u0435\u0442\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u044B\u0432\u0430\u0442\u044C\u0441\u044F \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0434\u043E\u043B\u0433\u043E, \u0442\u043E \u0441\u0435\u0440\u0432\u0435\u0440 \u043F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442 \u0432\u0430\u0441 \u0432 \u043A\u043E\u043D\u0435\u0446 \u043E\u0447\u0435\u0440\u0435\u0434\u0438.", [0.5, 0.10 + offset1y], {
                font: 0,
                centre: false,
                color: [255, 255, 255, 235],
                scale: [0.35, 0.35],
                outline: false,
            });
            if (queueData.Position <= queueData.MaxLoginSlots) {
                var timeLeft = ((queueData.MaxLoginTime - queueData.CurrentTime) / 1000);
                if (timeLeft < 0)
                    timeLeft = 0;
                var timeLeftStr = timeLeft.toFixed(0);
                mp.game.graphics.drawText("\u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0432 \u043E\u0447\u0435\u0440\u0435\u0434\u0438: ~g~" + queueData.Position + "~w~, \u0442\u0435\u043F\u0435\u0440\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 ~g~\u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u044B\u0432\u0430\u0442\u044C\u0441\u044F~w~. \u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C \u0432\u0440\u0435\u043C\u0435\u043D\u0438: ~o~" + timeLeftStr + "~w~ \u0441\u0435\u043A\u0443\u043D\u0434", [0.5, 0.85], {
                    font: 0,
                    centre: false,
                    color: [255, 255, 255, 255],
                    scale: [0.45, 0.45],
                    outline: false,
                });
            }
            else {
                mp.game.graphics.drawText("\u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0432 \u043E\u0447\u0435\u0440\u0435\u0434\u0438: ~r~" + queueData.Position + "~w~, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u0434\u043E\u0436\u0434\u0438\u0442\u0435...", [0.5, 0.85], {
                    font: 0,
                    centre: false,
                    color: [255, 255, 255, 255],
                    scale: [0.45, 0.45],
                    outline: false,
                });
            }
        }
    }
});

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums = require("../utilities/enums");
var ev = require("../utilities/eventswrapper");
var util = require("../utilities/globals");
var recoilEnabled = true;
var debugMode = false;
var Recoiling = false;
var recoilResetMS = 400;
var modifier = 1;
var drawColor = [255, 0, 0, 170];
mp.keys.bind(enums.keyCode.NUMPAD_5, false, function () {
    drawColor = [drawColor[2], drawColor[0], drawColor[1]];
});
mp.keys.bind(enums.keyCode.NUMPAD_6, false, function () {
    if (debugMode) {
        recoilEnabled = !recoilEnabled;
    }
});
mp.events.add('SetRecoilModifier', function (val) {
    modifier = val;
});
var RecoilManager = (function () {
    function RecoilManager() {
    }
    RecoilManager.recoilTick = function (weapon) {
        if (!recoilEnabled)
            return;
        if (mp.players.local.isDoingDriveby())
            return;
        var delta = this.getDeltaShot();
        if (delta < recoilResetMS) {
            this.shotCount++;
        }
        else {
            this.lastPattern = Date.now();
            this.shotCount = 1;
        }
        this.lastShot = Date.now();
        var offsets = this.getOffsets(weapon, this.getDeltaPattern(), this.shotCount);
        Recoiling = offsets[0] !== 0 || offsets[1] !== 0;
        this.applyOffsets(offsets);
    };
    RecoilManager.getOffsets = function (_weapon, _delta, _shotCount) {
        var retOffsets = [0, 0];
        var deltaNormalized;
        var wep = mp.game.invoke("0x0A6DB4965674D243", mp.players.local.handle);
        var clipSize = mp.game.invoke('0xA38DCFFCEA8962FA', mp.players.local.handle, wep, 1);
        var group = mp.game.weapon.getWeapontypeGroup(wep);
        if (clipSize <= 0) {
            deltaNormalized = _shotCount > clipSize ? 1 : _shotCount / clipSize;
        }
        else {
            deltaNormalized = _delta >= 4000 ? 1 : _delta / 4000;
        }
        if (deltaNormalized < 0.08) {
            retOffsets[0] = 0;
            retOffsets[1] = 0;
        }
        else {
            retOffsets[0] = 0.45 * Math.random() + 0.15;
            retOffsets[1] = Math.random() * 1.4 - 0.7;
            retOffsets[0] *= deltaNormalized;
            retOffsets[1] *= deltaNormalized;
        }
        if (group == 2685387236) {
            retOffsets[0] *= 0;
            retOffsets[1] *= 0;
        }
        if (group == 416676503) {
            retOffsets[0] *= 0.19;
            retOffsets[1] *= 0.29;
        }
        if (group == 3337201093) {
            retOffsets[0] *= 0.2;
            retOffsets[1] *= 0.27;
        }
        if (group == 860033945) {
            retOffsets[0] *= 0.5;
            retOffsets[1] *= 0.2;
        }
        if (group == 970310034) {
            retOffsets[0] *= 0.45;
            retOffsets[1] *= 0.25;
        }
        if (group == 1159398588) {
            retOffsets[0] *= 0.7;
            retOffsets[1] *= 0.35;
        }
        if (group == 3082541095) {
            retOffsets[0] *= 0.8;
            retOffsets[1] *= 0.25;
        }
        if (group == 2725924767) {
            retOffsets[0] *= 0;
            retOffsets[1] *= 0;
        }
        if (group == 1548507267) {
            retOffsets[0] *= 0;
            retOffsets[1] *= 0;
        }
        if (group == 4257178988) {
            retOffsets[0] *= 0;
            retOffsets[1] *= 0;
        }
        retOffsets[0] *= modifier;
        retOffsets[1] *= modifier;
        return retOffsets;
    };
    RecoilManager.applyOffsets = function (offsets) {
        if (offsets.length < 2)
            return;
        var rot = mp.game.cam.getGameplayCamRot(2);
        var pitch = rot.x;
        var yaw = rot.y;
        var pitchOffset = offsets[0];
        var yawOffset = offsets[1];
        if (util.IsFollowCamFirstPerson()) {
            pitchOffset *= 0.1;
            yawOffset *= 0.05;
        }
        if (pitchOffset !== 0) {
            mp.game.cam.setGameplayCamRelativePitch(pitch + pitchOffset, 1);
        }
        if (yawOffset !== 0) {
            mp.game.cam.setGameplayCamRelativeHeading(yaw + yawOffset);
        }
    };
    RecoilManager.getConsecutiveShootsCount = function () {
        return this.shotCount;
    };
    RecoilManager.getDeltaShot = function () {
        if (this.lastShot == -1)
            return Number.MAX_VALUE;
        return Date.now() - this.lastShot;
    };
    RecoilManager.getDeltaPattern = function () {
        if (this.lastPattern == -1)
            return 0;
        return Date.now() - this.lastPattern;
    };
    RecoilManager.lastShot = -1;
    RecoilManager.lastPattern = -1;
    RecoilManager.shotCount = 0;
    return RecoilManager;
}());
var debugHitBoxHandler = (function () {
    function debugHitBoxHandler() {
    }
    debugHitBoxHandler.pushVector = function (vector) {
        this.vectors.push({ v: vector, col: drawColor });
        if (this.vectors.length > 200)
            this.vectors.shift();
    };
    debugHitBoxHandler.debugRender = function () {
        var squareSize = 0.06;
        this.vectors.forEach(function (x) {
            mp.game.graphics.drawBox(x.v.x - squareSize / 2, x.v.y - squareSize / 2, x.v.z - squareSize / 2, x.v.x + squareSize / 2, x.v.y + squareSize / 2, x.v.z + squareSize / 2, x.col[0], x.col[1], x.col[2], 170);
        });
        if (RecoilManager.getDeltaShot() < recoilResetMS && Recoiling) {
            drawText('RECOLING!', 'green', [0.5, 0.73]);
        }
    };
    debugHitBoxHandler.vectors = [];
    return debugHitBoxHandler;
}());
ev.eventsHandler.addEventListener(ev.event.render, function (_nametags) {
    if (debugMode)
        debugHitBoxHandler.debugRender();
});
ev.eventsHandler.addEventListener(ev.event.playerWeaponShot, function (targetPosition, _entityHit) {
    debugHitBoxHandler.pushVector(targetPosition);
    RecoilManager.recoilTick(mp.players.local.weapon);
});
function drawText(text, color, twoDimPos) {
    var drawColor = [255, 255, 255, 255];
    if (color === 'red')
        drawColor = [255, 0, 0, 255];
    else if (color === 'green')
        drawColor = [0, 255, 0, 255];
    else if (color === 'blue')
        drawColor = [0, 0, 255, 255];
    var pos = [0.5, 0.5];
    if (twoDimPos && Array.isArray(twoDimPos) && twoDimPos.length == 2)
        pos = twoDimPos;
    mp.game.graphics.drawText("" + JSON.stringify(text), pos, {
        font: 4,
        centre: true,
        color: drawColor,
        scale: [0.5, 0.5],
        outline: true,
    });
}
function getWeaponGroup(wep) {
    var group = mp.game.weapon.getWeapontypeGroup(wep);
    if (group == 2685387236)
        return 'Melee';
    else if (group == 416676503)
        return 'HG';
    else if (group == 3337201093)
        return 'Sub';
    else if (group == 860033945)
        return 'SG';
    else if (group == 970310034)
        return 'AR';
    else if (group == 1159398588)
        return 'LMG';
    else if (group == 3082541095)
        return 'Sniper';
    else if (group == 2725924767)
        return 'Heavy';
    else if (group == 1548507267)
        return 'Throw';
    else if (group == 4257178988)
        return 'Misc';
    else
        return '';
}

},{"../utilities/enums":14,"../utilities/eventswrapper":15,"../utilities/globals":16}],10:[function(require,module,exports){
(function (Buffer){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var raycast = require("../utilities/raycaster");
var ev = require("../utilities/eventswrapper");
var util = require("../utilities/globals");
var enums = require("../utilities/enums");
var MAX_DRAW_DIST = 100;
var sandboxEnabled = false;
var browser = undefined;
mp.events.add('changeSandBoxMode', function () {
    sandboxEnabled = !sandboxEnabled;
    mp.gui.chat.push('You have turned SandBoxMode to: ' + sandboxEnabled);
});
ev.eventsHandler.addEventListener(ev.event.clientRightClick, function (x, y) {
    if (!sandboxEnabled)
        return;
    var entity = raycast.screenCoordsToEntity(x, y, raycast.IntersectOptions.Everything, 0);
    if (entity === undefined || browser !== undefined)
        return;
    if (typeof entity == 'number') {
        mp.gui.chat.push('Clientside entity: ' + JSON.stringify(entity));
        var modelHash = mp.game.invoke('0x9F47B058362C84B5', entity);
        var position = raycast.screenCoordsToWorldCoords(x, y, raycast.IntersectOptions.Objects, mp.players.local.handle);
        mp.gui.chat.push("Object hashcode: " + JSON.stringify(modelHash) + " | Position: " + JSON.stringify(position));
        return;
    }
    mp.gui.chat.push('Creating');
    var data = {};
    data.rage = entity;
    data.h = {};
    data.h.id = entity.id;
    data.h.remoteId = entity.remoteId;
    data.h.type = entity.type;
    data.h.handle = entity.handle;
    data.h.position = entity.position;
    data.h.dimension = entity.dimension;
    data.h.model = entity.model;
    data.h.getAlpha = entity.getAlpha();
    data.h.getAttachedTo = entity.getAttachedTo();
    data.h.getCollisionNormalOfLastHitFo = entity.getCollisionNormalOfLastHitFor();
    data.h.getForwardVector = entity.getForwardVector();
    data.h.getForwardX = entity.getForwardX();
    data.h.getForwardY = entity.getForwardY();
    data.h.getHeading = entity.getHeading();
    data.h.getHealth = entity.getHealth();
    data.h.getHeightAboveGround = entity.getHeightAboveGround();
    data.h.getLastMaterialHitBy = entity.getLastMaterialHitBy();
    data.h.getLodDist = entity.getLodDist();
    data.h.getMaxHealth = entity.getMaxHealth();
    data.h.getModel = entity.getModel();
    data.h.getNearestPlayerTo = entity.getNearestPlayerTo();
    data.h.getObjectIndexFromIndex = entity.getObjectIndexFromIndex();
    data.h.getPedIndexFromIndex = entity.getPedIndexFromIndex();
    data.h.getPhysicsHeading = entity.getPhysicsHeading();
    data.h.getPitch = entity.getPitch();
    data.h.getPopulationType = entity.getPopulationType();
    data.h.getRoll = entity.getRoll();
    data.h.getRotationVelocity = entity.getRotationVelocity();
    data.h.getSpeed = entity.getSpeed();
    data.h.getSubmergedLevel = entity.getSubmergedLevel();
    data.h.getType = entity.getType();
    data.h.getUprightValue = entity.getUprightValue();
    data.h.getVehicleIndexFromIndex = entity.getVehicleIndexFromIndex();
    data.h.getVelocity = entity.getVelocity();
    switch (entity.type) {
        case 'player':
            var entityPlaya = mp.players.atRemoteId(entity.remoteId);
            data.h.armour = entityPlaya.armour;
            data.h.eyeColour = entityPlaya.eyeColour;
            data.h.hairColour = entityPlaya.hairColour;
            data.h.hairHighlightColour = entityPlaya.hairHighlightColour;
            data.h.heading = entityPlaya.heading;
            data.h.health = entityPlaya.health;
            data.h.name = entityPlaya.name;
            data.h.p2pEnabled = entityPlaya.p2pEnabled;
            data.h.p2pConnected = entityPlaya.p2pConnected;
            data.h.voiceAutoVolume = entityPlaya.voiceAutoVolume;
            data.h.voiceVolume = entityPlaya.voiceVolume;
            data.h.voice3d = entityPlaya.voice3d;
            data.h.weapon = entityPlaya.weapon;
            data.h.action = entityPlaya.action;
            data.h.aimTarget = entityPlaya.aimTarget;
            data.h.ip = entityPlaya.ip;
            data.h.isAiming = entityPlaya.isAiming;
            data.h.isClimbing = entityPlaya.isClimbing;
            data.h.isEnteringVehicle = entityPlaya.isEnteringVehicle;
            data.h.isInCover = entityPlaya.isInCover;
            data.h.isJumping = entityPlaya.isJumping;
            data.h.isLeavingVehicle = entityPlaya.isLeavingVehicle;
            data.h.isTypingInTextChat = entityPlaya.isTypingInTextChat;
            data.h.isVoiceActive = entityPlaya.isVoiceActive;
            data.h.ping = entityPlaya.ping;
            data.h.vehicle = entityPlaya.vehicle;
            data.h.getAccuracy = entityPlaya.getAccuracy();
            data.h.getAlertness = entityPlaya.getAlertness();
            data.h.getArmour = entityPlaya.getArmour();
            data.h.getCauseOfDeath = entityPlaya.getCauseOfDeath();
            data.h.getCombatMovement = entityPlaya.getCombatMovement();
            data.h.getCombatRange = entityPlaya.getCombatRange();
            data.h.getDecorationsState = entityPlaya.getDecorationsState();
            data.h.getDesiredMoveBlendRatio = entityPlaya.getDesiredMoveBlendRatio();
            data.h.getEnveffScale = entityPlaya.getEnveffScale();
            data.h.getGroupIndex = entityPlaya.getGroupIndex();
            data.h.getJackTarget = entityPlaya.getJackTarget();
            data.h.getMaxHealth = entityPlaya.getMaxHealth();
            data.h.getMeleeTargetFor = entityPlaya.getMeleeTargetFor();
            data.h.getMoney = entityPlaya.getMoney();
            data.h.getMount = entityPlaya.getMount();
            data.h.getParachuteLandingType = entityPlaya.getParachuteLandingType();
            data.h.getParachuteState = entityPlaya.getParachuteState();
            data.h.getPhoneGestureAnimCurrentTime = entityPlaya.getPhoneGestureAnimCurrentTime();
            data.h.getPhoneGestureAnimTotalTime = entityPlaya.getPhoneGestureAnimTotalTime();
            data.h.getPlayerIsFollowing = entityPlaya.getPlayerIsFollowing();
            data.h.getRelationshipGroupDefaultHash = entityPlaya.getRelationshipGroupDefaultHash();
            data.h.getRelationshipGroupHash = entityPlaya.getRelationshipGroupHash();
            data.h.getSeatIsTryingToEnter = entityPlaya.getSeatIsTryingToEnter();
            data.h.getSequenceProgress = entityPlaya.getSequenceProgress();
            data.h.getsJacker = entityPlaya.getsJacker();
            data.h.getSourceOfDeath = entityPlaya.getSourceOfDeath();
            data.h.getTimeOfDeath = entityPlaya.getTimeOfDeath();
            data.h.getType = entityPlaya.getType();
            data.h.getVehicleIsTryingToEnter = entityPlaya.getVehicleIsTryingToEnter();
            data.h.getVehicleIsUsing = entityPlaya.getVehicleIsUsing();
            data.h.isActiveInScenario = entityPlaya.isActiveInScenario();
            data.h.isAimingFromCover = entityPlaya.isAimingFromCover();
            data.h.isBeingJacked = entityPlaya.isBeingJacked();
            data.h.isBeingStealthKilled = entityPlaya.isBeingStealthKilled();
            data.h.isConversationDead = entityPlaya.isConversationDead();
            data.h.isCuffed = entityPlaya.isCuffed();
            data.h.isDead = entityPlaya.isDead();
            data.h.isDiving = entityPlaya.isDiving();
            data.h.isDoingDriveby = entityPlaya.isDoingDriveby();
            data.h.isDrivebyTaskUnderneathDrivingTask = entityPlaya.isDrivebyTaskUnderneathDrivingTask();
            data.h.isDucking = entityPlaya.isDucking();
            data.h.isFalling = entityPlaya.isFalling();
            data.h.isFatallyInjured = entityPlaya.isFatallyInjured();
            data.h.isFleeing = entityPlaya.isFleeing();
            data.h.isGettingIntoAVehicle = entityPlaya.isGettingIntoAVehicle();
            data.h.isGettingUp = entityPlaya.isGettingUp();
            data.h.isGoingIntoCover = entityPlaya.isGoingIntoCover();
            data.h.isHangingOnToVehicle = entityPlaya.isHangingOnToVehicle();
            data.h.isHuman = entityPlaya.isHuman();
            data.h.isHurt = entityPlaya.isHurt();
            data.h.isInAnyBoat = entityPlaya.isInAnyBoat();
            data.h.isInAnyHeli = entityPlaya.isInAnyHeli();
            data.h.isInAnyPlane = entityPlaya.isInAnyPlane();
            data.h.isInAnyPoliceVehicle = entityPlaya.isInAnyPoliceVehicle();
            data.h.isInAnySub = entityPlaya.isInAnySub();
            data.h.isInAnyTaxi = entityPlaya.isInAnyTaxi();
            data.h.isInAnyTrain = entityPlaya.isInAnyTrain();
            data.h.isInCoverFacingLeft = entityPlaya.isInCoverFacingLeft();
            data.h.isInFlyingVehicle = entityPlaya.isInFlyingVehicle();
            data.h.isInGroup = entityPlaya.isInGroup();
            data.h.isInjured = entityPlaya.isInjured();
            data.h.isInMeleeCombat = entityPlaya.isInMeleeCombat();
            data.h.isInParachuteFreeFall = entityPlaya.isInParachuteFreeFall();
            data.h.isInWrithe = entityPlaya.isInWrithe();
            data.h.isJacking = entityPlaya.isJacking();
            data.h.isJumpingOutOfVehicle = entityPlaya.isJumpingOutOfVehicle();
            data.h.isMale = entityPlaya.isMale();
            data.h.isMountedWeaponTaskUnderneathDrivingTask = entityPlaya.isMountedWeaponTaskUnderneathDrivingTask();
            data.h.isMoveBlendRatioRunning = entityPlaya.isMoveBlendRatioRunning();
            data.h.isMoveBlendRatioSprinting = entityPlaya.isMoveBlendRatioSprinting();
            data.h.isMoveBlendRatioStill = entityPlaya.isMoveBlendRatioStill();
            data.h.isMoveBlendRatioWalking = entityPlaya.isMoveBlendRatioWalking();
            data.h.isOnAnyBike = entityPlaya.isOnAnyBike();
            data.h.isOnFoot = entityPlaya.isOnFoot();
            data.h.isOnMount = entityPlaya.isOnMount();
            data.h.isOnVehicle = entityPlaya.isOnVehicle();
            data.h.isPerformingStealthKill = entityPlaya.isPerformingStealthKill();
            data.h.isPlantingBomb = entityPlaya.isPlantingBomb();
            data.h.isPlayingPhoneGestureAnim = entityPlaya.isPlayingPhoneGestureAnim();
            data.h.isProne = entityPlaya.isProne();
            data.h.isRagdoll = entityPlaya.isRagdoll();
            data.h.isReloading = entityPlaya.isReloading();
            data.h.isRunning = entityPlaya.isRunning();
            data.h.isRunningArrestTask = entityPlaya.isRunningArrestTask();
            data.h.isRunningMobilePhoneTask = entityPlaya.isRunningMobilePhoneTask();
            data.h.isRunningRagdollTask = entityPlaya.isRunningRagdollTask();
            data.h.isShooting = entityPlaya.isShooting();
            data.h.isSittingInAnyVehicle = entityPlaya.isSittingInAnyVehicle();
            data.h.isSprinting = entityPlaya.isSprinting();
            data.h.isStill = entityPlaya.isStill();
            data.h.isStopped = entityPlaya.isStopped();
            data.h.isStrafing = entityPlaya.isStrafing();
            data.h.isSwimming = entityPlaya.isSwimming();
            data.h.isSwimmingUnderWater = entityPlaya.isSwimmingUnderWater();
            data.h.isTracked = entityPlaya.isTracked();
            data.h.isTrackedVisible = entityPlaya.isTrackedVisible();
            data.h.isTryingToEnterALockedVehicle = entityPlaya.isTryingToEnterALockedVehicle();
            data.h.isUsingActionMode = entityPlaya.isUsingActionMode();
            data.h.isUsingAnyScenario = entityPlaya.isUsingAnyScenario();
            data.h.isVaulting = entityPlaya.isVaulting();
            data.h.isWalking = entityPlaya.isWalking();
            data.h.isWearingHelmet = entityPlaya.isWearingHelmet();
            data.h.getAccuracy = entityPlaya.getAccuracy();
            data.h.getAlertness = entityPlaya.getAlertness();
            data.h.getArmour = entityPlaya.getArmour();
            data.h.getCauseOfDeath = entityPlaya.getCauseOfDeath();
            data.h.getCombatMovement = entityPlaya.getCombatMovement();
            data.h.getCombatRange = entityPlaya.getCombatRange();
            data.h.getDecorationsState = entityPlaya.getDecorationsState();
            data.h.getDesiredMoveBlendRatio = entityPlaya.getDesiredMoveBlendRatio();
            data.h.getEnveffScale = entityPlaya.getEnveffScale();
            data.h.getGroupIndex = entityPlaya.getGroupIndex();
            data.h.getJackTarget = entityPlaya.getJackTarget();
            data.h.getMaxHealth = entityPlaya.getMaxHealth();
            data.h.getMeleeTargetFor = entityPlaya.getMeleeTargetFor();
            data.h.getMoney = entityPlaya.getMoney();
            data.h.getMount = entityPlaya.getMount();
            data.h.getParachuteLandingType = entityPlaya.getParachuteLandingType();
            data.h.getParachuteState = entityPlaya.getParachuteState();
            data.h.getPhoneGestureAnimCurrentTime = entityPlaya.getPhoneGestureAnimCurrentTime();
            data.h.getPhoneGestureAnimTotalTime = entityPlaya.getPhoneGestureAnimTotalTime();
            data.h.getPlayerIsFollowing = entityPlaya.getPlayerIsFollowing();
            data.h.getRelationshipGroupDefaultHash = entityPlaya.getRelationshipGroupDefaultHash();
            data.h.getRelationshipGroupHash = entityPlaya.getRelationshipGroupHash();
            data.h.getSeatIsTryingToEnter = entityPlaya.getSeatIsTryingToEnter();
            data.h.getSequenceProgress = entityPlaya.getSequenceProgress();
            data.h.getsJacker = entityPlaya.getsJacker();
            data.h.getSourceOfDeath = entityPlaya.getSourceOfDeath();
            data.h.getTimeOfDeath = entityPlaya.getTimeOfDeath();
            data.h.getType = entityPlaya.getType();
            data.h.getVehicleIsTryingToEnter = entityPlaya.getVehicleIsTryingToEnter();
            data.h.getVehicleIsUsing = entityPlaya.getVehicleIsUsing();
            data.h.isActiveInScenario = entityPlaya.isActiveInScenario();
            data.h.isAimingFromCover = entityPlaya.isAimingFromCover();
            data.h.isBeingJacked = entityPlaya.isBeingJacked();
            data.h.isBeingStealthKilled = entityPlaya.isBeingStealthKilled();
            data.h.isConversationDead = entityPlaya.isConversationDead();
            data.h.isCuffed = entityPlaya.isCuffed();
            data.h.isDead = entityPlaya.isDead();
            data.h.isDiving = entityPlaya.isDiving();
            data.h.isDoingDriveby = entityPlaya.isDoingDriveby();
            data.h.isDrivebyTaskUnderneathDrivingTask = entityPlaya.isDrivebyTaskUnderneathDrivingTask();
            data.h.isDucking = entityPlaya.isDucking();
            data.h.isFalling = entityPlaya.isFalling();
            data.h.isFatallyInjured = entityPlaya.isFatallyInjured();
            data.h.isFleeing = entityPlaya.isFleeing();
            data.h.isGettingIntoAVehicle = entityPlaya.isGettingIntoAVehicle();
            data.h.isGettingUp = entityPlaya.isGettingUp();
            data.h.isGoingIntoCover = entityPlaya.isGoingIntoCover();
            data.h.isHangingOnToVehicle = entityPlaya.isHangingOnToVehicle();
            data.h.isHuman = entityPlaya.isHuman();
            data.h.isHurt = entityPlaya.isHurt();
            data.h.isInAnyBoat = entityPlaya.isInAnyBoat();
            data.h.isInAnyHeli = entityPlaya.isInAnyHeli();
            data.h.isInAnyPlane = entityPlaya.isInAnyPlane();
            data.h.isInAnyPoliceVehicle = entityPlaya.isInAnyPoliceVehicle();
            data.h.isInAnySub = entityPlaya.isInAnySub();
            data.h.isInAnyTaxi = entityPlaya.isInAnyTaxi();
            data.h.isInAnyTrain = entityPlaya.isInAnyTrain();
            data.h.isInCoverFacingLeft = entityPlaya.isInCoverFacingLeft();
            data.h.isInFlyingVehicle = entityPlaya.isInFlyingVehicle();
            data.h.isInGroup = entityPlaya.isInGroup();
            data.h.isInjured = entityPlaya.isInjured();
            data.h.isInMeleeCombat = entityPlaya.isInMeleeCombat();
            data.h.isInParachuteFreeFall = entityPlaya.isInParachuteFreeFall();
            data.h.isInWrithe = entityPlaya.isInWrithe();
            data.h.isJacking = entityPlaya.isJacking();
            data.h.isJumpingOutOfVehicle = entityPlaya.isJumpingOutOfVehicle();
            data.h.isMale = entityPlaya.isMale();
            data.h.isMountedWeaponTaskUnderneathDrivingTask = entityPlaya.isMountedWeaponTaskUnderneathDrivingTask();
            data.h.isMoveBlendRatioRunning = entityPlaya.isMoveBlendRatioRunning();
            data.h.isMoveBlendRatioSprinting = entityPlaya.isMoveBlendRatioSprinting();
            data.h.isMoveBlendRatioStill = entityPlaya.isMoveBlendRatioStill();
            data.h.isMoveBlendRatioWalking = entityPlaya.isMoveBlendRatioWalking();
            data.h.isOnAnyBike = entityPlaya.isOnAnyBike();
            data.h.isOnFoot = entityPlaya.isOnFoot();
            data.h.isOnMount = entityPlaya.isOnMount();
            data.h.isOnVehicle = entityPlaya.isOnVehicle();
            data.h.isPerformingStealthKill = entityPlaya.isPerformingStealthKill();
            data.h.isPlantingBomb = entityPlaya.isPlantingBomb();
            data.h.isPlayingPhoneGestureAnim = entityPlaya.isPlayingPhoneGestureAnim();
            data.h.isProne = entityPlaya.isProne();
            data.h.isRagdoll = entityPlaya.isRagdoll();
            data.h.isReloading = entityPlaya.isReloading();
            data.h.isRunning = entityPlaya.isRunning();
            data.h.isRunningArrestTask = entityPlaya.isRunningArrestTask();
            data.h.isRunningMobilePhoneTask = entityPlaya.isRunningMobilePhoneTask();
            data.h.isRunningRagdollTask = entityPlaya.isRunningRagdollTask();
            data.h.isShooting = entityPlaya.isShooting();
            data.h.isSittingInAnyVehicle = entityPlaya.isSittingInAnyVehicle();
            data.h.isSprinting = entityPlaya.isSprinting();
            data.h.isStill = entityPlaya.isStill();
            data.h.isStopped = entityPlaya.isStopped();
            data.h.isStrafing = entityPlaya.isStrafing();
            data.h.isSwimming = entityPlaya.isSwimming();
            data.h.isSwimmingUnderWater = entityPlaya.isSwimmingUnderWater();
            data.h.isTracked = entityPlaya.isTracked();
            data.h.isTrackedVisible = entityPlaya.isTrackedVisible();
            data.h.isTryingToEnterALockedVehicle = entityPlaya.isTryingToEnterALockedVehicle();
            data.h.isUsingActionMode = entityPlaya.isUsingActionMode();
            data.h.isUsingAnyScenario = entityPlaya.isUsingAnyScenario();
            data.h.isVaulting = entityPlaya.isVaulting();
            data.h.isWalking = entityPlaya.isWalking();
            data.h.isWearingHelmet = entityPlaya.isWearingHelmet();
            break;
        case 'vehicle':
            var entityVehicle = entity;
            data.h.gear = entityVehicle.gear;
            data.h.rpm = entityVehicle.rpm;
            data.h.steeringAngle = entityVehicle.steeringAngle;
            data.h.getAcceleration = entityVehicle.getAcceleration();
            data.h.getAttachedToCargobob = entityVehicle.getAttachedToCargobob();
            data.h.getBoatAnchor = entityVehicle.getBoatAnchor();
            data.h.getBodyHealth = entityVehicle.getBodyHealth();
            data.h.getBodyHealth2 = entityVehicle.getBodyHealth2();
            data.h.getCargobobHookPosition = entityVehicle.getCargobobHookPosition();
            data.h.getCauseOfDestruction = entityVehicle.getCauseOfDestruction();
            data.h.getClass = entityVehicle.getClass();
            data.h.getColourCombination = entityVehicle.getColourCombination();
            data.h.getConvertibleRoofState = entityVehicle.getConvertibleRoofState();
            data.h.getDirtLevel = entityVehicle.getDirtLevel();
            data.h.getDoorLockStatus = entityVehicle.getDoorLockStatus();
            data.h.getEngineHealth = entityVehicle.getEngineHealth();
            data.h.getHeliEngineHealth = entityVehicle.getHeliEngineHealth();
            data.h.getHeliMainRotorHealth = entityVehicle.getHeliMainRotorHealth();
            data.h.getHeliTailRotorHealth = entityVehicle.getHeliTailRotorHealth();
            data.h.getIsEngineRunning = entityVehicle.getIsEngineRunning();
            data.h.getIsLeftHeadlightDamaged = entityVehicle.getIsLeftHeadlightDamaged();
            data.h.getIsPrimaryColourCustom = entityVehicle.getIsPrimaryColourCustom();
            data.h.getIsRightHeadlightDamaged = entityVehicle.getIsRightHeadlightDamaged();
            data.h.getIsSecondaryColourCustom = entityVehicle.getIsSecondaryColourCustom();
            data.h.getLandingGearState = entityVehicle.getLandingGearState();
            data.h.getLayoutHash = entityVehicle.getLayoutHash();
            data.h.getLivery = entityVehicle.getLivery();
            data.h.getLiveryCount = entityVehicle.getLiveryCount();
            data.h.getMaxNumberOfPassengers = entityVehicle.getMaxNumberOfPassengers();
            data.h.getMaxTraction = entityVehicle.getMaxTraction();
            data.h.getModKit = entityVehicle.getModKit();
            data.h.getModKitType = entityVehicle.getModKitType();
            data.h.getNumberOfColours = entityVehicle.getNumberOfColours();
            data.h.getNumberOfPassengers = entityVehicle.getNumberOfPassengers();
            data.h.getNumberPlateText = entityVehicle.getNumberPlateText();
            data.h.getNumberPlateTextIndex = entityVehicle.getNumberPlateTextIndex();
            data.h.getNumModKits = entityVehicle.getNumModKits();
            data.h.getPaintFade = entityVehicle.getPaintFade();
            data.h.getPetrolTankHealth = entityVehicle.getPetrolTankHealth();
            data.h.getPlateType = entityVehicle.getPlateType();
            data.h.getSuspensionHeight = entityVehicle.getSuspensionHeight();
            data.h.getTyresCanBurst = entityVehicle.getTyresCanBurst();
            data.h.getWheelType = entityVehicle.getWheelType();
            data.h.getWindowTint = entityVehicle.getWindowTint();
            data.h.isAlarmActivated = entityVehicle.isAlarmActivated();
            data.h.isAnySeatEmpty = entityVehicle.isAnySeatEmpty();
            data.h.tisAttachedToTrailer = entityVehicle.isAttachedToTrailer();
            data.h.isBig = entityVehicle.isBig();
            data.h.isCargobobHookActive = entityVehicle.isCargobobHookActive();
            data.h.isCargobobMagnetActive = entityVehicle.isCargobobMagnetActive();
            data.h.isDamaged = entityVehicle.isDamaged();
            data.h.isHighDetail = entityVehicle.isHighDetail();
            data.h.isInBurnout = entityVehicle.isInBurnout();
            data.h.isOnAllWheels = entityVehicle.isOnAllWheels();
            data.h.isSearchlightOn = entityVehicle.isSearchlightOn();
            data.h.isSirenOn = entityVehicle.isSirenOn();
            data.h.isSirenSoundOn = entityVehicle.isSirenSoundOn();
            data.h.isStolen = entityVehicle.isStolen();
            data.h.isStopped = entityVehicle.isStopped();
            data.h.isStoppedAtTrafficLights = entityVehicle.isStoppedAtTrafficLights();
            data.h.isStuckOnRoof = entityVehicle.isStuckOnRoof();
            data.h.isTaxiLightOn = entityVehicle.isTaxiLightOn();
            data.h.isVisible = entityVehicle.isVisible();
            break;
        case 'object':
            var entityObject = entity;
            data.h.hidden = entityObject.hidden;
            data.h.isWeak = entityObject.isWeak;
            data.h.notifyStreaming = entityObject.notifyStreaming;
            data.h.streamingRange = entityObject.streamingRange;
            data.h.rotation = entityObject.rotation;
            data.h.hasBeenBroken = entityObject.hasBeenBroken();
            data.h.isVisible = entityObject.isVisible();
            break;
    }
    var str = JSON.stringify(data, undefined, 2);
    str = Buffer.from(str).toString('base64');
    browser = mp.browsers.new('gta.world');
    browser.active = false;
    browser.execute("document.body.innerHTML = \"\"");
    browser.execute("document.body.style.backgroundColor = \"black\"");
    browser.execute("document.body.innerHTML = `<pre style=\"color: white\"><code>${atob('" + str + "')}</code></pre>`");
    browser.active = true;
});
mp.keys.bind(enums.keyCode.F4, false, function () {
    if (browser === undefined)
        return;
    mp.gui.chat.push('Destroyed');
    browser.destroy();
    browser = undefined;
});
mp.events.add('render', function () {
    if (!sandboxEnabled)
        return;
    iteratePool(mp.checkpoints);
    iteratePool(mp.colshapes);
    iteratePool(mp.labels);
    iteratePool(mp.markers);
    iteratePool(mp.objects);
    iteratePool(mp.peds);
    iteratePool(mp.pickups);
    iteratePool(mp.players);
    iteratePool(mp.vehicles);
});
function iteratePool(pool) {
    var loca = mp.players.local;
    var locaPos = loca.position;
    pool.forEach(function (p) {
        if (!('position' in p))
            return;
        if (util.getDistanceBetweenVectors3Mp(p.position, locaPos, true) > MAX_DRAW_DIST || loca.dimension != p.dimension)
            return;
        drawEntityInfo(p);
        if (p.type == 'player' || p.type == 'vehicle' || p.type == 'object') {
            drawVectors(p);
        }
    });
}
var order = 0;
mp.keys.bind(enums.keyCode.MULTIPLY, false, function () {
    if (!sandboxEnabled)
        return;
    order++;
    if (order >= 6)
        order = 0;
});
function drawVectors(entity) {
    var result = entity.getMatrix(new mp.Vector3, new mp.Vector3, new mp.Vector3, new mp.Vector3);
    var length = 3.0;
    mp.game.graphics.drawLine(result.position.x, result.position.y, result.position.z, result.position.x + result.forwardVector.x * length, result.position.y + result.forwardVector.y * length, result.position.z + result.forwardVector.z * length, 255, 0, 0, 255);
    mp.game.graphics.drawLine(result.position.x, result.position.y, result.position.z, result.position.x + result.rightVector.x * length, result.position.y + result.rightVector.y * length, result.position.z + result.rightVector.z * length, 0, 255, 0, 255);
    mp.game.graphics.drawLine(result.position.x, result.position.y, result.position.z, result.position.x + result.upVector.x, result.position.y + result.upVector.y, result.position.z + result.upVector.z, 0, 0, 255, 255);
    var color = strToColor(entity.type);
    var rot = entity.getRotation(order);
    var h = entity.getHeading();
    var dist = util.getDistanceBetweenVectors3Mp(mp.players.local.position, entity.position, true);
    var scale = ((1 - (dist / (MAX_DRAW_DIST * 1.2))) / 0.25) / 10;
    mp.game.graphics.drawText("POS: " + result.position.x.toFixed(2) + " | " + result.position.y.toFixed(2) + " | " + result.position.z.toFixed(2) + "\nROT(" + order + "): P:" + rot.x.toFixed(2) + " | R:" + rot.y.toFixed(2) + " | Y:" + rot.z.toFixed(2) + " | H:" + h.toFixed(2), [entity.position.x, entity.position.y, entity.position.z - 0.3], {
        font: 4,
        centre: true,
        color: [color[0], color[1], color[2], 255],
        scale: [scale, scale],
        outline: true,
    });
}
function drawEntityInfo(entity) {
    if (entity === undefined || entity == null)
        return;
    var color = strToColor(entity.type);
    var dist = util.getDistanceBetweenVectors3Mp(mp.players.local.position, entity.position, true);
    var scale = ((1 - (dist / (MAX_DRAW_DIST * 1.2))) / 0.25) / 10;
    mp.game.graphics.drawText("Type: " + entity.type + " Model: " + entity.model + " RemoteID: " + entity.remoteId, [entity.position.x, entity.position.y, entity.position.z], {
        font: 4,
        centre: true,
        color: [color[0], color[1], color[2], 255],
        scale: [scale, scale],
        outline: true,
    });
}
function strToColor(str) {
    var hash = 0;
    if (str.length === 0)
        return [0, 0, 0];
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    var rgb = [0, 0, 0];
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 255;
        rgb[i] = value;
    }
    return rgb;
}
;

}).call(this,require("buffer").Buffer)
},{"../utilities/enums":14,"../utilities/eventswrapper":15,"../utilities/globals":16,"../utilities/raycaster":17,"buffer":2}],11:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isToolTipOpen = void 0;
var tooltipmenu_1 = require("../utilities/tooltipmenu");
var tooltipmenu_2 = require("../utilities/tooltipmenu");
var raycaster_1 = require("../utilities/raycaster");
var ev = require("../utilities/eventswrapper");
var util = require("../utilities/globals");
var datarequests_1 = require("../utilities/datarequests");
var clickToWalk = require("../clicktowalk/ClickToWalkHandler");
var isDebug = false;
ev.eventsHandler.addEventListener(ev.event.clientRightClick, function (x, y) {
    if (!util.isCursorVisible())
        return;
    if (util.isChatboxOpen() && util.clientClickedOnChatbox(x, y))
        return;
    if (util.clientIsRunningBlacklistedCEF())
        return;
    var selectedEntity = raycaster_1.screenCoordsToEntity(x, y, raycaster_1.IntersectOptions.VehiclesPedsObjects, mp.players.local.handle);
    if (!isDebug && selectedEntity == mp.players.local)
        return;
    if (selectedEntity === undefined)
        return;
    try {
        var playerEntityDistance = util.getDistanceBetweenVectors3Mp(mp.players.local.position, selectedEntity.position, true);
        if (playerEntityDistance > 5.0)
            return;
        if (isInConstructTooltipCooldown())
            return;
        constructTooltip(selectedEntity, x, y);
    }
    catch (err) {
    }
});
var menu = null;
function isToolTipOpen() {
    return menu != null;
}
exports.isToolTipOpen = isToolTipOpen;
ev.eventsHandler.addEventListener(ev.event.render, function (_nametags) {
    if (menu != null)
        menu.render();
    if (menu != null && !mp.gui.cursor.visible)
        menu = null;
});
ev.eventsHandler.addEventListener(ev.event.clientLeftClick, function (_x, _y) {
    if (menu == null)
        return;
    menu.handleClick();
    menu = null;
    if (util.isChatboxOpen()) {
        util.closeChatboxInputBox();
    }
    mp.gui.cursor.visible = false;
});
function constructTooltip(entity, x, y) {
    return __awaiter(this, void 0, void 0, function () {
        var mtitle, options;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, getTooltipMenuTitle(entity)];
                case 1:
                    mtitle = _a.sent();
                    if (mtitle == undefined)
                        return [2];
                    return [4, getTooltipMenuOptions(entity)];
                case 2:
                    options = _a.sent();
                    if (options === undefined || options.length <= 0)
                        return [2];
                    menu = new (tooltipmenu_1.ToolTipMenu.bind.apply(tooltipmenu_1.ToolTipMenu, __spreadArrays([void 0, mtitle, x, y], options)))();
                    return [2];
            }
        });
    });
}
function getTooltipMenuTitle(entity) {
    return __awaiter(this, void 0, void 0, function () {
        var ent, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = entity.type;
                    switch (_a) {
                        case 'player': return [3, 1];
                        case 'vehicle': return [3, 2];
                        case 'object': return [3, 3];
                    }
                    return [3, 5];
                case 1:
                    ent = entity;
                    return [2, ent.name];
                case 2:
                    ent = entity;
                    return [2, mp.game.vehicle.getDisplayNameFromVehicleModel(ent.model)];
                case 3:
                    ent = entity;
                    return [4, getDroppedItemName(entity)];
                case 4: return [2, _b.sent()];
                case 5: return [2, 'Undefined'];
            }
        });
    });
}
function getTooltipMenuOptions(entity) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = entity.type;
                    switch (_a) {
                        case 'player': return [3, 1];
                        case 'vehicle': return [3, 3];
                        case 'object': return [3, 5];
                    }
                    return [3, 6];
                case 1: return [4, getTooltipPlayerMenuOptions(entity)];
                case 2: return [2, _b.sent()];
                case 3: return [4, getTooltipVehicleMenuOptions(entity)];
                case 4: return [2, _b.sent()];
                case 5: return [2, getTooltipObjectMenuOptions(entity)];
                case 6: return [2, undefined];
            }
        });
    });
}
function getTooltipPlayerMenuOptions(entity) {
    return __awaiter(this, void 0, void 0, function () {
        var options, _a, canHelpUpResponse, isPDResponse, isMEDResponse, canHelpUpTarget, playerIsOnPDDuty, playerIsOnMedDuty, cuffVarb, playerIsCuffed;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    options = [];
                    return [4, Promise.all([
                            new datarequests_1.ServerDataRequest('Tooltip::CanHelpUpTarget', entity.remoteId).Make(),
                            new datarequests_1.ServerDataRequest('Tooltip::IsPlayerPDOnDuty').Make(),
                            new datarequests_1.ServerDataRequest('Tooltip::IsPlayerMEDOnDuty').Make(),
                        ])];
                case 1:
                    _a = _b.sent(), canHelpUpResponse = _a[0], isPDResponse = _a[1], isMEDResponse = _a[2];
                    canHelpUpTarget = canHelpUpResponse !== undefined && typeof canHelpUpResponse[0] === 'boolean' && canHelpUpResponse[0];
                    playerIsOnPDDuty = isPDResponse !== undefined && typeof isPDResponse[0] === 'boolean' && isPDResponse[0];
                    playerIsOnMedDuty = isMEDResponse !== undefined && typeof isMEDResponse[0] === 'boolean' && isMEDResponse[0];
                    cuffVarb = entity.getVariable('PLAYER_IS_CUFFED');
                    playerIsCuffed = (cuffVarb == undefined || cuffVarb == false) ? false : true;
                    options.push(new tooltipmenu_2.ToolTipOption("\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043B\u0438\u0446\u0435\u043D\u0437\u0438\u0438", function () {
                        mp.events.callRemote('Tooltip::ShowLicenses', entity.remoteId);
                    }));
                    options.push(new tooltipmenu_2.ToolTipOption("\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u044C", function () {
                        mp.events.callRemote('Tooltip::ShowInventory', entity.remoteId);
                    }));
                    options.push(new tooltipmenu_2.ToolTipOption("\u0417\u0430\u043F\u043B\u0430\u0442\u0438\u0442\u044C", function () {
                        mp.events.callRemote('Tooltip::InvokePayTarget', entity.remoteId);
                    }));
                    options.push(new tooltipmenu_2.ToolTipOption("\u041A\u043B\u044F\u043F", function () {
                        mp.events.callRemote('Tooltip::InvokeGagPlayer', entity.remoteId);
                    }));
                    if (canHelpUpTarget) {
                        options.push(new tooltipmenu_2.ToolTipOption("\u041F\u043E\u0434\u043D\u044F\u0442\u044C", function () {
                            mp.events.callRemote('Tooltip::InvokeHelpUpTarget', entity.remoteId);
                        }));
                        options.push(new tooltipmenu_2.ToolTipOption("\u0422\u0430\u0449\u0438\u0442\u044C", function () {
                            mp.events.callRemote('Tooltip::InvokeCarryTarget', entity.remoteId);
                        }));
                    }
                    if (playerIsOnPDDuty) {
                        options.push(new tooltipmenu_2.ToolTipOption("\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0437\u043D\u0430\u0447\u043E\u043A", function () {
                            mp.events.callRemote('Tooltip::InvokeShowBadge', entity.remoteId);
                        }));
                        options.push(new tooltipmenu_2.ToolTipOption("\u041E\u0431\u044B\u0441\u043A\u0430\u0442\u044C", function () {
                            mp.events.callRemote('Tooltip::InvokeFrisk', entity.remoteId);
                        }));
                        if (playerIsCuffed) {
                            options.push(new tooltipmenu_2.ToolTipOption("\u0421\u043D\u044F\u0442\u044C \u043D\u0430\u0440\u0443\u0447\u043D\u0438\u043A\u0438", function () {
                                mp.events.callRemote('Tooltip::InvokeToggleCuff', entity.remoteId);
                            }));
                            options.push(new tooltipmenu_2.ToolTipOption("\u0418\u0437\u044A\u044F\u0442\u044C \u043E\u0440\u0443\u0436\u0438\u0435", function () {
                                mp.events.callRemote('Tooltip::InvokeSeizeWeapons', entity.remoteId);
                            }));
                            options.push(new tooltipmenu_2.ToolTipOption("\u0418\u0437\u044A\u044F\u0442\u044C \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u044B", function () {
                                mp.events.callRemote('Tooltip::InvokeSeizeItems', entity.remoteId);
                            }));
                        }
                        else {
                            options.push(new tooltipmenu_2.ToolTipOption("\u041D\u0430\u0434\u0435\u0442\u044C \u043D\u0430\u0440\u0443\u0447\u043D\u0438\u043A\u0438", function () {
                                mp.events.callRemote('Tooltip::InvokeToggleCuff', entity.remoteId);
                            }));
                        }
                    }
                    if (playerIsOnMedDuty) {
                        options.push(new tooltipmenu_2.ToolTipOption("\u041B\u0435\u0447\u0438\u0442\u044C", function () {
                            mp.events.callRemote('Tooltip::InvokeHealTarget', entity.remoteId);
                        }));
                        if (canHelpUpTarget) {
                            options.push(new tooltipmenu_2.ToolTipOption("\u041F\u043E\u0434\u043D\u044F\u0442\u044C (\u043A\u0430\u043A \u043C\u0435\u0434\u0438\u043A)", function () {
                                mp.events.callRemote('Tooltip::InvokeReviveTarget', entity.remoteId);
                            }));
                        }
                    }
                    options.push(new tooltipmenu_2.ToolTipOption("\u0421\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u044C", function () {
                        clickToWalk.SetFollowing(entity);
                    }));
                    return [2, options];
            }
        });
    });
}
function getTooltipVehicleMenuOptions(entity) {
    return __awaiter(this, void 0, void 0, function () {
        var options, start, _a, vehLockResp, TrunkOpenResp, hasVehAccessResp, hasVehOwnership, vehIsLocked, trunkIsOpen, playerHasVehAccess, playerHasVehOwnership, action, engStatus, engRunning, IsInBreakin;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    options = [];
                    start = Date.now();
                    return [4, Promise.all([
                            new datarequests_1.ServerDataRequest('Tooltip::IsVehicleLocked', entity.remoteId).Make(),
                            new datarequests_1.ServerDataRequest('Tooltip::IsVehicleTrunkOpen', entity.remoteId).Make(),
                            new datarequests_1.ServerDataRequest('Tooltip::DoesPlayerHaveVehAccess', entity.remoteId).Make(),
                            new datarequests_1.ServerDataRequest('Tooltip::DoesPlayerHaveVehOwnership', entity.remoteId).Make(),
                        ])];
                case 1:
                    _a = _b.sent(), vehLockResp = _a[0], TrunkOpenResp = _a[1], hasVehAccessResp = _a[2], hasVehOwnership = _a[3];
                    pushDebug("Resolve took: " + (Date.now() - start) + " ms");
                    vehIsLocked = vehLockResp !== undefined && typeof vehLockResp[0] === 'boolean' && vehLockResp[0];
                    trunkIsOpen = TrunkOpenResp !== undefined && typeof TrunkOpenResp[0] === 'boolean' && TrunkOpenResp[0];
                    playerHasVehAccess = hasVehAccessResp !== undefined && typeof hasVehAccessResp[0] === 'boolean' && hasVehAccessResp[0];
                    playerHasVehOwnership = hasVehOwnership !== undefined && typeof hasVehOwnership[0] === 'boolean' && hasVehOwnership[0];
                    if (playerHasVehAccess) {
                        options.push(new tooltipmenu_2.ToolTipOption(vehIsLocked ? 'Открыть' : 'Закрыть', function () {
                            mp.events.callRemote('Tooltip::InvokeLock', entity.remoteId);
                        }));
                    }
                    if (playerHasVehOwnership) {
                        options.push(new tooltipmenu_2.ToolTipOption('Продать транспорт', function () {
                            mp.events.callRemote('Tooltip::InvokeSellVehicle', entity.remoteId);
                        }));
                    }
                    if (playerHasVehOwnership) {
                        options.push(new tooltipmenu_2.ToolTipOption('Управлять номером', function () {
                            mp.events.callRemote('Tooltip::InvokeManageVehiclePlate', entity.remoteId);
                        }));
                    }
                    if (util.isLocalPlayerDrivingVehicle(entity)) {
                        if (playerHasVehAccess) {
                            action = 'Двигатель';
                            engStatus = mp.players.local.vehicle.getIsEngineRunning();
                            if (engStatus != null && engStatus != undefined) {
                                if (!engStatus)
                                    action = 'Завести двигатель';
                                else
                                    action = 'Заглушить двигатель';
                            }
                            options.push(new tooltipmenu_2.ToolTipOption(action, function () {
                                mp.events.callRemote('Tooltip::InvokeToggleEngine', entity.remoteId);
                            }));
                        }
                        else {
                            engRunning = mp.players.local.vehicle.getIsEngineRunning();
                            if (engRunning != null && engRunning != undefined && engRunning == false) {
                                if (!isHotwiring) {
                                    options.push(new tooltipmenu_2.ToolTipOption('Взломать зажигание', function () {
                                        mp.events.callRemote('Tooltip::InvokeHotwire', entity.remoteId);
                                    }));
                                }
                                else {
                                    options.push(new tooltipmenu_2.ToolTipOption('Остановить взлом', function () {
                                        mp.events.callRemote('Tooltip::InvokeStopHotwire', entity.remoteId);
                                    }));
                                }
                            }
                        }
                    }
                    if (!vehIsLocked) {
                        if (util.isLocalPlayerInsideVehicle() || (util.isLocalPlayerNearTrunk(entity) && trunkIsOpen)) {
                            options.push(new tooltipmenu_2.ToolTipOption('Инвентарь', function () {
                                mp.events.callRemote('Tooltip::InvokeViewVehicleInventory', entity.remoteId);
                            }));
                        }
                    }
                    if (!vehIsLocked && (util.isLocalPlayerNearTrunk(entity) || util.isLocalPlayerDrivingVehicle(entity))) {
                        options.push(new tooltipmenu_2.ToolTipOption((trunkIsOpen ? 'Закрыть' : 'Открыть') + " \u0431\u0430\u0433\u0430\u0436\u043D\u0438\u043A", function () {
                            mp.events.callRemote('Tooltip::InvokeToggleVehicleTrunkStatus', entity.remoteId);
                        }));
                    }
                    if (vehIsLocked && !playerHasVehAccess && !util.isLocalPlayerInsideVehicle()) {
                        IsInBreakin = mp.players.local.getVariable('IsInBreakin');
                        if (IsInBreakin === undefined || IsInBreakin == false) {
                            options.push(new tooltipmenu_2.ToolTipOption('Взломать', function () {
                                mp.events.callRemote('Tooltip::InvokeVehicleBreakIn', entity.remoteId);
                            }));
                        }
                        else {
                            options.push(new tooltipmenu_2.ToolTipOption('Остановить взлом', function () {
                                mp.events.callRemote('Tooltip::InvokeStopVehicleBreakIn', entity.remoteId);
                            }));
                        }
                    }
                    return [2, options];
            }
        });
    });
}
function getTooltipObjectMenuOptions(entity) {
    var droppedItemID = getDroppedItemID(entity);
    return [
        new tooltipmenu_2.ToolTipOption("\u041F\u043E\u0434\u043E\u0431\u0440\u0430\u0442\u044C", function () {
            mp.events.callRemote('Tooltip::RequestPickupItem', droppedItemID);
        }),
    ];
}
function getDroppedItemName(entity) {
    return __awaiter(this, void 0, void 0, function () {
        var found, res, cleanName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    found = permanentObjectsJSON.find(function (obj) { return obj.item == entity.id; });
                    if (found === undefined)
                        return [2, undefined];
                    return [4, new datarequests_1.ServerDataRequest('Tooltip::GetDroppedItemName', found.dropped).Make()];
                case 1:
                    res = _a.sent();
                    if (res === undefined || typeof res[0] !== 'string')
                        return [2, undefined];
                    cleanName = cleanStringForRage(res[0]);
                    return [2, cleanName];
            }
        });
    });
}
function cleanStringForRage(durty) {
    return durty.replace('(', '').replace(')', '');
}
function getDroppedItemID(entity) {
    var found = permanentObjectsJSON.find(function (obj) { return obj.item == entity.id; });
    if (found === undefined)
        return undefined;
    return found.dropped;
}
var lastInvoke = undefined;
var cooldownInMSBetweenInvokes = 300;
function isInConstructTooltipCooldown() {
    if (lastInvoke == undefined) {
        lastInvoke = Date.now();
        return false;
    }
    if (lastInvoke + cooldownInMSBetweenInvokes < Date.now()) {
        lastInvoke = Date.now();
        return false;
    }
    return true;
}
function pushDebug(str) {
    if (isDebug)
        mp.gui.chat.push(str);
}

},{"../clicktowalk/ClickToWalkHandler":5,"../utilities/datarequests":13,"../utilities/eventswrapper":15,"../utilities/globals":16,"../utilities/raycaster":17,"../utilities/tooltipmenu":18}],12:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("../utilities/globals");
var twoFactorCEF;
mp.events.add('TwoFactor::ToggleCEF', function () {
    if (!twoFactorCEF) {
        twoFactorCEF = mp.browsers.new('package://gtalife/_CEF/two-factor/index.html');
        util.showCursor();
    }
    else {
        twoFactorCEF.destroy();
        twoFactorCEF = undefined;
        util.hideCursor();
    }
});
mp.events.add('TwoFactor::Cef::Client::RequestExit', function () {
    if (twoFactorCEF) {
        twoFactorCEF.destroy();
        twoFactorCEF = undefined;
        util.hideCursor();
    }
    mp.events.callRemote('TwoFactor::Client::Server::RequestExit');
});
mp.events.addProc('TwoFactor::Cef::Client::ReqTwoFactorStatus', function () { return __awaiter(void 0, void 0, void 0, function () {
    var enableStatus, ex_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, mp.events.callRemoteProc('TwoFactor::Client::Server::ReqTwoFactorStatus')];
            case 1:
                enableStatus = _a.sent();
                return [2, enableStatus];
            case 2:
                ex_1 = _a.sent();
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
mp.events.addProc('TwoFactor::Cef::Client::FetchNewSharedSecret', function () { return __awaiter(void 0, void 0, void 0, function () {
    var qrlink, ex_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, mp.events.callRemoteProc('TwoFactor::Client::Server::FetchNewSharedSecret')];
            case 1:
                qrlink = _a.sent();
                return [2, qrlink];
            case 2:
                ex_2 = _a.sent();
                return [3, 3];
            case 3: return [2, null];
        }
    });
}); });
mp.events.addProc('TwoFactor::Cef::Client::VerifyInitialTwoFactorPin', function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var responseCode, ex_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, mp.events.callRemoteProc('TwoFactor::Client::Server::VerifyInitialTwoFactorPin', token)];
            case 1:
                responseCode = _a.sent();
                return [2, responseCode];
            case 2:
                ex_3 = _a.sent();
                return [3, 3];
            case 3: return [2, -1];
        }
    });
}); });
mp.events.addProc('TwoFactor::Cef::Client::VerifyDeactivateTwoFactor', function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var responseCode, ex_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, mp.events.callRemoteProc('TwoFactor::Client::Server::VerifyDeactivateTwoFactor', token)];
            case 1:
                responseCode = _a.sent();
                return [2, responseCode];
            case 2:
                ex_4 = _a.sent();
                return [3, 3];
            case 3: return [2, -1];
        }
    });
}); });

},{"../utilities/globals":16}],13:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerDataRequest = void 0;
var debug = false;
var requestTimeoutMS = 2000;
var ServerDataRequest = (function () {
    function ServerDataRequest(eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.args = args;
        this.eventName = eventName;
        ServerDataRequest.responses[eventName] = undefined;
        ServerDataRequest.RegisterEventOnce(eventName);
    }
    ServerDataRequest.prototype.Make = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                (_a = mp.events).callRemote.apply(_a, __spreadArrays([this.eventName], this.args));
                i = 1;
                return [2, new Promise(function (res, _rej) {
                        var intervalID = setInterval(function () {
                            pushDebug("check" + i + " - " + JSON.stringify(ServerDataRequest.responses[_this.eventName]));
                            if (ServerDataRequest.responses[_this.eventName] !== undefined) {
                                res(ServerDataRequest.responses[_this.eventName]);
                                clearInterval(intervalID);
                                pushDebug("promise " + ServerDataRequest.responses[_this.eventName][0]);
                            }
                            else if (Date.now() + requestTimeoutMS > Date.now()) {
                                res(undefined);
                                clearInterval(intervalID);
                                pushDebug("timeout");
                            }
                            i++;
                        }, 200);
                    })];
            });
        });
    };
    ServerDataRequest.RegisterEventOnce = function (name) {
        if (ServerDataRequest.registeredEvents.includes(name + 'Response'))
            return;
        pushDebug('Registering ' + name + 'Response');
        ServerDataRequest.registeredEvents.push(name + 'Response');
        mp.events.add(name + 'Response', function () {
            var resp = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                resp[_i] = arguments[_i];
            }
            if (resp === undefined || resp.length == 0)
                ServerDataRequest.responses[name] = undefined;
            else
                ServerDataRequest.responses[name] = resp;
        });
    };
    ServerDataRequest.responses = {};
    ServerDataRequest.registeredEvents = [];
    return ServerDataRequest;
}());
exports.ServerDataRequest = ServerDataRequest;
function pushDebug(text) {
    if (debug)
        mp.gui.chat.push(text);
}

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controls = exports.InputGroups = exports.keyCode = void 0;
var keyCode;
(function (keyCode) {
    keyCode[keyCode["BACKSPACE"] = 8] = "BACKSPACE";
    keyCode[keyCode["TAB"] = 9] = "TAB";
    keyCode[keyCode["ENTER"] = 13] = "ENTER";
    keyCode[keyCode["SHIFT"] = 16] = "SHIFT";
    keyCode[keyCode["CTRL"] = 17] = "CTRL";
    keyCode[keyCode["ALT"] = 18] = "ALT";
    keyCode[keyCode["PAUSE"] = 19] = "PAUSE";
    keyCode[keyCode["CAPS_LOCK"] = 20] = "CAPS_LOCK";
    keyCode[keyCode["ESCAPE"] = 27] = "ESCAPE";
    keyCode[keyCode["SPACE"] = 32] = "SPACE";
    keyCode[keyCode["PAGE_UP"] = 33] = "PAGE_UP";
    keyCode[keyCode["PAGE_DOWN"] = 34] = "PAGE_DOWN";
    keyCode[keyCode["END"] = 35] = "END";
    keyCode[keyCode["HOME"] = 36] = "HOME";
    keyCode[keyCode["LEFT_ARROW"] = 37] = "LEFT_ARROW";
    keyCode[keyCode["UP_ARROW"] = 38] = "UP_ARROW";
    keyCode[keyCode["RIGHT_ARROW"] = 39] = "RIGHT_ARROW";
    keyCode[keyCode["DOWN_ARROW"] = 40] = "DOWN_ARROW";
    keyCode[keyCode["INSERT"] = 45] = "INSERT";
    keyCode[keyCode["DELETE"] = 46] = "DELETE";
    keyCode[keyCode["KEY_0"] = 48] = "KEY_0";
    keyCode[keyCode["KEY_1"] = 49] = "KEY_1";
    keyCode[keyCode["KEY_2"] = 50] = "KEY_2";
    keyCode[keyCode["KEY_3"] = 51] = "KEY_3";
    keyCode[keyCode["KEY_4"] = 52] = "KEY_4";
    keyCode[keyCode["KEY_5"] = 53] = "KEY_5";
    keyCode[keyCode["KEY_6"] = 54] = "KEY_6";
    keyCode[keyCode["KEY_7"] = 55] = "KEY_7";
    keyCode[keyCode["KEY_8"] = 56] = "KEY_8";
    keyCode[keyCode["KEY_9"] = 57] = "KEY_9";
    keyCode[keyCode["KEY_A"] = 65] = "KEY_A";
    keyCode[keyCode["KEY_B"] = 66] = "KEY_B";
    keyCode[keyCode["KEY_C"] = 67] = "KEY_C";
    keyCode[keyCode["KEY_D"] = 68] = "KEY_D";
    keyCode[keyCode["KEY_E"] = 69] = "KEY_E";
    keyCode[keyCode["KEY_F"] = 70] = "KEY_F";
    keyCode[keyCode["KEY_G"] = 71] = "KEY_G";
    keyCode[keyCode["KEY_H"] = 72] = "KEY_H";
    keyCode[keyCode["KEY_I"] = 73] = "KEY_I";
    keyCode[keyCode["KEY_J"] = 74] = "KEY_J";
    keyCode[keyCode["KEY_K"] = 75] = "KEY_K";
    keyCode[keyCode["KEY_L"] = 76] = "KEY_L";
    keyCode[keyCode["KEY_M"] = 77] = "KEY_M";
    keyCode[keyCode["KEY_N"] = 78] = "KEY_N";
    keyCode[keyCode["KEY_O"] = 79] = "KEY_O";
    keyCode[keyCode["KEY_P"] = 80] = "KEY_P";
    keyCode[keyCode["KEY_Q"] = 81] = "KEY_Q";
    keyCode[keyCode["KEY_R"] = 82] = "KEY_R";
    keyCode[keyCode["KEY_S"] = 83] = "KEY_S";
    keyCode[keyCode["KEY_T"] = 84] = "KEY_T";
    keyCode[keyCode["KEY_U"] = 85] = "KEY_U";
    keyCode[keyCode["KEY_V"] = 86] = "KEY_V";
    keyCode[keyCode["KEY_W"] = 87] = "KEY_W";
    keyCode[keyCode["KEY_X"] = 88] = "KEY_X";
    keyCode[keyCode["KEY_Y"] = 89] = "KEY_Y";
    keyCode[keyCode["KEY_Z"] = 90] = "KEY_Z";
    keyCode[keyCode["LEFT_META"] = 91] = "LEFT_META";
    keyCode[keyCode["RIGHT_META"] = 92] = "RIGHT_META";
    keyCode[keyCode["SELECT"] = 93] = "SELECT";
    keyCode[keyCode["NUMPAD_0"] = 96] = "NUMPAD_0";
    keyCode[keyCode["NUMPAD_1"] = 97] = "NUMPAD_1";
    keyCode[keyCode["NUMPAD_2"] = 98] = "NUMPAD_2";
    keyCode[keyCode["NUMPAD_3"] = 99] = "NUMPAD_3";
    keyCode[keyCode["NUMPAD_4"] = 100] = "NUMPAD_4";
    keyCode[keyCode["NUMPAD_5"] = 101] = "NUMPAD_5";
    keyCode[keyCode["NUMPAD_6"] = 102] = "NUMPAD_6";
    keyCode[keyCode["NUMPAD_7"] = 103] = "NUMPAD_7";
    keyCode[keyCode["NUMPAD_8"] = 104] = "NUMPAD_8";
    keyCode[keyCode["NUMPAD_9"] = 105] = "NUMPAD_9";
    keyCode[keyCode["MULTIPLY"] = 106] = "MULTIPLY";
    keyCode[keyCode["ADD"] = 107] = "ADD";
    keyCode[keyCode["SUBTRACT"] = 109] = "SUBTRACT";
    keyCode[keyCode["DECIMAL"] = 110] = "DECIMAL";
    keyCode[keyCode["DIVIDE"] = 111] = "DIVIDE";
    keyCode[keyCode["F1"] = 112] = "F1";
    keyCode[keyCode["F2"] = 113] = "F2";
    keyCode[keyCode["F3"] = 114] = "F3";
    keyCode[keyCode["F4"] = 115] = "F4";
    keyCode[keyCode["F5"] = 116] = "F5";
    keyCode[keyCode["F6"] = 117] = "F6";
    keyCode[keyCode["F7"] = 118] = "F7";
    keyCode[keyCode["F8"] = 119] = "F8";
    keyCode[keyCode["F9"] = 120] = "F9";
    keyCode[keyCode["F10"] = 121] = "F10";
    keyCode[keyCode["F11"] = 122] = "F11";
    keyCode[keyCode["F12"] = 123] = "F12";
    keyCode[keyCode["NUM_LOCK"] = 144] = "NUM_LOCK";
    keyCode[keyCode["SCROLL_LOCK"] = 145] = "SCROLL_LOCK";
    keyCode[keyCode["SEMICOLON"] = 186] = "SEMICOLON";
    keyCode[keyCode["EQUALS"] = 187] = "EQUALS";
    keyCode[keyCode["COMMA"] = 188] = "COMMA";
    keyCode[keyCode["DASH"] = 189] = "DASH";
    keyCode[keyCode["PERIOD"] = 190] = "PERIOD";
    keyCode[keyCode["FORWARD_SLASH"] = 191] = "FORWARD_SLASH";
    keyCode[keyCode["GRAVE_ACCENT"] = 192] = "GRAVE_ACCENT";
    keyCode[keyCode["OPEN_BRACKET"] = 219] = "OPEN_BRACKET";
    keyCode[keyCode["BACK_SLASH"] = 220] = "BACK_SLASH";
    keyCode[keyCode["CLOSE_BRACKET"] = 221] = "CLOSE_BRACKET";
    keyCode[keyCode["SINGLE_QUOTE"] = 222] = "SINGLE_QUOTE";
})(keyCode = exports.keyCode || (exports.keyCode = {}));
var InputGroups;
(function (InputGroups) {
    InputGroups[InputGroups["INPUTGROUP_MOVE"] = 0] = "INPUTGROUP_MOVE";
    InputGroups[InputGroups["INPUTGROUP_LOOK"] = 1] = "INPUTGROUP_LOOK";
    InputGroups[InputGroups["INPUTGROUP_WHEEL"] = 2] = "INPUTGROUP_WHEEL";
    InputGroups[InputGroups["INPUTGROUP_CELLPHONE_NAVIGATE"] = 3] = "INPUTGROUP_CELLPHONE_NAVIGATE";
    InputGroups[InputGroups["INPUTGROUP_CELLPHONE_NAVIGATE_UD"] = 4] = "INPUTGROUP_CELLPHONE_NAVIGATE_UD";
    InputGroups[InputGroups["INPUTGROUP_CELLPHONE_NAVIGATE_LR"] = 5] = "INPUTGROUP_CELLPHONE_NAVIGATE_LR";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_DPAD_ALL"] = 6] = "INPUTGROUP_FRONTEND_DPAD_ALL";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_DPAD_UD"] = 7] = "INPUTGROUP_FRONTEND_DPAD_UD";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_DPAD_LR"] = 8] = "INPUTGROUP_FRONTEND_DPAD_LR";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_LSTICK_ALL"] = 9] = "INPUTGROUP_FRONTEND_LSTICK_ALL";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_RSTICK_ALL"] = 10] = "INPUTGROUP_FRONTEND_RSTICK_ALL";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_GENERIC_UD"] = 11] = "INPUTGROUP_FRONTEND_GENERIC_UD";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_GENERIC_LR"] = 12] = "INPUTGROUP_FRONTEND_GENERIC_LR";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_GENERIC_ALL"] = 13] = "INPUTGROUP_FRONTEND_GENERIC_ALL";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_BUMPERS"] = 14] = "INPUTGROUP_FRONTEND_BUMPERS";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_TRIGGERS"] = 15] = "INPUTGROUP_FRONTEND_TRIGGERS";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_STICKS"] = 16] = "INPUTGROUP_FRONTEND_STICKS";
    InputGroups[InputGroups["INPUTGROUP_SCRIPT_DPAD_ALL"] = 17] = "INPUTGROUP_SCRIPT_DPAD_ALL";
    InputGroups[InputGroups["INPUTGROUP_SCRIPT_DPAD_UD"] = 18] = "INPUTGROUP_SCRIPT_DPAD_UD";
    InputGroups[InputGroups["INPUTGROUP_SCRIPT_DPAD_LR"] = 19] = "INPUTGROUP_SCRIPT_DPAD_LR";
    InputGroups[InputGroups["INPUTGROUP_SCRIPT_LSTICK_ALL"] = 20] = "INPUTGROUP_SCRIPT_LSTICK_ALL";
    InputGroups[InputGroups["INPUTGROUP_SCRIPT_RSTICK_ALL"] = 21] = "INPUTGROUP_SCRIPT_RSTICK_ALL";
    InputGroups[InputGroups["INPUTGROUP_SCRIPT_BUMPERS"] = 22] = "INPUTGROUP_SCRIPT_BUMPERS";
    InputGroups[InputGroups["INPUTGROUP_SCRIPT_TRIGGERS"] = 23] = "INPUTGROUP_SCRIPT_TRIGGERS";
    InputGroups[InputGroups["INPUTGROUP_WEAPON_WHEEL_CYCLE"] = 24] = "INPUTGROUP_WEAPON_WHEEL_CYCLE";
    InputGroups[InputGroups["INPUTGROUP_FLY"] = 25] = "INPUTGROUP_FLY";
    InputGroups[InputGroups["INPUTGROUP_SUB"] = 26] = "INPUTGROUP_SUB";
    InputGroups[InputGroups["INPUTGROUP_VEH_MOVE_ALL"] = 27] = "INPUTGROUP_VEH_MOVE_ALL";
    InputGroups[InputGroups["INPUTGROUP_CURSOR"] = 28] = "INPUTGROUP_CURSOR";
    InputGroups[InputGroups["INPUTGROUP_CURSOR_SCROLL"] = 29] = "INPUTGROUP_CURSOR_SCROLL";
    InputGroups[InputGroups["INPUTGROUP_SNIPER_ZOOM_SECONDARY"] = 30] = "INPUTGROUP_SNIPER_ZOOM_SECONDARY";
    InputGroups[InputGroups["INPUTGROUP_VEH_HYDRAULICS_CONTROL"] = 31] = "INPUTGROUP_VEH_HYDRAULICS_CONTROL";
    InputGroups[InputGroups["MAX_INPUTGROUPS"] = 32] = "MAX_INPUTGROUPS";
    InputGroups[InputGroups["INPUTGROUP_INVALID"] = 33] = "INPUTGROUP_INVALID";
})(InputGroups = exports.InputGroups || (exports.InputGroups = {}));
;
var Controls;
(function (Controls) {
    Controls[Controls["INPUT_NEXT_CAMERA"] = 0] = "INPUT_NEXT_CAMERA";
    Controls[Controls["INPUT_LOOK_LR"] = 1] = "INPUT_LOOK_LR";
    Controls[Controls["INPUT_LOOK_UD"] = 2] = "INPUT_LOOK_UD";
    Controls[Controls["INPUT_LOOK_UP_ONLY"] = 3] = "INPUT_LOOK_UP_ONLY";
    Controls[Controls["INPUT_LOOK_DOWN_ONLY"] = 4] = "INPUT_LOOK_DOWN_ONLY";
    Controls[Controls["INPUT_LOOK_LEFT_ONLY"] = 5] = "INPUT_LOOK_LEFT_ONLY";
    Controls[Controls["INPUT_LOOK_RIGHT_ONLY"] = 6] = "INPUT_LOOK_RIGHT_ONLY";
    Controls[Controls["INPUT_CINEMATIC_SLOWMO"] = 7] = "INPUT_CINEMATIC_SLOWMO";
    Controls[Controls["INPUT_SCRIPTED_FLY_UD"] = 8] = "INPUT_SCRIPTED_FLY_UD";
    Controls[Controls["INPUT_SCRIPTED_FLY_LR"] = 9] = "INPUT_SCRIPTED_FLY_LR";
    Controls[Controls["INPUT_SCRIPTED_FLY_ZUP"] = 10] = "INPUT_SCRIPTED_FLY_ZUP";
    Controls[Controls["INPUT_SCRIPTED_FLY_ZDOWN"] = 11] = "INPUT_SCRIPTED_FLY_ZDOWN";
    Controls[Controls["INPUT_WEAPON_WHEEL_UD"] = 12] = "INPUT_WEAPON_WHEEL_UD";
    Controls[Controls["INPUT_WEAPON_WHEEL_LR"] = 13] = "INPUT_WEAPON_WHEEL_LR";
    Controls[Controls["INPUT_WEAPON_WHEEL_NEXT"] = 14] = "INPUT_WEAPON_WHEEL_NEXT";
    Controls[Controls["INPUT_WEAPON_WHEEL_PREV"] = 15] = "INPUT_WEAPON_WHEEL_PREV";
    Controls[Controls["INPUT_SELECT_NEXT_WEAPON"] = 16] = "INPUT_SELECT_NEXT_WEAPON";
    Controls[Controls["INPUT_SELECT_PREV_WEAPON"] = 17] = "INPUT_SELECT_PREV_WEAPON";
    Controls[Controls["INPUT_SKIP_CUTSCENE"] = 18] = "INPUT_SKIP_CUTSCENE";
    Controls[Controls["INPUT_CHARACTER_WHEEL"] = 19] = "INPUT_CHARACTER_WHEEL";
    Controls[Controls["INPUT_MULTIPLAYER_INFO"] = 20] = "INPUT_MULTIPLAYER_INFO";
    Controls[Controls["INPUT_SPRINT"] = 21] = "INPUT_SPRINT";
    Controls[Controls["INPUT_JUMP"] = 22] = "INPUT_JUMP";
    Controls[Controls["INPUT_ENTER"] = 23] = "INPUT_ENTER";
    Controls[Controls["INPUT_ATTACK"] = 24] = "INPUT_ATTACK";
    Controls[Controls["INPUT_AIM"] = 25] = "INPUT_AIM";
    Controls[Controls["INPUT_LOOK_BEHIND"] = 26] = "INPUT_LOOK_BEHIND";
    Controls[Controls["INPUT_PHONE"] = 27] = "INPUT_PHONE";
    Controls[Controls["INPUT_SPECIAL_ABILITY"] = 28] = "INPUT_SPECIAL_ABILITY";
    Controls[Controls["INPUT_SPECIAL_ABILITY_SECONDARY"] = 29] = "INPUT_SPECIAL_ABILITY_SECONDARY";
    Controls[Controls["INPUT_MOVE_LR"] = 30] = "INPUT_MOVE_LR";
    Controls[Controls["INPUT_MOVE_UD"] = 31] = "INPUT_MOVE_UD";
    Controls[Controls["INPUT_MOVE_UP_ONLY"] = 32] = "INPUT_MOVE_UP_ONLY";
    Controls[Controls["INPUT_MOVE_DOWN_ONLY"] = 33] = "INPUT_MOVE_DOWN_ONLY";
    Controls[Controls["INPUT_MOVE_LEFT_ONLY"] = 34] = "INPUT_MOVE_LEFT_ONLY";
    Controls[Controls["INPUT_MOVE_RIGHT_ONLY"] = 35] = "INPUT_MOVE_RIGHT_ONLY";
    Controls[Controls["INPUT_DUCK"] = 36] = "INPUT_DUCK";
    Controls[Controls["INPUT_SELECT_WEAPON"] = 37] = "INPUT_SELECT_WEAPON";
    Controls[Controls["INPUT_PICKUP"] = 38] = "INPUT_PICKUP";
    Controls[Controls["INPUT_SNIPER_ZOOM"] = 39] = "INPUT_SNIPER_ZOOM";
    Controls[Controls["INPUT_SNIPER_ZOOM_IN_ONLY"] = 40] = "INPUT_SNIPER_ZOOM_IN_ONLY";
    Controls[Controls["INPUT_SNIPER_ZOOM_OUT_ONLY"] = 41] = "INPUT_SNIPER_ZOOM_OUT_ONLY";
    Controls[Controls["INPUT_SNIPER_ZOOM_IN_SECONDARY"] = 42] = "INPUT_SNIPER_ZOOM_IN_SECONDARY";
    Controls[Controls["INPUT_SNIPER_ZOOM_OUT_SECONDARY"] = 43] = "INPUT_SNIPER_ZOOM_OUT_SECONDARY";
    Controls[Controls["INPUT_COVER"] = 44] = "INPUT_COVER";
    Controls[Controls["INPUT_RELOAD"] = 45] = "INPUT_RELOAD";
    Controls[Controls["INPUT_TALK"] = 46] = "INPUT_TALK";
    Controls[Controls["INPUT_DETONATE"] = 47] = "INPUT_DETONATE";
    Controls[Controls["INPUT_HUD_SPECIAL"] = 48] = "INPUT_HUD_SPECIAL";
    Controls[Controls["INPUT_ARREST"] = 49] = "INPUT_ARREST";
    Controls[Controls["INPUT_ACCURATE_AIM"] = 50] = "INPUT_ACCURATE_AIM";
    Controls[Controls["INPUT_CONTEXT"] = 51] = "INPUT_CONTEXT";
    Controls[Controls["INPUT_CONTEXT_SECONDARY"] = 52] = "INPUT_CONTEXT_SECONDARY";
    Controls[Controls["INPUT_WEAPON_SPECIAL"] = 53] = "INPUT_WEAPON_SPECIAL";
    Controls[Controls["INPUT_WEAPON_SPECIAL_TWO"] = 54] = "INPUT_WEAPON_SPECIAL_TWO";
    Controls[Controls["INPUT_DIVE"] = 55] = "INPUT_DIVE";
    Controls[Controls["INPUT_DROP_WEAPON"] = 56] = "INPUT_DROP_WEAPON";
    Controls[Controls["INPUT_DROP_AMMO"] = 57] = "INPUT_DROP_AMMO";
    Controls[Controls["INPUT_THROW_GRENADE"] = 58] = "INPUT_THROW_GRENADE";
    Controls[Controls["INPUT_VEH_MOVE_LR"] = 59] = "INPUT_VEH_MOVE_LR";
    Controls[Controls["INPUT_VEH_MOVE_UD"] = 60] = "INPUT_VEH_MOVE_UD";
    Controls[Controls["INPUT_VEH_MOVE_UP_ONLY"] = 61] = "INPUT_VEH_MOVE_UP_ONLY";
    Controls[Controls["INPUT_VEH_MOVE_DOWN_ONLY"] = 62] = "INPUT_VEH_MOVE_DOWN_ONLY";
    Controls[Controls["INPUT_VEH_MOVE_LEFT_ONLY"] = 63] = "INPUT_VEH_MOVE_LEFT_ONLY";
    Controls[Controls["INPUT_VEH_MOVE_RIGHT_ONLY"] = 64] = "INPUT_VEH_MOVE_RIGHT_ONLY";
    Controls[Controls["INPUT_VEH_SPECIAL"] = 65] = "INPUT_VEH_SPECIAL";
    Controls[Controls["INPUT_VEH_GUN_LR"] = 66] = "INPUT_VEH_GUN_LR";
    Controls[Controls["INPUT_VEH_GUN_UD"] = 67] = "INPUT_VEH_GUN_UD";
    Controls[Controls["INPUT_VEH_AIM"] = 68] = "INPUT_VEH_AIM";
    Controls[Controls["INPUT_VEH_ATTACK"] = 69] = "INPUT_VEH_ATTACK";
    Controls[Controls["INPUT_VEH_ATTACK2"] = 70] = "INPUT_VEH_ATTACK2";
    Controls[Controls["INPUT_VEH_ACCELERATE"] = 71] = "INPUT_VEH_ACCELERATE";
    Controls[Controls["INPUT_VEH_BRAKE"] = 72] = "INPUT_VEH_BRAKE";
    Controls[Controls["INPUT_VEH_DUCK"] = 73] = "INPUT_VEH_DUCK";
    Controls[Controls["INPUT_VEH_HEADLIGHT"] = 74] = "INPUT_VEH_HEADLIGHT";
    Controls[Controls["INPUT_VEH_EXIT"] = 75] = "INPUT_VEH_EXIT";
    Controls[Controls["INPUT_VEH_HANDBRAKE"] = 76] = "INPUT_VEH_HANDBRAKE";
    Controls[Controls["INPUT_VEH_HOTWIRE_LEFT"] = 77] = "INPUT_VEH_HOTWIRE_LEFT";
    Controls[Controls["INPUT_VEH_HOTWIRE_RIGHT"] = 78] = "INPUT_VEH_HOTWIRE_RIGHT";
    Controls[Controls["INPUT_VEH_LOOK_BEHIND"] = 79] = "INPUT_VEH_LOOK_BEHIND";
    Controls[Controls["INPUT_VEH_CIN_CAM"] = 80] = "INPUT_VEH_CIN_CAM";
    Controls[Controls["INPUT_VEH_NEXT_RADIO"] = 81] = "INPUT_VEH_NEXT_RADIO";
    Controls[Controls["INPUT_VEH_PREV_RADIO"] = 82] = "INPUT_VEH_PREV_RADIO";
    Controls[Controls["INPUT_VEH_NEXT_RADIO_TRACK"] = 83] = "INPUT_VEH_NEXT_RADIO_TRACK";
    Controls[Controls["INPUT_VEH_PREV_RADIO_TRACK"] = 84] = "INPUT_VEH_PREV_RADIO_TRACK";
    Controls[Controls["INPUT_VEH_RADIO_WHEEL"] = 85] = "INPUT_VEH_RADIO_WHEEL";
    Controls[Controls["INPUT_VEH_HORN"] = 86] = "INPUT_VEH_HORN";
    Controls[Controls["INPUT_VEH_FLY_THROTTLE_UP"] = 87] = "INPUT_VEH_FLY_THROTTLE_UP";
    Controls[Controls["INPUT_VEH_FLY_THROTTLE_DOWN"] = 88] = "INPUT_VEH_FLY_THROTTLE_DOWN";
    Controls[Controls["INPUT_VEH_FLY_YAW_LEFT"] = 89] = "INPUT_VEH_FLY_YAW_LEFT";
    Controls[Controls["INPUT_VEH_FLY_YAW_RIGHT"] = 90] = "INPUT_VEH_FLY_YAW_RIGHT";
    Controls[Controls["INPUT_VEH_PASSENGER_AIM"] = 91] = "INPUT_VEH_PASSENGER_AIM";
    Controls[Controls["INPUT_VEH_PASSENGER_ATTACK"] = 92] = "INPUT_VEH_PASSENGER_ATTACK";
    Controls[Controls["INPUT_VEH_SPECIAL_ABILITY_FRANKLIN"] = 93] = "INPUT_VEH_SPECIAL_ABILITY_FRANKLIN";
    Controls[Controls["INPUT_VEH_STUNT_UD"] = 94] = "INPUT_VEH_STUNT_UD";
    Controls[Controls["INPUT_VEH_CINEMATIC_UD"] = 95] = "INPUT_VEH_CINEMATIC_UD";
    Controls[Controls["INPUT_VEH_CINEMATIC_UP_ONLY"] = 96] = "INPUT_VEH_CINEMATIC_UP_ONLY";
    Controls[Controls["INPUT_VEH_CINEMATIC_DOWN_ONLY"] = 97] = "INPUT_VEH_CINEMATIC_DOWN_ONLY";
    Controls[Controls["INPUT_VEH_CINEMATIC_LR"] = 98] = "INPUT_VEH_CINEMATIC_LR";
    Controls[Controls["INPUT_VEH_SELECT_NEXT_WEAPON"] = 99] = "INPUT_VEH_SELECT_NEXT_WEAPON";
    Controls[Controls["INPUT_VEH_SELECT_PREV_WEAPON"] = 100] = "INPUT_VEH_SELECT_PREV_WEAPON";
    Controls[Controls["INPUT_VEH_ROOF"] = 101] = "INPUT_VEH_ROOF";
    Controls[Controls["INPUT_VEH_JUMP"] = 102] = "INPUT_VEH_JUMP";
    Controls[Controls["INPUT_VEH_GRAPPLING_HOOK"] = 103] = "INPUT_VEH_GRAPPLING_HOOK";
    Controls[Controls["INPUT_VEH_SHUFFLE"] = 104] = "INPUT_VEH_SHUFFLE";
    Controls[Controls["INPUT_VEH_DROP_PROJECTILE"] = 105] = "INPUT_VEH_DROP_PROJECTILE";
    Controls[Controls["INPUT_VEH_MOUSE_CONTROL_OVERRIDE"] = 106] = "INPUT_VEH_MOUSE_CONTROL_OVERRIDE";
    Controls[Controls["INPUT_VEH_FLY_ROLL_LR"] = 107] = "INPUT_VEH_FLY_ROLL_LR";
    Controls[Controls["INPUT_VEH_FLY_ROLL_LEFT_ONLY"] = 108] = "INPUT_VEH_FLY_ROLL_LEFT_ONLY";
    Controls[Controls["INPUT_VEH_FLY_ROLL_RIGHT_ONLY"] = 109] = "INPUT_VEH_FLY_ROLL_RIGHT_ONLY";
    Controls[Controls["INPUT_VEH_FLY_PITCH_UD"] = 110] = "INPUT_VEH_FLY_PITCH_UD";
    Controls[Controls["INPUT_VEH_FLY_PITCH_UP_ONLY"] = 111] = "INPUT_VEH_FLY_PITCH_UP_ONLY";
    Controls[Controls["INPUT_VEH_FLY_PITCH_DOWN_ONLY"] = 112] = "INPUT_VEH_FLY_PITCH_DOWN_ONLY";
    Controls[Controls["INPUT_VEH_FLY_UNDERCARRIAGE"] = 113] = "INPUT_VEH_FLY_UNDERCARRIAGE";
    Controls[Controls["INPUT_VEH_FLY_ATTACK"] = 114] = "INPUT_VEH_FLY_ATTACK";
    Controls[Controls["INPUT_VEH_FLY_SELECT_NEXT_WEAPON"] = 115] = "INPUT_VEH_FLY_SELECT_NEXT_WEAPON";
    Controls[Controls["INPUT_VEH_FLY_SELECT_PREV_WEAPON"] = 116] = "INPUT_VEH_FLY_SELECT_PREV_WEAPON";
    Controls[Controls["INPUT_VEH_FLY_SELECT_TARGET_LEFT"] = 117] = "INPUT_VEH_FLY_SELECT_TARGET_LEFT";
    Controls[Controls["INPUT_VEH_FLY_SELECT_TARGET_RIGHT"] = 118] = "INPUT_VEH_FLY_SELECT_TARGET_RIGHT";
    Controls[Controls["INPUT_VEH_FLY_VERTICAL_FLIGHT_MODE"] = 119] = "INPUT_VEH_FLY_VERTICAL_FLIGHT_MODE";
    Controls[Controls["INPUT_VEH_FLY_DUCK"] = 120] = "INPUT_VEH_FLY_DUCK";
    Controls[Controls["INPUT_VEH_FLY_ATTACK_CAMERA"] = 121] = "INPUT_VEH_FLY_ATTACK_CAMERA";
    Controls[Controls["INPUT_VEH_FLY_MOUSE_CONTROL_OVERRIDE"] = 122] = "INPUT_VEH_FLY_MOUSE_CONTROL_OVERRIDE";
    Controls[Controls["INPUT_VEH_SUB_TURN_LR"] = 123] = "INPUT_VEH_SUB_TURN_LR";
    Controls[Controls["INPUT_VEH_SUB_TURN_LEFT_ONLY"] = 124] = "INPUT_VEH_SUB_TURN_LEFT_ONLY";
    Controls[Controls["INPUT_VEH_SUB_TURN_RIGHT_ONLY"] = 125] = "INPUT_VEH_SUB_TURN_RIGHT_ONLY";
    Controls[Controls["INPUT_VEH_SUB_PITCH_UD"] = 126] = "INPUT_VEH_SUB_PITCH_UD";
    Controls[Controls["INPUT_VEH_SUB_PITCH_UP_ONLY"] = 127] = "INPUT_VEH_SUB_PITCH_UP_ONLY";
    Controls[Controls["INPUT_VEH_SUB_PITCH_DOWN_ONLY"] = 128] = "INPUT_VEH_SUB_PITCH_DOWN_ONLY";
    Controls[Controls["INPUT_VEH_SUB_THROTTLE_UP"] = 129] = "INPUT_VEH_SUB_THROTTLE_UP";
    Controls[Controls["INPUT_VEH_SUB_THROTTLE_DOWN"] = 130] = "INPUT_VEH_SUB_THROTTLE_DOWN";
    Controls[Controls["INPUT_VEH_SUB_ASCEND"] = 131] = "INPUT_VEH_SUB_ASCEND";
    Controls[Controls["INPUT_VEH_SUB_DESCEND"] = 132] = "INPUT_VEH_SUB_DESCEND";
    Controls[Controls["INPUT_VEH_SUB_TURN_HARD_LEFT"] = 133] = "INPUT_VEH_SUB_TURN_HARD_LEFT";
    Controls[Controls["INPUT_VEH_SUB_TURN_HARD_RIGHT"] = 134] = "INPUT_VEH_SUB_TURN_HARD_RIGHT";
    Controls[Controls["INPUT_VEH_SUB_MOUSE_CONTROL_OVERRIDE"] = 135] = "INPUT_VEH_SUB_MOUSE_CONTROL_OVERRIDE";
    Controls[Controls["INPUT_VEH_PUSHBIKE_PEDAL"] = 136] = "INPUT_VEH_PUSHBIKE_PEDAL";
    Controls[Controls["INPUT_VEH_PUSHBIKE_SPRINT"] = 137] = "INPUT_VEH_PUSHBIKE_SPRINT";
    Controls[Controls["INPUT_VEH_PUSHBIKE_FRONT_BRAKE"] = 138] = "INPUT_VEH_PUSHBIKE_FRONT_BRAKE";
    Controls[Controls["INPUT_VEH_PUSHBIKE_REAR_BRAKE"] = 139] = "INPUT_VEH_PUSHBIKE_REAR_BRAKE";
    Controls[Controls["INPUT_MELEE_ATTACK_LIGHT"] = 140] = "INPUT_MELEE_ATTACK_LIGHT";
    Controls[Controls["INPUT_MELEE_ATTACK_HEAVY"] = 141] = "INPUT_MELEE_ATTACK_HEAVY";
    Controls[Controls["INPUT_MELEE_ATTACK_ALTERNATE"] = 142] = "INPUT_MELEE_ATTACK_ALTERNATE";
    Controls[Controls["INPUT_MELEE_BLOCK"] = 143] = "INPUT_MELEE_BLOCK";
    Controls[Controls["INPUT_PARACHUTE_DEPLOY"] = 144] = "INPUT_PARACHUTE_DEPLOY";
    Controls[Controls["INPUT_PARACHUTE_DETACH"] = 145] = "INPUT_PARACHUTE_DETACH";
    Controls[Controls["INPUT_PARACHUTE_TURN_LR"] = 146] = "INPUT_PARACHUTE_TURN_LR";
    Controls[Controls["INPUT_PARACHUTE_TURN_LEFT_ONLY"] = 147] = "INPUT_PARACHUTE_TURN_LEFT_ONLY";
    Controls[Controls["INPUT_PARACHUTE_TURN_RIGHT_ONLY"] = 148] = "INPUT_PARACHUTE_TURN_RIGHT_ONLY";
    Controls[Controls["INPUT_PARACHUTE_PITCH_UD"] = 149] = "INPUT_PARACHUTE_PITCH_UD";
    Controls[Controls["INPUT_PARACHUTE_PITCH_UP_ONLY"] = 150] = "INPUT_PARACHUTE_PITCH_UP_ONLY";
    Controls[Controls["INPUT_PARACHUTE_PITCH_DOWN_ONLY"] = 151] = "INPUT_PARACHUTE_PITCH_DOWN_ONLY";
    Controls[Controls["INPUT_PARACHUTE_BRAKE_LEFT"] = 152] = "INPUT_PARACHUTE_BRAKE_LEFT";
    Controls[Controls["INPUT_PARACHUTE_BRAKE_RIGHT"] = 153] = "INPUT_PARACHUTE_BRAKE_RIGHT";
    Controls[Controls["INPUT_PARACHUTE_SMOKE"] = 154] = "INPUT_PARACHUTE_SMOKE";
    Controls[Controls["INPUT_PARACHUTE_PRECISION_LANDING"] = 155] = "INPUT_PARACHUTE_PRECISION_LANDING";
    Controls[Controls["INPUT_MAP"] = 156] = "INPUT_MAP";
    Controls[Controls["INPUT_SELECT_WEAPON_UNARMED"] = 157] = "INPUT_SELECT_WEAPON_UNARMED";
    Controls[Controls["INPUT_SELECT_WEAPON_MELEE"] = 158] = "INPUT_SELECT_WEAPON_MELEE";
    Controls[Controls["INPUT_SELECT_WEAPON_HANDGUN"] = 159] = "INPUT_SELECT_WEAPON_HANDGUN";
    Controls[Controls["INPUT_SELECT_WEAPON_SHOTGUN"] = 160] = "INPUT_SELECT_WEAPON_SHOTGUN";
    Controls[Controls["INPUT_SELECT_WEAPON_SMG"] = 161] = "INPUT_SELECT_WEAPON_SMG";
    Controls[Controls["INPUT_SELECT_WEAPON_AUTO_RIFLE"] = 162] = "INPUT_SELECT_WEAPON_AUTO_RIFLE";
    Controls[Controls["INPUT_SELECT_WEAPON_SNIPER"] = 163] = "INPUT_SELECT_WEAPON_SNIPER";
    Controls[Controls["INPUT_SELECT_WEAPON_HEAVY"] = 164] = "INPUT_SELECT_WEAPON_HEAVY";
    Controls[Controls["INPUT_SELECT_WEAPON_SPECIAL"] = 165] = "INPUT_SELECT_WEAPON_SPECIAL";
    Controls[Controls["INPUT_SELECT_CHARACTER_MICHAEL"] = 166] = "INPUT_SELECT_CHARACTER_MICHAEL";
    Controls[Controls["INPUT_SELECT_CHARACTER_FRANKLIN"] = 167] = "INPUT_SELECT_CHARACTER_FRANKLIN";
    Controls[Controls["INPUT_SELECT_CHARACTER_TREVOR"] = 168] = "INPUT_SELECT_CHARACTER_TREVOR";
    Controls[Controls["INPUT_SELECT_CHARACTER_MULTIPLAYER"] = 169] = "INPUT_SELECT_CHARACTER_MULTIPLAYER";
    Controls[Controls["INPUT_SAVE_REPLAY_CLIP"] = 170] = "INPUT_SAVE_REPLAY_CLIP";
    Controls[Controls["INPUT_SPECIAL_ABILITY_PC"] = 171] = "INPUT_SPECIAL_ABILITY_PC";
    Controls[Controls["INPUT_CELLPHONE_UP"] = 172] = "INPUT_CELLPHONE_UP";
    Controls[Controls["INPUT_CELLPHONE_DOWN"] = 173] = "INPUT_CELLPHONE_DOWN";
    Controls[Controls["INPUT_CELLPHONE_LEFT"] = 174] = "INPUT_CELLPHONE_LEFT";
    Controls[Controls["INPUT_CELLPHONE_RIGHT"] = 175] = "INPUT_CELLPHONE_RIGHT";
    Controls[Controls["INPUT_CELLPHONE_SELECT"] = 176] = "INPUT_CELLPHONE_SELECT";
    Controls[Controls["INPUT_CELLPHONE_CANCEL"] = 177] = "INPUT_CELLPHONE_CANCEL";
    Controls[Controls["INPUT_CELLPHONE_OPTION"] = 178] = "INPUT_CELLPHONE_OPTION";
    Controls[Controls["INPUT_CELLPHONE_EXTRA_OPTION"] = 179] = "INPUT_CELLPHONE_EXTRA_OPTION";
    Controls[Controls["INPUT_CELLPHONE_SCROLL_FORWARD"] = 180] = "INPUT_CELLPHONE_SCROLL_FORWARD";
    Controls[Controls["INPUT_CELLPHONE_SCROLL_BACKWARD"] = 181] = "INPUT_CELLPHONE_SCROLL_BACKWARD";
    Controls[Controls["INPUT_CELLPHONE_CAMERA_FOCUS_LOCK"] = 182] = "INPUT_CELLPHONE_CAMERA_FOCUS_LOCK";
    Controls[Controls["INPUT_CELLPHONE_CAMERA_GRID"] = 183] = "INPUT_CELLPHONE_CAMERA_GRID";
    Controls[Controls["INPUT_CELLPHONE_CAMERA_SELFIE"] = 184] = "INPUT_CELLPHONE_CAMERA_SELFIE";
    Controls[Controls["INPUT_CELLPHONE_CAMERA_DOF"] = 185] = "INPUT_CELLPHONE_CAMERA_DOF";
    Controls[Controls["INPUT_CELLPHONE_CAMERA_EXPRESSION"] = 186] = "INPUT_CELLPHONE_CAMERA_EXPRESSION";
    Controls[Controls["INPUT_FRONTEND_DOWN"] = 187] = "INPUT_FRONTEND_DOWN";
    Controls[Controls["INPUT_FRONTEND_UP"] = 188] = "INPUT_FRONTEND_UP";
    Controls[Controls["INPUT_FRONTEND_LEFT"] = 189] = "INPUT_FRONTEND_LEFT";
    Controls[Controls["INPUT_FRONTEND_RIGHT"] = 190] = "INPUT_FRONTEND_RIGHT";
    Controls[Controls["INPUT_FRONTEND_RDOWN"] = 191] = "INPUT_FRONTEND_RDOWN";
    Controls[Controls["INPUT_FRONTEND_RUP"] = 192] = "INPUT_FRONTEND_RUP";
    Controls[Controls["INPUT_FRONTEND_RLEFT"] = 193] = "INPUT_FRONTEND_RLEFT";
    Controls[Controls["INPUT_FRONTEND_RRIGHT"] = 194] = "INPUT_FRONTEND_RRIGHT";
    Controls[Controls["INPUT_FRONTEND_AXIS_X"] = 195] = "INPUT_FRONTEND_AXIS_X";
    Controls[Controls["INPUT_FRONTEND_AXIS_Y"] = 196] = "INPUT_FRONTEND_AXIS_Y";
    Controls[Controls["INPUT_FRONTEND_RIGHT_AXIS_X"] = 197] = "INPUT_FRONTEND_RIGHT_AXIS_X";
    Controls[Controls["INPUT_FRONTEND_RIGHT_AXIS_Y"] = 198] = "INPUT_FRONTEND_RIGHT_AXIS_Y";
    Controls[Controls["INPUT_FRONTEND_PAUSE"] = 199] = "INPUT_FRONTEND_PAUSE";
    Controls[Controls["INPUT_FRONTEND_PAUSE_ALTERNATE"] = 200] = "INPUT_FRONTEND_PAUSE_ALTERNATE";
    Controls[Controls["INPUT_FRONTEND_ACCEPT"] = 201] = "INPUT_FRONTEND_ACCEPT";
    Controls[Controls["INPUT_FRONTEND_CANCEL"] = 202] = "INPUT_FRONTEND_CANCEL";
    Controls[Controls["INPUT_FRONTEND_X"] = 203] = "INPUT_FRONTEND_X";
    Controls[Controls["INPUT_FRONTEND_Y"] = 204] = "INPUT_FRONTEND_Y";
    Controls[Controls["INPUT_FRONTEND_LB"] = 205] = "INPUT_FRONTEND_LB";
    Controls[Controls["INPUT_FRONTEND_RB"] = 206] = "INPUT_FRONTEND_RB";
    Controls[Controls["INPUT_FRONTEND_LT"] = 207] = "INPUT_FRONTEND_LT";
    Controls[Controls["INPUT_FRONTEND_RT"] = 208] = "INPUT_FRONTEND_RT";
    Controls[Controls["INPUT_FRONTEND_LS"] = 209] = "INPUT_FRONTEND_LS";
    Controls[Controls["INPUT_FRONTEND_RS"] = 210] = "INPUT_FRONTEND_RS";
    Controls[Controls["INPUT_FRONTEND_LEADERBOARD"] = 211] = "INPUT_FRONTEND_LEADERBOARD";
    Controls[Controls["INPUT_FRONTEND_SOCIAL_CLUB"] = 212] = "INPUT_FRONTEND_SOCIAL_CLUB";
    Controls[Controls["INPUT_FRONTEND_SOCIAL_CLUB_SECONDARY"] = 213] = "INPUT_FRONTEND_SOCIAL_CLUB_SECONDARY";
    Controls[Controls["INPUT_FRONTEND_DELETE"] = 214] = "INPUT_FRONTEND_DELETE";
    Controls[Controls["INPUT_FRONTEND_ENDSCREEN_ACCEPT"] = 215] = "INPUT_FRONTEND_ENDSCREEN_ACCEPT";
    Controls[Controls["INPUT_FRONTEND_ENDSCREEN_EXPAND"] = 216] = "INPUT_FRONTEND_ENDSCREEN_EXPAND";
    Controls[Controls["INPUT_FRONTEND_SELECT"] = 217] = "INPUT_FRONTEND_SELECT";
    Controls[Controls["INPUT_SCRIPT_LEFT_AXIS_X"] = 218] = "INPUT_SCRIPT_LEFT_AXIS_X";
    Controls[Controls["INPUT_SCRIPT_LEFT_AXIS_Y"] = 219] = "INPUT_SCRIPT_LEFT_AXIS_Y";
    Controls[Controls["INPUT_SCRIPT_RIGHT_AXIS_X"] = 220] = "INPUT_SCRIPT_RIGHT_AXIS_X";
    Controls[Controls["INPUT_SCRIPT_RIGHT_AXIS_Y"] = 221] = "INPUT_SCRIPT_RIGHT_AXIS_Y";
    Controls[Controls["INPUT_SCRIPT_RUP"] = 222] = "INPUT_SCRIPT_RUP";
    Controls[Controls["INPUT_SCRIPT_RDOWN"] = 223] = "INPUT_SCRIPT_RDOWN";
    Controls[Controls["INPUT_SCRIPT_RLEFT"] = 224] = "INPUT_SCRIPT_RLEFT";
    Controls[Controls["INPUT_SCRIPT_RRIGHT"] = 225] = "INPUT_SCRIPT_RRIGHT";
    Controls[Controls["INPUT_SCRIPT_LB"] = 226] = "INPUT_SCRIPT_LB";
    Controls[Controls["INPUT_SCRIPT_RB"] = 227] = "INPUT_SCRIPT_RB";
    Controls[Controls["INPUT_SCRIPT_LT"] = 228] = "INPUT_SCRIPT_LT";
    Controls[Controls["INPUT_SCRIPT_RT"] = 229] = "INPUT_SCRIPT_RT";
    Controls[Controls["INPUT_SCRIPT_LS"] = 230] = "INPUT_SCRIPT_LS";
    Controls[Controls["INPUT_SCRIPT_RS"] = 231] = "INPUT_SCRIPT_RS";
    Controls[Controls["INPUT_SCRIPT_PAD_UP"] = 232] = "INPUT_SCRIPT_PAD_UP";
    Controls[Controls["INPUT_SCRIPT_PAD_DOWN"] = 233] = "INPUT_SCRIPT_PAD_DOWN";
    Controls[Controls["INPUT_SCRIPT_PAD_LEFT"] = 234] = "INPUT_SCRIPT_PAD_LEFT";
    Controls[Controls["INPUT_SCRIPT_PAD_RIGHT"] = 235] = "INPUT_SCRIPT_PAD_RIGHT";
    Controls[Controls["INPUT_SCRIPT_SELECT"] = 236] = "INPUT_SCRIPT_SELECT";
    Controls[Controls["INPUT_CURSOR_ACCEPT"] = 237] = "INPUT_CURSOR_ACCEPT";
    Controls[Controls["INPUT_CURSOR_CANCEL"] = 238] = "INPUT_CURSOR_CANCEL";
    Controls[Controls["INPUT_CURSOR_X"] = 239] = "INPUT_CURSOR_X";
    Controls[Controls["INPUT_CURSOR_Y"] = 240] = "INPUT_CURSOR_Y";
    Controls[Controls["INPUT_CURSOR_SCROLL_UP"] = 241] = "INPUT_CURSOR_SCROLL_UP";
    Controls[Controls["INPUT_CURSOR_SCROLL_DOWN"] = 242] = "INPUT_CURSOR_SCROLL_DOWN";
    Controls[Controls["INPUT_ENTER_CHEAT_CODE"] = 243] = "INPUT_ENTER_CHEAT_CODE";
    Controls[Controls["INPUT_INTERACTION_MENU"] = 244] = "INPUT_INTERACTION_MENU";
    Controls[Controls["INPUT_MP_TEXT_CHAT_ALL"] = 245] = "INPUT_MP_TEXT_CHAT_ALL";
    Controls[Controls["INPUT_MP_TEXT_CHAT_TEAM"] = 246] = "INPUT_MP_TEXT_CHAT_TEAM";
    Controls[Controls["INPUT_MP_TEXT_CHAT_FRIENDS"] = 247] = "INPUT_MP_TEXT_CHAT_FRIENDS";
    Controls[Controls["INPUT_MP_TEXT_CHAT_CREW"] = 248] = "INPUT_MP_TEXT_CHAT_CREW";
    Controls[Controls["INPUT_PUSH_TO_TALK"] = 249] = "INPUT_PUSH_TO_TALK";
    Controls[Controls["INPUT_CREATOR_LS"] = 250] = "INPUT_CREATOR_LS";
    Controls[Controls["INPUT_CREATOR_RS"] = 251] = "INPUT_CREATOR_RS";
    Controls[Controls["INPUT_CREATOR_LT"] = 252] = "INPUT_CREATOR_LT";
    Controls[Controls["INPUT_CREATOR_RT"] = 253] = "INPUT_CREATOR_RT";
    Controls[Controls["INPUT_CREATOR_MENU_TOGGLE"] = 254] = "INPUT_CREATOR_MENU_TOGGLE";
    Controls[Controls["INPUT_CREATOR_ACCEPT"] = 255] = "INPUT_CREATOR_ACCEPT";
    Controls[Controls["INPUT_CREATOR_DELETE"] = 256] = "INPUT_CREATOR_DELETE";
    Controls[Controls["INPUT_ATTACK2"] = 257] = "INPUT_ATTACK2";
    Controls[Controls["INPUT_RAPPEL_JUMP"] = 258] = "INPUT_RAPPEL_JUMP";
    Controls[Controls["INPUT_RAPPEL_LONG_JUMP"] = 259] = "INPUT_RAPPEL_LONG_JUMP";
    Controls[Controls["INPUT_RAPPEL_SMASH_WINDOW"] = 260] = "INPUT_RAPPEL_SMASH_WINDOW";
    Controls[Controls["INPUT_PREV_WEAPON"] = 261] = "INPUT_PREV_WEAPON";
    Controls[Controls["INPUT_NEXT_WEAPON"] = 262] = "INPUT_NEXT_WEAPON";
    Controls[Controls["INPUT_MELEE_ATTACK1"] = 263] = "INPUT_MELEE_ATTACK1";
    Controls[Controls["INPUT_MELEE_ATTACK2"] = 264] = "INPUT_MELEE_ATTACK2";
    Controls[Controls["INPUT_WHISTLE"] = 265] = "INPUT_WHISTLE";
    Controls[Controls["INPUT_MOVE_LEFT"] = 266] = "INPUT_MOVE_LEFT";
    Controls[Controls["INPUT_MOVE_RIGHT"] = 267] = "INPUT_MOVE_RIGHT";
    Controls[Controls["INPUT_MOVE_UP"] = 268] = "INPUT_MOVE_UP";
    Controls[Controls["INPUT_MOVE_DOWN"] = 269] = "INPUT_MOVE_DOWN";
    Controls[Controls["INPUT_LOOK_LEFT"] = 270] = "INPUT_LOOK_LEFT";
    Controls[Controls["INPUT_LOOK_RIGHT"] = 271] = "INPUT_LOOK_RIGHT";
    Controls[Controls["INPUT_LOOK_UP"] = 272] = "INPUT_LOOK_UP";
    Controls[Controls["INPUT_LOOK_DOWN"] = 273] = "INPUT_LOOK_DOWN";
    Controls[Controls["INPUT_SNIPER_ZOOM_IN"] = 274] = "INPUT_SNIPER_ZOOM_IN";
    Controls[Controls["INPUT_SNIPER_ZOOM_OUT"] = 275] = "INPUT_SNIPER_ZOOM_OUT";
    Controls[Controls["INPUT_SNIPER_ZOOM_IN_ALTERNATE"] = 276] = "INPUT_SNIPER_ZOOM_IN_ALTERNATE";
    Controls[Controls["INPUT_SNIPER_ZOOM_OUT_ALTERNATE"] = 277] = "INPUT_SNIPER_ZOOM_OUT_ALTERNATE";
    Controls[Controls["INPUT_VEH_MOVE_LEFT"] = 278] = "INPUT_VEH_MOVE_LEFT";
    Controls[Controls["INPUT_VEH_MOVE_RIGHT"] = 279] = "INPUT_VEH_MOVE_RIGHT";
    Controls[Controls["INPUT_VEH_MOVE_UP"] = 280] = "INPUT_VEH_MOVE_UP";
    Controls[Controls["INPUT_VEH_MOVE_DOWN"] = 281] = "INPUT_VEH_MOVE_DOWN";
    Controls[Controls["INPUT_VEH_GUN_LEFT"] = 282] = "INPUT_VEH_GUN_LEFT";
    Controls[Controls["INPUT_VEH_GUN_RIGHT"] = 283] = "INPUT_VEH_GUN_RIGHT";
    Controls[Controls["INPUT_VEH_GUN_UP"] = 284] = "INPUT_VEH_GUN_UP";
    Controls[Controls["INPUT_VEH_GUN_DOWN"] = 285] = "INPUT_VEH_GUN_DOWN";
    Controls[Controls["INPUT_VEH_LOOK_LEFT"] = 286] = "INPUT_VEH_LOOK_LEFT";
    Controls[Controls["INPUT_VEH_LOOK_RIGHT"] = 287] = "INPUT_VEH_LOOK_RIGHT";
    Controls[Controls["INPUT_REPLAY_START_STOP_RECORDING"] = 288] = "INPUT_REPLAY_START_STOP_RECORDING";
    Controls[Controls["INPUT_REPLAY_START_STOP_RECORDING_SECONDARY"] = 289] = "INPUT_REPLAY_START_STOP_RECORDING_SECONDARY";
    Controls[Controls["INPUT_SCALED_LOOK_LR"] = 290] = "INPUT_SCALED_LOOK_LR";
    Controls[Controls["INPUT_SCALED_LOOK_UD"] = 291] = "INPUT_SCALED_LOOK_UD";
    Controls[Controls["INPUT_SCALED_LOOK_UP_ONLY"] = 292] = "INPUT_SCALED_LOOK_UP_ONLY";
    Controls[Controls["INPUT_SCALED_LOOK_DOWN_ONLY"] = 293] = "INPUT_SCALED_LOOK_DOWN_ONLY";
    Controls[Controls["INPUT_SCALED_LOOK_LEFT_ONLY"] = 294] = "INPUT_SCALED_LOOK_LEFT_ONLY";
    Controls[Controls["INPUT_SCALED_LOOK_RIGHT_ONLY"] = 295] = "INPUT_SCALED_LOOK_RIGHT_ONLY";
    Controls[Controls["INPUT_REPLAY_MARKER_DELETE"] = 296] = "INPUT_REPLAY_MARKER_DELETE";
    Controls[Controls["INPUT_REPLAY_CLIP_DELETE"] = 297] = "INPUT_REPLAY_CLIP_DELETE";
    Controls[Controls["INPUT_REPLAY_PAUSE"] = 298] = "INPUT_REPLAY_PAUSE";
    Controls[Controls["INPUT_REPLAY_REWIND"] = 299] = "INPUT_REPLAY_REWIND";
    Controls[Controls["INPUT_REPLAY_FFWD"] = 300] = "INPUT_REPLAY_FFWD";
    Controls[Controls["INPUT_REPLAY_NEWMARKER"] = 301] = "INPUT_REPLAY_NEWMARKER";
    Controls[Controls["INPUT_REPLAY_RECORD"] = 302] = "INPUT_REPLAY_RECORD";
    Controls[Controls["INPUT_REPLAY_SCREENSHOT"] = 303] = "INPUT_REPLAY_SCREENSHOT";
    Controls[Controls["INPUT_REPLAY_HIDEHUD"] = 304] = "INPUT_REPLAY_HIDEHUD";
    Controls[Controls["INPUT_REPLAY_STARTPOINT"] = 305] = "INPUT_REPLAY_STARTPOINT";
    Controls[Controls["INPUT_REPLAY_ENDPOINT"] = 306] = "INPUT_REPLAY_ENDPOINT";
    Controls[Controls["INPUT_REPLAY_ADVANCE"] = 307] = "INPUT_REPLAY_ADVANCE";
    Controls[Controls["INPUT_REPLAY_BACK"] = 308] = "INPUT_REPLAY_BACK";
    Controls[Controls["INPUT_REPLAY_TOOLS"] = 309] = "INPUT_REPLAY_TOOLS";
    Controls[Controls["INPUT_REPLAY_RESTART"] = 310] = "INPUT_REPLAY_RESTART";
    Controls[Controls["INPUT_REPLAY_SHOWHOTKEY"] = 311] = "INPUT_REPLAY_SHOWHOTKEY";
    Controls[Controls["INPUT_REPLAY_CYCLEMARKERLEFT"] = 312] = "INPUT_REPLAY_CYCLEMARKERLEFT";
    Controls[Controls["INPUT_REPLAY_CYCLEMARKERRIGHT"] = 313] = "INPUT_REPLAY_CYCLEMARKERRIGHT";
    Controls[Controls["INPUT_REPLAY_FOVINCREASE"] = 314] = "INPUT_REPLAY_FOVINCREASE";
    Controls[Controls["INPUT_REPLAY_FOVDECREASE"] = 315] = "INPUT_REPLAY_FOVDECREASE";
    Controls[Controls["INPUT_REPLAY_CAMERAUP"] = 316] = "INPUT_REPLAY_CAMERAUP";
    Controls[Controls["INPUT_REPLAY_CAMERADOWN"] = 317] = "INPUT_REPLAY_CAMERADOWN";
    Controls[Controls["INPUT_REPLAY_SAVE"] = 318] = "INPUT_REPLAY_SAVE";
    Controls[Controls["INPUT_REPLAY_TOGGLETIME"] = 319] = "INPUT_REPLAY_TOGGLETIME";
    Controls[Controls["INPUT_REPLAY_TOGGLETIPS"] = 320] = "INPUT_REPLAY_TOGGLETIPS";
    Controls[Controls["INPUT_REPLAY_PREVIEW"] = 321] = "INPUT_REPLAY_PREVIEW";
    Controls[Controls["INPUT_REPLAY_TOGGLE_TIMELINE"] = 322] = "INPUT_REPLAY_TOGGLE_TIMELINE";
    Controls[Controls["INPUT_REPLAY_TIMELINE_PICKUP_CLIP"] = 323] = "INPUT_REPLAY_TIMELINE_PICKUP_CLIP";
    Controls[Controls["INPUT_REPLAY_TIMELINE_DUPLICATE_CLIP"] = 324] = "INPUT_REPLAY_TIMELINE_DUPLICATE_CLIP";
    Controls[Controls["INPUT_REPLAY_TIMELINE_PLACE_CLIP"] = 325] = "INPUT_REPLAY_TIMELINE_PLACE_CLIP";
    Controls[Controls["INPUT_REPLAY_CTRL"] = 326] = "INPUT_REPLAY_CTRL";
    Controls[Controls["INPUT_REPLAY_TIMELINE_SAVE"] = 327] = "INPUT_REPLAY_TIMELINE_SAVE";
    Controls[Controls["INPUT_REPLAY_PREVIEW_AUDIO"] = 328] = "INPUT_REPLAY_PREVIEW_AUDIO";
    Controls[Controls["INPUT_VEH_DRIVE_LOOK"] = 329] = "INPUT_VEH_DRIVE_LOOK";
    Controls[Controls["INPUT_VEH_DRIVE_LOOK2"] = 330] = "INPUT_VEH_DRIVE_LOOK2";
    Controls[Controls["INPUT_VEH_FLY_ATTACK2"] = 331] = "INPUT_VEH_FLY_ATTACK2";
    Controls[Controls["INPUT_RADIO_WHEEL_UD"] = 332] = "INPUT_RADIO_WHEEL_UD";
    Controls[Controls["INPUT_RADIO_WHEEL_LR"] = 333] = "INPUT_RADIO_WHEEL_LR";
    Controls[Controls["INPUT_VEH_SLOWMO_UD"] = 334] = "INPUT_VEH_SLOWMO_UD";
    Controls[Controls["INPUT_VEH_SLOWMO_UP_ONLY"] = 335] = "INPUT_VEH_SLOWMO_UP_ONLY";
    Controls[Controls["INPUT_VEH_SLOWMO_DOWN_ONLY"] = 336] = "INPUT_VEH_SLOWMO_DOWN_ONLY";
    Controls[Controls["INPUT_VEH_HYDRAULICS_CONTROL_TOGGLE"] = 337] = "INPUT_VEH_HYDRAULICS_CONTROL_TOGGLE";
    Controls[Controls["INPUT_VEH_HYDRAULICS_CONTROL_LEFT"] = 338] = "INPUT_VEH_HYDRAULICS_CONTROL_LEFT";
    Controls[Controls["INPUT_VEH_HYDRAULICS_CONTROL_RIGHT"] = 339] = "INPUT_VEH_HYDRAULICS_CONTROL_RIGHT";
    Controls[Controls["INPUT_VEH_HYDRAULICS_CONTROL_UP"] = 340] = "INPUT_VEH_HYDRAULICS_CONTROL_UP";
    Controls[Controls["INPUT_VEH_HYDRAULICS_CONTROL_DOWN"] = 341] = "INPUT_VEH_HYDRAULICS_CONTROL_DOWN";
    Controls[Controls["INPUT_VEH_HYDRAULICS_CONTROL_LR"] = 342] = "INPUT_VEH_HYDRAULICS_CONTROL_LR";
    Controls[Controls["INPUT_VEH_HYDRAULICS_CONTROL_UD"] = 343] = "INPUT_VEH_HYDRAULICS_CONTROL_UD";
    Controls[Controls["INPUT_SWITCH_VISOR"] = 344] = "INPUT_SWITCH_VISOR";
    Controls[Controls["INPUT_VEH_MELEE_HOLD"] = 345] = "INPUT_VEH_MELEE_HOLD";
    Controls[Controls["INPUT_VEH_MELEE_LEFT"] = 346] = "INPUT_VEH_MELEE_LEFT";
    Controls[Controls["INPUT_VEH_MELEE_RIGHT"] = 347] = "INPUT_VEH_MELEE_RIGHT";
    Controls[Controls["INPUT_MAP_POI"] = 348] = "INPUT_MAP_POI";
    Controls[Controls["INPUT_REPLAY_SNAPMATIC_PHOTO"] = 349] = "INPUT_REPLAY_SNAPMATIC_PHOTO";
    Controls[Controls["INPUT_VEH_CAR_JUMP"] = 350] = "INPUT_VEH_CAR_JUMP";
    Controls[Controls["INPUT_VEH_ROCKET_BOOST"] = 351] = "INPUT_VEH_ROCKET_BOOST";
    Controls[Controls["INPUT_VEH_FLY_BOOST"] = 352] = "INPUT_VEH_FLY_BOOST";
    Controls[Controls["INPUT_VEH_PARACHUTE"] = 353] = "INPUT_VEH_PARACHUTE";
    Controls[Controls["INPUT_VEH_BIKE_WINGS"] = 354] = "INPUT_VEH_BIKE_WINGS";
    Controls[Controls["INPUT_VEH_FLY_BOMB_BAY"] = 355] = "INPUT_VEH_FLY_BOMB_BAY";
    Controls[Controls["INPUT_VEH_FLY_COUNTER"] = 356] = "INPUT_VEH_FLY_COUNTER";
    Controls[Controls["INPUT_VEH_TRANSFORM"] = 357] = "INPUT_VEH_TRANSFORM";
    Controls[Controls["INPUT_QUAD_LOCO_REVERSE"] = 358] = "INPUT_QUAD_LOCO_REVERSE";
    Controls[Controls["INPUT_RESPAWN_FASTER"] = 359] = "INPUT_RESPAWN_FASTER";
    Controls[Controls["INPUT_HUDMARKER_SELECT"] = 360] = "INPUT_HUDMARKER_SELECT";
})(Controls = exports.Controls || (exports.Controls = {}));
;

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsHandler = exports.event = void 0;
var event;
(function (event) {
    event[event["clientRightClick"] = 0] = "clientRightClick";
    event[event["clientLeftClick"] = 1] = "clientLeftClick";
    event[event["render"] = 2] = "render";
    event[event["playerWeaponShot"] = 3] = "playerWeaponShot";
})(event = exports.event || (exports.event = {}));
var Event = (function () {
    function Event(eventName) {
        this.callbacks = [];
        this.event = eventName;
        this.callbacks = [];
    }
    Event.prototype.registerCallback = function (callback) {
        this.callbacks.push(callback);
    };
    return Event;
}());
var EventHandler = (function () {
    function EventHandler() {
        this.events = {};
    }
    EventHandler.prototype.registerEvent = function (event) {
        this.events[event] = new Event(event);
    };
    EventHandler.prototype.dispatchEvent = function (eventName) {
        var eventArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            eventArgs[_i - 1] = arguments[_i];
        }
        this.events[eventName].callbacks.forEach(function (callback) {
            callback.apply(void 0, eventArgs);
        });
    };
    EventHandler.prototype.addEventListener = function (eventName, callback) {
        this.events[eventName].registerCallback(callback);
    };
    return EventHandler;
}());
exports.eventsHandler = new EventHandler();
exports.eventsHandler.registerEvent(event.clientLeftClick);
exports.eventsHandler.registerEvent(event.clientRightClick);
exports.eventsHandler.registerEvent(event.render);
exports.eventsHandler.registerEvent(event.playerWeaponShot);
mp.events.add('click', function (x, y, upOrDown, leftOrRight, _relativeX, _relativeY, _worldPosition, _hitEntity) {
    if (upOrDown == 'up')
        return;
    if (leftOrRight == 'left')
        exports.eventsHandler.dispatchEvent(event.clientLeftClick, x, y);
    else
        exports.eventsHandler.dispatchEvent(event.clientRightClick, x, y);
});
mp.events.add('render', function (nametags) {
    exports.eventsHandler.dispatchEvent(event.render, nametags);
});
mp.events.add('playerWeaponShot', function (targetPosition, targetEntity) {
    exports.eventsHandler.dispatchEvent(event.playerWeaponShot, targetPosition, targetEntity);
});

},{}],16:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsFollowCamFirstPerson = exports.IsAnimDictLoaded = exports.UnloadAnimDict = exports.TryLoadAnimDict = exports.getDistanceBetweenVectors3Mp = exports.clientIsRunningBlacklistedCEF = exports.clientClickedOnChatbox = exports.isLocalPlayerNearTrunk = exports.isLocalPlayerDrivingVehicle = exports.isLocalPlayerDriver = exports.isLocalPlayerInsideVehicle = exports.closeChatboxInputBox = exports.hideCursor = exports.showCursor = exports.isCursorVisible = exports.isChatboxOpen = void 0;
var chatState = false;
mp.events.add('changeChatState', function (state) {
    chatState = state;
});
function isChatboxOpen() {
    return chatState;
}
exports.isChatboxOpen = isChatboxOpen;
function isCursorVisible() {
    return mp.gui.cursor.visible;
}
exports.isCursorVisible = isCursorVisible;
function showCursor() {
    mp.gui.cursor.show(true, true);
}
exports.showCursor = showCursor;
function hideCursor() {
    mp.gui.cursor.show(false, false);
}
exports.hideCursor = hideCursor;
function closeChatboxInputBox() {
    mp.gui.chat.activate(false);
    mp.gui.chat.activate(true);
}
exports.closeChatboxInputBox = closeChatboxInputBox;
function isLocalPlayerInsideVehicle() {
    if (mp.players.local.vehicle == null || mp.players.local.vehicle == undefined)
        return false;
    return true;
}
exports.isLocalPlayerInsideVehicle = isLocalPlayerInsideVehicle;
function isLocalPlayerDriver() {
    if (mp.players.local.vehicle == null || mp.players.local.vehicle == undefined)
        return false;
    return mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle;
}
exports.isLocalPlayerDriver = isLocalPlayerDriver;
function isLocalPlayerDrivingVehicle(entity) {
    if (!isLocalPlayerDriver())
        return false;
    if (mp.players.local.vehicle != entity)
        return false;
    return true;
}
exports.isLocalPlayerDrivingVehicle = isLocalPlayerDrivingVehicle;
function isLocalPlayerNearTrunk(entity) {
    var trunkPos = entity.getWorldPositionOfBone(entity.getBoneIndexByName('boot'));
    var dist = mp.game.system.vdist(trunkPos.x, trunkPos.y, trunkPos.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z);
    return dist < 2.0;
}
exports.isLocalPlayerNearTrunk = isLocalPlayerNearTrunk;
function clientClickedOnChatbox(absoluteX, absoluteY) {
    var screenRes = mp.game.graphics.getScreenActiveResolution(0, 0);
    var relX = absoluteX / screenRes.x;
    var relY = absoluteY / screenRes.y;
    if (relX < 0.4 && relY < 0.36)
        return true;
    return false;
}
exports.clientClickedOnChatbox = clientClickedOnChatbox;
var browsersBlacklist = [
    'package://gtalife/cinema/cinema-screen.html',
    'package://gtalife/Blackjack/cef/ui.html',
    'package://gtalife/BusinessManager/BusinessManager.html',
    'package://gtalife/CustomizationMenu/charactercreator.html',
    'package://gtalife/CustomizationMenu/description.html',
    'package://gtalife/CustomizationMenu/barbershop.html',
    'package://gtalife/Dealership/Dealership.html',
    'package://gtalife/Dealership/Swatch.html',
    'package://gtalife/EvidenceLocker/html/main_page.html',
    'package://gtalife/EvidenceLocker/html/add_entry.html',
    'package://gtalife/EvidenceLocker/html/search_page.html',
    'package://gtalife/fire_management/html/fireManager.html',
    'package://gtalife/GarageSpawn/spawner.html',
    'package://gtalife/morgue/mainNew.html',
    'package://gtalife/Notes/Notes.html',
    'package://gtalife/PawnShop/pawnshop.html',
    'package://gtalife/Phone/Phone.html',
    'package://gtalife/PlayerDealership/PlayerDealership.html',
    'package://gtalife/Playerlist/Playerlist.html',
    'package://gtalife/Poker/cef/ui.html',
    'package://gtalife/Roulette/roulete.html',
    'package://gtalife/trucking/CEF/StartShipmentPersonal.html',
    'package://gtalife/trucking/CEF/StartShipment.html',
    'package://gtalife/trucking/CEF/FindDelivery.html',
    'package://gtalife/VehicleColor/picker.html',
    'package://gtalife/LockPicking/CEF/index.html',
    'package://gtalife/Mechanic/index.html',
];
function clientIsRunningBlacklistedCEF() {
    for (var i = 0; i < mp.browsers.length; i++) {
        if (mp.browsers.at(i) != null && browsersBlacklist.includes(mp.browsers.at(i).url))
            return true;
    }
    return false;
}
exports.clientIsRunningBlacklistedCEF = clientIsRunningBlacklistedCEF;
function getDistanceBetweenVectors3Mp(v1, v2, useZAxis) {
    if (v1 === undefined || v2 === undefined)
        return Number.MAX_VALUE;
    return mp.game.gameplay.getDistanceBetweenCoords(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z, useZAxis);
}
exports.getDistanceBetweenVectors3Mp = getDistanceBetweenVectors3Mp;
function TryLoadAnimDict(animDictName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!mp.game.streaming.doesAnimDictExist(animDictName))
                        return [2, false];
                    if (IsAnimDictLoaded(animDictName))
                        return [2, false];
                    mp.game.streaming.requestAnimDict(animDictName);
                    _a.label = 1;
                case 1:
                    if (!!IsAnimDictLoaded(animDictName)) return [3, 3];
                    return [4, mp.game.waitAsync(0)];
                case 2:
                    _a.sent();
                    return [3, 1];
                case 3: return [2, true];
            }
        });
    });
}
exports.TryLoadAnimDict = TryLoadAnimDict;
function UnloadAnimDict(animDictName) {
    if (!IsAnimDictLoaded(animDictName))
        return false;
    mp.game.streaming.removeAnimDict(animDictName);
    return true;
}
exports.UnloadAnimDict = UnloadAnimDict;
function IsAnimDictLoaded(animDictName) {
    return mp.game.streaming.hasAnimDictLoaded(animDictName);
}
exports.IsAnimDictLoaded = IsAnimDictLoaded;
function IsFollowCamFirstPerson() {
    return mp.game.invoke('0x8D4D46230B2C353A') == 4;
}
exports.IsFollowCamFirstPerson = IsFollowCamFirstPerson;

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntersectOptions = exports.screenCoordsToEntity = exports.screenCoordsToWorldCoords = void 0;
var events = require("./eventswrapper");
var debugScreenToWorld = false;
var gameplayCam = mp.cameras.new('gameplay');
function screenCoordsToWorldCoords(screenX, screenY, flags, ignore) {
    var camPos = gameplayCam.getCoord();
    var rCoords = getRelativeCoords(screenX, screenY);
    var target = screenToWorld(camPos, rCoords.x, rCoords.y);
    var dir = subtractVectors(target, camPos);
    var from = addVectors(camPos, multiplyVectorByScalar(dir, 0.05));
    var to = addVectors(camPos, multiplyVectorByScalar(dir, 300));
    var ray = mp.raycasting.testPointToPoint(from, to, ignore, flags);
    return ray === undefined ? undefined : ray.position;
}
exports.screenCoordsToWorldCoords = screenCoordsToWorldCoords;
function screenCoordsToEntity(absoluteX, absoluteY, flags, ignore) {
    var camPos = gameplayCam.getCoord();
    var rCoords = getRelativeCoords(absoluteX, absoluteY);
    var target = screenToWorld(camPos, rCoords.x, rCoords.y);
    var dir = subtractVectors(target, camPos);
    var from = addVectors(camPos, multiplyVectorByScalar(dir, 0.05));
    var to = addVectors(camPos, multiplyVectorByScalar(dir, 300));
    drawDebugLine(from, to);
    var ray = mp.raycasting.testPointToPoint(from, to, ignore, flags);
    return ray === undefined ? undefined : ray.entity;
}
exports.screenCoordsToEntity = screenCoordsToEntity;
function screenToWorld(camPos, relX, relY) {
    var camRot = gameplayCam.getRot(0);
    var camForward = rotToDir(camRot);
    var rotUp = addVectors(camRot, new mp.Vector3(10, 0, 0));
    var rotDown = addVectors(camRot, new mp.Vector3(-10, 0, 0));
    var rotLeft = addVectors(camRot, new mp.Vector3(0, 0, -10));
    var rotRight = addVectors(camRot, new mp.Vector3(0, 0, 10));
    var camRight = subtractVectors(rotToDir(rotRight), rotToDir(rotLeft));
    var camUp = subtractVectors(rotToDir(rotUp), rotToDir(rotDown));
    var rollAsRads = -degToRad(camRot.y);
    var camRightRoll = subtractVectors(multiplyVectorByScalar(camRight, Math.cos(rollAsRads)), multiplyVectorByScalar(camUp, Math.sin(rollAsRads)));
    var camUpRoll = addVectors(multiplyVectorByScalar(camRight, Math.sin(rollAsRads)), multiplyVectorByScalar(camUp, Math.cos(rollAsRads)));
    var point3D = addVectors(addVectors(addVectors(camPos, multiplyVectorByScalar(camForward, 10.0)), camRightRoll), camUpRoll);
    var point2D = worldToScreen(point3D);
    if (point2D === undefined) {
        return addVectors(camPos, multiplyVectorByScalar(camForward, 10.0));
    }
    var point3DZero = addVectors(camPos, multiplyVectorByScalar(camForward, 10.0));
    var point2DZero = worldToScreen(point3DZero);
    if (point2DZero === undefined) {
        return addVectors(camPos, multiplyVectorByScalar(camForward, 10.0));
    }
    var tolerance = 0.001;
    if (Math.abs(point2D.x - point2DZero.x) < tolerance || Math.abs(point2D.y - point2DZero.y) < tolerance) {
        return addVectors(camPos, multiplyVectorByScalar(camForward, 10.0));
    }
    var scaleX = (relX - point2DZero.x) / (point2D.x - point2DZero.x);
    var scaleY = (relY - point2DZero.y) / (point2D.y - point2DZero.y);
    return addVectors(addVectors(addVectors(camPos, multiplyVectorByScalar(camForward, 10.0)), multiplyVectorByScalar(camRightRoll, scaleX)), multiplyVectorByScalar(camUpRoll, scaleY));
}
function getRelativeCoords(x, y) {
    var screen = mp.game.graphics.getScreenActiveResolution(0, 0);
    var rx = (1 - ((x / screen.x) * 1.0) * 2);
    var ry = (1 - ((y / screen.y) * 1.0) * 2);
    if (rx > 0.0) {
        rx = -rx;
    }
    else {
        rx = Math.abs(rx);
    }
    if (ry > 0.0) {
        ry = -ry;
    }
    else {
        ry = Math.abs(ry);
    }
    return { x: rx, y: ry };
}
function worldToScreen(pos) {
    var r = mp.game.graphics.world3dToScreen2d(pos.x, pos.y, pos.z);
    return r == undefined ? undefined : new mp.Vector3((r.x - 0.5) * 2, (r.y - 0.5) * 2, 0);
}
function rotToDir(rot) {
    var z = degToRad(rot.z);
    var x = degToRad(rot.x);
    var n = Math.abs(Math.cos(x));
    return new mp.Vector3((-Math.sin(z) * n), (Math.cos(z) * n), Math.sin(x));
}
function addVectors(v1, v2) {
    return new mp.Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
}
function subtractVectors(v1, v2) {
    return new mp.Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
}
function multiplyVectorByScalar(vector, scalar) {
    return new mp.Vector3(vector.x * scalar, vector.y * scalar, vector.z * scalar);
}
function degToRad(degrees) {
    return degrees * Math.PI / 180.0;
}
var debugLineVector1 = null;
var debugLineVector2 = null;
function drawDebugLine(vector1, vector2) {
    debugLineVector1 = vector1;
    debugLineVector2 = vector2;
}
events.eventsHandler.addEventListener(events.event.render, function () {
    if (!debugScreenToWorld)
        return;
    if (debugLineVector1 == null || debugLineVector2 == null)
        return;
    mp.game.graphics.drawLine(debugLineVector1.x, debugLineVector1.y, debugLineVector1.z, debugLineVector2.x, debugLineVector2.y, debugLineVector2.z, 255, 125, 75, 255);
});
var IntersectOptions;
(function (IntersectOptions) {
    IntersectOptions[IntersectOptions["Everything"] = -1] = "Everything";
    IntersectOptions[IntersectOptions["Map"] = 1] = "Map";
    IntersectOptions[IntersectOptions["Vehicles"] = 2] = "Vehicles";
    IntersectOptions[IntersectOptions["Peds1"] = 4] = "Peds1";
    IntersectOptions[IntersectOptions["Peds2"] = 8] = "Peds2";
    IntersectOptions[IntersectOptions["AllPeds"] = 12] = "AllPeds";
    IntersectOptions[IntersectOptions["Objects"] = 16] = "Objects";
    IntersectOptions[IntersectOptions["VehiclesPedsObjects"] = 30] = "VehiclesPedsObjects";
    IntersectOptions[IntersectOptions["Unk1"] = 32] = "Unk1";
    IntersectOptions[IntersectOptions["Unk2"] = 64] = "Unk2";
    IntersectOptions[IntersectOptions["Unk3"] = 128] = "Unk3";
    IntersectOptions[IntersectOptions["Vegetation"] = 256] = "Vegetation";
    IntersectOptions[IntersectOptions["Unk4"] = 512] = "Unk4";
})(IntersectOptions = exports.IntersectOptions || (exports.IntersectOptions = {}));

},{"./eventswrapper":15}],18:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolTipOption = exports.ToolTipMenu = void 0;
var titleBoxColor = [26, 25, 25, 240];
var buttonColor = [79, 79, 79, 210];
var buttonTextHoverColor = [65, 224, 108, 200];
var screenRes = mp.game.graphics.getScreenActiveResolution(0, 0);
var Color = (function () {
    function Color(r, g, b, a) {
        this.R = 0;
        this.G = 0;
        this.B = 0;
        this.A = 0;
        this.setR(r);
        this.setG(g);
        this.setB(b);
        this.setA(a);
    }
    Color.prototype.setR = function (r) {
        this.R = this.normalize(r);
    };
    Color.prototype.setG = function (g) {
        this.G = this.normalize(g);
    };
    Color.prototype.setB = function (b) {
        this.B = this.normalize(b);
    };
    Color.prototype.setA = function (a) {
        this.A = this.normalize(a);
    };
    Color.prototype.GetR = function () {
        return this.R;
    };
    Color.prototype.GetG = function () {
        return this.G;
    };
    Color.prototype.GetB = function () {
        return this.B;
    };
    Color.prototype.GetA = function () {
        return this.A;
    };
    Color.prototype.GetOpposite = function () {
        return new Color(Math.abs(255 - this.R), Math.abs(255 - this.G), Math.abs(255 - this.B), this.A);
    };
    Color.prototype.normalize = function (n) {
        if (n < 0)
            return 0;
        if (n > 255)
            return 255;
        return n;
    };
    return Color;
}());
var Drawable = (function () {
    function Drawable(text, x, y, w, h, clickFunc) {
        this.hoverable = true;
        this.clickable = true;
        this.drawableBackgroundColor = new Color(0, 0, 0, 255);
        this.textHoverColor = new Color(buttonTextHoverColor[0], buttonTextHoverColor[1], buttonTextHoverColor[2], buttonTextHoverColor[3]);
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.color = this.drawableBackgroundColor;
        this.absX = this.x * screenRes.x;
        this.absY = this.y * screenRes.y;
        this.absWidth = this.width * screenRes.x;
        this.absHeight = this.height * screenRes.y;
        this.absLeft = this.absX - (this.absWidth / 2);
        this.absRight = this.absX + (this.absWidth / 2);
        this.absTop = this.absY + (this.absHeight / 2);
        this.absBot = this.absY - (this.absHeight / 2);
        this.clickFunc = clickFunc;
    }
    Drawable.prototype.isMouseHovering = function () {
        if (!this.hoverable)
            return false;
        var x = mp.gui.cursor.position[0];
        var y = mp.gui.cursor.position[1];
        if (x > this.absLeft && x < this.absRight && y > this.absBot && y < this.absTop) {
            return true;
        }
        return false;
    };
    Drawable.prototype.handleClick = function () {
        if (!this.clickable)
            return;
        if (!this.isMouseHovering())
            return;
        if (this.clickFunc !== undefined)
            this.clickFunc();
    };
    return Drawable;
}());
var TextBlock = (function (_super) {
    __extends(TextBlock, _super);
    function TextBlock(text, x, y, w, h, clickFunc) {
        if (clickFunc === void 0) { clickFunc = undefined; }
        var _this = _super.call(this, text, x, y, w, h, clickFunc) || this;
        _this.hoverable = false;
        _this.color = new Color(titleBoxColor[0], titleBoxColor[1], titleBoxColor[2], titleBoxColor[3]);
        return _this;
    }
    TextBlock.prototype.render = function () {
        mp.game.graphics.drawRect(this.x, this.y, this.width, this.height, this.color.GetR(), this.color.GetG(), this.color.GetB(), this.color.GetA());
        var opCol = this.color.GetOpposite();
        mp.game.graphics.drawText("" + this.text, [this.x, this.y - 0.015], {
            font: 2,
            centre: false,
            color: [opCol.GetR(), opCol.GetG(), opCol.GetB(), opCol.GetA()],
            scale: [0.45, 0.45],
            outline: false,
        });
    };
    return TextBlock;
}(Drawable));
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(text, x, y, w, h, clickFunc) {
        var _this = _super.call(this, text, x, y, w, h, clickFunc) || this;
        _this.color = new Color(buttonColor[0], buttonColor[1], buttonColor[2], buttonColor[3]);
        return _this;
    }
    Button.prototype.render = function () {
        mp.game.graphics.drawRect(this.x, this.y, this.width, this.height, this.color.GetR(), this.color.GetG(), this.color.GetB(), this.color.GetA());
        var opCol;
        if (this.isMouseHovering())
            opCol = this.textHoverColor;
        else
            opCol = this.color.GetOpposite();
        mp.game.graphics.drawText("" + this.text, [this.x, this.y - 0.015], {
            font: 4,
            centre: false,
            color: [opCol.GetR(), opCol.GetG(), opCol.GetB(), opCol.GetA()],
            scale: [0.37, 0.37],
            outline: false,
        });
    };
    return Button;
}(Drawable));
var ToolTipMenu = (function () {
    function ToolTipMenu(title, pointerX, pointerY) {
        var options = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            options[_i - 3] = arguments[_i];
        }
        this.title = '';
        this.drawables = [];
        if (options.length == 0)
            return;
        this.title = title;
        var relHeight = 0.05;
        var relWidth = this.calculateWidthFromTooltipTitleOptionsCombination(title, options);
        var relX = pointerX / screenRes.x;
        var relY = pointerY / screenRes.y;
        if (relX + relWidth > 1.0)
            relX -= relX + relWidth - 1.0;
        if (relY + relHeight * (options.length + 1) > 1.0)
            relY -= relY + relHeight * (options.length + 1) - 1.0;
        var textBlock = new TextBlock(title, relX + relWidth / 2, relY + relHeight / 2, relWidth, relHeight);
        this.drawables.push(textBlock);
        for (var i = 0; i < options.length; i++) {
            var prevElement = void 0;
            if (i == 0)
                prevElement = textBlock;
            else
                prevElement = this.drawables[i];
            this.drawables.push(new Button(options[i].text, prevElement.x, prevElement.y + relHeight, relWidth, relHeight, options[i].func));
        }
    }
    ToolTipMenu.prototype.calculateWidthFromTooltipTitleOptionsCombination = function (title, options) {
        var defWidth = 0.1;
        var optionsWidth = defWidth;
        var stringArray = [];
        options.forEach(function (op) {
            stringArray.push(op.text);
        });
        var widthPerSmallFontChar = 0.00325;
        var length = LongestStringLengthInStringArray(stringArray);
        if (length >= 25) {
            optionsWidth += widthPerSmallFontChar * (length - 25);
        }
        var titleWidth = defWidth;
        if (title.length >= 17) {
            titleWidth += widthPerSmallFontChar * 1.8 * (title.length - 17);
        }
        return optionsWidth > titleWidth ? optionsWidth : titleWidth;
    };
    ToolTipMenu.prototype.handleClick = function () {
        this.drawables.forEach(function (b) {
            b.handleClick();
        });
    };
    ToolTipMenu.prototype.render = function () {
        this.drawables.forEach(function (b) {
            b.render();
        });
    };
    return ToolTipMenu;
}());
exports.ToolTipMenu = ToolTipMenu;
var ToolTipOption = (function () {
    function ToolTipOption(text, func) {
        this.text = text;
        this.func = func;
    }
    return ToolTipOption;
}());
exports.ToolTipOption = ToolTipOption;
function LongestStringLengthInStringArray(strArr) {
    var curMaxLength = 0;
    strArr.forEach(function (str) {
        if (str.length > curMaxLength)
            curMaxLength = str.length;
    });
    return curMaxLength;
}

},{}]},{},[7]);

}