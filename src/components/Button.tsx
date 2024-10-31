interface IProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}
export function Button(props: IProps) {
    return <button {...props} />;
}
