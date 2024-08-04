import Link from 'next/link'

const Contact = () => (
  <div>
    <h1 className="homepage-header">Contact</h1>
    <p>For more information, questions, or feedback regarding the tool, please contact:</p>
    <p>
      <Link className="font-bold" href="https://www.law.berkeley.edu/research/clee/about/people/ted-lamm/">
        Ted Lamm
      </Link>
      , Associate Director, Center for Law, Energy & the Environment
    </p>
    <p>
      <Link className="font-bold" href="https://erg.berkeley.edu/people/kammen-daniel-m/">
        Dan Kammen
      </Link>
      , Professor of Energy, Energy & Resources Group
    </p>
    <p>
      For more information on other elements of this project, visit
      <Link className="inline-link" href="https://www.law.berkeley.edu/research/clee/ev-equity/">
        CLEE’s EV Equity Initiative website.
      </Link>
    </p>
  </div>
)

export default Contact
