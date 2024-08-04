const Instructions = () => (
  <div>
    <h1 className="homepage-header">How to use</h1>
    <p className="mb-4">The tool enables users to:</p>
    <ol className="list-inside mb-4">
      <li className="mb-2">
        a). select which criteria are included in the &quot;priority&quot; and &quot;feasibility&quot; layers
        (via the settings wheel) and
      </li>
      <li className="mb-2">
        b). adjust the intensity of the criteria as appropriate to the local context (via sliders).
      </li>
    </ol>
    <p className="mb-4">
      These selections and adjustments will yield unique combinations of pixels using &quot;AND&quot; logic -
      i.e., only pixels that meet all selected criteria will remain on the map. Areas with high concentrations
      or overlap of both “priority” and “feasibility” pixels are likely candidate zones for investment.
    </p>
    <p className="mb-4">For example:</p>
    <ol className="list-inside mb-4">
      <li className="mb-4">
        <span className="font-bold">CalEnviroScreen4.0 percentile:</span>
        <br /> Slide to define the range of CalEnviroScreen percentile scores included in the
        &quot;priority&quot; pixel set. A higher range (e.g., 70-100) will limit the set to show only those
        areas scoring highest across the CES4.0 environmental vulnerability indicators.
      </li>
      <li className="mb-4">
        <span className="font-bold">L2 chargers within 10 min walk:</span>
        <br /> Slide the range down to exclude pixels with multiple existing Level 2 chargers available within
        a 10 minute walk of the pixel.
      </li>
      <li className="mb-4">
        <span className="font-bold">PG&E load capacity:</span>
        <br /> Increase the bottom slider to exclude areas with electrical distribution grid capacity (in kW)
        lower than the indicated number.
      </li>
      <li className="mb-4">
        <span className="font-bold">NEVI and IRS 30C eligible:</span>
        <br /> Toggle on to show areas eligible for either funding source; toggle both on to show areas
        eligible for both.
      </li>
    </ol>
  </div>
)

export default Instructions
