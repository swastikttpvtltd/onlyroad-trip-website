'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const countries = [
  ['AF','🇦🇫','Afghanistan','+93'],['AL','🇦🇱','Albania','+355'],['DZ','🇩🇿','Algeria','+213'],['AS','🇦🇸','American Samoa','+1'],['AD','🇦🇩','Andorra','+376'],['AO','🇦🇴','Angola','+244'],['AI','🇦🇮','Anguilla','+1'],['AG','🇦🇬','Antigua and Barbuda','+1'],['AR','🇦🇷','Argentina','+54'],['AM','🇦🇲','Armenia','+374'],['AW','🇦🇼','Aruba','+297'],['AU','🇦🇺','Australia','+61'],['AT','🇦🇹','Austria','+43'],['AZ','🇦🇿','Azerbaijan','+994'],
  ['BS','🇧🇸','Bahamas','+1'],['BH','🇧🇭','Bahrain','+973'],['BD','🇧🇩','Bangladesh','+880'],['BB','🇧🇧','Barbados','+1'],['BY','🇧🇾','Belarus','+375'],['BE','🇧🇪','Belgium','+32'],['BZ','🇧🇿','Belize','+501'],['BJ','🇧🇯','Benin','+229'],['BM','🇧🇲','Bermuda','+1'],['BT','🇧🇹','Bhutan','+975'],['BO','🇧🇴','Bolivia','+591'],['BA','🇧🇦','Bosnia and Herzegovina','+387'],['BW','🇧🇼','Botswana','+267'],['BR','🇧🇷','Brazil','+55'],['IO','🇮🇴','British Indian Ocean Territory','+246'],['VG','🇻🇬','British Virgin Islands','+1'],['BN','🇧🇳','Brunei','+673'],['BG','🇧🇬','Bulgaria','+359'],['BF','🇧🇫','Burkina Faso','+226'],['BI','🇧🇮','Burundi','+257'],
  ['CV','🇨🇻','Cabo Verde','+238'],['KH','🇰🇭','Cambodia','+855'],['CM','🇨🇲','Cameroon','+237'],['CA','🇨🇦','Canada','+1'],['KY','🇰🇾','Cayman Islands','+1'],['CF','🇨🇫','Central African Republic','+236'],['TD','🇹🇩','Chad','+235'],['CL','🇨🇱','Chile','+56'],['CN','🇨🇳','China','+86'],['CX','🇨🇽','Christmas Island','+61'],['CC','🇨🇨','Cocos (Keeling) Islands','+61'],['CO','🇨🇴','Colombia','+57'],['KM','🇰🇲','Comoros','+269'],['CG','🇨🇬','Congo','+242'],['CD','🇨🇩','Congo, Democratic Republic','+243'],['CK','🇨🇰','Cook Islands','+682'],['CR','🇨🇷','Costa Rica','+506'],['CI','🇨🇮','Côte d’Ivoire','+225'],['HR','🇭🇷','Croatia','+385'],['CU','🇨🇺','Cuba','+53'],['CW','🇨🇼','Curaçao','+599'],['CY','🇨🇾','Cyprus','+357'],['CZ','🇨🇿','Czechia','+420'],
  ['DK','🇩🇰','Denmark','+45'],['DJ','🇩🇯','Djibouti','+253'],['DM','🇩🇲','Dominica','+1'],['DO','🇩🇴','Dominican Republic','+1'],['EC','🇪🇨','Ecuador','+593'],['EG','🇪🇬','Egypt','+20'],['SV','🇸🇻','El Salvador','+503'],['GQ','🇬🇶','Equatorial Guinea','+240'],['ER','🇪🇷','Eritrea','+291'],['EE','🇪🇪','Estonia','+372'],['SZ','🇸🇿','Eswatini','+268'],['ET','🇪🇹','Ethiopia','+251'],
  ['FK','🇫🇰','Falkland Islands','+500'],['FO','🇫🇴','Faroe Islands','+298'],['FJ','🇫🇯','Fiji','+679'],['FI','🇫🇮','Finland','+358'],['FR','🇫🇷','France','+33'],['GF','🇬🇫','French Guiana','+594'],['PF','🇵🇫','French Polynesia','+689'],['GA','🇬🇦','Gabon','+241'],['GM','🇬🇲','Gambia','+220'],['GE','🇬🇪','Georgia','+995'],['DE','🇩🇪','Germany','+49'],['GH','🇬🇭','Ghana','+233'],['GI','🇬🇮','Gibraltar','+350'],['GR','🇬🇷','Greece','+30'],['GL','🇬🇱','Greenland','+299'],['GD','🇬🇩','Grenada','+1'],['GP','🇬🇵','Guadeloupe','+590'],['GU','🇬🇺','Guam','+1'],['GT','🇬🇹','Guatemala','+502'],['GG','🇬🇬','Guernsey','+44'],['GN','🇬🇳','Guinea','+224'],['GW','🇬🇼','Guinea-Bissau','+245'],['GY','🇬🇾','Guyana','+592'],
  ['HT','🇭🇹','Haiti','+509'],['HN','🇭🇳','Honduras','+504'],['HK','🇭🇰','Hong Kong','+852'],['HU','🇭🇺','Hungary','+36'],['IS','🇮🇸','Iceland','+354'],['IN','🇮🇳','India','+91'],['ID','🇮🇩','Indonesia','+62'],['IR','🇮🇷','Iran','+98'],['IQ','🇮🇶','Iraq','+964'],['IE','🇮🇪','Ireland','+353'],['IM','🇮🇲','Isle of Man','+44'],['IL','🇮🇱','Israel','+972'],['IT','🇮🇹','Italy','+39'],['JM','🇯🇲','Jamaica','+1'],['JP','🇯🇵','Japan','+81'],['JE','🇯🇪','Jersey','+44'],['JO','🇯🇴','Jordan','+962'],
  ['KZ','🇰🇿','Kazakhstan','+7'],['KE','🇰🇪','Kenya','+254'],['KI','🇰🇮','Kiribati','+686'],['KP','🇰🇵','North Korea','+850'],['KR','🇰🇷','South Korea','+82'],['KW','🇰🇼','Kuwait','+965'],['KG','🇰🇬','Kyrgyzstan','+996'],['LA','🇱🇦','Laos','+856'],['LV','🇱🇻','Latvia','+371'],['LB','🇱🇧','Lebanon','+961'],['LS','🇱🇸','Lesotho','+266'],['LR','🇱🇷','Liberia','+231'],['LY','🇱🇾','Libya','+218'],['LI','🇱🇮','Liechtenstein','+423'],['LT','🇱🇹','Lithuania','+370'],['LU','🇱🇺','Luxembourg','+352'],['MO','🇲🇴','Macao','+853'],['MG','🇲🇬','Madagascar','+261'],['MW','🇲🇼','Malawi','+265'],['MY','🇲🇾','Malaysia','+60'],['MV','🇲🇻','Maldives','+960'],['ML','🇲🇱','Mali','+223'],['MT','🇲🇹','Malta','+356'],['MH','🇲🇭','Marshall Islands','+692'],['MQ','🇲🇶','Martinique','+596'],['MR','🇲🇷','Mauritania','+222'],['MU','🇲🇺','Mauritius','+230'],['YT','🇾🇹','Mayotte','+262'],['MX','🇲🇽','Mexico','+52'],['FM','🇫🇲','Micronesia','+691'],['MD','🇲🇩','Moldova','+373'],['MC','🇲🇨','Monaco','+377'],['MN','🇲🇳','Mongolia','+976'],['ME','🇲🇪','Montenegro','+382'],['MS','🇲🇸','Montserrat','+1'],['MA','🇲🇦','Morocco','+212'],['MZ','🇲🇿','Mozambique','+258'],['MM','🇲🇲','Myanmar','+95'],
  ['NA','🇳🇦','Namibia','+264'],['NR','🇳🇷','Nauru','+674'],['NP','🇳🇵','Nepal','+977'],['NL','🇳🇱','Netherlands','+31'],['NC','🇳🇨','New Caledonia','+687'],['NZ','🇳🇿','New Zealand','+64'],['NI','🇳🇮','Nicaragua','+505'],['NE','🇳🇪','Niger','+227'],['NG','🇳🇬','Nigeria','+234'],['NU','🇳🇺','Niue','+683'],['NF','🇳🇫','Norfolk Island','+672'],['MK','🇲🇰','North Macedonia','+389'],['MP','🇲🇵','Northern Mariana Islands','+1'],['NO','🇳🇴','Norway','+47'],['OM','🇴🇲','Oman','+968'],
  ['PK','🇵🇰','Pakistan','+92'],['PW','🇵🇼','Palau','+680'],['PS','🇵🇸','Palestine','+970'],['PA','🇵🇦','Panama','+507'],['PG','🇵🇬','Papua New Guinea','+675'],['PY','🇵🇾','Paraguay','+595'],['PE','🇵🇪','Peru','+51'],['PH','🇵🇭','Philippines','+63'],['PN','🇵🇳','Pitcairn Islands','+64'],['PL','🇵🇱','Poland','+48'],['PT','🇵🇹','Portugal','+351'],['PR','🇵🇷','Puerto Rico','+1'],['QA','🇶🇦','Qatar','+974'],['RE','🇷🇪','Réunion','+262'],['RO','🇷🇴','Romania','+40'],['RU','🇷🇺','Russia','+7'],['RW','🇷🇼','Rwanda','+250'],
  ['BL','🇧🇱','Saint Barthélemy','+590'],['SH','🇸🇭','Saint Helena','+290'],['KN','🇰🇳','Saint Kitts and Nevis','+1'],['LC','🇱🇨','Saint Lucia','+1'],['MF','🇲🇫','Saint Martin','+590'],['PM','🇵🇲','Saint Pierre and Miquelon','+508'],['VC','🇻🇨','Saint Vincent and the Grenadines','+1'],['WS','🇼🇸','Samoa','+685'],['SM','🇸🇲','San Marino','+378'],['ST','🇸🇹','São Tomé and Príncipe','+239'],['SA','🇸🇦','Saudi Arabia','+966'],['SN','🇸🇳','Senegal','+221'],['RS','🇷🇸','Serbia','+381'],['SC','🇸🇨','Seychelles','+248'],['SL','🇸🇱','Sierra Leone','+232'],['SG','🇸🇬','Singapore','+65'],['SX','🇸🇽','Sint Maarten','+1'],['SK','🇸🇰','Slovakia','+421'],['SI','🇸🇮','Slovenia','+386'],['SB','🇸🇧','Solomon Islands','+677'],['SO','🇸🇴','Somalia','+252'],['ZA','🇿🇦','South Africa','+27'],['GS','🇬🇸','South Georgia and South Sandwich Islands','+500'],['SS','🇸🇸','South Sudan','+211'],['ES','🇪🇸','Spain','+34'],['LK','🇱🇰','Sri Lanka','+94'],['SD','🇸🇩','Sudan','+249'],['SR','🇸🇷','Suriname','+597'],['SJ','🇸🇯','Svalbard and Jan Mayen','+47'],['SE','🇸🇪','Sweden','+46'],['CH','🇨🇭','Switzerland','+41'],['SY','🇸🇾','Syria','+963'],['TW','🇹🇼','Taiwan','+886'],['TJ','🇹🇯','Tajikistan','+992'],['TZ','🇹🇿','Tanzania','+255'],['TH','🇹🇭','Thailand','+66'],['TL','🇹🇱','Timor-Leste','+670'],['TG','🇹🇬','Togo','+228'],['TK','🇹🇰','Tokelau','+690'],['TO','🇹🇴','Tonga','+676'],['TT','🇹🇹','Trinidad and Tobago','+1'],['TN','🇹🇳','Tunisia','+216'],['TR','🇹🇷','Türkiye','+90'],['TM','🇹🇲','Turkmenistan','+993'],['TC','🇹🇨','Turks and Caicos Islands','+1'],['TV','🇹🇻','Tuvalu','+688'],['UG','🇺🇬','Uganda','+256'],['UA','🇺🇦','Ukraine','+380'],['AE','🇦🇪','United Arab Emirates','+971'],['GB','🇬🇧','United Kingdom','+44'],['US','🇺🇸','United States','+1'],['UY','🇺🇾','Uruguay','+598'],['UZ','🇺🇿','Uzbekistan','+998'],['VU','🇻🇺','Vanuatu','+678'],['VA','🇻🇦','Vatican City','+39'],['VE','🇻🇪','Venezuela','+58'],['VN','🇻🇳','Vietnam','+84'],['VI','🇻🇮','U.S. Virgin Islands','+1'],['WF','🇼🇫','Wallis and Futuna','+681'],['EH','🇪🇭','Western Sahara','+212'],['YE','🇾🇪','Yemen','+967'],['ZM','🇿🇲','Zambia','+260'],['ZW','🇿🇼','Zimbabwe','+263'],
] as const;

