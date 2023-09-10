export default function Margin({ height, mobile }) {
    mobile ??= height
    return <div>
        <style jsx>
            {`
            .container {
                height:${height};
            }

            @media screen and (max-width:700px) {
                .container {
                    height:${mobile};
                }
            }
            `}
        </style>
        <div className="container"></div>
    </div>
}
