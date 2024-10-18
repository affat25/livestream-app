import { getViewer } from "@/actions/token"
import { StreamPlayer } from "@/components/stream-player"
import { isFollowingUser } from "@/lib/follow-service"
import { getUserByUsername } from "@/lib/user-service"
import { notFound } from "next/navigation"

interface UserPageProps {
    params:{
        username: string

    }
}

const UserPage = async ({
    params}: UserPageProps) => {
    const user = await getUserByUsername(params.username)

    if(!user || !user.stream){
        notFound()
    }

    const curViewer = await getViewer(user.id)
    const isHost = curViewer.id === user.id
    const isFollowing = await isFollowingUser(user.id)
    
  return (
    <StreamPlayer
            user = {user}
            stream = {user.stream}
            isFollowing = {isFollowing}
            isHost = {isHost}
            viewerId= {curViewer.id}
            viewerName= {curViewer.username}
        />
  )
}

export default UserPage