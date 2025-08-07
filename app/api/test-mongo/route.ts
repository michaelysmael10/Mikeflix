// app/api/test-mongo/route.ts
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('mikeflix') // name ng database mo
    const collections = await db.listCollections().toArray()

    return NextResponse.json({
      success: true,
      message: 'Connected to MongoDB!',
      collections,
    })
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to connect to MongoDB',
      error: err.message,
    })
  }
}
