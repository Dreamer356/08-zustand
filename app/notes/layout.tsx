import { ReactNode } from 'react';
import TagsMenu from '@/components/TagsMenu/TagsMenu';
import css from './LayoutNotes.module.css';

export default function NotesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={css.layout}>
      {/* Левая колонка — теги */}
      <aside className={css.sidebar}>
        <TagsMenu />
      </aside>

      {/* Основной контент */}
      <main className={css.main}>
        {children}
      </main>
    </div>
  );
}
