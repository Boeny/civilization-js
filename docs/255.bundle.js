'use strict';
(self.webpackChunkcivilization_js = self.webpackChunkcivilization_js || []).push([
    [255],
    {
        288: (e, n, t) => {
            t.d(n, { A: () => a });
            var i = t(1601),
                o = t.n(i),
                s = t(6314),
                r = t.n(s)()(o());
            r.push([
                e.id,
                '.bar-container {\n    height: 25px;\n    position: relative;\n    display: flex;\n    align-items: center;\n}\n.bar {\n    height: 5px;\n    width: 100%;\n    background: #7c7c7c;\n}\n.bar-button {\n    outline: 2px solid #656565;\n    border-radius: 50%;\n    position: absolute;\n    top: 4px;\n    background: #ccc;\n    cursor: pointer;\n}\n',
                '',
            ]);
            const a = r;
        },
        988: (e, n, t) => {
            t.d(n, { L$: () => r, c: () => s, df: () => a, pf: () => o });
            var i = t(2589);
            function o(e, n) {
                return Array.from({ length: e.y }).map(() => Array.from({ length: e.x }).map(() => n));
            }
            function s(e) {
                return e / i.B4;
            }
            function r(e) {
                return 1.5 * e;
            }
            function a(e) {
                return 1.5 * s(e);
            }
        },
        2279: (e, n, t) => {
            t.d(n, { v: () => z });
            var i = t(4848),
                o = t(6540),
                s = t(4035),
                r = t(5055),
                a = t(5072),
                l = t.n(a),
                c = t(7825),
                d = t.n(c),
                h = t(7659),
                u = t.n(h),
                m = t(5056),
                g = t.n(m),
                p = t(540),
                v = t.n(p),
                f = t(1113),
                x = t.n(f),
                b = t(8964),
                y = {};
            ((y.styleTagTransform = x()),
                (y.setAttributes = g()),
                (y.insert = u().bind(null, 'head')),
                (y.domAPI = d()),
                (y.insertStyleElement = v()),
                l()(b.A, y),
                b.A && b.A.locals && b.A.locals);
            var j = t(5221);
            const E = ({ isVisible: e, toggleVisible: n }) =>
                (0, i.jsx)('div', {
                    className: 'eye',
                    onClick: (e) => {
                        (e.stopPropagation(), n());
                    },
                    children: (0, i.jsx)(j.B, {
                        src: e
                            ? '<svg width="20" viewBox="0 0 512 400">\n    <path d="m494.8,241.4l-50.6-49.4c-50.1-48.9-116.9-75.8-188.2-75.8s-138.1,26.9-188.2,75.8l-50.6,49.4c-11.3,12.3-4.3,25.4 0,29.2l50.6,49.4c50.1,48.9 116.9,75.8 188.2,75.8s138.1-26.9 188.2-75.8l50.6-49.4c4-3.8 11.7-16.4 0-29.2zm-238.8,84.4c-38.5,0-69.8-31.3-69.8-69.8 0-38.5 31.3-69.8 69.8-69.8 38.5,0 69.8,31.3 69.8,69.8 0,38.5-31.3,69.8-69.8,69.8zm-195.3-69.8l35.7-34.8c27-26.4 59.8-45.2 95.7-55.4-28.2,20.1-46.6,53-46.6,90.1 0,37.1 18.4,70.1 46.6,90.1-35.9-10.2-68.7-29-95.7-55.3l-35.7-34.7zm355,34.8c-27,26.3-59.8,45.1-95.7,55.3 28.2-20.1 46.6-53 46.6-90.1 0-37.2-18.4-70.1-46.6-90.1 35.9,10.2 68.7,29 95.7,55.4l35.6,34.8-35.6,34.7z"></path>\n</svg>\n'
                            : '<svg width="20" viewBox="0 4 24 19">\n    <path stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21.0006 12.0007C19.2536 15.5766 15.8779 18 12 18M12 18C8.12204 18 4.7463 15.5766 2.99977 12.0002M12 18L12 21M19.4218 14.4218L21.4999 16.5M16.2304 16.9687L17.5 19.5M4.57812 14.4218L2.5 16.5M7.76953 16.9687L6.5 19.5"></path>\n</svg>\n',
                        width: 20,
                    }),
                });
            var w = t(288),
                M = {};
            ((M.styleTagTransform = x()),
                (M.setAttributes = g()),
                (M.insert = u().bind(null, 'head')),
                (M.domAPI = d()),
                (M.insertStyleElement = v()),
                l()(w.A, M),
                w.A && w.A.locals && w.A.locals);
            var S = t(9980);
            const A = ({ width: e, buttonSize: n, defaultValue: t = 0, onChange: s }) => {
                    const [r, a] = (0, o.useState)(t * e),
                        l = { startingPoint: 0 },
                        { startMoving: c } = (0, S.c)((n) => {
                            let t = n.clientX - l.startingPoint;
                            (t < 0 && (t = 0), t > e && (t = e), a(t), s(t / e));
                        });
                    return (0, i.jsxs)('div', {
                        className: 'bar-container',
                        children: [
                            (0, i.jsx)('div', { className: 'bar' }),
                            (0, i.jsx)('div', {
                                className: 'bar-button',
                                style: { left: r, width: n, height: n },
                                onMouseDown: (e) => {
                                    (e.stopPropagation(), (l.startingPoint = e.clientX - r), c());
                                },
                            }),
                        ],
                    });
                },
                C = ({ opacity: e, onChange: n }) => (0, i.jsx)(A, { width: 162, buttonSize: 16, defaultValue: e, onChange: n });
            function z({ title: e, map: n, children: t, ...a }) {
                const [l, c] = (0, o.useState)(!0);
                return (0, i.jsxs)(i.Fragment, {
                    children: [
                        (0, i.jsxs)('div', {
                            className: 'title',
                            children: [
                                e,
                                (0, i.jsxs)(s.e, {
                                    noGaps: !0,
                                    alignCenter: !0,
                                    children: [
                                        n &&
                                            a.setVisible &&
                                            (0, i.jsx)(E, { isVisible: a.isVisible, toggleVisible: () => a.setVisible(!a.isVisible) }),
                                        (n || t) &&
                                            (0, i.jsx)(r.$, {
                                                style: { padding: 0, width: 25, height: 25, marginLeft: 3 },
                                                onClick: (e) => {
                                                    (e.stopPropagation(), c(!l));
                                                },
                                                children: l ? '-' : '+',
                                            }),
                                    ],
                                }),
                            ],
                        }),
                        l &&
                            (0, i.jsxs)(i.Fragment, {
                                children: [
                                    n && a.setOpacity && (0, i.jsx)(C, { opacity: a.opacity, onChange: a.setOpacity }),
                                    n && (0, i.jsx)('div', { className: 'mini-map', children: n }),
                                    t,
                                ],
                            }),
                    ],
                });
            }
        },
        3915: (e, n, t) => {
            t.d(n, { h: () => o });
            var i = t(4848);
            function o({ name: e, label: n, value: t, selectedValue: o, disabled: s, children: r, onChange: a }) {
                const l = (0, i.jsx)('input', {
                    disabled: s,
                    type: 'radio',
                    name: e,
                    value: t,
                    checked: t === o,
                    onChange: (e) => {
                        const n = e.target.value,
                            i = 'number' == typeof t ? Number(n) : n;
                        a(i);
                    },
                });
                return (0, i.jsxs)(i.Fragment, {
                    children: [
                        (0, i.jsx)('div', { children: n ? (0, i.jsxs)('label', { style: { cursor: 'pointer' }, children: [l, n] }) : l }),
                        r,
                    ],
                });
            }
        },
        4067: (e, n, t) => {
            t.d(n, { s: () => o });
            var i = t(4848);
            function o({ name: e, value: n, children: t, label: o, onChange: s }) {
                return (0, i.jsxs)('div', {
                    children: [o && (0, i.jsx)('label', { children: o }), t({ name: e, selectedValue: n, onChange: s })],
                });
            }
        },
        4738: (e, n, t) => {
            t.d(n, { lF: () => r, qJ: () => l, qc: () => a });
            var i = t(205),
                o = t(2589);
            function s(e, n) {
                return (0, i.tI)((0, i.Ks)(e, n), 2);
            }
            function r(e, n) {
                return { zoom: (0, i.pz)(e, n), position: (0, i.at)() };
            }
            function a(e, n) {
                const t = (0, i.pz)(o.bD.minWidth, n.x);
                return { zoom: t, position: s(e, (0, i.oV)(n, t)) };
            }
            function l(e, n, t) {
                const o = (0, i.oV)(e, t);
                return (function (e, n) {
                    const t = (0, i.at)();
                    return (
                        [...n, e].forEach((e) => {
                            (t.x < e.width && (t.x = e.width), t.y < e.height && (t.y = e.height));
                        }),
                        t
                    );
                })({ width: o.x, height: o.y }, n);
            }
        },
        5803: (e, n, t) => {
            t.d(n, { s: () => s });
            var i = t(205),
                o = t(988);
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
                constructor(e) {
                    this.data = e;
                }
            }
        },
        6193: (e, n, t) => {
            t.d(n, { A: () => a });
            var i = t(1601),
                o = t.n(i),
                s = t(6314),
                r = t.n(s)()(o());
            r.push([e.id, 'label {\n    padding-left: 5px;\n}\nlabel input {\n    margin: 10px;\n}\n', '']);
            const a = r;
        },
        6255: (e, n, t) => {
            (t.r(n), t.d(n, { MiniMap: () => _ }));
            var i = t(4848),
                o = t(9860),
                s = t(7339),
                r = t(6060),
                a = t(2279),
                l = t(9209),
                c = t(205),
                d = t(3045),
                h = t(4738),
                u = t(7579),
                m = t(367),
                g = t(5803),
                p = t(6540),
                v = t(4035),
                f = t(5055),
                x = t(4067),
                b = t(3915),
                y = t(7840),
                j = t(5072),
                E = t.n(j),
                w = t(7825),
                M = t.n(w),
                S = t(7659),
                A = t.n(S),
                C = t(5056),
                z = t.n(C),
                L = t(540),
                k = t.n(L),
                P = t(1113),
                V = t.n(P),
                N = t(6193),
                F = {};
            ((F.styleTagTransform = V()),
                (F.setAttributes = z()),
                (F.insert = A().bind(null, 'head')),
                (F.domAPI = M()),
                (F.insertStyleElement = k()),
                E()(N.A, F),
                N.A && N.A.locals && N.A.locals);
            var O = t(7086),
                I = {};
            ((I.styleTagTransform = V()),
                (I.setAttributes = z()),
                (I.insert = A().bind(null, 'head')),
                (I.domAPI = M()),
                (I.insertStyleElement = k()),
                E()(O.A, I),
                O.A && O.A.locals && O.A.locals);
            const T = ({
                disabled: e,
                autoFocus: n,
                value: t,
                onEnterKeyDown: o,
                onChange: s,
                isError: r,
                setError: a,
                style: d,
                className: h,
            }) =>
                (0, i.jsx)('input', {
                    style: d,
                    disabled: e,
                    autoFocus: n,
                    value: String(t || ''),
                    className: (0, c.lw)(['number-input', r && 'error', h]),
                    onKeyUp: (e) => e.key === l.OC.enter && o(),
                    onChange: (e) => {
                        const n = (function (e) {
                            return e.includes('.') ? NaN : Number(e);
                        })(e.target.value);
                        (function (e) {
                            return (0, c.Li)(e) && (0, c.rM)(e) && (0, c._u)(e);
                        })(n) && (a(!(0, c._q)(n)), s(n));
                    },
                });
            function W({ mapSize: e, setMapSize: n, onEnterKeyDown: t, isError: o, setError: s }) {
                return (0, i.jsxs)(v.e, {
                    noPadding: !0,
                    alignCenter: !0,
                    style: { fontSize: 14, margin: 0 },
                    children: [
                        (0, i.jsxs)(v.e, {
                            alignedVertically: !0,
                            noPadding: !0,
                            style: { marginRight: 5 },
                            children: [
                                (0, i.jsx)('div', { children: 'width' }),
                                (0, i.jsx)(T, {
                                    className: 'small',
                                    autoFocus: !0,
                                    value: e.x,
                                    onChange: (t) => n({ x: t, y: e.y }),
                                    onEnterKeyDown: t,
                                    isError: o,
                                    setError: s,
                                }),
                            ],
                        }),
                        (0, i.jsxs)(v.e, {
                            alignedVertically: !0,
                            noPadding: !0,
                            style: { marginLeft: 5 },
                            children: [
                                (0, i.jsx)('div', { children: 'height' }),
                                (0, i.jsx)(T, {
                                    className: 'small',
                                    value: e.y,
                                    onChange: (t) => n({ x: e.x, y: t }),
                                    onEnterKeyDown: t,
                                    isError: o,
                                    setError: s,
                                }),
                            ],
                        }),
                    ],
                });
            }
            const D = ({ hasImageMap: e, onSubmit: n }) => {
                const [t, o] = (0, p.useState)((0, c.Oo)(100, 100)),
                    [s, r] = (0, p.useState)(y.h.fitScreen),
                    [a, l] = (0, p.useState)(!1),
                    d = () => {
                        n(t, s);
                    };
                return (0, i.jsxs)(i.Fragment, {
                    children: [
                        (0, i.jsx)(W, { mapSize: t, setMapSize: o, onEnterKeyDown: d, isError: a, setError: l }),
                        (0, i.jsx)(x.s, {
                            name: 'hexMapCreationMode',
                            value: s,
                            onChange: r,
                            children: (n) =>
                                (0, i.jsxs)(i.Fragment, {
                                    children: [
                                        e && (0, i.jsx)(b.h, { ...n, label: 'Fit the image', value: y.h.fitImage }),
                                        (0, i.jsx)(b.h, { ...n, value: y.h.fitScreen, label: 'Fit the screen' }),
                                        (0, i.jsx)(b.h, { ...n, value: y.h.center, label: 'Screen center' }),
                                        (0, i.jsx)(b.h, { ...n, value: y.h.free, label: 'Free transform' }),
                                    ],
                                }),
                        }),
                        (0, i.jsx)(v.e, {
                            alignCenter: !0,
                            noPadding: !0,
                            children: (0, i.jsx)(f.$, { disabled: a, onClick: d, children: 'Create map' }),
                        }),
                    ],
                });
            };
            var K = t(8106),
                q = t(988);
            const X = ({ panelWidth: e, title: n, map: t }) => {
                    const r = e / (t.rowLength + 10),
                        a = (0, q.df)(r);
                    return (0, i.jsx)(o.H, {
                        title: n,
                        width: e + r / 2,
                        height: (a + 1) * t.columnLength,
                        style: { maxHeight: 170 },
                        children: (e) => {
                            t.data.forEach((n, t) => {
                                n.forEach((n, i) => {
                                    (0, s._)({ ctx: e, position: { x: i, y: t }, width: r, color: m.S[n].color });
                                });
                            });
                        },
                    });
                },
                _ = ({ screenSize: e, title: n, panelWidth: t }) => {
                    const {
                        store: { map: o, isVisible: s, opacity: m },
                        setStore: p,
                    } = (0, K.E)();
                    return (0, i.jsx)(a.v, {
                        isVisible: s,
                        setVisible: (e) => p({ isVisible: e }),
                        opacity: m,
                        setOpacity: (e) => p({ opacity: e }),
                        map: o && (0, i.jsx)(X, { panelWidth: t, title: n, map: o }),
                        title: n,
                        children: (0, i.jsx)('div', {
                            children: (0, i.jsx)(D, {
                                hasImageMap: !!(0, d.ZE)(l.Nl.height).find(({ type: e }) => e === l.Nl.image),
                                onSubmit: (n, t) => {
                                    const i = (0, d.ZE)(l.Nl.height),
                                        o = i.find(({ type: e }) => e === l.Nl.image),
                                        s = (0, q.df)(g.s.hexWidth),
                                        a = (0, c.oV)(n, (0, c.Oo)(g.s.hexWidth, s));
                                    let m = { zoom: 1, position: (0, c.at)() };
                                    (t === y.h.fitScreen && ((m = (0, h.lF)(e.x, a.x)), (n.y = Math.floor(e.y / (m.zoom * s)))),
                                        t === y.h.center && (m = (0, h.qc)(e, a)));
                                    const v = r.I.setStore;
                                    if (0 === i.length) {
                                        const e = new g.s((0, q.pf)(n, y.N.hill));
                                        return (p({ map: e }), v({ borders: e.imageSize, ...m }), void u.F.reset());
                                    }
                                    const { zoom: f, position: x } = r.I.store;
                                    t === y.h.fitImage && o
                                        ? ((m.zoom = (o.map.width * o.zoom) / (n.x * g.s.hexWidth)),
                                          (n.y = Math.floor((o.map.height * o.zoom) / (m.zoom * s))),
                                          (m.position = o.position))
                                        : ((m.zoom /= f), (m.position = (0, c.Ks)(m.position, x)));
                                    const b = new g.s((0, q.pf)(n, y.N.hill));
                                    (p({ map: b, ...m }),
                                        v({
                                            borders: (0, h.qJ)(
                                                b.imageSize,
                                                i.map(({ map: e }) => e),
                                                m.zoom,
                                            ),
                                        }),
                                        u.F.reset());
                                },
                            }),
                        }),
                    });
                };
        },
        7086: (e, n, t) => {
            t.d(n, { A: () => a });
            var i = t(1601),
                o = t.n(i),
                s = t(6314),
                r = t.n(s)()(o());
            r.push([
                e.id,
                '.number-input {\n    width: 50px;\n    outline: none;\n}\n.number-input.error {\n    outline: 2px solid #ff4d4d;\n}\n.number-input.small {\n    width: 35px;\n}\n',
                '',
            ]);
            const a = r;
        },
        7339: (e, n, t) => {
            t.d(n, { _: () => r });
            var i = t(988),
                o = t(205);
            function s(e, n, t) {
                return (0, o.Oo)(e.x + t * Math.cos(n), e.y + t * Math.sin(n));
            }
            function r({ ctx: e, position: n, offset: t, width: r, color: a, isGridTurnedOn: l }) {
                const c = n.y % 2 == 0 ? r / 2 : r,
                    d = (0, i.c)(r),
                    h = (0, i.L$)(d);
                !(function ({ ctx: e, centerPoint: n, startAngle: t, radius: i, sides: o, fillColor: r, strokeColor: a }) {
                    e.beginPath();
                    const l = s(n, t, i);
                    e.moveTo(l.x, l.y);
                    for (let r = 0; r < o; r += 1) {
                        const a = s(n, (r * Math.PI * 2) / o + t, i);
                        e.lineTo(a.x, a.y);
                    }
                    (e.closePath(), r && ((e.fillStyle = r), e.fill()), a && ((e.strokeStyle = a), e.stroke()));
                })({
                    ctx: e,
                    centerPoint: (0, o.Oo)(n.x * r + c + (t?.x || 0), n.y * h + d + (t?.y || 0)),
                    startAngle: Math.PI / 2,
                    radius: d,
                    sides: 6,
                    fillColor: a,
                    strokeColor: l ? '#000' : void 0,
                });
            }
        },
        8964: (e, n, t) => {
            t.d(n, { A: () => a });
            var i = t(1601),
                o = t.n(i),
                s = t(6314),
                r = t.n(s)()(o());
            r.push([
                e.id,
                '.eye {\n    cursor: pointer;\n    border-radius: 5px;\n    padding: 0 1px;\n    margin-bottom: -1px;\n}\n.eye:hover {\n    outline: 3px solid #7c7c7c;\n}\n',
                '',
            ]);
            const a = r;
        },
        9860: (e, n, t) => {
            t.d(n, { H: () => r });
            var i = t(4848),
                o = t(6540),
                s = t(205);
            const r = ({ children: e, onClick: n, onMouseDown: t, onMouseMove: r, onMouseUp: a, ...l }) => {
                const c = (0, o.useRef)(null),
                    [d, h] = (0, o.useState)(null);
                return (
                    (0, o.useEffect)(() => {
                        if (c.current) {
                            const n = c.current.getContext('2d');
                            (e(n), h(n));
                        }
                    }, [e]),
                    (0, i.jsx)('canvas', {
                        ref: c,
                        ...l,
                        onClick: n && d ? (e) => n(d, (0, s.Oo)(e.nativeEvent.offsetX, e.nativeEvent.offsetY)) : void 0,
                        onMouseDown: t && d ? (e) => t(d, (0, s.Oo)(e.nativeEvent.offsetX, e.nativeEvent.offsetY)) : void 0,
                        onMouseMove: r && d ? (e) => r(d, (0, s.Oo)(e.nativeEvent.offsetX, e.nativeEvent.offsetY)) : void 0,
                        onMouseUp: a && d ? (e) => a(d, (0, s.Oo)(e.nativeEvent.offsetX, e.nativeEvent.offsetY)) : void 0,
                    })
                );
            };
        },
        9980: (e, n, t) => {
            t.d(n, { c: () => o });
            var i = t(6540);
            function o(e, n = !0) {
                const t = (0, i.useMemo)(() => ({ moving: !1, callback: e }), []);
                return (
                    (0, i.useEffect)(() => {
                        if (!n) return () => {};
                        function e(e) {
                            t.moving && requestAnimationFrame(() => t.callback(e));
                        }
                        function i(e) {
                            (e.stopPropagation(), (t.moving = !1));
                        }
                        return (
                            document.addEventListener('touchmove', e),
                            document.addEventListener('touchend', i),
                            document.addEventListener('mousemove', e),
                            document.addEventListener('mouseup', i),
                            () => {
                                (document.removeEventListener('mousemove', e),
                                    document.removeEventListener('mouseup', i),
                                    document.removeEventListener('touchmove', e),
                                    document.removeEventListener('touchend', i));
                            }
                        );
                    }, [n]),
                    {
                        startMoving: () => {
                            ((t.moving = !0), (t.callback = e));
                        },
                    }
                );
            }
        },
    },
]);
