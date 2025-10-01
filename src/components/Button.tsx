interface IProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export function Button({ testId, ...props }: IProps & { testId?: string }) {
    return (
        <button
            data-testid={testId}
            {...props}
        />
    );
}
