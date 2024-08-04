import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button, Dropdown, DropdownProps } from 'semantic-ui-react'

import counties from '../../../public/jurisdictions.json'

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

const MapSelector = () => {
  const [selectedCounty, setSelectedCounty] = useState<County | null>(null)
  const [cities, setCities] = useState<City[]>([])
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const router = useRouter()
  const handleButtonClick = (event: React.FormEvent) => {
    event.preventDefault()
    const county = selectedCounty?.name.replace(/\s+/g, '_').toLowerCase() || 'san_francisco_county'
    const city = selectedCity?.name.replace(/\s+/g, '_').toLowerCase() || 'san_francisco'
    // const url = window.location.href
    // localStorage.setItem('viewedWelcomeModal', 'false') // Reset the viewed flag

    router.push(`/map_template?county=${county}&city=${city}`)
  }
  const handleCountyChange = (_event: React.SyntheticEvent, data: DropdownProps) => {
    const currentCounty = counties.find(county => county.name === data.value)
    if (currentCounty) {
      setSelectedCounty(currentCounty)
      setCities(currentCounty.cities)
      if (currentCounty.name === 'San Francisco County') {
        const sanFranciscoCity = currentCounty.cities.find(city => city.name === 'San Francisco')
        if (sanFranciscoCity) {
          setSelectedCity(sanFranciscoCity)
        } else {
          setSelectedCity(null)
        }
      } else {
        setSelectedCity(null)
      }
    }
  }

  const handleCityChange = (_event: React.SyntheticEvent, data: DropdownProps) => {
    const currentCity = cities.find(city => city.name === data.value)
    if (currentCity) {
      setSelectedCity(currentCity)
    }
  }

  const showButton = selectedCounty && (selectedCounty.name === 'San Francisco County' || selectedCity)

  return (
    <div className="flex">
      <div className="w-1/3 pr-2">
        <Dropdown
          placeholder="Select County"
          fluid
          selection
          options={counties.map(county => ({
            key: county.id,
            text: county.name,
            value: county.name,
            disabled: !county.available,
          }))}
          onChange={handleCountyChange}
          className="text-blue-500"
        />
      </div>
      <div className="w-1/3 pr-2">
        {selectedCounty && selectedCounty?.name !== 'San Francisco County' && (
          <Dropdown
            placeholder="Select City"
            fluid
            selection
            options={cities.map(city => ({
              key: city.id,
              text: city.name,
              value: city.name,
              disabled: !city.available,
            }))}
            onChange={handleCityChange}
          />
        )}
      </div>
      <div className="w-1/3 flex items-center justify-center">
        {showButton && (
          // <Button className="p-3 bg-secondary text-white rounded ">
          <Button onClick={handleButtonClick}>Go to map</Button>
        )}
      </div>
    </div>
  )
}

export default MapSelector
