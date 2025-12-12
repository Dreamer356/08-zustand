import React from 'react';
import Link from 'next/link';
import { headers } from 'next/headers';
import css from './SidebarNotes.module.css';

const tags = [
  { name: 'All notes', slug: 'all' }, // 🔥 виправлено
  { name: 'Work', slug: 'Work' },
  { name: 'Personal', slug: 'Personal' },
  { name: 'Todo', slug: 'Todo' },
  { name: 'Meeting', slug: 'Meeting' },
  { name: 'Shopping', slug: 'Shopping' },
];

export default async function SidebarNotes() {
  const headersList = await headers();
  const pathname =
    headersList.get('x-pathname') ||
    headersList.get('x-invoke-path') ||
    '';

  const currentTag = pathname.includes('/notes/filter/')
    ? pathname.split('/notes/filter/')[1]
    : 'all'; // 🔥 виправлено

  return (
    <aside className={css.sidebar}>
      <ul className={css.menuList}>
        {tags.map((tag) => (
          <li key={tag.slug} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag.slug}`}
              className={`${css.menuLink} ${
                currentTag === tag.slug ? css.active : ''
              }`}
            >
              {tag.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
