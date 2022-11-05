import './styles.scss'

interface HeaderProps {
    onOpenNewOrderModal: () => void;
}

export function Header({onOpenNewOrderModal}: HeaderProps) {
    return (
        <header className='header bg-dark w-100 text-light d-flex justify-content-center align-items-center'>
            <div className='header-content container d-flex justify-content-between align-items-center wrap'>
                <h1 className='h3'>Admin Market</h1>
                <button onClick={onOpenNewOrderModal} className='text-light'>Adicionar produto</button>
            </div>
        </header>
    )
}