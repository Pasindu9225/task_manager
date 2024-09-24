'use server'

import { connectToDatabase } from './mongodb'
import { ObjectId } from 'mongodb'

export async function getTasks() {
  const db = await connectToDatabase()
  return db.collection('tasks').find().sort({ createdAt: -1 }).toArray()
}

export async function addTask(task: { title: string; description: string; priority: string }) {
  const db = await connectToDatabase()
  const result = await db.collection('tasks').insertOne({
    ...task,
    createdAt: new Date(),
  })
  return result.insertedId
}

export async function updateTask(id: string, updateData: { [key: string]: any }) {
  const db = await connectToDatabase()
  await db.collection('tasks').updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  )
}

export async function deleteTask(id: string) {
  const db = await connectToDatabase()
  await db.collection('tasks').deleteOne({ _id: new ObjectId(id) })
}