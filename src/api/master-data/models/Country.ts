export class Country {
  id: number;
  name: string;
  iso2: string;
  iso3: string;
  capital: string;
  translations: Record<string, string>;
  provinces: string[];

  constructor(params: {
    id: number;
    name: string;
    iso2: string;
    iso3: string;
    capital: string;
    translations: Record<string, string>;
    provinces: string[];
  }) {
    this.id = params.id;
    this.name = params.name;
    this.iso2 = params.iso2;
    this.iso3 = params.iso3;
    this.capital = params.capital;
    this.translations = params.translations;
    this.provinces = params.provinces;
  }

  getTranslation(lang: string): string {
    return this.translations[lang] || this.name;
  }

  hasProvince(provinceName: string): boolean {
    return this.provinces.includes(provinceName);
  }
}
