import { useState } from 'react'
import { Button, Dropdown, Modal } from 'semantic-ui-react'

import LatLngLogo from '@components/TopBar/LatLngLogo'

import MapSelector from '../common/MapSelector'

const MapTopBar = () => {
  const [openSettings, setOpenSettings] = useState(false)
  const [openJurisdiction, setOpenJurisdiction] = useState(false)

  const previousSelections = [
    { key: 'option1', text: 'Option 1', value: 'option1' },
    { key: 'option2', text: 'Option 2', value: 'option2' },
    { key: 'option3', text: 'Option 3', value: 'option3' },
  ]

  return (
    <div
      className="h-20 absolute w-full left-0 top-0 p-3 shadow bg-dark flex items-center"
      style={{ zIndex: 1000 }}
    >
      <div className="flex justify-between w-full">
        <LatLngLogo />
        <div className="flex-grow" />
        <div className="flex space-x-4">
          <Modal
            open={openSettings}
            onClose={() => setOpenSettings(false)}
            onOpen={() => setOpenSettings(true)}
            trigger={<Button onClick={() => setOpenSettings(true)}>Change Settings</Button>}
          >
            <Modal.Header>Change Settings</Modal.Header>
            <Modal.Content>
              <h1 className="homepage-header">Settings will go here</h1>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => setOpenSettings(false)} negative>
                Cancel
              </Button>
              <Button onClick={() => setOpenSettings(false)} positive>
                Done
              </Button>
            </Modal.Actions>
          </Modal>
          {/* <Dropdown
            placeholder='Select a previous map'
            fluid
            selection
            options={previousSelections}
          /> */}
          <Modal
            open={openJurisdiction}
            onClose={() => setOpenJurisdiction(false)}
            onOpen={() => setOpenJurisdiction(true)}
            trigger={<Button onClick={() => setOpenJurisdiction(true)}>Select New Jurisdiction</Button>}
          >
            <Modal.Header>Select Jurisdiction</Modal.Header>
            <Modal.Content>
              <MapSelector />
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => setOpenJurisdiction(false)} negative>
                Cancel
              </Button>
              <Button onClick={() => setOpenJurisdiction(false)} positive>
                Done
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default MapTopBar
