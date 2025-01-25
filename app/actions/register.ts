"use server"

import { MongoClient } from "mongodb"

let client
let clientPromise: Promise<MongoClient>

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local")
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.MONGODB_URI)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(process.env.MONGODB_URI)
  clientPromise = client.connect()
}

export async function registerTeam(formData: FormData) {
  try {
    const client = await clientPromise
    const database = client.db("infohacks2025")
    const collection = database.collection("registrations")

    // Extract and format the form data
    const teamData = {
      teamName: formData.get("teamName"),
      projectType: formData.get("projectType"),
      topic: formData.get("topic"),
      teamLeader: {
        name: formData.get("teamLeader.name"),
        year: formData.get("teamLeader.year"),
        department: formData.get("teamLeader.department"),
        email: formData.get("teamLeader.email"),
        phone: formData.get("teamLeader.phone"),
      },
      teamMembers: Array.from({ length: 5 }, (_, i) => ({
        name: formData.get(`teamMembers.${i}.name`),
        year: formData.get(`teamMembers.${i}.year`),
        department: formData.get(`teamMembers.${i}.department`),
        email: formData.get(`teamMembers.${i}.email`),
        phone: formData.get(`teamMembers.${i}.phone`),
      })).filter((member) => member.name), // Only include members with names
      registeredAt: new Date().toISOString(),
    }

    // Insert the team data
    const result = await collection.insertOne(teamData)

    // Return the data to be stored client-side
    return { success: true, message: "Registration successful!", data: teamData }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, message: "Registration failed. Please try again." }
  }
}

