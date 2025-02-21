import type { Friend } from "@/config/friend"
import { cn } from "@/lib/utils"
import type React from "react"
import styles from "./index.module.css"

type Props = { friend: Friend }

const FriendLinkItem: React.FC<Props> = ({ friend }) => {
  const { name, description, cover_url, url } = friend
  return (
    <a
      href={url}
      className={cn("shadow-sm", styles.linkItem)}
      target="_blank"
      title={description}
      rel="noreferrer"
    >
      <div className={styles.imgWrap}>
        <img src={cover_url} alt={name} />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </a>
  )
}

export default FriendLinkItem
