import { Leaf } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'

import NavMenu from '@components/common/NavMenu'

import { AppConfig } from '@lib/AppConfig'

const Home = () => (
  <div className="container mx-auto max-w-2xl max-md:max-w-none p-3">
    <Head>
      <title>EV Equity Mapping Platform</title>
      <meta property="og:title" content="EV Equity Mapping Platform" key="title" />
      <meta name="description" content="" />
      <style>{`
        .bullet-list {
          margin-left: 20px;
        }
        .bullet-list li::before {
          content: '•';
          color: black;
          display: inline-block; 
          width: 1em;
          margin-left: -1em;
        }
        p, ul {
          text-align: justify;
        }
      `}</style>
    </Head>
    <header className="mt-10 items-top gap-4 md:flex" />
    <section>
      <h3 className="text-3xl mb-16 text-justify">EV Equity Mapping Platform</h3>
    </section>
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <br />
        <NavMenu />
      </div>
    </section>
    <br />
    <span>
      <p>
        This tool is designed as a free, open-access platform to inform local government and stakeholder
        decision making on EV and mobility infrastructure investments. The demonstration maps available here
        are intended to facilitate review, data refinement, and feedback in advance of a California statewide
        launch.
      </p>
      <br />
      <p>
        The tool uses a pixel-grid approach to integrate multiple data sets and geographic scales into
        &quot;priority&quot; and &quot;feasibility&quot; layers to identify best-fit locations to prioritize
        in planning processes:
      </p>
      <ul className="bullet-list">
        <li>
          “Priority” layers include population demographics, environmental justice indicators, and EV/charging
          access data to identify where charging investment is a high priority as a matter of public policy.
        </li>
        <li>
          “Feasibility” layers include funding availability and electrical grid capacity data to identify
          where charging investment is most possible.
        </li>
        <li>
          “Co-location points” identify community resources where mobility investment should be most desirable
          within a high-priority, high-feasibility zone. Each pixel is 100x100 meters.
        </li>
        <br />
      </ul>
      <br />
      <p>
        The tool enables users to a) select which criteria are included in the “priority” and “feasibility”
        layers (via the settings wheel) and b) adjust the intensity of the criteria as appropriate to the
        local context (via sliders). These selections and adjustments will yield unique combinations of pixels
        using “AND” logic - i.e., only pixels that meet all selected criteria will remain on the map. Areas
        with high concentrations or overlap of both “priority” and “feasibility” pixels are likely candidate
        zones for investment. For example:
      </p>
      <ul className="bullet-list">
        <li>
          CalEnviroScreen4.0 percentile: Slide to define the range of CalEnviroScreen percentile scores
          included in the &quot;priority&quot; pixel set. A higher range (e.g., 70-100) will limit the set to
          show only those areas scoring highest across the CES4.0 environmental vulnerability indicators.
        </li>
        <li>
          L2 chargers within 10 min walk: Slide the range down to exclude pixels with multiple existing Level
          Level 2 chargers available within a 10 minute walk of the pixel.
        </li>
        <li>
          PG&E load capacity: Increase the bottom slider to exclude areas with electrical distribution grid
          capacity (in kW) lower than the indicated number.
        </li>
        <li>
          NEVI and IRS 30C eligible: Toggle on to show areas eligible for either funding source; toggle both
          on to show areas eligible for both.
        </li>
      </ul>
      <br />
      <p>
        We are actively adding more criteria, expanding to new geographies, refining data, and improving the
        user interface. We welcome your feedback.
      </p>
    </span>
    <footer className="mt-16 flex justify-between p-3 rounded bg-light text-sm">
      This tool is a joint project of UC Berkeley&apos;s Renewable and Appropriate Energy Laboratory and
      Center for Law, Energy &amp; the Environment (CLEE) as part of CLEE&apos;s EV Equity Initiative. This is
      a demonstration tool for review and data verification purposes and is not intended for public use. All
      data acquired from public sources except as noted. Zoning data courtesy of Replica. Lead designers: Ari
      Ball-Burack and Ankita Suresh Shanbhag. Other research credits: Eleanor Adachi, Radhika Agarwal, Aki
      Konno. Initial funding provided by UC Berkeley Institute for Transportation studies. Contact:
      tlamm@law.berkeley.edu, kammen@berkeley.edu.
    </footer>
    {/* <footer className="mt-16 flex justify-between p-3 rounded bg-light text-sm">
      <div>
        Created by Ankita Shanbhag <br />
        <Link href="https://linkedin.com/in/ankitashanbhag" className="text-primary">
          Contact Me
        </Link>
      </div>
      <div className="text-primary">
        <Leaf size={AppConfig.ui.mapIconSize} className="mt-2" />
      </div>
    </footer> */}
  </div>
)

export default Home
