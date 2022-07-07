export default function Split({ children }) {
    return <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px'
    }}>
        {children}
    </div>
}
