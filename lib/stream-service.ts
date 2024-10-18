import { db } from "./db";
import { getSelf } from "./auth-service";

export const getStreamByUserId = async (userId: string) => {
    const stream = await db.stream.findUnique({
        where: {userId}
    })

    return stream
}

// get users who are following current user
export const getFollowingUsers = async () => {
    try{
        const self = await getSelf()

        const followingUsers = db.follow.findMany({
            where: {
                followingId: self.id
            },
            include: {
                follower: {
                    select: {
                        username: true,
                        externalUserId: true,
                        email: true,

                    },
                },
            },
        })

        return followingUsers
    } catch {

        return []
    }

}