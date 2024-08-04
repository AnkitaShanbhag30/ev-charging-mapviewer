import { Leaf } from 'lucide-react'
import Head from 'next/head'
import { useState } from 'react'

import Footer from '@components/common/Footer'
import Navbar from '@components/common/Navbar'

import { AppConfig } from '@lib/AppConfig'

import About from './about'
import Contact from './contact'
import Data from './data'
import Default from './default'
import Instructions from './instructions'

const Home = () => {
  const [currentView, setCurrentView] = useState<string>('home')
  const renderView = () => {
    switch (currentView) {
      case 'default':
        return <Default />
      case 'instructions':
        return <Instructions />
      case 'about':
        return <About />
      case 'data':
        return <Data />
      case 'contact':
        return <Contact />
      default:
        return <Default />
    }
  }
  return (
    <div className="min-h-screen">
      <div className="flex-grow">
        <Head>
          <title>EV Equity Mapping Platform</title>
          <meta property="og:title" content="EV Equity Mapping Platform" key="title" />
          <meta name="description" content="" />
          {/* <style>{`
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
          `}</style> */}
        </Head>
        {/* <header className="mt-10 items-top gap-4 md:flex" /> */}
        <section>
          <div>
            <Navbar setCurrentView={setCurrentView} />
            <div className="homepage-background">
              <section className="homepage-card sm:mx-8 md:mx-12 lg:mx-16">{renderView()}</section>
            </div>
          </div>
        </section>
        <Footer />
        {/* <footer className="mt-16 flex justify-between p-3 rounded bg-light text-sm">
          This tool is a joint project of UC Berkeley&apos;s Renewable and Appropriate Energy Laboratory and
          Center for Law, Energy &amp; the Environment (CLEE) as part of CLEE&apos;s EV Equity Initiative. This is
          a demonstration tool for review and data verification purposes and is not intended for public use. All
          data acquired from public sources except as noted. Zoning data courtesy of Replica. Lead designers: Ari
          Ball-Burack and Ankita Suresh Shanbhag. Other research credits: Eleanor Adachi, Radhika Agarwal, Aki
          Konno. Initial funding provided by UC Berkeley Institute for Transportation studies. 
        </footer> */}
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
    </div>
  )
}

export default Home
