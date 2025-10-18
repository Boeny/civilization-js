import { render, createEvent, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Button } from 'components/Button';
import { KEY_CODE } from 'types';

import { Menu } from '.';
import { MenuItem } from './MenuItem';

async function clickOn(element: HTMLElement) {
    return act(() => element.click());
}
async function keypress(key: KEY_CODE) {
    return act(() => fireEvent(document, createEvent.keyDown(document, { key })));
}

describe('Menu component', () => {
    it('Should show menu content', () => {
        const { getByTestId } = render(
            <Menu
                isOpen
                component={({ children }) => <div>{children}</div>}
                item={Button}
            >
                <div data-testid={'item'} />
            </Menu>,
        );

        expect(getByTestId('item')).toBeInTheDocument();
    });

    it('Should show menu item', () => {
        const { getByTestId } = render(
            <Menu
                isOpen
                component={({ children }) => <div>{children}</div>}
                item={Button}
            >
                <MenuItem
                    title="menu item"
                    testId="menu-item"
                ></MenuItem>
            </Menu>,
        );

        expect(getByTestId('menu-item')).toBeInTheDocument();
    });

    it('Should go to other menu by click on menu item', async () => {
        const { getByTestId } = render(
            <Menu
                isOpen
                component={({ children, testId }) => <div data-testid={testId}>{children}</div>}
                item={Button}
                testId="menu"
            >
                <MenuItem
                    title="menu item"
                    testId="menu-item"
                >
                    <div data-testid={'item'} />
                </MenuItem>
            </Menu>,
        );

        await clickOn(getByTestId('menu-item'));

        expect(getByTestId('item')).toBeInTheDocument();
    });

    it.each([
        ['Esc keypress', () => keypress(KEY_CODE.esc)],
        ['menu item 2 click', (getByTestId: any) => clickOn(getByTestId('menu-item2'))],
    ])('Should go back to the parent menu by %s', async (title, runEvent) => {
        const { getByTestId } = render(
            <Menu
                isOpen
                component={({ children }) => <div>{children}</div>}
                item={Button}
            >
                <MenuItem
                    title="menu item"
                    testId="menu-item"
                >
                    <MenuItem
                        title="menu item 2"
                        testId="menu-item2"
                        action="back"
                    />
                </MenuItem>
            </Menu>,
        );

        await clickOn(getByTestId('menu-item'));
        await runEvent(getByTestId);

        expect(getByTestId('menu-item')).toBeInTheDocument();
    });

    it.each([
        ['Esc keypress', () => keypress(KEY_CODE.esc)],
        ['menu item click', (getByTestId: any) => clickOn(getByTestId('menu-item'))],
    ])('Should do nothing at the top menu level when go back by %s', async (title, runEvent) => {
        const { getByTestId } = render(
            <Menu
                isOpen
                component={({ children }) => <div>{children}</div>}
                item={Button}
            >
                <MenuItem
                    title="menu item"
                    testId="menu-item"
                    action="back"
                />
            </Menu>,
        );

        await runEvent(getByTestId);

        expect(getByTestId('menu-item')).toBeInTheDocument();
    });

    it.each([
        ['Esc keypress when menu is open', () => keypress(KEY_CODE.esc)],
        ['menu item click when menu is open', (getByTestId: any) => clickOn(getByTestId('menu-item'))],
    ])('Should close menu when go back by %s at the menu top level with toggleMenuOnBackAction', async (title, runEvent) => {
        const { getByTestId } = render(
            <Menu
                isOpen
                component={({ children }) => <div>{children}</div>}
                item={Button}
                toggleMenuOnBackAction
            >
                <MenuItem
                    title="menu item"
                    testId="menu-item"
                    action="back"
                />
            </Menu>,
        );

        await runEvent(getByTestId);

        expect(() => getByTestId('menu-item')).toThrow();
    });

    it.each([
        ['Esc keypress when menu is closed', () => keypress(KEY_CODE.esc)],
        ['menu item click when menu is closed', (getByTestId: any) => clickOn(getByTestId('open-menu'))],
    ])('Should show menu by %s with toggleMenuOnBackAction', async (title, runEvent) => {
        const { getByTestId } = render(
            <>
                <Menu
                    component={({ children }) => <div>{children}</div>}
                    item={Button}
                    toggleMenuOnBackAction
                >
                    <MenuItem
                        title="menu item"
                        testId="menu-item"
                        action="back"
                    />
                </Menu>
                <MenuItem
                    title="open"
                    testId="open-menu"
                    action="back"
                />
            </>,
        );

        await runEvent(getByTestId);

        expect(getByTestId('menu-item')).toBeInTheDocument();
    });

    it('Should close menu if item action is "close"', async () => {
        const { getByTestId } = render(
            <Menu
                isOpen
                component={({ children }) => <div>{children}</div>}
                item={Button}
                toggleMenuOnBackAction
            >
                <MenuItem
                    title="menu item"
                    testId="menu-item"
                    action="close"
                />
            </Menu>,
        );

        await clickOn(getByTestId('menu-item'));

        expect(() => getByTestId('menu-item')).toThrow();
    });

    it('Should be at the top level after reopen', async () => {
        const { getByTestId } = render(
            <Menu
                isOpen
                component={({ children }) => <div>{children}</div>}
                item={Button}
                toggleMenuOnBackAction
            >
                <MenuItem
                    title="menu item"
                    testId="menu-item"
                >
                    <MenuItem
                        title="menu item 2"
                        testId="menu-item2"
                        action="close"
                    />
                </MenuItem>
            </Menu>,
        );

        await clickOn(getByTestId('menu-item'));
        await clickOn(getByTestId('menu-item2'));
        await keypress(KEY_CODE.esc);

        expect(getByTestId('menu-item')).toBeInTheDocument();
    });
});
