export default function BigFont({ children }) {
    return <p style={{
        fontSize: '32px',
        fontWeight: 700
    }}>
        {children}
    </p>
}
