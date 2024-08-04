import { useState } from 'react'
import MapSelectorItem from './MapSelectorItem'
import { Listbox } from '@headlessui/react'
import { Select } from 'semantic-ui-react'

type County = {
    id: string;
    name: string;
    available: boolean;
};

type City = {
    id: string;
    name: string;
};

const counties: County[] = [
    {id: "001", name: "Alameda", available: true},
    {id: "002", name: "Alpine", available: false},
    {id: "003", name: "Amador", available: false},
    {id: "004", name: "Butte", available: false},
    {id: "005", name: "Calaveras", available: false},
    {id: "006", name: "Colusa", available: false},
    {id: "007", name: "Contra Costa", available: false},
    {id: "008", name: "Del Norte", available: false},
    {id: "009", name: "El Dorado", available: false},
    {id: "010", name: "Fresno", available: false},
    {id: "011", name: "Glenn", available: false},
    {id: "012", name: "Humboldt", available: false},
    {id: "013", name: "Imperial", available: false},
    {id: "014", name: "Inyo", available: false},
    {id: "015", name: "Kern", available: false},
    {id: "016", name: "Kings", available: false},
    {id: "017", name: "Lake", available: false},
    {id: "018", name: "Lassen", available: false},
    {id: "019", name: "Los Angeles", available: false},
    {id: "020", name: "Madera", available: false},
    {id: "021", name: "Marin", available: false},
    {id: "022", name: "Mariposa", available: false},
    {id: "023", name: "Mendocino", available: false},
    {id: "024", name: "Merced", available: false},
    {id: "025", name: "Modoc", available: false},
    {id: "026", name: "Mono", available: false},
    {id: "027", name: "Monterey", available: false},
    {id: "028", name: "Napa", available: false},
    {id: "029", name: "Nevada", available: false},
    {id: "030", name: "Orange", available: false},
    {id: "031", name: "Placer", available: false},
    {id: "032", name: "Plumas", available: false},
    {id: "033", name: "Riverside", available: false},
    {id: "034", name: "Sacramento", available: false},
    {id: "035", name: "San Benito", available: false},
    {id: "036", name: "San Bernardino", available: false},
    {id: "037", name: "San Diego", available: false},
    {id: "038", name: "San Francisco", available: true},
    {id: "039", name: "San Joaquin", available: false},
    {id: "040", name: "San Luis Obispo", available: false},
    {id: "041", name: "San Mateo", available: false},
    {id: "042", name: "Santa Barbara", available: false},
    {id: "043", name: "Santa Clara", available: false},
    {id: "044", name: "Santa Cruz", available: false},
    {id: "045", name: "Shasta", available: false},
    {id: "046", name: "Sierra", available: false},
    {id: "047", name: "Siskiyou", available: false},
    {id: "048", name: "Solano", available: false},
    {id: "049", name: "Sonoma", available: false},
    {id: "050", name: "Stanislaus", available: false},
    {id: "051", name: "Sutter", available: false},
    {id: "052", name: "Tehama", available: false},
    {id: "053", name: "Trinity", available: false},
    {id: "054", name: "Tulare", available: false},
    {id: "055", name: "Tuolumne", available: false},
    {id: "056", name: "Ventura", available: false},
    {id: "057", name: "Yolo", available: false},
    {id: "058", name: "Yuba", available: false}
]

const cities: City[] = [
    { id: "001", name: "Alameda" },
    { id: "002", name: "Albany" },
    { id: "003", name: "Berkeley" },
    { id: "004", name: "Dublin" },
    { id: "005", name: "Emeryville" },
    { id: "006", name: "Fremont" },
    { id: "007", name: "Hayward" },
    { id: "008", name: "Livermore" },
    { id: "009", name: "Newark" },
    { id: "010", name: "Oakland" },
    { id: "011", name: "Piedmont" },
    { id: "012", name: "Pleasanton" },
    { id: "013", name: "San Leandro" },
    { id: "014", name: "Union City" },
    { id: "015", name: "Unincorporated" }
];

const MapSelectorDropdown = ({}) => {
    const [selectedCounty, setSelectedCounty] = useState<County | null>(null);

    const handleCountyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const countyId = event.target.value;
        const county = counties.find(c => c.id === countyId) || null;
        setSelectedCounty(county);
    };

    return(
        <>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Select the county</span>
                </div>
                <select
                    className="select select-bordered"
                    onChange={handleCountyChange}
                    defaultValue=""
                >
                    <option value="" disabled>
                        
                    </option>
                {counties.map((county) => (
                    <option
                        key={county.id}
                        value={county.id}
                        disabled={!county.available}
                        >
                        {county.name}
                    </option>
                ))}
                </select>
            </label>
            {selectedCounty && (
                <label className="form-control w-full max-w-xs mt-4">
                    <div className="label">
                        <span className="label-text">Select the city</span>
                    </div>
                    <select className="select select-bordered" defaultValue="">
                    {cities.map((city) => (
                        <option
                            key={city.id}
                            value={city.id}
                            // disabled={!city.available}
                            >
                            {city.name}
                        </option>
                ))}
                    </select>
                </label>
            )}
        </>
    )
}
  


export default MapSelectorDropdown