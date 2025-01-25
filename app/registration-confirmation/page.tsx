'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type RegistrationData = {
  teamName: string
  teamLeader: {
    name: string
    year: string
    department: string
    email: string
    phone: string
  }
  topic: string
  teamMembers: Array<{
    name: string
    year: string
    department: string
    email: string
    phone: string
  }>
  registeredAt: string
}

export default function RegistrationConfirmation() {
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null)

  useEffect(() => {
    const storedData = localStorage.getItem('registrationData')
    if (storedData) {
      setRegistrationData(JSON.parse(storedData))
    }
  }, [])

  if (!registrationData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full">
          <h2 className="text-3xl font-extrabold text-center text-purple-400 mb-8">No Registration Data Found</h2>
          <p className="text-gray-300 text-center mb-8">It seems you haven't registered yet or your registration data is not available.</p>
          <Link href="/register" className="block w-full text-center bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300">
            Go to Registration
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-3xl font-extrabold text-center text-purple-400 mb-8">Registration Confirmation</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-purple-300 mb-2">Team Information</h3>
                <p className="text-gray-300"><span className="font-semibold">Team Name:</span> {registrationData.teamName}</p>
                <p className="text-gray-300"><span className="font-semibold">Project Topic:</span> {registrationData.topic}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-300 mb-2">Team Leader</h3>
                <p className="text-gray-300"><span className="font-semibold">Name:</span> {registrationData.teamLeader.name}</p>
                <p className="text-gray-300"><span className="font-semibold">Year:</span> {registrationData.teamLeader.year}</p>
                <p className="text-gray-300"><span className="font-semibold">Department:</span> {registrationData.teamLeader.department}</p>
                <p className="text-gray-300"><span className="font-semibold">Email:</span> {registrationData.teamLeader.email}</p>
                <p className="text-gray-300"><span className="font-semibold">Phone:</span> {registrationData.teamLeader.phone}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-300 mb-2">Team Members</h3>
                {registrationData.teamMembers.map((member, index) => (
                  <div key={index} className="mb-4">
                    <p className="text-gray-300"><span className="font-semibold">Name:</span> {member.name}</p>
                    <p className="text-gray-300"><span className="font-semibold">Year:</span> {member.year}</p>
                    <p className="text-gray-300"><span className="font-semibold">Department:</span> {member.department}</p>
                    <p className="text-gray-300"><span className="font-semibold">Email:</span> {member.email}</p>
                    <p className="text-gray-300"><span className="font-semibold">Phone:</span> {member.phone}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-300"><span className="font-semibold">Registered At:</span> {new Date(registrationData.registeredAt).toLocaleString()}</p>
            </div>
            <div className="mt-8">
              <Link href="/" className="block w-full text-center bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

