{
    global.lzString = function () {
        function a(a, b) {
            if (!f[a]) {
                f[a] = {};
                for (var c = 0; c < a.length; c++) f[a][a.charAt(c)] = c
            }
            return f[a][b]
        }
        var b = Math.pow,
            d = String.fromCharCode,
            c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",
            f = {},
            g = {
                compressToBase64: function (a) {
                    if (null == a) return "";
                    var b = g._compress(a, 6, function (b) {
                        return c.charAt(b)
                    });
                    switch (b.length % 4) {
                        default:
                        case 0:
                            return b;
                        case 1:
                            return b + "===";
                        case 2:
                            return b + "==";
                        case 3:
                            return b + "=";
                    }
                },
                decompressFromBase64: function (b) {
                    return null == b ? "" : "" == b ? null : g._decompress(b.length, 32, function (d) {
                        return a(c, b.charAt(d))
                    })
                },
                compressToUTF16: function (a) {
                    return null == a ? "" : g._compress(a, 15, function (b) {
                        return d(b + 32)
                    }) + " "
                },
                decompressFromUTF16: function (a) {
                    return null == a ? "" : "" == a ? null : g._decompress(a.length, 16384, function (b) {
                        return a.charCodeAt(b) - 32
                    })
                },
                compressToUint8Array: function (a) {
                    for (var b, c = g.compress(a), d = new Uint8Array(2 * c.length), e = 0, f = c.length; e < f; e++) b = c.charCodeAt(e), d[2 * e] = b >>> 8, d[2 * e + 1] = b % 256;
                    return d
                },
                decompressFromUint8Array: function (a) {
                    if (null === a || void 0 === a) return g.decompress(a);
                    for (var b = Array(a.length / 2), c = 0, e = b.length; c < e; c++) b[c] = 256 * a[2 * c] + a[2 * c + 1];
                    var f = [];
                    return b.forEach(function (a) {
                        f.push(d(a))
                    }), g.decompress(f.join(""))
                },
                compressToEncodedURIComponent: function (a) {
                    return null == a ? "" : g._compress(a, 6, function (b) {
                        return e.charAt(b)
                    })
                },
                decompressFromEncodedURIComponent: function (b) {
                    return null == b ? "" : "" == b ? null : (b = b.replace(/ /g, "+"), g._decompress(b.length, 32, function (c) {
                        return a(e, b.charAt(c))
                    }))
                },
                compress: function (a) {
                    return g._compress(a, 16, function (b) {
                        return d(b)
                    })
                },
                _compress: function (a, c, d) {
                    if (null == a) return "";
                    var e, f, g, h = {},
                        j = {},
                        k = "",
                        l = "",
                        m = "",
                        n = 2,
                        o = 3,
                        p = 2,
                        q = [],
                        r = 0,
                        s = 0;
                    for (g = 0; g < a.length; g += 1)
                        if (k = a.charAt(g), Object.prototype.hasOwnProperty.call(h, k) || (h[k] = o++, j[k] = !0), l = m + k, Object.prototype.hasOwnProperty.call(h, l)) m = l;
                        else {
                            if (Object.prototype.hasOwnProperty.call(j, m)) {
                                if (256 > m.charCodeAt(0)) {
                                    for (e = 0; e < p; e++) r <<= 1, s == c - 1 ? (s = 0, q.push(d(r)), r = 0) : s++;
                                    for (f = m.charCodeAt(0), e = 0; 8 > e; e++) r = r << 1 | 1 & f, s == c - 1 ? (s = 0, q.push(d(r)), r = 0) : s++, f >>= 1
                                } else {
                                    for (f = 1, e = 0; e < p; e++) r = r << 1 | f, s == c - 1 ? (s = 0, q.push(d(r)), r = 0) : s++, f = 0;
                                    for (f = m.charCodeAt(0), e = 0; 16 > e; e++) r = r << 1 | 1 & f, s == c - 1 ? (s = 0, q.push(d(r)), r = 0) : s++, f >>= 1
                                }
                                n--, 0 == n && (n = b(2, p), p++), delete j[m]
                            } else
                                for (f = h[m], e = 0; e < p; e++) r = r << 1 | 1 & f, s == c - 1 ? (s = 0, q.push(d(r)), r = 0) : s++, f >>= 1;
                            n--, 0 == n && (n = b(2, p), p++), h[l] = o++, m = k + ""
                        } if ("" !== m) {
                        if (Object.prototype.hasOwnProperty.call(j, m)) {
                            if (256 > m.charCodeAt(0)) {
                                for (e = 0; e < p; e++) r <<= 1, s == c - 1 ? (s = 0, q.push(d(r)), r = 0) : s++;
                                for (f = m.charCodeAt(0), e = 0; 8 > e; e++) r = r << 1 | 1 & f, s == c - 1 ? (s = 0, q.push(d(r)), r = 0) : s++, f >>= 1
                            } else {
                                for (f = 1, e = 0; e < p; e++) r = r << 1 | f, s == c - 1 ? (s = 0, q.push(d(r)), r = 0) : s++, f = 0;
                                for (f = m.charCodeAt(0), e = 0; 16 > e; e++) r = r << 1 | 1 & f, s == c - 1 ? (s = 0, q.push(d(r)), r = 0) : s++, f >>= 1
                            }
                            n--, 0 == n && (n = b(2, p), p++), delete j[m]
                        } else
                            for (f = h[m], e = 0; e < p; e++) r = r << 1 | 1 & f, s == c - 1 ? (s = 0, q.push(d(r)), r = 0) : s++, f >>= 1;
                        n--, 0 == n && (n = b(2, p), p++)
                    }
                    for (f = 2, e = 0; e < p; e++) r = r << 1 | 1 & f, s == c - 1 ? (s = 0, q.push(d(r)), r = 0) : s++, f >>= 1;
                    for (;;)
                        if (r <<= 1, s == c - 1) {
                            q.push(d(r));
                            break
                        } else s++;
                    return q.join("")
                },
                decompress: function (a) {
                    return null == a ? "" : "" == a ? null : g._decompress(a.length, 32768, function (b) {
                        return a.charCodeAt(b)
                    })
                },
                _decompress: function (a, e, f) {
                    var g, h, j, k, l, m, n, o, p = [],
                        q = 4,
                        r = 4,
                        s = 3,
                        t = "",
                        u = [],
                        v = {
                            val: f(0),
                            position: e,
                            index: 1
                        };
                    for (h = 0; 3 > h; h += 1) p[h] = h;
                    for (k = 0, m = 4, n = 1; n != m;) l = v.val & v.position, v.position >>= 1, 0 == v.position && (v.position = e, v.val = f(v.index++)), k |= (0 < l ? 1 : 0) * n, n <<= 1;
                    switch (g = k) {
                        case 0:
                            for (k = 0, m = 256, n = 1; n != m;) l = v.val & v.position, v.position >>= 1, 0 == v.position && (v.position = e, v.val = f(v.index++)), k |= (0 < l ? 1 : 0) * n, n <<= 1;
                            o = d(k);
                            break;
                        case 1:
                            for (k = 0, m = 65536, n = 1; n != m;) l = v.val & v.position, v.position >>= 1, 0 == v.position && (v.position = e, v.val = f(v.index++)), k |= (0 < l ? 1 : 0) * n, n <<= 1;
                            o = d(k);
                            break;
                        case 2:
                            return "";
                    }
                    for (p[3] = o, j = o, u.push(o);;) {
                        if (v.index > a) return "";
                        for (k = 0, m = b(2, s), n = 1; n != m;) l = v.val & v.position, v.position >>= 1, 0 == v.position && (v.position = e, v.val = f(v.index++)), k |= (0 < l ? 1 : 0) * n, n <<= 1;
                        switch (o = k) {
                            case 0:
                                for (k = 0, m = 256, n = 1; n != m;) l = v.val & v.position, v.position >>= 1, 0 == v.position && (v.position = e, v.val = f(v.index++)), k |= (0 < l ? 1 : 0) * n, n <<= 1;
                                p[r++] = d(k), o = r - 1, q--;
                                break;
                            case 1:
                                for (k = 0, m = 65536, n = 1; n != m;) l = v.val & v.position, v.position >>= 1, 0 == v.position && (v.position = e, v.val = f(v.index++)), k |= (0 < l ? 1 : 0) * n, n <<= 1;
                                p[r++] = d(k), o = r - 1, q--;
                                break;
                            case 2:
                                return u.join("");
                        }
                        if (0 == q && (q = b(2, s), s++), p[o]) t = p[o];
                        else if (o === r) t = j + j.charAt(0);
                        else return null;
                        u.push(t), p[r++] = j + t.charAt(0), q--, j = t, 0 == q && (q = b(2, s), s++)
                    }
                }
            };
        return g
    }();
}