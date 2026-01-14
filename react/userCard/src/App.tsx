import { useState } from 'react'
import { MapPin } from 'lucide-react'

function App() {
  const [skills] = useState([
    'HTML5',
    'CSS3',
    'JavaScript',
    'Node.js',
    'TypeScript',
    'React',
  ])

  const [stats] = useState({
    followers: 1200,
    following: 300,
    projects: 75
  })

  const user = {
    name: 'Jean Dupont',
    profession: 'Full Stack Developer',
    location: 'Paris, France',
    avatar: '/avatar.jpg'
  }

  return (
    <div className="min-h-screen flex justify-center bg-base-300">
      <div className="card w-full max-w-md bg-base-100 shadow-sm shadow-gray-100 my-8 h-3/4">
        <div className="card-body items-center text-center space-y-4">

          {/* Avatar */}
          <img
            src={user.avatar}
            alt={`Avatar de ${user.name}`}
            className="w-24 h-24 rounded-full object-cover"
          />

          {/* Infos */}
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-sm opacity-70">{user.profession}</p>

            <div className="flex items-center justify-center gap-1 mt-1 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-between w-full mt-4 px-13">
            <Stat label="Followers" value={stats.followers} />
            <Stat label="Following" value={stats.following} />
            <Stat label="Projects" value={stats.projects} />
          </div>

          {/* Skills */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {skills.map(skill => (
              <span
                key={skill}
                className="badge badge-outline"
              >
                {skill}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

type StatProps = {
  label: string
  value: number
}

function Stat({ label, value }: StatProps) {
  return (
    <div className="text-center">
      <p className="font-bold">{value}</p>
      <p className="text-xs opacity-60">{label}</p>
    </div>
  )
}

export default App
