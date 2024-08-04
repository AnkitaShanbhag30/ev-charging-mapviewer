import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'

import Map from '@components/Map'

interface CityConfig {
  cityName: string
  boundaryUrl: string
  priorityDataUrl: string
  feasibleDataUrl: string
  transitStopsUrl: string
  parksAndRecreationUrl: string
  healthcareFacilitiesUrl: string
  lihtcUrl: string
  schoolsUrl: string
  libraryUrl: string
}

interface CityMapPageProps {
  cityConfig: CityConfig
}

const TemplateMapPage: React.FC<CityMapPageProps> = ({ cityConfig }) => {
  const [openWelcomeModal, setOpenWelcomeModal] = useState(false)

  useEffect(() => {
    const viewedWelcomeModal = localStorage.getItem('viewedWelcomeModal')
    if (!viewedWelcomeModal) {
      setOpenWelcomeModal(true)
      localStorage.setItem('viewedWelcomeModal', 'true')
    }
  }, [])

  return (
    <div>
      <Head>
        <title>EV Charging Locations - Map </title>
        <meta
          property="og:title"
          content={`${cityConfig.cityName} EV Charging Locations - Map`}
          key="title"
        />
        <meta
          name="description"
          content={`Explore electric vehicle (EV) charging locations in ${cityConfig.cityName}. View priority and feasible areas for new installations and existing infrastructure.`}
        />
      </Head>
      <Modal open={openWelcomeModal} onClose={() => setOpenWelcomeModal(false)}>
        <Modal.Header>Welcome</Modal.Header>
        <Modal.Content>
          <p>Welcome to the map page!</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpenWelcomeModal(false)} positive>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
      <Map cityConfig={cityConfig} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { county, city } = context.query as { county: string; city: string }
  try {
    const cityName = city.replace(/\s+/g, '_').toLowerCase()
    const cityConfig = {
      cityName,
      boundaryUrl: `https://ev-map.s3.amazonaws.com/CA/${county}/${cityName}/${cityName}_city_boundary.geojson`,
      priorityDataUrl: `https://ev-map.s3.amazonaws.com/CA/${county}/${cityName}/${cityName}_priority.json`,
      feasibleDataUrl: `https://ev-map.s3.amazonaws.com/CA/${county}/${cityName}/${cityName}_feasibility.json`,
      transitStopsUrl: `https://ev-map.s3.amazonaws.com/CA/${county}/${cityName}/${cityName}_transit.geojson`,
      parksAndRecreationUrl: `https://ev-map.s3.amazonaws.com/CA/${county}/${cityName}/${cityName}_parks.geojson`,
      healthcareFacilitiesUrl: `https://ev-map.s3.amazonaws.com/CA/${county}/${cityName}/${cityName}_healthcare.geojson`,
      lihtcUrl: `https://ev-map.s3.amazonaws.com/CA/${county}/${cityName}/${cityName}_lihtc.geojson`,
      schoolsUrl: `https://ev-map.s3.amazonaws.com/CA/${county}/${cityName}/${cityName}_schools.geojson`,
      libraryUrl: `https://ev-map.s3.amazonaws.com/CA/${county}/${cityName}/${cityName}_libraries.geojson`,
    }
    return {
      props: {
        cityConfig,
      },
    }
  } catch (error) {
    console.error('Failed to fetch city config:', error)
    return {
      notFound: true,
    }
  }
}

export default TemplateMapPage
