"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../../lib/api";
import Modal from "../../../../components/Modal/Modal";
import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,   // 🔥 додано
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.loading}>Завантаження...</div>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.error}>
          <h2>Помилка</h2>
          <p>Не вдалося завантажити нотатку</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <div className={css.preview}>
        <header className={css.header}>
          <h2 className={css.title}>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </header>

        <div className={css.content}>
          <p>{note.content}</p>
        </div>

        <footer className={css.footer}>
          <div className={css.meta}>
            <span>Створено: {new Date(note.createdAt).toLocaleDateString()}</span>
            {note.updatedAt !== note.createdAt && (
              <span>Оновлено: {new Date(note.updatedAt).toLocaleDateString()}</span>
            )}
          </div>
        </footer>
      </div>
    </Modal>
  );
}
