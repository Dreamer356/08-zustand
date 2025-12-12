"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { fetchNotes } from "../../../../lib/api";
import NoteList from "../../../../components/NoteList/NoteList";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import Pagination from "../../../../components/Pagination/Pagination";

import styles from "./NotesPage.module.css";

interface NotesClientProps {
  tag: string;
  page?: number;
  search?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", { page, search: debouncedSearch, tag }],
    queryFn: () =>
      fetchNotes(
        page,
        12,
        debouncedSearch,
        tag === "All" ? undefined : tag
      ),
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <SearchBox value={search} onChange={handleSearch} />

        <Pagination
          page={page}
          setPage={setPage}
          pageCount={data?.totalPages || 1}
        />

        <Link
          href="/notes/action/create"
          className={styles.createButton}
        >
          Create note +
        </Link>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error loading notes. Try again.</p>}

      {!isLoading && !isError && data && (
        <NoteList notes={data.notes} />
      )}
    </div>
  );
}