type Country = (typeof countries)[number];

export default function CountryPhoneField() {
  const [countryIso, setCountryIso] = useState('IN');
  const [number, setNumber] = useState('');
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedCountry = countries.find(([iso]) => iso === countryIso) ?? countries.find(([iso]) => iso === 'IN')!;
  const countryCode = selectedCountry[3];
  const cleanNumber = number.replace(/\D/g, '');

  const filteredCountries = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return countries;
    return countries.filter(([iso, , name, code]) =>
      name.toLowerCase().includes(query) || iso.toLowerCase().includes(query) || code.includes(query),
    );
  }, [search]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const chooseCountry = (country: Country) => {
    setCountryIso(country[0]);
    setOpen(false);
    setSearch('');
  };

  return (
    <div ref={wrapperRef} className="min-w-0">
      <span className="mb-2 block text-sm font-semibold text-slate-800">Mobile Number</span>
      <div className="relative flex overflow-visible rounded-2xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50">
        <button type="button" onClick={() => setOpen((value) => !value)} aria-haspopup="listbox" aria-expanded={open} className="flex h-[56px] w-[128px] shrink-0 items-center justify-between gap-2 border-r border-slate-200 bg-transparent px-4 text-sm font-semibold text-slate-900 outline-none">
          <span className="truncate">{selectedCountry[0]} {countryCode}</span>
          <span className="text-slate-700">⌄</span>
        </button>

        <input required type="tel" inputMode="numeric" autoComplete="tel-national" value={number} onChange={(event) => setNumber(event.target.value.replace(/\D/g, '').slice(0, 15))} placeholder="Mobile number" aria-label="Mobile number" className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-slate-900 outline-none placeholder:text-slate-400" />

        {open && (
          <div className="absolute left-0 top-[62px] z-50 w-[300px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.18)]">
            <div className="border-b border-slate-100 p-3">
              <input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }} placeholder="Search country..." className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white" />
            </div>
            <div role="listbox" className="max-h-64 overflow-y-auto py-1">
              {filteredCountries.length > 0 ? filteredCountries.map(([iso, flag, name, code]) => (
                <button key={iso} type="button" role="option" aria-selected={iso === countryIso} onClick={() => chooseCountry([iso, flag, name, code])} className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-blue-50 ${iso === countryIso ? 'bg-blue-50/70' : ''}`}>
                  <span className="w-7 text-lg leading-none">{flag}</span>
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800">{name}</span>
                  <span className="shrink-0 text-sm font-bold text-slate-600">{code}</span>
                </button>
              )) : <p className="px-4 py-5 text-sm text-slate-500">No country found.</p>}
            </div>
          </div>
        )}
      </div>
      <input type="hidden" name="countryCode" value={countryCode} />
      <input type="hidden" name="phone" value={`${countryCode}${cleanNumber}`} />
      <p className="mt-2 text-xs text-slate-500">Select country code, then enter your mobile number.</p>
    </div>
  );
}
