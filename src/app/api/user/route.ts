import { db } from "@/db/drizzle"
import { user } from "@/db/schema"
import { eq, sql } from "drizzle-orm"

export async function POST(req: Request) {
    const body = await req.json()
    const userId = body.id
    if (!userId) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.log("userId")
    console.log(userId)
    try {
        const isUserExist = await db.select().from(user).where(eq(user.userId, userId))

        if (isUserExist.length <= 0) {
            await db.insert(user).values({
                id: crypto.randomUUID(),
                userId: userId,
                widgetIds: [],
                createdAt: new Date()
            })

            return Response.json({ message: "Created user" })
        } else if (isUserExist.length) {
            console.log(isUserExist)
            return Response.json({ message: "User Exist", data: isUserExist[0] })
        }
    } catch (error) {
        console.error('Error creating user:', error)
        return Response.json({ error: 'Failed to create user' }, { status: 500 })
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    if (!userId) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const userData = await db.select().from(user).where(eq(user.userId, userId))
        if (!userData.length) {
            return Response.json({ error: 'User not found' }, { status: 404 })
        }
        return Response.json({ data: userData[0] })
    } catch (error) {
        console.error('Error fetching user:', error)
        return Response.json({ error: 'Failed to fetch user' }, { status: 500 })
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        
        // Input validation
        if (!body.userId || !body.widgetId || !body.action) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Get user data first for both operations
        const userData = await db.select().from(user).where(eq(user.userId, body.userId));
        
        if (!userData.length) {
            return Response.json({ error: 'User not found' }, { status: 404 });
        }

        switch (body.action) {
            case 'ADD': {
                // Check if widget already exists in the array
                if (userData[0]?.widgetIds?.includes(body.widgetId)) {
                    return Response.json({ error: 'Widget already added' }, { status: 400 });
                }

                await db.update(user)
                    .set({
                        widgetIds: sql`array_append(${user.widgetIds}, ${body.widgetId})`
                    })
                    .where(eq(user.userId, body.userId));
                    
                return Response.json({ message: "Widget added successfully" });
            }

            case 'REMOVE': {
                if (!userData[0]?.widgetIds?.includes(body.widgetId)) {
                    return Response.json({ error: 'Widget not found' }, { status: 404 });
                }

                await db.update(user)
                    .set({
                        widgetIds: sql`array_remove(${user.widgetIds}, ${body.widgetId})`
                    })
                    .where(eq(user.userId, body.userId));
                    
                return Response.json({ message: "Widget removed successfully" });
            }

            default:
                return Response.json({ error: 'Invalid action' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error updating widgets:', error);
        return Response.json({ error: 'Failed to update widgets' }, { status: 500 });
    }
}

