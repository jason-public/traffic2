import React, { useState } from 'react';
import {
  REGIONAL_EXPRESS_BUSES,
  THANK_YOU_BUSES,
  M_BUSES,
  SMART_SHELTERS,
  TAXI_STANDS,
  TRANSPORT_OPERATORS
} from '../data/transitData';
import { Search, Bus, MapPin, Car, Building2, ArrowRight } from 'lucide-react';

export const SearchSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'bus' | 'shelter' | 'taxistand' | 'operator'>('all');

  const q = query.toLowerCase().trim();

  // Search Bus Routes
  const busResults = REGIONAL_EXPRESS_BUSES.filter(
    (b) =>
      !q ||
      b.routeNumber.toLowerCase().includes(q) ||
      b.origin.toLowerCase().includes(q) ||
      b.destination.toLowerCase().includes(q) ||
      b.region.toLowerCase().includes(q) ||
      b.operator.toLowerCase().includes(q)
  );

  const mbusResults = M_BUSES.filter(
    (m) =>
      !q ||
      m.routeNumber.toLowerCase().includes(q) ||
      m.origin.toLowerCase().includes(q) ||
      m.destination.toLowerCase().includes(q)
  );

  const thankYouResults = THANK_YOU_BUSES.filter(
    (t) =>
      !q ||
      t.routeNumber.toLowerCase().includes(q) ||
      t.origin.toLowerCase().includes(q) ||
      t.destination.toLowerCase().includes(q) ||
      t.region.toLowerCase().includes(q)
  );

  // Search Smart Shelters
  const shelterResults = SMART_SHELTERS.filter(
    (s) =>
      !q ||
      s.stopName.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q) ||
      s.region.toLowerCase().includes(q) ||
      s.stopNumber.includes(q)
  );

  // Search Taxi Stands
  const taxiStandResults = TAXI_STANDS.filter((ts) => !q || ts.location.toLowerCase().includes(q));

  // Search Operators
  const operatorResults = TRANSPORT_OPERATORS.filter(
    (op) =>
      !q ||
      op.name.toLowerCase().includes(q) ||
      op.representative.toLowerCase().includes(q) ||
      op.address.toLowerCase().includes(q) ||
      op.phone.includes(q)
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Search Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">통합 교통 검색 엔진</h2>
          <p className="text-xs text-slate-500">
            노선번호, 기종점, 정류장명, 스마트 승강장, 택시 승차대, 운수업체 명칭을 한번에 검색하세요.
          </p>
        </div>

        {/* Input Field */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="검색어를 입력하세요 (예: 1000, 잠실역, 호평동, 이마트, 대원운수...)"
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium transition"
          />
        </div>

        {/* Category Filters */}
        <div className="flex justify-center flex-wrap gap-2 text-xs pt-2">
          {[
            { id: 'all', label: '전체' },
            { id: 'bus', label: '버스 노선' },
            { id: 'shelter', label: '스마트 승강장' },
            { id: 'taxistand', label: '택시 승차대' },
            { id: 'operator', label: '운수업체' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                categoryFilter === cat.id ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {/* 1. Bus Routes */}
        {(categoryFilter === 'all' || categoryFilter === 'bus') && (
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
              <Bus className="w-5 h-5 text-rose-600" />
              <span>버스 노선 검색 결과 ({busResults.length + mbusResults.length + thankYouResults.length}건)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Regional Express */}
              {busResults.map((bus) => (
                <div key={bus.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1 hover:border-blue-300 transition">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-rose-700 font-mono text-sm">{bus.routeNumber}번</span>
                    <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-semibold">{bus.direction}</span>
                  </div>
                  <div className="text-xs text-slate-700 font-medium">
                    {bus.origin} ↔ {bus.destination} ({bus.busCount}대)
                  </div>
                  <span className="text-[10px] text-slate-400 block">{bus.region} / {bus.operator}</span>
                </div>
              ))}

              {/* Thank You Buses */}
              {thankYouResults.map((ty, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1 hover:border-blue-300 transition">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-pink-700 font-mono text-sm">{ty.routeNumber}</span>
                    <span className="text-[10px] bg-pink-100 text-pink-800 px-1.5 py-0.2 rounded font-semibold">땡큐버스</span>
                  </div>
                  <div className="text-xs text-slate-700 font-medium">
                    {ty.origin} ↔ {ty.destination} ({ty.busCount}대)
                  </div>
                  <span className="text-[10px] text-slate-400 block">{ty.region} / {ty.operator}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Smart Shelters */}
        {(categoryFilter === 'all' || categoryFilter === 'shelter') && (
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-teal-600" />
              <span>스마트 승강장 검색 결과 ({shelterResults.length}건)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {shelterResults.map((sh) => (
                <div key={sh.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1 hover:border-blue-300 transition">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900 text-xs">{sh.stopName}</span>
                    <span className="text-[10px] font-mono text-teal-800 font-bold">{sh.stopNumber}</span>
                  </div>
                  <p className="text-[11px] text-slate-600">{sh.address}</p>
                  <span className="text-[10px] text-slate-400 block font-mono">{sh.region} · {sh.installedYearMonth}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Taxi Stands */}
        {(categoryFilter === 'all' || categoryFilter === 'taxistand') && (
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
              <Car className="w-5 h-5 text-amber-600" />
              <span>택시 승차대 검색 결과 ({taxiStandResults.length}건)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {taxiStandResults.map((ts) => (
                <div key={ts.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1 hover:border-blue-300 transition">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900 text-xs">{ts.location}</span>
                    <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-semibold">{ts.type}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block font-mono">설치연도: {ts.installedYear}년</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Operators */}
        {(categoryFilter === 'all' || categoryFilter === 'operator') && (
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>운수업체 검색 결과 ({operatorResults.length}건)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {operatorResults.map((op, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1 hover:border-blue-300 transition">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900 text-xs">{op.name}</span>
                    <span className="text-[10px] bg-blue-100 text-blue-900 px-1.5 py-0.2 rounded font-semibold">{op.category}</span>
                  </div>
                  <p className="text-[11px] text-slate-600">{op.address}</p>
                  <span className="text-[11px] font-mono font-bold text-blue-700">☎ {op.phone}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
