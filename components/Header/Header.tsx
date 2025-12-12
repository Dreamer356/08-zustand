import Link from 'next/link'
import TagsMenu from '../TagsMenu/TagsMenu'
import css from './Header.module.css'

export default function Header() {
    return (
        <header className={css.header}>
            <Link href="/" aria-label="Home" className={css.headerLink}>
                NoteHub
            </Link>

            <nav aria-label="Main Navigation">
                <ul className={css.navigation}>
                    <li className={css.navigationItem}>
                        <Link href="/" className={css.navigationLink}>
                            Home
                        </Link>
                    </li>

                    {/* Обов'язковий пункт меню */}
                    <li className={css.navigationItem}>
                        <Link href="/notes/filter/all" className={css.navigationLink}>
                            All Notes
                        </Link>
                    </li>

                    {/* Ваш дропдаун або меню тегів */}
                    <li className={css.navigationItem}>
                        <TagsMenu />
                    </li>
                </ul>
            </nav>
        </header>
    )
}
