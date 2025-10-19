'use strict';
(self.webpackChunkcivilization_js = self.webpackChunkcivilization_js || []).push([
    [919],
    {
        288: (e, n, t) => {
            t.d(n, { A: () => r });
            var i = t(1601),
                o = t.n(i),
                s = t(6314),
                a = t.n(s)()(o());
            a.push([
                e.id,
                '.bar-container {\n    height: 25px;\n    position: relative;\n    display: flex;\n    align-items: center;\n}\n.bar {\n    height: 5px;\n    width: 100%;\n    background: #7c7c7c;\n}\n.bar-button {\n    outline: 2px solid #656565;\n    border-radius: 50%;\n    position: absolute;\n    top: 4px;\n    background: #ccc;\n    cursor: pointer;\n}\n',
                '',
            ]);
            const r = a;
        },
        2279: (e, n, t) => {
            t.d(n, { v: () => L });
            var i = t(4848),
                o = t(6540),
                s = t(4035),
                a = t(5055),
                r = t(5072),
                c = t.n(r),
                l = t(7825),
                d = t.n(l),
                u = t(7659),
                h = t.n(u),
                m = t(5056),
                v = t.n(m),
                p = t(540),
                g = t.n(p),
                x = t(1113),
                f = t.n(x),
                b = t(8964),
                j = {};
            ((j.styleTagTransform = f()),
                (j.setAttributes = v()),
                (j.insert = h().bind(null, 'head')),
                (j.domAPI = d()),
                (j.insertStyleElement = g()),
                c()(b.A, j),
                b.A && b.A.locals && b.A.locals);
            var w = t(5221);
            const y = ({ isVisible: e, toggleVisible: n }) =>
                (0, i.jsx)('div', {
                    className: 'eye',
                    onClick: (e) => {
                        (e.stopPropagation(), n());
                    },
                    children: (0, i.jsx)(w.B, {
                        src: e
                            ? '<svg width="20" viewBox="0 0 512 400">\n    <path d="m494.8,241.4l-50.6-49.4c-50.1-48.9-116.9-75.8-188.2-75.8s-138.1,26.9-188.2,75.8l-50.6,49.4c-11.3,12.3-4.3,25.4 0,29.2l50.6,49.4c50.1,48.9 116.9,75.8 188.2,75.8s138.1-26.9 188.2-75.8l50.6-49.4c4-3.8 11.7-16.4 0-29.2zm-238.8,84.4c-38.5,0-69.8-31.3-69.8-69.8 0-38.5 31.3-69.8 69.8-69.8 38.5,0 69.8,31.3 69.8,69.8 0,38.5-31.3,69.8-69.8,69.8zm-195.3-69.8l35.7-34.8c27-26.4 59.8-45.2 95.7-55.4-28.2,20.1-46.6,53-46.6,90.1 0,37.1 18.4,70.1 46.6,90.1-35.9-10.2-68.7-29-95.7-55.3l-35.7-34.7zm355,34.8c-27,26.3-59.8,45.1-95.7,55.3 28.2-20.1 46.6-53 46.6-90.1 0-37.2-18.4-70.1-46.6-90.1 35.9,10.2 68.7,29 95.7,55.4l35.6,34.8-35.6,34.7z"></path>\n</svg>\n'
                            : '<svg width="20" viewBox="0 4 24 19">\n    <path stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21.0006 12.0007C19.2536 15.5766 15.8779 18 12 18M12 18C8.12204 18 4.7463 15.5766 2.99977 12.0002M12 18L12 21M19.4218 14.4218L21.4999 16.5M16.2304 16.9687L17.5 19.5M4.57812 14.4218L2.5 16.5M7.76953 16.9687L6.5 19.5"></path>\n</svg>\n',
                        width: 20,
                    }),
                });
            var C = t(288),
                k = {};
            ((k.styleTagTransform = f()),
                (k.setAttributes = v()),
                (k.insert = h().bind(null, 'head')),
                (k.domAPI = d()),
                (k.insertStyleElement = g()),
                c()(C.A, k),
                C.A && C.A.locals && C.A.locals);
            var A = t(9980);
            const E = ({ width: e, buttonSize: n, defaultValue: t = 0, onChange: s }) => {
                    const [a, r] = (0, o.useState)(t * e),
                        c = { startingPoint: 0 },
                        { startMoving: l } = (0, A.c)((n) => {
                            let t = n.clientX - c.startingPoint;
                            (t < 0 && (t = 0), t > e && (t = e), r(t), s(t / e));
                        });
                    return (0, i.jsxs)('div', {
                        className: 'bar-container',
                        children: [
                            (0, i.jsx)('div', { className: 'bar' }),
                            (0, i.jsx)('div', {
                                className: 'bar-button',
                                style: { left: a, width: n, height: n },
                                onMouseDown: (e) => {
                                    (e.stopPropagation(), (c.startingPoint = e.clientX - a), l());
                                },
                            }),
                        ],
                    });
                },
                M = ({ opacity: e, onChange: n }) => (0, i.jsx)(E, { width: 162, buttonSize: 16, defaultValue: e, onChange: n });
            function L({ title: e, map: n, children: t, ...r }) {
                const [c, l] = (0, o.useState)(!0);
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
                                            r.setVisible &&
                                            (0, i.jsx)(y, { isVisible: r.isVisible, toggleVisible: () => r.setVisible(!r.isVisible) }),
                                        (n || t) &&
                                            (0, i.jsx)(a.$, {
                                                style: { padding: 0, width: 25, height: 25, marginLeft: 3 },
                                                onClick: (e) => {
                                                    (e.stopPropagation(), l(!c));
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
                                    n && r.setOpacity && (0, i.jsx)(M, { opacity: r.opacity, onChange: r.setOpacity }),
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
            function o({ name: e, label: n, value: t, selectedValue: o, disabled: s, children: a, onChange: r }) {
                const c = (0, i.jsx)('input', {
                    disabled: s,
                    type: 'radio',
                    name: e,
                    value: t,
                    checked: t === o,
                    onChange: (e) => {
                        const n = e.target.value,
                            i = 'number' == typeof t ? Number(n) : n;
                        r(i);
                    },
                });
                return (0, i.jsxs)(i.Fragment, {
                    children: [
                        (0, i.jsx)('div', { children: n ? (0, i.jsxs)('label', { style: { cursor: 'pointer' }, children: [c, n] }) : c }),
                        a,
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
        4104: (e, n, t) => {
            t.d(n, { A: () => r });
            var i = t(1601),
                o = t.n(i),
                s = t(6314),
                a = t.n(s)()(o());
            a.push([
                e.id,
                '.selected #image-minimap:hover {\n    box-shadow: 0px 0px 12px #000000;\n}\n.selected #image-minimap:active {\n    box-shadow: none;\n}\n',
                '',
            ]);
            const r = a;
        },
        4738: (e, n, t) => {
            t.d(n, { lF: () => a, qJ: () => c, qc: () => r });
            var i = t(205),
                o = t(2589);
            function s(e, n) {
                return (0, i.tI)((0, i.Ks)(e, n), 2);
            }
            function a(e, n) {
                return { zoom: (0, i.pz)(e, n), position: (0, i.at)() };
            }
            function r(e, n) {
                const t = (0, i.pz)(o.bD.minWidth, n.x);
                return { zoom: t, position: s(e, (0, i.oV)(n, t)) };
            }
            function c(e, n, t) {
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
        6919: (e, n, t) => {
            (t.r(n), t.d(n, { MiniMap: () => F }));
            var i = t(4848),
                o = t(5072),
                s = t.n(o),
                a = t(7825),
                r = t.n(a),
                c = t(7659),
                l = t.n(c),
                d = t(5056),
                u = t.n(d),
                h = t(540),
                m = t.n(h),
                v = t(1113),
                p = t.n(v),
                g = t(4104),
                x = {};
            ((x.styleTagTransform = p()),
                (x.setAttributes = u()),
                (x.insert = l().bind(null, 'head')),
                (x.domAPI = r()),
                (x.insertStyleElement = m()),
                s()(g.A, x),
                g.A && g.A.locals && g.A.locals);
            var f = t(6540),
                b = t(4035),
                j = t(5055),
                w = t(9860),
                y = t(4067),
                C = t(3915),
                k = t(6060),
                A = t(2279),
                E = t(9209),
                M = t(205),
                L = t(3045),
                z = t(7840),
                S = t(4738),
                V = t(1935);
            const P = {
                    types: [{ description: 'Images', accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] } }],
                    excludeAcceptAllOption: !0,
                    multiple: !1,
                },
                O = ({ map: e, title: n, onClick: t, panelWidth: o }) => {
                    const s = o - 29,
                        a = (s * e.height) / e.width;
                    return (0, i.jsx)(w.H, {
                        id: 'image-minimap',
                        title: n,
                        width: s,
                        height: a,
                        style: { maxHeight: 170, cursor: 'pointer' },
                        onClick: t,
                        children: (n) => n.drawImage(e, 0, 0, s, a),
                    });
                },
                F = ({ screenSize: e, title: n, panelWidth: t, isSelected: o }) => {
                    const {
                            store: { map: s },
                            setStore: a,
                        } = (0, V.C)(),
                        [r, c] = (0, f.useState)(z.h.center),
                        l = async () => {
                            const n = await (async function () {
                                try {
                                    const [e] = await window.showOpenFilePicker(P),
                                        n = await e.getFile(),
                                        t = new Image();
                                    return (
                                        (t.src = URL.createObjectURL(n)),
                                        (t.onerror = function () {
                                            (URL.revokeObjectURL(this.src), console.error('Cannot load image'));
                                        }),
                                        new Promise((e) => {
                                            t.onload = function () {
                                                (URL.revokeObjectURL(t.src), e(t));
                                            };
                                        })
                                    );
                                } catch (e) {
                                    return (console.error(e), null);
                                }
                            })();
                            if (!n) return;
                            const t = (0, L.ZE)(E.Nl.image),
                                i = (0, M.Oo)(n.width, n.height);
                            let o = { zoom: 1, position: (0, M.at)() };
                            (r === z.h.fitScreen && (o = (0, S.lF)(e.x, i.x)), r === z.h.center && (o = (0, S.qc)(e, i)));
                            const {
                                store: { zoom: s, position: c },
                                setStore: l,
                            } = k.I;
                            t.length > 0
                                ? ((o.zoom /= s),
                                  (o.position = (0, M.Ks)(o.position, c)),
                                  a({ map: n, ...o }),
                                  l({
                                      borders: (0, S.qJ)(
                                          i,
                                          t.map(({ map: e }) => e),
                                          o.zoom,
                                      ),
                                  }))
                                : (a({ map: n }), l({ borders: i, ...o }));
                        };
                    return (0, i.jsx)(A.v, {
                        map:
                            s &&
                            (0, i.jsx)(O, {
                                panelWidth: t,
                                title: o ? 'Load new image' : n,
                                map: s,
                                onClick: () => {
                                    o && l();
                                },
                            }),
                        title: n,
                        children: (0, i.jsxs)('div', {
                            children: [
                                (0, i.jsx)(y.s, {
                                    name: 'imageMapCreationMode',
                                    value: r,
                                    onChange: c,
                                    children: (e) =>
                                        (0, i.jsxs)(i.Fragment, {
                                            children: [
                                                (0, i.jsx)(C.h, { ...e, value: z.h.fitScreen, label: 'Fit the screen' }),
                                                (0, i.jsx)(C.h, { ...e, value: z.h.center, label: 'Screen center' }),
                                                (0, i.jsx)(C.h, { ...e, value: z.h.free, label: 'Free transform' }),
                                            ],
                                        }),
                                }),
                                (0, i.jsx)(b.e, {
                                    alignCenter: !0,
                                    noPadding: !0,
                                    children: (0, i.jsx)(j.$, { onClick: l, children: 'Load Image' }),
                                }),
                            ],
                        }),
                    });
                };
        },
        8964: (e, n, t) => {
            t.d(n, { A: () => r });
            var i = t(1601),
                o = t.n(i),
                s = t(6314),
                a = t.n(s)()(o());
            a.push([
                e.id,
                '.eye {\n    cursor: pointer;\n    border-radius: 5px;\n    padding: 0 1px;\n    margin-bottom: -1px;\n}\n.eye:hover {\n    outline: 3px solid #7c7c7c;\n}\n',
                '',
            ]);
            const r = a;
        },
        9860: (e, n, t) => {
            t.d(n, { H: () => a });
            var i = t(4848),
                o = t(6540),
                s = t(205);
            const a = ({ children: e, onClick: n, onMouseDown: t, onMouseMove: a, onMouseUp: r, ...c }) => {
                const l = (0, o.useRef)(null),
                    [d, u] = (0, o.useState)(null);
                return (
                    (0, o.useEffect)(() => {
                        if (l.current) {
                            const n = l.current.getContext('2d');
                            (e(n), u(n));
                        }
                    }, [e]),
                    (0, i.jsx)('canvas', {
                        ref: l,
                        ...c,
                        onClick: n && d ? (e) => n(d, (0, s.Oo)(e.nativeEvent.offsetX, e.nativeEvent.offsetY)) : void 0,
                        onMouseDown: t && d ? (e) => t(d, (0, s.Oo)(e.nativeEvent.offsetX, e.nativeEvent.offsetY)) : void 0,
                        onMouseMove: a && d ? (e) => a(d, (0, s.Oo)(e.nativeEvent.offsetX, e.nativeEvent.offsetY)) : void 0,
                        onMouseUp: r && d ? (e) => r(d, (0, s.Oo)(e.nativeEvent.offsetX, e.nativeEvent.offsetY)) : void 0,
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
