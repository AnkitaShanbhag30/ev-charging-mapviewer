import Image from 'next/image'
import Link from 'next/link'

const About = () => (
  <section>
    <h1 className="homepage-header">About EV-map</h1>
    <p>
      This tool is intended for free use by local governments and stakeholders to identify high-priority,
      high-feasibility sites for investment in electric vehicle charging and associated mobility
      infrastructure. It is a joint project of UC Berkeley&apos;s Energy and Resources Group and Center for
      Law, Energy & the Environment (CLEE) as part of CLEE&apos;s EV Equity Initiative. This is a
      demonstration tool for review and design purposes; all data still subject to verification. All data
      acquired from public sources except as noted. Lead designers: Ari Ball-Burack, Meagan Marie LeBerth,
      Brad Rhymer, Ankita Suresh Shanbhag. Other research credits: Eleanor Adachi, Radhika Agarwal, Aki Konno.
      Initial funding provided by UC Berkeley Institute for Transportation studies.
    </p>
    <br />
    <h2 className="font-bold mb-4">Leadership Team</h2>
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-2">
        <Link className="font-bold" href="https://erg.berkeley.edu/people/kammen-daniel-m/">
          <Image src="/images/dkammen.png" alt="Example Image" width={100} height={130} />
        </Link>
      </div>
      <div className="col-span-10 flex flex-col justify-center">
        <Link className="font-bold" href="https://erg.berkeley.edu/people/kammen-daniel-m/">
          Dan Kammen
        </Link>
        <p>Professor of Energy</p>
        <p>Energy & Resources Group and Goldman School of Public Policy, UC Berkeley</p>
      </div>
      <div className="col-span-2">
        <Link className="font-bold" href="https://www.law.berkeley.edu/research/clee/about/people/ted-lamm/">
          <Image src="/images/tlamm.png" alt="Example Image" width={100} height={130} />
        </Link>
      </div>
      <div className="col-span-10 flex flex-col justify-center">
        <Link className="font-bold" href="https://www.law.berkeley.edu/research/clee/about/people/ted-lamm/">
          Ted Lamm
        </Link>
        <p>Associate Director</p>
        <p>Center for Law, Energy & the Environment, UC Berkeley School of Law</p>
      </div>
      <div className="col-span-2">
        <Link className="font-bold" href="https://www.law.berkeley.edu/research/clee/about/people/ken-alex/">
          <Image src="/images/kalex.png" alt="Example Image" width={100} height={130} />
        </Link>
      </div>
      <div className="col-span-10 flex flex-col justify-center">
        <Link className="font-bold" href="https://www.law.berkeley.edu/research/clee/about/people/ken-alex/">
          Ken Alex
        </Link>
        <p>Director, Project Climate</p>
        <p>Center for Law, Energy & the Environment, UC Berkeley School of Law</p>
      </div>
    </div>
  </section>
)

export default About
