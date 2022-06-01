interface City {
  name: string;
  image: string;
}

interface Country {
  name: string;
  flag: string;
  cities: City[];
}

export interface Continent {
  id: string;
  name: string;
  description: string;
  image: string;
  languages: number;
  countriesNumber: number,
  countries: Country[];
}