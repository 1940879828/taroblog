import { cn } from "@/lib/utils"
import { Search, SquareX } from "lucide-react"
import React, {
  type FormEventHandler,
  type InputHTMLAttributes,
  useEffect,
  useRef
} from "react"
import styles from "./index.module.css"

interface Props
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    | "autoFocus"
    | "autoComplete"
    | "required"
    | "minLength"
    | "maxLength"
    | "disabled"
    | "className"
    | "type"
    | "name"
    | "value"
    | "placeholder"
    | "onFocus"
    | "onBlur"
    | "readOnly"
  > {
  onInput?: (value: string) => void
  onSearch?: (keyword: string) => void
}

const SearchInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      value,
      onSearch,
      onInput,
      onFocus,
      placeholder,
      autoFocus,
      disabled,
      autoComplete,
      maxLength,
      minLength,
      onBlur
    },
    _ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const search = () => {
      if (inputRef.current) onSearch?.(inputRef.current.value)
    }

    const _onInput: FormEventHandler<HTMLInputElement> = (event) => {
      const { value } = event.currentTarget
      onInput?.(value)
    }

    const clear = () => {
      if (inputRef.current) inputRef.current.value = ""
      onInput?.("")
    }

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey && (event.key === "k" || event.key === "K")) {
          event.preventDefault()
          if (inputRef.current) inputRef.current.focus()
        }
        if (event.key === "Enter") {
          search()
        }
      }
      document.addEventListener("keydown", handleKeyDown)
      return () => {
        document.removeEventListener("keydown", handleKeyDown)
      }
    }, [])

    const inputProps = {
      maxLength,
      minLength,
      autoComplete,
      disabled,
      value,
      placeholder,
      autoFocus,
      onFocus,
      onBlur
    }

    return (
      <label className="input input-bordered flex items-center gap-1">
        <Search className="cursor-pointer" onClick={search} />
        <input
          onInput={_onInput}
          {...inputProps}
          value={value}
          ref={inputRef}
          type="text"
          className="grow"
        />
        <kbd className="kbd kbd-sm">Ctrl</kbd>
        <kbd className="kbd kbd-sm">K</kbd>
        <div
          className={cn({
            invisible: !inputRef?.current?.value || inputRef?.current?.value === ""
          })}
        >
          <SquareX
            strokeWidth={2.25}
            onClick={clear}
            size={20}
            className={cn(styles.deleteColor,"cursor-pointer")}
          />
        </div>
      </label>
    )
  }
)

export default SearchInput
