import { Block } from "components/Block/Block";
import { Layout } from "components/Layout/Layout";
import { body } from "utils";

export function Message(message: string) {
    body(Layout(Block(message)), true)
}
