const Footer = () => (
  <footer className="w-full bg-light">
    <section className="sm:mx-8 md:mx-12 lg:mx-16">
      <p className="py-3 text-sm">
        This tool is a joint project of UC Berkeley&apos;s Energy and Resources Group and Center for Law,
        Energy & the Environment. See About [link] for more information.
      </p>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 flex justify-center">
          <img
            src="/images/Berk-ERG.png"
            alt="Berk-ERG Logo"
            className="h-10 object-contain"
            // style="height: 40px; width: auto;"
          />
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="/images/Berk-CLEE.png"
            alt="Berk-CLEE Logo"
            className="h-10 object-contain"
            // style="height: 40px; width: auto;"
          />
        </div>
      </div>
    </section>
  </footer>
)

export default Footer
