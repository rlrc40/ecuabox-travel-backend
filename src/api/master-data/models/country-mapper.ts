import { Country } from "./Country";
import { SaferCountry } from "./SaferCountryResponse";

export function mapSaferToCountry(saferCountry: SaferCountry): Country {
  return new Country({
    id: saferCountry.idDyn,
    name: saferCountry.name,
    iso2: saferCountry.isoCode2,
    iso3: saferCountry.isoCode3,
    capital: saferCountry.capital,
    translations: Object.fromEntries(
      saferCountry.translationsList.map((t) => [t.language.isoCode2, t.name])
    ),
    provinces: saferCountry.provinceList.map((p) => ({
      id: p.idDyn,
      name: p.name,
    })),
  });
}
