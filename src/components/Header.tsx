import Link from 'next/link';

import styles from '@/styles/Header.module.css';

const Header = () => {
    return (
        <header>
            <nav>
                <Link href={`/`}><h1>my blog</h1></Link>
            </nav>
        </header>
    )
}

export default Header;