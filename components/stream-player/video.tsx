"use client"

import { LiveVideo } from "./live-video"
import { WifiOff } from "lucide-react"

interface VideoProps {
    hostName: string
    hostIdentity: string
    isLive: boolean
}


export const Video = ({hostName,isLive}:VideoProps) => {
    return(
        <div className="aspect-video border-b group relative">
           {!isLive && (
            <div className="h-full flex flex-col space-y-4 justify-center items-center">
                <WifiOff className="h-10 w-10 text-muted-foreground"/>
                <p className="text-muted-foreground">
                    {hostName} is offline
                </p>
            </div>
           )}
           {isLive && (
            <LiveVideo/>
           )}
        </div>
    )
}