"use client"

import { Stream, User } from "@prisma/client"

import { Video } from "./video";
import { StreamButton } from "./stream-button";
import { LiveChat } from "./chat";
import { Header } from "./header";

import { cn } from "@/lib/utils";
import { useChatSidebar } from "@/store/use-chat-sidebar";

interface StreamPlayerProps {
    user: User & { stream: Stream | null};
    stream: Stream
    isFollowing: boolean
    isHost: boolean
    viewerId: string 
    viewerName: string
}

export const StreamPlayer = ({
    user,
    stream,
    isFollowing,
    isHost,
    viewerId,
    viewerName,
}:StreamPlayerProps) => {
  const {collapsed} = useChatSidebar((state) => state)
    
  return (
    <>
      <div className={ cn(
        "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
        collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
      )}>
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 
        2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
            <Video hostName={user.username} hostIdentity={user.id} isLive ={stream.isLive}/>
            <Header
            hostName = {user.username}
            hostIdentity = {user.id}
            viewerId = {viewerId}
            imageUrl = {user.imageUrl}
            isFollowing = {isFollowing}
            name = {stream.name}
            isLive = {stream.isLive}
            isHost = {isHost}
        />
          { !!isHost && (
            <StreamButton isLive={stream.isLive}/>
          )}
        </div>
        <div className={cn(
          "col-span-1",
          collapsed && "hidden"
        )}>
          <LiveChat
            viewerName = {viewerName}
            viewerId = {viewerId}
            hostName = {user.username}
            hostIdentity = {user.id}
            isLive = {stream.isLive}
            streamId = {stream.id}
          />
        </div>
      </div>
    </>
  )
}
