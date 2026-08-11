'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, MapPin, Search } from 'lucide-react';
import { getAllStates, getDistricts } from 'india-state-district';

type LocationOption = {
  name: string;
  state: string;
  type: 'State / UT' | 'District';
};

// Build the searchable list from the package's documented state-code APIs.
// This avoids relying on the combined helper's internal data shape.
const locations: LocationOption[] = getAllStates().flatMap((state) => {
  const stateName = state?.name ?? '';
  const stateCode = state?.code ?? '';

  if (!stateName || !stateCode) return [];

  const districts = getDistricts(stateCode) ?? [];

  return [
    { name: stateName, state: stateName, type: 'State / UT' as const },
    ...districts
      .filter((district): district is string => typeof district === 'string' && district.trim().length > 0)
      .map((district) => ({
        name: district,
        state: stateName,
        type: 'District' as const,
      })),
  ];
});

const normalise = (value: string) => value.toLowerCase().trim().replace(/\s+/g, ' ');

export default function DestinationSearch() {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const query = normalise(value);
    if (!query) return [];

    return [...locations]
      .filter((location) => normalise(location.name).includes(query))
      .sort((a, b) => {
        const aStarts = normalise(a.name).startsWith(query) ? 0 : 1;
        const bStarts = normalise(b.name).startsWith(query) ? 0 : 1;
        if (aStarts !== bStarts) return aStarts - bStarts;
        if (a.type !== b.type) return a.type === 'State / UT' ? -1 : 1;
        return a.name.localeCompare(b.name);
      })
      .slice(0, 14);
  }, [value]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const selectLocation = (location: LocationOption) => {
    setValue(location.name);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <span className="mb-2 block text-sm font-semibold text-slate-800">Destination</span>

      <div className="relative">
        <Search size={18} className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400" />
        <input
          name="destination"
          type="text"
          value={value}
          autoComplete="off"
          placeholder="Search city, district or state..."
          onFocus={() => setOpen(Boolean(value.trim()))}
          onChange={(event) => {
            setValue(event.target.value);
            setOpen(Boolean(event.target.value.trim()));
          }}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
        />
      </div>

      {open && value.trim() && (
        <div className="absolute left-0 right-0 top-[76px] z-[60] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_22px_55px_rgba(15,23,42,0.16)]">
          <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Destinations matching “{value.trim()}”
          </div>

          <div className="max-h-80 overflow-y-auto py-1">
            {results.length > 0 ? (
              results.map((location) => (
                <button
                  key={`${location.type}-${location.state}-${location.name}`}
                  type="button"
                  onClick={() => selectLocation(location)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-blue-50"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    {location.type === 'State / UT' ? <MapPin size={17} /> : <Search size={16} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-slate-900">{location.name}</span>
                    <span className="block truncate text-xs text-slate-500">
                      {location.type === 'State / UT' ? 'State / Union Territory' : location.state}
                    </span>
                  </span>
                  {normalise(location.name).startsWith(normalise(value)) && (
                    <Check size={16} className="shrink-0 text-blue-700" />
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-7 text-center">
                <p className="text-sm font-semibold text-slate-700">No matching destination found.</p>
                <p className="mt-1 text-xs text-slate-500">You can still type the destination manually.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
