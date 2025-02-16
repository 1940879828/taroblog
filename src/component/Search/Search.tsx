"use client"

import { searchFile } from "@/actions/search"
import SearchInput from "@/component/SearchInput/SearchInput"
import { useEffect } from "react"

const Search = () => {
  const handleSearch = async () => {
    const _response = await searchFile("mysql")
  }

  useEffect(() => {
    handleSearch().then()
  }, [])

  return (
    <div className="flex-1">
      <SearchInput />
    </div>
  )
}

export default Search
