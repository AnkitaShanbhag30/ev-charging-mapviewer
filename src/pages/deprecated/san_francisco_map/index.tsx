import Head from 'next/head'
import Map from '@components/Map'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';

const SanFranciscoMapPage = () => {
  const router = useRouter();
  const [openWelcomeModal, setOpenWelcomeModal] = useState(false);

  useEffect(() => {
    if (router.query.welcomeModal) {
      setOpenWelcomeModal(true);
    }
  }, [router.query]);

  const sanfranciscoConfig = {
    boundaryUrl: 'https://ev-charging-mapviewer-assets.s3.amazonaws.com/SF_CityBoundary.geojson',
    priorityDataUrl: 'https://ev-charging-mapviewer-assets.s3.amazonaws.com/sf_priorityMay24.json',
    feasibleDataUrl: 'https://ev-charging-mapviewer-assets.s3.amazonaws.com/sf_priorityMay24.json',
    transitStopsUrl: 'https://ev-charging-mapviewer-assets.s3.amazonaws.com/bart_oakland.geojson',
    parksAndRecreationUrl: 'https://ev-charging-mapviewer-assets.s3.amazonaws.com/SF_parks-2.geojson',
    healthcareFacilitiesUrl:
      'https://ev-charging-mapviewer-assets.s3.amazonaws.com/San_Francisco_Healthcare_Facilities.geojson',
    lihtcUrl: 'https://ev-charging-mapviewer-assets.s3.amazonaws.com/SF_LIHTC_converted.geojson',
    schoolsUrl:
      'https://ev-charging-mapviewer-assets.s3.amazonaws.com/SchoolSites1920_-8485697552074815990.geojson',
    libraryUrl: 'https://ev-charging-mapviewer-assets.s3.amazonaws.com/sf_libraries.geojson',
  }

  return (
    <div>
      <Head>
        <title>EV Charging Locations - Map 🤩</title>
        <meta property="og:title" content="San Francisco EV Charging Locations - Map" key="title" />
        <meta
          name="description"
          content="Explore electric vehicle (EV) charging locations in San Francisco. View priority and feasible areas for new installations and existing infrastructure."
        />
      </Head>
      <Modal
        open={openWelcomeModal}
        onClose={() => setOpenWelcomeModal(false)}
      >
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
      <Map cityConfig={sanfranciscoConfig} />
    </div>
  )
}

export default SanFranciscoMapPage
