'use strict';
(self.webpackChunkcivilization_js = self.webpackChunkcivilization_js || []).push([
    [103],
    {
        988: (t, e, o) => {
            o.d(e, { L$: () => s, c: () => r, df: () => c, pf: () => i });
            var n = o(2589);
            function i(t, e) {
                return Array.from({ length: t.y }).map(() => Array.from({ length: t.x }).map(() => e));
            }
            function r(t) {
                return t / n.B4;
            }
            function s(t) {
                return 1.5 * t;
            }
            function c(t) {
                return 1.5 * r(t);
            }
        },
        3103: (t, e, o) => {
            (o.r(e), o.d(e, { Map: () => x }));
            var n = o(4848),
                i = o(7339),
                r = o(6060),
                s = o(9980),
                c = o(3330),
                u = o(205),
                a = o(367),
                d = o(6909),
                f = o(5803),
                h = o(7953),
                l = o(7840),
                v = o(988),
                m = o(7579);
            function p({ isEditable: t, zIndex: e, map: o, screenSize: r, zoom: m, position: p, opacity: g, onUpdate: x }) {
                const { isGridTurnedOn: y } = (0, h.H)().store,
                    L = f.s.hexWidth * m,
                    E = (0, v.df)(L),
                    M = (t) => {
                        ((0, d.d)({ point: t, hexWidth: L, brush: l.N.water, map: o }), x({ map: o }));
                    },
                    { startMoving: z } = (0, s.c)((t) => M((0, u.Ks)((0, u.Oo)(t.offsetX, t.offsetY), p)), t);
                return (0, n.jsx)(c.g, {
                    screenSize: r,
                    zIndex: e,
                    opacity: g,
                    onMouseDown: t
                        ? (t, e) => {
                              (z(), M((0, u.Ks)(e, p)));
                          }
                        : void 0,
                    children: (t) => {
                        for (let e = 0; e < o.columnLength && !(e * E + p.y > r.y); e += 1) {
                            const n = o.data[e];
                            for (let o = 0; o < n.length && !(o * L + p.x > r.x); o += 1) {
                                const r = n[o];
                                (0, i._)({ ctx: t, position: { x: o, y: e }, offset: p, width: L, color: a.S[r].color, isGridTurnedOn: y });
                            }
                        }
                    },
                });
            }
            function g({ zoom: t, position: e, ...o }) {
                const { zoom: i, position: s } = (0, r.K)().store;
                return (0, n.jsx)(p, { ...o, zoom: i * t, position: (0, u.p8)(s, e) });
            }
            function x(t) {
                const {
                    store: { isVisible: e, map: o, opacity: i, position: r, zoom: s },
                    setStore: c,
                } = (0, m.I)();
                return e && o ? (0, n.jsx)(g, { ...t, map: o, zoom: s, position: r, opacity: i, onUpdate: c }) : null;
            }
        },
        3330: (t, e, o) => {
            o.d(e, { g: () => s });
            var n = o(4848),
                i = o(9860),
                r = o(2589);
            function s({ zIndex: t, screenSize: e, opacity: o, children: s, ...c }) {
                const u = r.L9;
                return (0, n.jsx)(i.H, {
                    width: e.x,
                    height: e.y - u,
                    style: { zIndex: t, opacity: o, position: 'absolute' },
                    ...c,
                    children: (t) => {
                        (t.clearRect(0, 0, e.x, e.y - u), s(t));
                    },
                });
            }
        },
        5803: (t, e, o) => {
            o.d(e, { s: () => r });
            var n = o(205),
                i = o(988);
            class r {
                static hexWidth = 100;
                data = [];
                get width() {
                    return this.rowLength * r.hexWidth;
                }
                get height() {
                    return this.columnLength * (0, i.df)(r.hexWidth);
                }
                get imageSize() {
                    return (0, n.Oo)(this.width, this.height);
                }
                get rowLength() {
                    return this.data[0]?.length || 0;
                }
                get columnLength() {
                    return this.data.length;
                }
                get mapSize() {
                    return (0, n.Oo)(this.rowLength, this.columnLength);
                }
                constructor(t) {
                    this.data = t;
                }
            }
        },
        6909: (t, e, o) => {
            o.d(e, { d: () => c });
            var n = o(2589),
                i = o(205),
                r = o(988);
            function s(t, e, o, i) {
                return o < (t ? e / n.B4 : i - e / n.B4);
            }
            function c({ point: t, hexWidth: e, brush: o, map: n }) {
                const c = (function ({ x: t, y: e }, o) {
                    const n = (0, r.c)(o),
                        c = 3 * n,
                        u = Math.floor(e / c);
                    let a = u * c;
                    const d = Math.floor(t / o),
                        f = d * o,
                        h = (0, i.Oo)(d, 2 * u),
                        l = n / 2,
                        v = f + o / 2;
                    if (e < a + l)
                        return t < v
                            ? s(!1, t - f, e - a, l)
                                ? (0, i.p8)(h, -1)
                                : h
                            : s(!0, t - v, e - a, l)
                              ? (0, i.p8)(h, (0, i.Oo)(0, -1))
                              : h;
                    const m = 1.5 * n;
                    return e <= a + m
                        ? h
                        : e < a + 2 * n
                          ? ((a += m),
                            t < v
                                ? s(!0, t - f, e - a, l)
                                    ? h
                                    : (0, i.p8)(h, (0, i.Oo)(-1, 1))
                                : s(!1, t - v, e - a, l)
                                  ? h
                                  : (0, i.p8)(h, (0, i.Oo)(0, 1)))
                          : (t < v && (h.x -= 1), (0, i.p8)(h, (0, i.Oo)(0, 1)));
                })(t, e);
                c.x < 0 ||
                    c.y < 0 ||
                    c.x >= n.rowLength ||
                    c.y >= n.columnLength ||
                    null === o ||
                    n.data[c.y][c.x] === o ||
                    (n.data[c.y][c.x] = o);
            }
        },
        7339: (t, e, o) => {
            o.d(e, { _: () => s });
            var n = o(988),
                i = o(205);
            function r(t, e, o) {
                return (0, i.Oo)(t.x + o * Math.cos(e), t.y + o * Math.sin(e));
            }
            function s({ ctx: t, position: e, offset: o, width: s, color: c, isGridTurnedOn: u }) {
                const a = e.y % 2 == 0 ? s / 2 : s,
                    d = (0, n.c)(s),
                    f = (0, n.L$)(d);
                !(function ({ ctx: t, centerPoint: e, startAngle: o, radius: n, sides: i, fillColor: s, strokeColor: c }) {
                    t.beginPath();
                    const u = r(e, o, n);
                    t.moveTo(u.x, u.y);
                    for (let s = 0; s < i; s += 1) {
                        const c = r(e, (s * Math.PI * 2) / i + o, n);
                        t.lineTo(c.x, c.y);
                    }
                    (t.closePath(), s && ((t.fillStyle = s), t.fill()), c && ((t.strokeStyle = c), t.stroke()));
                })({
                    ctx: t,
                    centerPoint: (0, i.Oo)(e.x * s + a + (o?.x || 0), e.y * f + d + (o?.y || 0)),
                    startAngle: Math.PI / 2,
                    radius: d,
                    sides: 6,
                    fillColor: c,
                    strokeColor: u ? '#000' : void 0,
                });
            }
        },
        9860: (t, e, o) => {
            o.d(e, { H: () => s });
            var n = o(4848),
                i = o(6540),
                r = o(205);
            const s = ({ children: t, onClick: e, onMouseDown: o, onMouseMove: s, onMouseUp: c, ...u }) => {
                const a = (0, i.useRef)(null),
                    [d, f] = (0, i.useState)(null);
                return (
                    (0, i.useEffect)(() => {
                        if (a.current) {
                            const e = a.current.getContext('2d');
                            (t(e), f(e));
                        }
                    }, [t]),
                    (0, n.jsx)('canvas', {
                        ref: a,
                        ...u,
                        onClick: e && d ? (t) => e(d, (0, r.Oo)(t.nativeEvent.offsetX, t.nativeEvent.offsetY)) : void 0,
                        onMouseDown: o && d ? (t) => o(d, (0, r.Oo)(t.nativeEvent.offsetX, t.nativeEvent.offsetY)) : void 0,
                        onMouseMove: s && d ? (t) => s(d, (0, r.Oo)(t.nativeEvent.offsetX, t.nativeEvent.offsetY)) : void 0,
                        onMouseUp: c && d ? (t) => c(d, (0, r.Oo)(t.nativeEvent.offsetX, t.nativeEvent.offsetY)) : void 0,
                    })
                );
            };
        },
        9980: (t, e, o) => {
            o.d(e, { c: () => i });
            var n = o(6540);
            function i(t, e = !0) {
                const o = (0, n.useMemo)(() => ({ moving: !1, callback: t }), []);
                return (
                    (0, n.useEffect)(() => {
                        if (!e) return () => {};
                        function t(t) {
                            o.moving && requestAnimationFrame(() => o.callback(t));
                        }
                        function n(t) {
                            (t.stopPropagation(), (o.moving = !1));
                        }
                        return (
                            document.addEventListener('touchmove', t),
                            document.addEventListener('touchend', n),
                            document.addEventListener('mousemove', t),
                            document.addEventListener('mouseup', n),
                            () => {
                                (document.removeEventListener('mousemove', t),
                                    document.removeEventListener('mouseup', n),
                                    document.removeEventListener('touchmove', t),
                                    document.removeEventListener('touchend', n));
                            }
                        );
                    }, [e]),
                    {
                        startMoving: () => {
                            ((o.moving = !0), (o.callback = t));
                        },
                    }
                );
            }
        },
    },
]);
