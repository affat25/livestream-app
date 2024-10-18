import {db} from "@/lib/db"
import { getSelf } from "@/lib/auth-service"


export const getStreams = async () => {
    let userId;

    try{
        const self = await getSelf();
        userId = self.id

    }catch{
        userId = null
    }

    let streams = [];

    streams = await db.stream.findMany({
        select:{
            id: true,
            user: true,
            isLive: true,
            name: true,
            thumbnailUrl: true,
        },
        orderBy : [
            {
                isLive: "desc"
            },
            {
                updatedAt: "desc"
            }
        ]
    })

    return streams
}