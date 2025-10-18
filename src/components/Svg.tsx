interface IProps {
    width: number;
    src: string;
}
export function Svg({ width, src }: IProps) {
    return (
        <div
            style={{ width }}
            dangerouslySetInnerHTML={{ __html: src }}
        />
    );
}
