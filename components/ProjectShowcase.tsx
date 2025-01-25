"use client"

import { useState } from "react"
import { FiPhone, FiMessageSquare, FiChevronDown, FiChevronUp } from "react-icons/fi"
import Link from "next/link"

const projects = [
  {
    id: 1,
    title: "AI-Powered Health Assistant",
    description: "An AI chatbot that provides personalized health advice and symptom analysis.",
    image: "/placeholder.svg?height=200&width=300",
    details:
      "This project aims to develop an AI-powered health assistant that can provide personalized health advice and perform symptom analysis.",
    expectedOutcome:
      "A fully functional AI chatbot capable of answering health-related questions, analyzing symptoms, and providing personalized health recommendations.",
    coordinator: {
      name: "Dr. Emily Chen",
      phone: "+1234567890",
      whatsapp: "+1234567890",
    },
    guidelinesPdf: "/guidelines/ai-health-assistant.pdf",
  },
  {
    id: 2,
    title: "Blockchain Voting System",
    description: "A secure and transparent voting system using blockchain technology.",
    image: "/placeholder.svg?height=200&width=300",
    details: "This project focuses on creating a secure and transparent voting system using blockchain technology.",
    expectedOutcome: "A robust blockchain-based voting platform that can be used for various types of elections.",
    coordinator: {
      name: "Prof. Michael Johnson",
      phone: "+1234567891",
      whatsapp: "+1234567891",
    },
    guidelinesPdf: "/guidelines/blockchain-voting.pdf",
  },
  {
    id: 3,
    title: "Smart City Traffic Management",
    description: "An IoT-based system for optimizing traffic flow in urban areas.",
    image: "/placeholder.svg?height=200&width=300",
    details: "This project involves developing an IoT-based system for optimizing traffic flow in urban areas.",
    expectedOutcome:
      "A smart traffic management system that can significantly reduce congestion and improve urban mobility.",
    coordinator: {
      name: "Dr. Sarah Thompson",
      phone: "+1234567892",
      whatsapp: "+1234567892",
    },
    guidelinesPdf: "/guidelines/smart-city-traffic.pdf",
  },
  {
    id: 4,
    title: "AR Language Learning App",
    description: "An augmented reality app that helps users learn new languages through interactive experiences.",
    image: "/placeholder.svg?height=200&width=300",
    details: "This project aims to create an augmented reality app that revolutionizes language learning.",
    expectedOutcome:
      "An engaging AR language learning app that makes language acquisition more intuitive and interactive.",
    coordinator: {
      name: "Prof. David Lee",
      phone: "+1234567893",
      whatsapp: "+1234567893",
    },
    guidelinesPdf: "/guidelines/ar-language-learning.pdf",
  },
  {
    id: 5,
    title: "Sustainable Energy Management Platform",
    description: "A platform for managing and optimizing renewable energy sources in smart grids.",
    image: "/placeholder.svg?height=200&width=300",
    details:
      "This project focuses on developing a comprehensive platform for managing renewable energy sources in smart grids.",
    expectedOutcome:
      "An intelligent energy management system that maximizes the use of renewable energy and reduces carbon footprint.",
    coordinator: {
      name: "Dr. Green Energy",
      phone: "+1234567894",
      whatsapp: "+1234567894",
    },
    guidelinesPdf: "/guidelines/sustainable-energy.pdf",
  },
  {
    id: 6,
    title: "Cybersecurity Threat Detection System",
    description: "An AI-powered system for detecting and mitigating cybersecurity threats in real-time.",
    image: "/placeholder.svg?height=200&width=300",
    details: "This project aims to create an advanced cybersecurity system using AI and machine learning.",
    expectedOutcome:
      "A robust threat detection system capable of identifying and neutralizing cyber attacks in real-time.",
    coordinator: {
      name: "Prof. Secure Net",
      phone: "+1234567895",
      whatsapp: "+1234567895",
    },
    guidelinesPdf: "/guidelines/cybersecurity-detection.pdf",
  },
  {
    id: 7,
    title: "Virtual Reality Education Platform",
    description: "A VR platform for immersive and interactive educational experiences.",
    image: "/placeholder.svg?height=200&width=300",
    details: "This project focuses on developing a virtual reality platform for enhanced learning experiences.",
    expectedOutcome:
      "An engaging VR education platform that improves student understanding and retention across various subjects.",
    coordinator: {
      name: "Dr. VR Educator",
      phone: "+1234567896",
      whatsapp: "+1234567896",
    },
    guidelinesPdf: "/guidelines/vr-education.pdf",
  },
  {
    id: 8,
    title: "Drone-based Agricultural Monitoring",
    description: "A system using drones and AI for monitoring crop health and optimizing farming practices.",
    image: "/placeholder.svg?height=200&width=300",
    details: "This project involves creating a drone-based system for agricultural monitoring and optimization.",
    expectedOutcome:
      "An intelligent farming solution that improves crop yields and reduces resource usage through precise monitoring and analysis.",
    coordinator: {
      name: "Prof. Agri Tech",
      phone: "+1234567897",
      whatsapp: "+1234567897",
    },
    guidelinesPdf: "/guidelines/drone-agriculture.pdf",
  },
  {
    id: 9,
    title: "Personalized Medicine Recommendation System",
    description: "An AI system for recommending personalized medical treatments based on genetic and health data.",
    image: "/placeholder.svg?height=200&width=300",
    details: "This project aims to develop an AI-driven system for personalized medicine recommendations.",
    expectedOutcome:
      "A sophisticated recommendation system that helps healthcare providers make more informed and tailored treatment decisions.",
    coordinator: {
      name: "Dr. Gene Therapy",
      phone: "+1234567898",
      whatsapp: "+1234567898",
    },
    guidelinesPdf: "/guidelines/personalized-medicine.pdf",
  },
  {
    id: 10,
    title: "Smart Home Energy Optimization",
    description: "An IoT-based system for optimizing energy usage in smart homes.",
    image: "/placeholder.svg?height=200&width=300",
    details: "This project focuses on creating a smart home system that optimizes energy consumption.",
    expectedOutcome: "An intelligent home energy management system that reduces energy waste and lowers utility bills.",
    coordinator: {
      name: "Prof. Smart Home",
      phone: "+1234567899",
      whatsapp: "+1234567899",
    },
    guidelinesPdf: "/guidelines/smart-home-energy.pdf",
  },
  {
    id: 11,
    title: "Autonomous Underwater Vehicle",
    description: "An AI-powered autonomous underwater vehicle for ocean exploration and research.",
    image: "/placeholder.svg?height=200&width=300",
    details: "This project involves developing an autonomous underwater vehicle for deep-sea exploration.",
    expectedOutcome:
      "A sophisticated AUV capable of conducting underwater research and exploration with minimal human intervention.",
    coordinator: {
      name: "Dr. Ocean Explorer",
      phone: "+1234567900",
      whatsapp: "+1234567900",
    },
    guidelinesPdf: "/guidelines/autonomous-underwater-vehicle.pdf",
  },
  {
    id: 12,
    title: "Emotion Recognition in Virtual Assistants",
    description: "Enhancing virtual assistants with emotion recognition capabilities for more natural interactions.",
    image: "/placeholder.svg?height=200&width=300",
    details:
      "This project aims to integrate emotion recognition into virtual assistants for more empathetic interactions.",
    expectedOutcome: "A virtual assistant system capable of recognizing and responding to human emotions effectively.",
    coordinator: {
      name: "Prof. Emotional AI",
      phone: "+1234567901",
      whatsapp: "+1234567901",
    },
    guidelinesPdf: "/guidelines/emotion-recognition-va.pdf",
  },
]

