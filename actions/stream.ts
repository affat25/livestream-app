"use server"

import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";


import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

import { Knock } from "@knocklabs/node";
import { getFollowingUsers } from "@/lib/stream-service";

const knockClient = new Knock(process.env.KNOCK_API_SECRET);

export const updateStream = async (values:Partial <Stream>) => {
    try{
        const self = await getSelf();
        const selfStream = await db.stream.findUnique({
            where: {
                userId: self.id
            }
        })

        if (!selfStream){
            throw new Error("Stream not found")
        }
        const validData = {
            name: values.name,
            isLive: values.isLive
        }

        const stream = await db.stream.update({
            where: {
                id: selfStream.id
            },
            data: {
                ...validData
            },
        })

        if(values.isLive)
        {
            const name = self.username
            const followers = await getFollowingUsers()
            const recipients: any = followers.map(item => ({
                id: item.follower.externalUserId,
                name: item.follower.username,
                email: item.follower.email,
            }));

            if(!(recipients.length==0))
            {
                await knockClient.workflows.trigger('streamer-live',{
                    data:{
                        name
                    },
                    recipients: recipients
                })
            }
        }

        revalidatePath(`/u/${self.username}`)
        revalidatePath(`/${self.username}`)

        return stream

    }catch{
        throw new Error("Internal Error")
    }
}