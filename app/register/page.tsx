"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { registerTeam } from "../actions/register"
import { useRouter } from "next/navigation"
import Footer from "@/components/Footer"

const topics = [
  "AI-Powered Health Assistant",
  "Blockchain Voting System",
  "Smart City Traffic Management",
  "AR Language Learning App",
  "Other",
]

const years = ["I", "II", "III", "IV"]
const departments = ["AI & DS", "CSE", "ECE", "EEE", "IT", "MECH"]
const projectTypes = ["Software", "Hardware", "Both"]

const emailPattern = /^[a-zA-Z0-9._-]+@[a-z.]+\.[a-z]{2,4}$/

type TeamMember = {
  name: string
  year: string
  department: string
  email: string
  phone: string
}

type RegistrationForm = {
  teamName: string
  projectType: string
  topic: string
  ideaFile: FileList
  teamLeader: TeamMember
  teamMembers: TeamMember[]
}

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setError,
    clearErrors,
  } = useForm<RegistrationForm>()
  const [teamMembers, setTeamMembers] = useState(1)
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string }>({})
  const router = useRouter()

  const validateUniqueness = (data: RegistrationForm) => {
    const allMembers = [data.teamLeader, ...(data.teamMembers || [])]
    const names = new Set()
    const emails = new Set()
    const phones = new Set()
    let hasErrors = false

    // Check team leader first
    if (data.teamLeader.name.length < 6) {
      setError("teamLeader.name", {
        type: "manual",
        message: "Name must be at least 6 characters long",
      })
      hasErrors = true
    }

    // Check all members including leader
    allMembers.forEach((member, index) => {
      if (!member) return

      // Check for name uniqueness and length
      if (names.has(member.name?.toLowerCase())) {
        const errorField = index === 0 ? "teamLeader.name" : `teamMembers.${index - 1}.name`
        setError(errorField as any, {
          type: "manual",
          message: "Name must be unique across all team members",
        })
        hasErrors = true
      }
      names.add(member.name?.toLowerCase())

      if (index > 0 && member.name?.length < 6) {
        setError(`teamMembers.${index - 1}.name` as any, {
          type: "manual",
          message: "Name must be at least 6 characters long",
        })
        hasErrors = true
      }

      // Check for email uniqueness
      if (emails.has(member.email?.toLowerCase())) {
        const errorField = index === 0 ? "teamLeader.email" : `teamMembers.${index - 1}.email`
        setError(errorField as any, {
          type: "manual",
          message: "Email must be unique across all team members",
        })
        hasErrors = true
      }
      emails.add(member.email?.toLowerCase())

      // Check for phone uniqueness
      if (phones.has(member.phone)) {
        const errorField = index === 0 ? "teamLeader.phone" : `teamMembers.${index - 1}.phone`
        setError(errorField as any, {
          type: "manual",
          message: "Phone number must be unique across all team members",
        })
        hasErrors = true
      }
      phones.add(member.phone)
    })

    return !hasErrors
  }

  const onSubmit = async (data: RegistrationForm) => {
    // Clear any existing errors
    clearErrors()

    // Validate all team members are filled
    if (data.teamMembers?.length < 5) {
      setSubmitStatus({
        success: false,
        message: "Please fill details for all 6 team members (1 leader + 5 members)",
      })
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    // Validate uniqueness and minimum length requirements
    if (!validateUniqueness(data)) {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    try {
      const formData = new FormData()
      formData.append("teamName", data.teamName)
      formData.append("projectType", data.projectType)
      formData.append("topic", data.topic)
      formData.append("ideaFile", data.ideaFile[0])

      // Add team leader data
      Object.entries(data.teamLeader).forEach(([key, value]) => {
        formData.append(`teamLeader.${key}`, value as string)
      })

      // Add team members data
      data.teamMembers?.forEach((member, index) => {
        Object.entries(member).forEach(([key, value]) => {
          if (value) {
            formData.append(`teamMembers.${index}.${key}`, value)
          }
        })
      })

      const result = await registerTeam(formData)

      if (result.success && result.data) {
        // Store the registration data in localStorage
        localStorage.setItem("registrationData", JSON.stringify(result.data))

        setSubmitStatus({
          success: true,
          message: "Registration successful! Your data has been stored locally.",
        })

        // Redirect to a confirmation page
        router.push("/registration-confirmation")
      } else {
        setSubmitStatus({
          success: false,
          message: result.message || "Registration failed. Please try again.",
        })
      }

      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "An error occurred. Please try again.",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 flex flex-col">
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {submitStatus.message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg text-center ${
                submitStatus.success ? "bg-green-600 text-white" : "bg-red-600 text-white"
              }`}
            >
              {submitStatus.message}
            </motion.div>
          )}

          <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-3xl font-extrabold text-center text-purple-400 mb-8">Project Registration</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="teamName" className="block text-sm font-medium text-gray-300">
                      Team Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="teamName"
                      placeholder="Enter team name (e.g., Tech Innovators)"
                      {...register("teamName", { required: "Team Name is required" })}
                      className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
                    />
                    {errors.teamName && <p className="mt-1 text-sm text-red-500">{errors.teamName.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-300">
                      Project Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="projectType"
                      {...register("projectType", { required: "Project Type is required" })}
                      className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.projectType && <p className="mt-1 text-sm text-red-500">{errors.projectType.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-300">
                      Project Title <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="topic"
                      {...register("topic", { required: "Project Title is required" })}
                      className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Select a project</option>
                      {topics.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                    {errors.topic && <p className="mt-1 text-sm text-red-500">{errors.topic.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="ideaFile" className="block text-sm font-medium text-gray-300">
                      Upload Idea <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      id="ideaFile"
                      accept=".pdf,.doc,.docx"
                      {...register("ideaFile", {
                        required: "Project idea file is required",
                        validate: {
                          fileType: (value) => {
                            const acceptedTypes = [
                              "application/pdf",
                              "application/msword",
                              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            ]
                            return acceptedTypes.includes(value[0]?.type) || "Only PDF and Word documents are allowed"
                          },
                          fileSize: (value) => {
                            const size = value[0]?.size || 0
                            return size <= 5 * 1024 * 1024 || "File size must be less than 5MB"
                          },
                        },
                      })}
                      className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                    />
                    {errors.ideaFile && <p className="mt-1 text-sm text-red-500">{errors.ideaFile.message}</p>}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-purple-400">Team Leader Details</h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="leaderName" className="block text-sm font-medium text-gray-300">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="leaderName"
                        placeholder="ABI C"
                        {...register("teamLeader.name", {
                          required: "Team Leader Name is required",
                          minLength: {
                            value: 6,
                            message: "Name must be at least 6 characters long",
                          },
                        })}
                        className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
                      />
                      {errors.teamLeader?.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.teamLeader.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="leaderYear" className="block text-sm font-medium text-gray-300">
                        Year <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="leaderYear"
                        {...register("teamLeader.year", { required: "Year is required" })}
                        className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="">Select year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      {errors.teamLeader?.year && (
                        <p className="mt-1 text-sm text-red-500">{errors.teamLeader.year.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="leaderDepartment" className="block text-sm font-medium text-gray-300">
                        Department <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="leaderDepartment"
                        {...register("teamLeader.department", { required: "Department is required" })}
                        className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="">Select department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                      {errors.teamLeader?.department && (
                        <p className="mt-1 text-sm text-red-500">{errors.teamLeader.department.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="leaderEmail" className="block text-sm font-medium text-gray-300">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="leaderEmail"
                        placeholder="example@email.com"
                        {...register("teamLeader.email", {
                          required: "Email is required",
                          pattern: {
                            value: emailPattern,
                            message: "Please enter a valid email address",
                          },
                        })}
                        className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
                      />
                      {errors.teamLeader?.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.teamLeader.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="leaderPhone" className="block text-sm font-medium text-gray-300">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="leaderPhone"
                        placeholder="Enter 10-digit number"
                        {...register("teamLeader.phone", {
                          required: "Phone Number is required",
                          pattern: {
                            value: /^\d{10}$/,
                            message: "Please enter a valid 10-digit phone number",
                          },
                        })}
                        className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
                      />
                      {errors.teamLeader?.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.teamLeader.phone.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {[...Array(teamMembers)].map((_, index) => (
                  <div key={index} className="space-y-6">
                    <h3 className="text-lg font-medium text-purple-400">Team Member {index + 1}</h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor={`memberName${index}`} className="block text-sm font-medium text-gray-300">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id={`memberName${index}`}
                          placeholder="ABI C"
                          {...register(`teamMembers.${index}.name` as const, {
                            required: "Team Member Name is required",
                            minLength: {
                              value: 6,
                              message: "Name must be at least 6 characters long",
                            },
                          })}
                          className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
                        />
                        {errors.teamMembers?.[index]?.name && (
                          <p className="mt-1 text-sm text-red-500">{errors.teamMembers[index].name.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor={`memberYear${index}`} className="block text-sm font-medium text-gray-300">
                          Year <span className="text-red-500">*</span>
                        </label>
                        <select
                          id={`memberYear${index}`}
                          {...register(`teamMembers.${index}.year` as const, { required: "Year is required" })}
                          className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        >
                          <option value="">Select year</option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                        {errors.teamMembers?.[index]?.year && (
                          <p className="mt-1 text-sm text-red-500">{errors.teamMembers[index].year.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor={`memberDepartment${index}`} className="block text-sm font-medium text-gray-300">
                          Department <span className="text-red-500">*</span>
                        </label>
                        <select
                          id={`memberDepartment${index}`}
                          {...register(`teamMembers.${index}.department` as const, {
                            required: "Department is required",
                          })}
                          className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        >
                          <option value="">Select department</option>
                          {departments.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                        {errors.teamMembers?.[index]?.department && (
                          <p className="mt-1 text-sm text-red-500">{errors.teamMembers[index].department.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor={`memberEmail${index}`} className="block text-sm font-medium text-gray-300">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id={`memberEmail${index}`}
                          placeholder="example@email.com"
                          {...register(`teamMembers.${index}.email` as const, {
                            required: "Email is required",
                            pattern: {
                              value: emailPattern,
                              message: "Please enter a valid email address",
                            },
                          })}
                          className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
                        />
                        {errors.teamMembers?.[index]?.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.teamMembers[index].email.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor={`memberPhone${index}`} className="block text-sm font-medium text-gray-300">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id={`memberPhone${index}`}
                          placeholder="Enter 10-digit number"
                          {...register(`teamMembers.${index}.phone` as const, {
                            required: "Phone Number is required",
                            pattern: {
                              value: /^\d{10}$/,
                              message: "Please enter a valid 10-digit phone number",
                            },
                          })}
                          className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
                        />
                        {errors.teamMembers?.[index]?.phone && (
                          <p className="mt-1 text-sm text-red-500">{errors.teamMembers[index].phone.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {teamMembers < 5 && (
                  <motion.button
                    type="button"
                    onClick={() => setTeamMembers((prev) => Math.min(prev + 1, 5))}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add Team Member
                  </motion.button>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
