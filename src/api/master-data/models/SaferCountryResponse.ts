export type SaferCountriesResponse = SaferCountry[];

export interface SaferCountry {
  idDyn: number;
  idDyn2: number;
  name: string;
  isoCode2: string;
  isoCode3: string;
  capital: string;
  translationsList: SaferTranslation[];
  provinceList: SaferProvince[];
}

export interface SaferTranslation {
  name: string;
  language: {
    isoCode2: string;
  };
}

export interface SaferProvince {
  idDyn: number;
  name: string;
}
