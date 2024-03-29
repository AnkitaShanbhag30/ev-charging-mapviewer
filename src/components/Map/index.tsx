import React, { useState, useEffect } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import "react-toggle/style.css"; 
import settingsIcon from './settings.svg';

import MapTopBar from '@components/TopBar'
import { AppConfig } from '@lib/AppConfig'
import MarkerCategories, { Category } from '@lib/MarkerCategories'
import { Places } from '@lib/Places'
import MapContextProvider from './MapContextProvider'
import useLeafletWindow from './useLeafletWindow'
import useMapContext from './useMapContext'
import useMarkerData from './useMarkerData'
import useLeaflet from './useLeaflet'
import LayerIntersection from './LayerIntersection';
import { DataControls } from './DataControls';
import ConfigurationPanel from './ConfigurationPanel';
import * as turf from '@turf/turf';
import { FeatureCollection, Polygon, MultiPolygon, GeoJsonProperties } from 'geojson';
import { GeoJSONData, LeafletMapContainer, CenterToMarkerButton, LocateButton, LeafletCluster, CustomMarker } from './GeoJSONData'

export type Range = [number, number];

interface UseLayerGroupEffectParams {
  map: any;
  data: GeoJSONData | null;
  showLayer: boolean;
  layerGroupName: string;
  iconUrl: string;
}

export type DataConfig = {
  togglePopRange: boolean;
  toggleCiRange: boolean;
  toggleLevRange: boolean;
  toggleMultiFaRange: boolean;
  toggleRentersRange: boolean;
  toggleWalkableRange: boolean;
  toggleDrivableRange: boolean;
  toggleCommercialRange: boolean;
  toggleResidentialRange: boolean;
  toggleNeviFilterActive: boolean;
  togglePgeFilterActive: boolean;
};

