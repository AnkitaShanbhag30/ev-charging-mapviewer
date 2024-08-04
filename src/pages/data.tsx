const Data = () => (
  <div>
    <h1 className="homepage-header">Data Sources and links</h1>
    <br />
    <ul className="list-disc pl-5">
      <li className="mb-4">
        <h2 className="font-bold">CalEnviroScreen4.0</h2>
        <p>
          CalEnviroScreen is California’s community environmental health screening tool. Composite scores are
          aggregates of 13 “pollution burden” criteria and 8 “population characteristics” criteria, with raw
          scores compared against statewide averages to develop percentile rankings. For more information on
          CalEnviroScreen’s indicators and scoring methods, see&nbsp;
          <a
            href="https://oehha.ca.gov/calenviroscreen/report/calenviroscreen-40"
            className="text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://oehha.ca.gov/calenviroscreen/report/calenviroscreen-40
          </a>
          .
        </p>
      </li>
      <li className="mb-4">
        <h2 className="font-bold">Multifamily Residents</h2>
        <p>
          Number of multifamily building residents per pixel is identified by multiplying pixel population by
          ACS 5-year estimates for multifamily resident percentage, from the variable B25032 - Tenure by Units
          in Structure, available at&nbsp;
          <a
            href="https://data.census.gov/table/ACSDT5Y2021.B25032?q=B25032%20-%20Tenure%20by%20Units%20in%20Structure."
            className="text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://data.census.gov/table/ACSDT5Y2021.B25032?q=B25032%20-%20Tenure%20by%20Units%20in%20Structure
          </a>
          .
        </p>
      </li>
      <li className="mb-4">
        <h2 className="font-bold">Renters</h2>
        <p>
          Number of renters per pixel is identified by multiplying pixel population ACS 5-year estimates for
          non-owner-occupied percentage, from the variable B25032 - Tenure by Units in Structure – accessible
          at&nbsp;
          <a
            href="https://data.census.gov/table/ACSDT5Y2021.B25032?q=B25032%20-%20Tenure%20by%20Units%20in%20Structure"
            className="text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://data.census.gov/table/ACSDT5Y2021.B25032?q=B25032%20-%20Tenure%20by%20Units%20in%20Structure
          </a>
          .
        </p>
      </li>
      <li className="mb-4">
        <h2 className="font-bold">L2/DCF Charging Access</h2>
        <p>
          Based on&nbsp;
          <a
            href="https://docs.mapbox.com/api/navigation/isochrone/"
            className="text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            MapBox isochrones API
          </a>
          , with charger data drawn from federal AFDC data at
          <a
            href="https://afdc.energy.gov/fuels/electricity-locations#/find/nearest?fuel=ELEC"
            className="text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://afdc.energy.gov/fuels/electricity-locations#/find/nearest?fuel=ELEC
          </a>
          .
        </p>
      </li>
      <li className="mb-4">
        <h2 className="font-bold">NEVI Eligibility</h2>
        <p>
          The federal National Electric Vehicle Infrastructure (NEVI) program provides funding for EV charging
          infrastructure located within 1 mile of designated federal and state highway corridors. For more
          information see&nbsp;
          <a
            href="https://afdc.energy.gov/laws/12744"
            className="text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://afdc.energy.gov/laws/12744
          </a>
          and to access individual state NEVI plans and eligible corridors see&nbsp;
          <a
            href="https://oehha.ca.gov/calenviroscreen/report/calenviroscreen-40"
            className="text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://oehha.ca.gov/calenviroscreen/report/calenviroscreen-40
          </a>
          .
        </p>
      </li>
      <li className="mb-4">
        <h2 className="font-bold">IRS 30C Eligibility</h2>
        <p>
          The 30C tax credit is available in census tracts designated by IRS and USDOE as either low-income or
          non-urban. For more information see&nbsp;
          <a
            href="https://experience.arcgis.com/experience/3f67d5e82dc64d1589714d5499196d4f/page/Page/"
            className="text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://experience.arcgis.com/experience/3f67d5e82dc64d1589714d5499196d4f/page/Page/
          </a>
          .
        </p>
      </li>
      <li className="mb-4">
        <h2 className="font-bold">Distribution Grid Capacity</h2>
        <p>
          Distribution grid capacity data are obtained from California investor-owned utilities’ integrative
          capacity analysis (ICA) maps, available at&nbsp;
          <a
            href="https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/infrastructure/distribution-planning"
            className="text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/infrastructure/distribution-planning
          </a>
          .
        </p>
      </li>
    </ul>
  </div>
)

export default Data
