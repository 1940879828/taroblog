import FriendLinkItem from "@/component/FriendLinkItem"
import Paper from "@/component/Paper/Paper"
import { friends } from "@/config/friend"
export default function Friend() {
  return (
    <div className="w-container">
      <Paper elevation={1} className="mt-4 p-4">
        <h1 className="text-xl py-4 font-bold">友情链接</h1>
        <p className="text-lg py-4">那些人，那些事。</p>
        <div className="flex flex-wrap gap-[14px]">
          {friends.map((friend, index) => (
            <FriendLinkItem friend={friend} key={index} />
          ))}
        </div>
      </Paper>
    </div>
  )
}