function MapInner(): JSX.Element {
  const [showIntersection, setShowIntersection] = useState(false);
  const [setIntersectionData] = useState<FeatureCollection<Polygon | MultiPolygon, GeoJsonProperties> | null>(null);
  const [priorityData, setPriorityData] = useState<FeatureCollection<Polygon | MultiPolygon, GeoJsonProperties> | null>(null);
  const [feasibleData, setFeasibleData] = useState<FeatureCollection<Polygon | MultiPolygon, GeoJsonProperties> | null>(null);
  const { map } = useMapContext();
  const L = useLeaflet();
  const leafletWindow = useLeafletWindow();
  const {
    width: viewportWidth, height: viewportHeight, ref: viewportRef,
  } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 200,
  });

  const { clustersByCategory, allMarkersBoundCenter } = useMarkerData({
    locations: Places,
    map,
    viewportWidth,
    viewportHeight,
  });

  const isLoading = !map || !leafletWindow || !viewportWidth || !viewportHeight;

  const [showTransitStops, setShowTransitStops] = useState(false);
  const [transitStopsData, setTransitStopsData] = useState<GeoJSONData | null>(null);
  const [showParksAndRecreation, setShowParksAndRecreation] = useState(false);
  const [parksAndRecreationData, setParksAndRecreationData] = useState<GeoJSONData | null>(null);
  const [showHealthcareFacilities, setShowHealthcareFacilities] = useState(false);
  const [healthcareFacilitiesData, setHealthcareFacilitiesData] = useState<GeoJSONData | null>(null);

  const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);
  const [priorityDataConfig, setPriorityDataConfig] = useState<DataConfig>({
    togglePopRange: true,
    toggleCiRange: true,
    toggleLevRange: true,
    toggleMultiFaRange: true,
    toggleRentersRange: true,
    toggleWalkableRange: true,
    toggleDrivableRange: true,
    toggleCommercialRange: false,
    toggleResidentialRange: false,
    toggleNeviFilterActive: false,
    togglePgeFilterActive: false,
});
  const [feasibleDataConfig, setFeasibleDataConfig] = useState<DataConfig>({
    togglePopRange: false,
    toggleCiRange: false,
    toggleLevRange: false,
    toggleMultiFaRange: false,
    toggleRentersRange: false,
    toggleWalkableRange: false,
    toggleDrivableRange: false,
    toggleCommercialRange: true,
    toggleResidentialRange: true,
    toggleNeviFilterActive: true,
    togglePgeFilterActive: true, 
  });

  const cityBoundaryGeoJSON = useEffectFetchCityBoundary();
  useEffectSetTransitStopsLayerData({ cityBoundaryGeoJSON });
  useEffectSetParksAndRecreationLayerData({ cityBoundaryGeoJSON });
  useEffectSetHealthcareFacilitiesLayerData({ cityBoundaryGeoJSON });
  useEffectCenterMap();
  useEffectTransitStops();
  useEffectParksAndRecreation();
  useEffectHealthCareFacilities();

  const mapHtml = <div>
    <div className="map-controls">
      <button onClick={() => setIsConfigPanelOpen(!isConfigPanelOpen)}>
        <img src='./settings.png' className='settings-icon'></img>
      </button>

      {isConfigPanelOpen && (
        <ConfigurationPanel
          priorityDataConfig={priorityDataConfig}
          feasibleDataConfig={feasibleDataConfig}
          setPriorityDataConfig={setPriorityDataConfig}
          setFeasibleDataConfig={setFeasibleDataConfig}
          closePanel={function (): void {
            setIsConfigPanelOpen(false);
          } 
        }/>
      )}
      <DataControls
        dataControlsTitle="Priority Data"
        map={map}
        L={L}
        cityBoundaryGeoJSON={cityBoundaryGeoJSON}
        color='#3388ff'
        geojsonUrl='/oakland_priority.geojson'
        onDataUpdate={setPriorityData} 
        config={priorityDataConfig}
      />
      <DataControls
        dataControlsTitle="Feasible Data"
        map={map}
        L={L}
        cityBoundaryGeoJSON={cityBoundaryGeoJSON}
        color="#ffa500"
        geojsonUrl='/oakland_priority.geojson'
        onDataUpdate={setFeasibleData} 
        config={feasibleDataConfig}
      />
      <br />
      <label>
        <b>Points of Interest</b>
      </label>
      <div className="checkbox-group">
        <div className="checkbox-column">
          <label>
            <input
              type="checkbox"
              checked={showTransitStops}
              onChange={() => setShowTransitStops(!showTransitStops)} />
            Transit Stops
          </label>
          <label>
            <input
              type="checkbox"
              checked={showParksAndRecreation}
              onChange={() => setShowParksAndRecreation(!showParksAndRecreation)} />
            City/County Parks
          </label>
          <label>
            <input
              type="checkbox"
              checked={showHealthcareFacilities}
              onChange={() => setShowHealthcareFacilities(!showHealthcareFacilities)} />
            Healthcare Facilities
          </label>
        </div>
      </div>
      {/* <label>
        <input
          type="checkbox"
          checked={showIntersection}
          onChange={() => setShowIntersection(!showIntersection)}
        />
        Show Computed Intersection
      </label>

      {showIntersection && map && priorityData && feasibleData && (
        <LayerIntersection
          map={map}
          priorityData={priorityData}
          feasibleData={feasibleData}
          onIntersectionChange={setIntersectionData}
          showIntersection={true}
        />
      )} */}
    </div>
    <div className="h-full w-full absolute overflow-hidden" ref={viewportRef}>
      <MapTopBar />
      <div
        className={`absolute w-full left-0 transition-opacity ${isLoading ? 'opacity-0' : 'opacity-1 '}`}
        style={{
          top: AppConfig.ui.topBarHeight,
          width: viewportWidth ?? '100%',
          height: viewportHeight ? viewportHeight - AppConfig.ui.topBarHeight : '100%',
        }}
      >
        {allMarkersBoundCenter && clustersByCategory && (
          <LeafletMapContainer
            center={allMarkersBoundCenter.centerPos}
            zoom={allMarkersBoundCenter.minZoom}
            maxZoom={AppConfig.maxZoom}
            minZoom={AppConfig.minZoom}
          >
            {!isLoading ? (
              <>
                <CenterToMarkerButton
                  center={allMarkersBoundCenter.centerPos}
                  zoom={allMarkersBoundCenter.minZoom} />
                <LocateButton />
                {Object.values(clustersByCategory).map(item => (
                  <LeafletCluster
                    key={item.category}
                    icon={MarkerCategories[item.category as Category].icon}
                    color={MarkerCategories[item.category as Category].color}
                    chunkedLoading
                  >
                    {item.markers.map(marker => (
                      <CustomMarker
                        icon={MarkerCategories[marker.category].icon}
                        color={MarkerCategories[marker.category].color}
                        key={(marker.position as number[]).join('')}
                        position={marker.position} />
                    ))}
                  </LeafletCluster>
                ))}
              </>
            ) : (
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <></>
            )}
          </LeafletMapContainer>
        )}
      </div>
    </div>
  </div>;
  return mapHtml;

  function useEffectFetchCityBoundary(): null {
    const [cityBoundaryGeoJSON, setCityBoundaryGeoJSON] = useState(null);

    useEffect(() => {
      const fetchBoundaryData = async () => {
        const boundaryData = await fetchCityBoundary();
        setCityBoundaryGeoJSON(boundaryData);
      };

      fetchBoundaryData();
    }, []);

    return cityBoundaryGeoJSON;
  }

  async function fetchCityBoundary(): Promise<any> {
    try {
      const cityBoundaryResponse = await fetch('/oakland_city_limits.geojson');
      if (!cityBoundaryResponse.ok) {
        throw new Error(`Error fetching city boundary: ${cityBoundaryResponse.statusText}`);
      }
      const cityBoundaryGeoJSON = await cityBoundaryResponse.json();
      return cityBoundaryGeoJSON;
    } catch (error) {
      console.error("Could not fetch city boundary:", error);
      return null;
    }
  }


  async function fetchAndFilterLayerData({ url, cityBoundaryGeoJSON, _setShowLayer, setLayerData, tolerance=0.01 }: { url: RequestInfo | URL; cityBoundaryGeoJSON: FeatureCollection<Polygon | MultiPolygon, GeoJsonProperties> | null; _setShowLayer: { (value: React.SetStateAction<boolean>): void; (value: React.SetStateAction<boolean>): void; (value: React.SetStateAction<boolean>): void; (arg0: boolean): void; }; setLayerData: { (value: React.SetStateAction<GeoJSONData | null>): void; (value: React.SetStateAction<GeoJSONData | null>): void; (value: React.SetStateAction<GeoJSONData | null>): void; (arg0: any): void; }; tolerance: number;}): Promise<void> {
    try {
      const response = await fetch(url);
      let dataJson = await response.json();

      const simplifiedCityBoundary = cityBoundaryGeoJSON && cityBoundaryGeoJSON.features.length > 0
        ? turf.simplify(cityBoundaryGeoJSON.features[0], { tolerance, highQuality: false })
        : null;

      if (simplifiedCityBoundary) {
        dataJson = {
          ...dataJson,
          features: dataJson.features.filter((feature: { geometry: turf.Coord; }) => {
            return turf.booleanPointInPolygon(feature.geometry, simplifiedCityBoundary.geometry);
          }),
        };
      }

      setLayerData(dataJson);
    } catch (error) {
      console.error("Error fetching GeoJSON data:", error);
    }
  }

  function useEffectCenterMap(): void {
    useEffect(() => {
      if (!allMarkersBoundCenter || !map) return;

      const moveEnd = () => {
        map.setMinZoom(allMarkersBoundCenter.minZoom - 1);
        map.off('moveend', moveEnd);
      };

      map.setMinZoom(0);
      map.flyTo(allMarkersBoundCenter.centerPos, allMarkersBoundCenter.minZoom, { animate: false });
      map.once('moveend', moveEnd);
    }, [allMarkersBoundCenter, map]);
  }

  function useLayerGroupEffect({
    map, data, showLayer, layerGroupName, iconUrl
  }: UseLayerGroupEffectParams): void {
    useEffect(() => {
      if (!map || !data || !L) {
        return;
      }

      let layerGroup = (map as any)[layerGroupName] as L.LayerGroup | undefined;

      if (showLayer) {
        const icon = L.icon({
          iconUrl: iconUrl,
          iconSize: [16, 16],
          iconAnchor: [0, 0],
          popupAnchor: [0, 0]
        });

        if (!layerGroup) {
          layerGroup = new L.LayerGroup().addTo(map);
          (map as any)[layerGroupName] = layerGroup;
        } else {
          layerGroup.clearLayers();
        }

        const layer = L.geoJSON(data, {
          style: { color: "#ff7800", weight: 1, opacity: 1 },
          pointToLayer: function (_feature, latlng) {
            return L.marker(latlng, { icon: icon });
          }
        });

        layerGroup.addLayer(layer);
      } else {
        if (layerGroup) {
          layerGroup.clearLayers();
          map.removeLayer(layerGroup);
          (map as any)[layerGroupName] = undefined;
        }
      }
    }, [showLayer, data, map, layerGroupName, iconUrl]);
  }

  function useEffectSetTransitStopsLayerData({ cityBoundaryGeoJSON }: { cityBoundaryGeoJSON: FeatureCollection<Polygon | MultiPolygon> | null; }): void {
    useEffect(() => {
      fetchAndFilterLayerData({ url: './transit_stops.geojson', cityBoundaryGeoJSON, _setShowLayer: setShowTransitStops, setLayerData: setTransitStopsData, tolerance: 0.05 });
    }, [cityBoundaryGeoJSON]);
  }

  function useEffectSetParksAndRecreationLayerData({ cityBoundaryGeoJSON }: { cityBoundaryGeoJSON: FeatureCollection<Polygon | MultiPolygon> | null; }): void {
    useEffect(() => {
      fetchAndFilterLayerData({ url: './parks_recreation.geojson', cityBoundaryGeoJSON, _setShowLayer: setShowParksAndRecreation, setLayerData: setParksAndRecreationData, tolerance: 0.01 });
    }, [cityBoundaryGeoJSON]);
  }

  function useEffectSetHealthcareFacilitiesLayerData({ cityBoundaryGeoJSON }: { cityBoundaryGeoJSON: FeatureCollection<Polygon | MultiPolygon> | null; }): void {
    useEffect(() => {
      fetchAndFilterLayerData({ url: './healthcare_facilities.geojson', cityBoundaryGeoJSON, _setShowLayer: setShowHealthcareFacilities, setLayerData: setHealthcareFacilitiesData, tolerance: 0.01 });
    }, [cityBoundaryGeoJSON]);
  }

  function useEffectTransitStops(): void {
    useLayerGroupEffect({
      map: map,
      data: transitStopsData,
      showLayer: showTransitStops,
      layerGroupName: 'transitStopsLayerGroup',
      iconUrl: 'vehicles.png'
    });
  }

  function useEffectParksAndRecreation(): void {
    useLayerGroupEffect({
      map: map,
      data: parksAndRecreationData,
      showLayer: showParksAndRecreation,
      layerGroupName: 'parksAndRecreationLayerGroup',
      iconUrl: 'bench.png'
    });
  }

  function useEffectHealthCareFacilities(): void {
    useLayerGroupEffect({
      map: map,
      data: healthcareFacilitiesData,
      showLayer: showHealthcareFacilities,
      layerGroupName: 'healthcareFacilitiesLayerGroup',
      iconUrl: 'first-aid-kit.png'
    });
  }
}

const Map = () => (
  <MapContextProvider>
    <MapInner />
  </MapContextProvider>
)

export default Map
