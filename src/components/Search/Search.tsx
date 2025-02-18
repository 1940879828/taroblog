"use client"

import { searchFile } from "@/actions/search"
import ClickAwayListener from "@/components/ClickAwayListener"
import KeywordHighlight from "@/components/KeywordHighlight"
import Message from "@/components/Message"
import Paper from "@/components/Paper/Paper"
import SearchInput from "@/components/SearchInput/index"
import type { Note } from "@/lib/note"
import _ from "lodash"
import { useRouter } from "next/navigation"
import type React from "react"
import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react"

const Search = () => {
  const [searchText, setSearchText] = useState("")
  const [isShowResultCard, setIsShowResultCard] = useState<boolean>(true)
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const debounceHandleSearch = useRef(
    _.debounce(async (keyword: string) => {
      if (keyword.trim() === "") {
        setNotes([])
        return
      }
      handleSearch(keyword).then()
    }, 300)
  )

  const handleSearch = async (keyword: string) => {
    if (isLoading) return
    setIsLoading(true)
    try {
      const _response = await searchFile(keyword)
      setNotes(_response)
      if (_response.length === 0) {
        Message.warning(`没找到有关${keyword}的内容~`, {
          justify: "right",
          duration: 1500
        })
      }
    } catch (_error) {
      Message.error("搜索失败，请稍后重试")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (searchText.trim() === "" && notes.length > 0) {
      setNotes([])
    }
  }, [searchText])

  const onClickAway = () => {
    setIsShowResultCard(false)
    setNotes([])
  }

  const jump = useCallback(
    (url: string) => {
      router.push(url)
      setNotes([])
    },
    [router]
  )

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setNotes([])
      setIsShowResultCard(false)
    }
  }

  const handleInput = (value: string) => {
    setSearchText(value)
    if (value.trim() === "") {
      setNotes([])
    }
  }

  useEffect(() => {
    return () => {
      debounceHandleSearch.current.cancel()
    }
  }, [])

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div className="relative">
        <SearchInput
          onInput={handleInput}
          value={searchText}
          onSearch={debounceHandleSearch.current}
          placeholder={"搜索笔记"}
          onFocus={() => setIsShowResultCard(true)}
          onKeyDown={onKeyDown}
        />
        {isLoading && isShowResultCard && (
          <ResultContainer>加载中...</ResultContainer>
        )}
        {notes.length === 0 &&
          !isLoading &&
          isShowResultCard &&
          searchText.trim() !== "" && (
            <ResultContainer>暂无结果</ResultContainer>
          )}
        {notes.length > 0 && isShowResultCard && (
          <SearchResults notes={notes} keyword={searchText} jump={jump} />
        )}
      </div>
    </ClickAwayListener>
  )
}

const ResultContainer = ({ children }: { children: React.ReactNode }) => (
  <Paper
    aria-label="搜索结果"
    elevation={1}
    className="
        absolute w-full top-12 left-0 z-20 bg-base-200 flex flex-col gap-2 p-2 max-h-96 overflow-y-auto
      "
  >
    {children}
  </Paper>
)

const SearchResults = ({
  notes,
  keyword,
  jump
}: {
  notes: Note[]
  keyword: string
  jump: (url: string) => void
}) => (
  <KeywordHighlight keyword={keyword}>
    <ResultContainer>
      {notes.map((note, i) => (
        <div
          onClick={() => jump(`/note/${note.fileName}`)}
          key={i}
          className="p-2 rounded-md hover:bg-base-300 cursor-pointer"
        >
          <div>{note.title}</div>
          <div className="text-sm">{note?.snippet}</div>
        </div>
      ))}
    </ResultContainer>
  </KeywordHighlight>
)

export default Search
