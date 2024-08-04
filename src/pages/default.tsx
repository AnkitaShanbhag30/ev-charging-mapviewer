// import { Compass, Home } from 'lucide-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { AppConfig, MapSelectorVariant } from '@lib/AppConfig'

import MapSelector from '../components/common/MapSelector'

interface MapSelectorProps {
  variant?: MapSelectorVariant
}

type County = {
  id: string
  name: string
  available: boolean
  cities: City[]
}

type City = {
  id: string
  name: string
  available: boolean
}

const Default = ({ variant = MapSelectorVariant.INTRO }: MapSelectorProps) => {
  // const navIconSize =
  //   variant === MapSelectorVariant.TOPNAV ? AppConfig.ui.topBarIconSize : AppConfig.ui.menuIconSize

  // const listStyle =
  //   variant === MapSelectorVariant.TOPNAV
  //     ? `flex text-white gap-4 text-lg text-white text-sm md:text-base`
  //     : `flex flex-col justify-between gap-1 w-fit text-primary`

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')

  const router = useRouter()

  useEffect(() => {
    const authState = localStorage.getItem('isAuthenticated')
    if (authState === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handlePasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const correctPassword = process.env.NEXT_PUBLIC_PASSWORD
    if (password === correctPassword) {
      setIsAuthenticated(true)
      localStorage.setItem('isAuthenticated', 'true')
    } else {
      alert('Incorrect password')
    }
  }

  return (
    <>
      <h1 className="homepage-header">Select a jurisdiction</h1>
      {!isAuthenticated && (
        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-2">
          <p>Enter password to access the demo</p>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="p-2 border rounded"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Submit
          </button>
        </form>
      )}
      {isAuthenticated && <MapSelector />}
      <br />
      <h1 className="homepage-header">Media</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </p>
    </>
  )
}

export default Default