const ProjectShowcase = () => {
  const [expandedProjects, setExpandedProjects] = useState<number[]>([])

  const toggleProjectExpansion = (projectId: number) => {
    setExpandedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    )
  }

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-800 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold text-center text-purple-400 mb-12">Project Showcase</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800 dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
            >
              <div className="relative">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white text-center px-4">{project.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">{project.description}</p>
                <button
                  onClick={() => toggleProjectExpansion(project.id)}
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center"
                >
                  {expandedProjects.includes(project.id) ? (
                    <>
                      <span>Show Less</span>
                      <FiChevronUp className="ml-2" />
                    </>
                  ) : (
                    <>
                      <span>Load More</span>
                      <FiChevronDown className="ml-2" />
                    </>
                  )}
                </button>
                {expandedProjects.includes(project.id) && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold text-purple-400 mb-2">Project Details</h4>
                      <p className="text-gray-300">{project.details}</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-purple-400 mb-2">Expected Outcome</h4>
                      <p className="text-gray-300">{project.expectedOutcome}</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-purple-400 mb-2">Coordinator</h4>
                      <p className="text-gray-300">{project.coordinator.name}</p>
                      <div className="flex justify-between items-center mt-2">
                        <Link href={`tel:${project.coordinator.phone}`} passHref>
                          <span className="flex items-center text-purple-400 hover:text-purple-300 cursor-pointer">
                            <FiPhone className="w-5 h-5 mr-2" />
                            <span>Call</span>
                          </span>
                        </Link>
                        <Link href={`https://wa.me/${project.coordinator.whatsapp}`} passHref>
                          <span className="flex items-center text-purple-400 hover:text-purple-300 cursor-pointer">
                            <FiMessageSquare className="w-5 h-5 mr-2" />
                            <span>WhatsApp</span>
                          </span>
                        </Link>
                      </div>
                    </div>
                    <a
                      href={project.guidelinesPdf}
                      download={`${project.title.replace(/\s+/g, "_")}_Guidelines.pdf`}
                      className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 mb-2"
                    >
                      Download Guidelines
                    </a>
                    <Link href="/register" passHref>
                      <span className="block w-full text-center bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors duration-300 mt-4 cursor-pointer">
                        Register Now
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectShowcase

