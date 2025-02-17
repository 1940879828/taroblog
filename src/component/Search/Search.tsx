"use client"

import { searchFile } from "@/actions/search"
import SearchInput from "@/component/SearchInput/index"
import { useEffect, useState } from "react"
import Paper from "@/component/Paper/Paper";
import {Note} from "@/lib/note";
import ClickAwayListener from "@/component/ClickAwayListener";
import Button from "@/component/Button";
import Link from "next/link";

const Search = () => {
  const [searchText, setSearchText] = useState("")
  const [isShowResultCard, setIsShowResultCard] = useState<boolean>(true)
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSearch = async (keyword: string) => {
    if (keyword.trim() === "") return
    setIsLoading(true)
    const _response = await searchFile(keyword)
    setNotes(_response)
    setIsLoading(false)
  }

  const onClickAway = () => {
    setIsShowResultCard(false)
    setNotes([])
  }

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div className="relative">
        <SearchInput
          onInput={setSearchText}
          value={searchText}
          onSearch={handleSearch}
          placeholder={"搜索笔记"}
          onFocus={()=>setIsShowResultCard(true)}
        />
        {isShowResultCard && <Paper elevation={1} className="
          absolute w-full top-12 left-0 z-20 bg-base-200 flex flex-col gap-2 p-2 max-h-96 overflow-y-auto
        ">
          {isLoading ?
            <div>loading...</div>
            :
            <>
              {notes.map((note, i) => (
                <Link href={`/note/${note.fileName}`} key={i}
                     className="p-2 rounded-md hover:bg-base-300 cursor-pointer">
                  <div>{note.title}</div>
                  <div className="text-sm">{note?.snippet}</div>
                </Link>
              ))}
            </>
          }
        </Paper>}
      </div>
    </ClickAwayListener>
  )
}

export default Search
