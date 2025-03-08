import FadeInBottom from "@/components/AnimatedEffect/FadeInBottom"
import FriendLinkItem from "@/components/FriendLinkItem"
import PageHero from "@/components/HappyPageHero"
import Paper from "@/components/Paper/Paper"
import { friends } from "@/config/friend"

export default function Friend() {
  return (
    <div className="mb-[190px] md:mb-20">
      <PageHero>
        <div className="text-white text-xl font-bold text-shadow">
          三人行，必有我师焉。
        </div>
      </PageHero>
      <div className="w-container">
        <Paper elevation={1} className="mt-4 p-4">
          <h1 className="text-xl py-4 font-bold">友情链接</h1>
          <p className="text-lg py-4">那些人，那些事。</p>
          <div className="flex flex-wrap gap-[14px]">
            {friends.map((friend, index) => (
              <FadeInBottom key={index} index={index}>
                <FriendLinkItem friend={friend} />
              </FadeInBottom>
            ))}
          </div>
        </Paper>
      </div>
    </div>
  )
}
