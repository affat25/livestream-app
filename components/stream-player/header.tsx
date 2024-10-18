"use client"

import { Skeleton } from "../ui/skeleton"
import { UserAvatar, UserAvatarSkeleton } from "../user-avatar"
import { VerifiedMark } from "../verified-mark"

import { Actions, ActionsSkeleton } from "./actions"

interface HeaderProps {
    imageUrl: string
    hostName: string
    hostIdentity: string
    viewerId : string
    isFollowing: boolean
    name: string
    isLive: boolean
    isHost: boolean
}

export const Header = ({
    imageUrl,
    hostIdentity,
    hostName,
    viewerId,
    isFollowing,
    name,
    isLive,
    isHost
}: HeaderProps) => {
    return (
        <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
            <div className="flex items-center gap-x-3">
                <UserAvatar
                    imageUrl={imageUrl}
                    username={hostName}
                    size = "lg"
                    isLive = {isLive}
                    showBadge
                />
                <div className="space-y-1">
                    <div className="flex items-center gap-x-2">
                        <h2 className="text-lg font-semibold">
                            {hostName}
                        </h2>
                        <VerifiedMark/>
                    </div>
                    <p className="text-sm font-semibold">
                        {name}
                    </p>
                </div>
            </div>
            <Actions 
                isFollowing = {isFollowing}
                hostIdentity = {hostIdentity}
                isHost = {isHost}
            
            />
        </div>
    )
}

export const HeaderSkeleton = () => {
    return(
        <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0
        items-start justify-between px-4">
            <div className="flex items-center gap-x-2">
                <UserAvatarSkeleton size= "lg" />
                <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
            <ActionsSkeleton/>
        </div>
    )
}