'use strict';
(self.webpackChunkcivilization_js = self.webpackChunkcivilization_js || []).push([
    [136],
    {
        288: (t, e, n) => {
            n.d(e, { A: () => a });
            var i = n(1601),
                o = n.n(i),
                s = n(6314),
                r = n.n(s)()(o());
            r.push([
                t.id,
                '.bar-container {\n    height: 25px;\n    position: relative;\n    display: flex;\n    align-items: center;\n}\n.bar {\n    height: 5px;\n    width: 100%;\n    background: #7c7c7c;\n}\n.bar-button {\n    outline: 2px solid #656565;\n    border-radius: 50%;\n    position: absolute;\n    top: 4px;\n    background: #ccc;\n    cursor: pointer;\n}\n',
                '',
            ]);
            const a = r;
        },
        988: (t, e, n) => {
            n.d(e, { L$: () => r, c: () => s, df: () => a, pf: () => o });
            var i = n(2589);
            function o(t, e) {
                return Array.from({ length: t.y }).map(() => Array.from({ length: t.x }).map(() => e));
            }
            function s(t) {
                return t / i.B4;
            }
            function r(t) {
                return 1.5 * t;
            }
            function a(t) {
                return 1.5 * s(t);
            }
        },
        2279: (t, e, n) => {
            n.d(e, { v: () => A });
            var i = n(4848),
                o = n(6540),
                s = n(4035),
                r = n(5055),
                a = n(5072),
                c = n.n(a),
                l = n(7825),
                d = n.n(l),
                u = n(7659),
                h = n.n(u),
                v = n(5056),
                m = n.n(v),
                p = n(540),
                g = n.n(p),
                f = n(1113),
                x = n.n(f),
                b = n(8964),
                y = {};
            ((y.styleTagTransform = x()),
                (y.setAttributes = m()),
                (y.insert = h().bind(null, 'head')),
                (y.domAPI = d()),
                (y.insertStyleElement = g()),
                c()(b.A, y),
                b.A && b.A.locals && b.A.locals);
            var w = n(5221);
            const M = ({ isVisible: t, toggleVisible: e }) =>
                (0, i.jsx)('div', {
                    className: 'eye',
                    onClick: (t) => {
                        (t.stopPropagation(), e());
                    },
                    children: (0, i.jsx)(w.B, {
                        src: t
                            ? '<svg width="20" viewBox="0 0 512 400">\n    <path d="m494.8,241.4l-50.6-49.4c-50.1-48.9-116.9-75.8-188.2-75.8s-138.1,26.9-188.2,75.8l-50.6,49.4c-11.3,12.3-4.3,25.4 0,29.2l50.6,49.4c50.1,48.9 116.9,75.8 188.2,75.8s138.1-26.9 188.2-75.8l50.6-49.4c4-3.8 11.7-16.4 0-29.2zm-238.8,84.4c-38.5,0-69.8-31.3-69.8-69.8 0-38.5 31.3-69.8 69.8-69.8 38.5,0 69.8,31.3 69.8,69.8 0,38.5-31.3,69.8-69.8,69.8zm-195.3-69.8l35.7-34.8c27-26.4 59.8-45.2 95.7-55.4-28.2,20.1-46.6,53-46.6,90.1 0,37.1 18.4,70.1 46.6,90.1-35.9-10.2-68.7-29-95.7-55.3l-35.7-34.7zm355,34.8c-27,26.3-59.8,45.1-95.7,55.3 28.2-20.1 46.6-53 46.6-90.1 0-37.2-18.4-70.1-46.6-90.1 35.9,10.2 68.7,29 95.7,55.4l35.6,34.8-35.6,34.7z"></path>\n</svg>\n'
                            : '<svg width="20" viewBox="0 4 24 19">\n    <path stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21.0006 12.0007C19.2536 15.5766 15.8779 18 12 18M12 18C8.12204 18 4.7463 15.5766 2.99977 12.0002M12 18L12 21M19.4218 14.4218L21.4999 16.5M16.2304 16.9687L17.5 19.5M4.57812 14.4218L2.5 16.5M7.76953 16.9687L6.5 19.5"></path>\n</svg>\n',
                        width: 20,
                    }),
                });
            var j = n(288),
                L = {};
            ((L.styleTagTransform = x()),
                (L.setAttributes = m()),
                (L.insert = h().bind(null, 'head')),
                (L.domAPI = d()),
                (L.insertStyleElement = g()),
                c()(j.A, L),
                j.A && j.A.locals && j.A.locals);
            var k = n(9980);
            const E = ({ width: t, buttonSize: e, defaultValue: n = 0, onChange: s }) => {
                    const [r, a] = (0, o.useState)(n * t),
                        c = { startingPoint: 0 },
                        { startMoving: l } = (0, k.c)((e) => {
                            let n = e.clientX - c.startingPoint;
                            (n < 0 && (n = 0), n > t && (n = t), a(n), s(n / t));
                        });
                    return (0, i.jsxs)('div', {
                        className: 'bar-container',
                        children: [
                            (0, i.jsx)('div', { className: 'bar' }),
                            (0, i.jsx)('div', {
                                className: 'bar-button',
                                style: { left: r, width: e, height: e },
                                onMouseDown: (t) => {
                                    (t.stopPropagation(), (c.startingPoint = t.clientX - r), l());
                                },
                            }),
                        ],
                    });
                },
                C = ({ opacity: t, onChange: e }) => (0, i.jsx)(E, { width: 162, buttonSize: 16, defaultValue: t, onChange: e });
            function A({ title: t, map: e, children: n, ...a }) {
                const [c, l] = (0, o.useState)(!0);
                return (0, i.jsxs)(i.Fragment, {
                    children: [
                        (0, i.jsxs)('div', {
                            className: 'title',
                            children: [
                                t,
                                (0, i.jsxs)(s.e, {
                                    noGaps: !0,
                                    alignCenter: !0,
                                    children: [
                                        e &&
                                            a.setVisible &&
                                            (0, i.jsx)(M, { isVisible: a.isVisible, toggleVisible: () => a.setVisible(!a.isVisible) }),
                                        (e || n) &&
                                            (0, i.jsx)(r.$, {
                                                style: { padding: 0, width: 25, height: 25, marginLeft: 3 },
                                                onClick: (t) => {
                                                    (t.stopPropagation(), l(!c));
                                                },
                                                children: c ? '-' : '+',
                                            }),
                                    ],
                                }),
                            ],
                        }),
                        c &&
                            (0, i.jsxs)(i.Fragment, {
                                children: [
                                    e && a.setOpacity && (0, i.jsx)(C, { opacity: a.opacity, onChange: a.setOpacity }),
                                    e && (0, i.jsx)('div', { className: 'mini-map', children: e }),
                                    n,
                                ],
                            }),
                    ],
                });
            }
        },
        4136: (t, e, n) => {
            (n.r(e), n.d(e, { MiniMap: () => g }));
            var i = n(4848),
                o = n(4035),
                s = n(5055),
                r = n(9860),
                a = n(7339),
                c = n(2279),
                l = n(367),
                d = n(5803),
                u = n(8106),
                h = n(7840),
                v = n(988),
                m = n(7579);
            const p = ({ panelWidth: t, title: e, map: n }) => {
                    const o = t / (n.rowLength + 10),
                        s = (0, v.df)(o);
                    return (0, i.jsx)(r.H, {
                        title: e,
                        width: t + o / 2,
                        height: (s + 1) * n.columnLength,
                        style: { maxHeight: 170 },
                        children: (t) => {
                            n.data.forEach((e, n) => {
                                e.forEach((e, i) => {
                                    (0, a._)({ ctx: t, position: { x: i, y: n }, width: o, color: l.S[e].color });
                                });
                            });
                        },
                    });
                },
                g = ({ title: t, panelWidth: e }) => {
                    const {
                            store: { map: n, isVisible: r, opacity: a },
                            setStore: l,
                        } = (0, m.I)(),
                        g = u.x.store;
                    return (0, i.jsx)(c.v, {
                        isVisible: r,
                        setVisible: (t) => l({ isVisible: t }),
                        opacity: a,
                        setOpacity: (t) => l({ opacity: t }),
                        map: n && (0, i.jsx)(p, { panelWidth: e, title: t, map: n }),
                        title: t,
                        children:
                            g.map &&
                            (0, i.jsx)('div', {
                                children: (0, i.jsx)(o.e, {
                                    alignCenter: !0,
                                    noPadding: !0,
                                    children: (0, i.jsx)(s.$, {
                                        onClick: () => {
                                            l({ map: new d.s((0, v.pf)(g.map.mapSize, h.N.water)), zoom: g.zoom, position: g.position });
                                        },
                                        children: 'Create Map',
                                    }),
                                }),
                            }),
                    });
                };
        },
        5803: (t, e, n) => {
            n.d(e, { s: () => s });
            var i = n(205),
                o = n(988);
            class s {
                static hexWidth = 100;
                data = [];
                get width() {
                    return this.rowLength * s.hexWidth;
                }
                get height() {
                    return this.columnLength * (0, o.df)(s.hexWidth);
                }
                get imageSize() {
                    return (0, i.Oo)(this.width, this.height);
                }
                get rowLength() {
                    return this.data[0]?.length || 0;
                }
                get columnLength() {
                    return this.data.length;
                }
                get mapSize() {
                    return (0, i.Oo)(this.rowLength, this.columnLength);
                }
                constructor(t) {
                    this.data = t;
                }
            }
        },
        7339: (t, e, n) => {
            n.d(e, { _: () => r });
            var i = n(988),
                o = n(205);
            function s(t, e, n) {
                return (0, o.Oo)(t.x + n * Math.cos(e), t.y + n * Math.sin(e));
            }
            function r({ ctx: t, position: e, offset: n, width: r, color: a, isGridTurnedOn: c }) {
                const l = e.y % 2 == 0 ? r / 2 : r,
                    d = (0, i.c)(r),
                    u = (0, i.L$)(d);
                !(function ({ ctx: t, centerPoint: e, startAngle: n, radius: i, sides: o, fillColor: r, strokeColor: a }) {
                    t.beginPath();
                    const c = s(e, n, i);
                    t.moveTo(c.x, c.y);
                    for (let r = 0; r < o; r += 1) {
                        const a = s(e, (r * Math.PI * 2) / o + n, i);
                        t.lineTo(a.x, a.y);
                    }
                    (t.closePath(), r && ((t.fillStyle = r), t.fill()), a && ((t.strokeStyle = a), t.stroke()));
                })({
                    ctx: t,
                    centerPoint: (0, o.Oo)(e.x * r + l + (n?.x || 0), e.y * u + d + (n?.y || 0)),
                    startAngle: Math.PI / 2,
                    radius: d,
                    sides: 6,
                    fillColor: a,
                    strokeColor: c ? '#000' : void 0,
                });
            }
        },
        8964: (t, e, n) => {
            n.d(e, { A: () => a });
            var i = n(1601),
                o = n.n(i),
                s = n(6314),
                r = n.n(s)()(o());
            r.push([
                t.id,
                '.eye {\n    cursor: pointer;\n    border-radius: 5px;\n    padding: 0 1px;\n    margin-bottom: -1px;\n}\n.eye:hover {\n    outline: 3px solid #7c7c7c;\n}\n',
                '',
            ]);
            const a = r;
        },
        9860: (t, e, n) => {
            n.d(e, { H: () => r });
            var i = n(4848),
                o = n(6540),
                s = n(205);
            const r = ({ children: t, onClick: e, onMouseDown: n, onMouseMove: r, onMouseUp: a, ...c }) => {
                const l = (0, o.useRef)(null),
                    [d, u] = (0, o.useState)(null);
                return (
                    (0, o.useEffect)(() => {
                        if (l.current) {
                            const e = l.current.getContext('2d');
                            (t(e), u(e));
                        }
                    }, [t]),
                    (0, i.jsx)('canvas', {
                        ref: l,
                        ...c,
                        onClick: e && d ? (t) => e(d, (0, s.Oo)(t.nativeEvent.offsetX, t.nativeEvent.offsetY)) : void 0,
                        onMouseDown: n && d ? (t) => n(d, (0, s.Oo)(t.nativeEvent.offsetX, t.nativeEvent.offsetY)) : void 0,
                        onMouseMove: r && d ? (t) => r(d, (0, s.Oo)(t.nativeEvent.offsetX, t.nativeEvent.offsetY)) : void 0,
                        onMouseUp: a && d ? (t) => a(d, (0, s.Oo)(t.nativeEvent.offsetX, t.nativeEvent.offsetY)) : void 0,
                    })
                );
            };
        },
        9980: (t, e, n) => {
            n.d(e, { c: () => o });
            var i = n(6540);
            function o(t, e = !0) {
                const n = (0, i.useMemo)(() => ({ moving: !1, callback: t }), []);
                return (
                    (0, i.useEffect)(() => {
                        if (!e) return () => {};
                        function t(t) {
                            n.moving && requestAnimationFrame(() => n.callback(t));
                        }
                        function i(t) {
                            (t.stopPropagation(), (n.moving = !1));
                        }
                        return (
                            document.addEventListener('touchmove', t),
                            document.addEventListener('touchend', i),
                            document.addEventListener('mousemove', t),
                            document.addEventListener('mouseup', i),
                            () => {
                                (document.removeEventListener('mousemove', t),
                                    document.removeEventListener('mouseup', i),
                                    document.removeEventListener('touchmove', t),
                                    document.removeEventListener('touchend', i));
                            }
                        );
                    }, [e]),
                    {
                        startMoving: () => {
                            ((n.moving = !0), (n.callback = t));
                        },
                    }
                );
            }
        },
    },
]);
