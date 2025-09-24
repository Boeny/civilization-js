import { render, createEvent, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Button } from 'components/Button';
import { KEY_CODE } from 'types';

import { Menu } from '.';
import { MenuItem } from './MenuItem';

async function clickOn(element: any) {
    return fireEvent(element, createEvent.click(element));
}
async function keypress(key: KEY_CODE) {
    return fireEvent(document, createEvent.keyDown(document, { key }));
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
                component={({ children }) => <div>{children}</div>}
                item={Button}
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

    it('Should go back to the parent menu', async () => {
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
        await clickOn(getByTestId('menu-item2'));

        expect(getByTestId('menu-item')).toBeInTheDocument();
    });

    it('Should go back to the parent menu with Esc key pressed', async () => {
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
        await keypress(KEY_CODE.esc);

        expect(getByTestId('menu-item')).toBeInTheDocument();
    });
});
