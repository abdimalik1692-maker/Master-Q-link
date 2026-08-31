import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import {
  Search,
  Building2,
  Landmark,
  HeartPulse,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
} from 'lucide-react';

export const CustomerDiscover: React.FC = () => {
  const {
    govServices,
    banks,
    bankBranches,
    healthcareFacilities,
    healthcareDoctors,
    globalSearchQuery,
    setGlobalSearchQuery,
    setSelectedGovService,
    setSelectedBank,
    setSelectedHealthFacility,
    setSelectedDoctor,
    setCustomerTab,
  } = useQLINK();

  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Government' | 'Banking' | 'Healthcare'>('All');
  const [openNowOnly, setOpenNowOnly] = useState(false);

  const query = globalSearchQuery.toLowerCase();

  // Search Results
  const filteredGov = govServices.filter((s) => {
    const matchesQuery = s.name.toLowerCase().includes(query) || s.category.toLowerCase().includes(query) || s.description.toLowerCase().includes(query);
    const matchesCat = categoryFilter === 'All' || categoryFilter === 'Government';
    const matchesOpen = !openNowOnly || s.status === 'Open';
    return matchesQuery && matchesCat && matchesOpen;
  });

  const filteredBanks = banks.filter((b) => {
    const matchesQuery = b.name.toLowerCase().includes(query) || b.services.some((srv) => srv.toLowerCase().includes(query));
    const matchesCat = categoryFilter === 'All' || categoryFilter === 'Banking';
    return matchesQuery && matchesCat;
  });

  const filteredHealth = healthcareFacilities.filter((h) => {
    const matchesQuery = h.name.toLowerCase().includes(query) || h.departments.some((d) => d.toLowerCase().includes(query)) || h.location.toLowerCase().includes(query);
    const matchesCat = categoryFilter === 'All' || categoryFilter === 'Healthcare';
    const matchesOpen = !openNowOnly || h.isOpen;
    return matchesQuery && matchesCat && matchesOpen;
  });

  const filteredDoctors = healthcareDoctors.filter((d) => {
    const matchesQuery = d.name.toLowerCase().includes(query) || d.specialty.toLowerCase().includes(query) || d.departmentName.toLowerCase().includes(query);
    const matchesCat = categoryFilter === 'All' || categoryFilter === 'Healthcare';
    const matchesOpen = !openNowOnly || d.onDuty;
    return matchesQuery && matchesCat && matchesOpen;
  });

  const totalResultsCount = filteredGov.length + filteredBanks.length + filteredHealth.length + filteredDoctors.length;

  return (
    <div className="space-y-6 pb-12">
      {/* Search & Filter Header */}
      <div className="p-5 rounded-2xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white font-display">
            Universal Service Discovery
          </h1>
          <p className="text-xs text-[#888888]">
            Search across all County Government, Banking networks, Doctors, and Healthcare facilities.
          </p>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#888888] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            placeholder="Search by name, branch, service, doctor specialty, or symptom..."
            className="w-full pl-12 pr-4 py-3 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-sm text-white placeholder-[#666666] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#222222]">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-xs text-[#777777] font-semibold flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {(['All', 'Government', 'Banking', 'Healthcare'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-[#D4AF37] text-black font-bold shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                    : 'bg-[#1C1C1C] text-[#888888] hover:text-white hover:bg-[#252525] border border-[#2A2A2A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs text-[#CCCCCC] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={openNowOnly}
              onChange={(e) => setOpenNowOnly(e.target.checked)}
              className="accent-[#D4AF37] rounded"
            />
            <span>Open Now / On Duty Only</span>
          </label>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider">
          Search Results ({totalResultsCount})
        </span>
        {globalSearchQuery && (
          <span className="text-xs text-[#D4AF37]">
            Query: &ldquo;{globalSearchQuery}&rdquo;
          </span>
        )}
      </div>

      {totalResultsCount === 0 && (
        <div className="p-12 text-center rounded-2xl bg-[#141414] border border-[#242424]">
          <Search className="w-10 h-10 text-[#444444] mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No matching services found</h3>
          <p className="text-xs text-[#888888] mt-1 max-w-sm mx-auto">
            Try searching for &quot;ID&quot;, &quot;Birth Certificate&quot;, &quot;KCB&quot;, &quot;Dr. Amina&quot;, &quot;Aga Khan&quot;, or &quot;Teller&quot;.
          </p>
        </div>
      )}

      {/* 1. Government Results */}
      {filteredGov.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#F5D76E] uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-[#D4AF37]" />
            <span>Government Services ({filteredGov.length})</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredGov.map((service) => (
              <div
                key={service.id}
                onClick={() => {
                  setSelectedGovService(service);
                  setCustomerTab('gov_services');
                }}
                className="p-4 rounded-xl bg-[#141414] hover:bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#D4AF37]/50 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                      {service.category}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#F5D76E] transition-colors">
                      {service.name}
                    </h4>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#1C1C1C] text-[#22C55E] border border-[#2E2E2E]">
                    {service.status}
                  </span>
                </div>
                <p className="text-xs text-[#888888] mt-2 line-clamp-2">{service.description}</p>
                <div className="mt-3 pt-2.5 border-t border-[#222222] flex items-center justify-between text-xs text-[#CCCCCC]">
                  <span className="flex items-center gap-1 text-[11px] text-[#888888]">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {service.avgWaitMinutes} min avg wait
                  </span>
                  <span className="text-[#D4AF37] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Apply now <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Banking Results */}
      {filteredBanks.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#F5D76E] uppercase tracking-wider">
            <Landmark className="w-4 h-4 text-[#D4AF37]" />
            <span>Banks & Branches ({filteredBanks.length})</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredBanks.map((bank) => (
              <div
                key={bank.id}
                onClick={() => {
                  setSelectedBank(bank);
                  setCustomerTab('bank_services');
                }}
                className="p-4 rounded-xl bg-[#141414] hover:bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#D4AF37]/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img src={bank.logo} alt={bank.name} className="w-10 h-10 rounded-xl object-cover border border-[#333333]" />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white group-hover:text-[#F5D76E] transition-colors">{bank.name}</h4>
                      {bank.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />}
                    </div>
                    <span className="text-[11px] text-[#888888]">{bank.branchesCount} Branches registered</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {bank.services.slice(0, 3).map((srv, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#1C1C1C] text-[#AAAAAA] border border-[#282828]">
                      {srv}
                    </span>
                  ))}
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#222222] flex items-center justify-between text-xs">
                  <span className="text-[#888888] font-mono text-[11px]">{bank.activeQueues} Live Queues</span>
                  <span className="text-[#D4AF37] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Join Queue <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Healthcare Facilities & Doctors */}
      {(filteredHealth.length > 0 || filteredDoctors.length > 0) && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#F5D76E] uppercase tracking-wider">
            <HeartPulse className="w-4 h-4 text-[#D4AF37]" />
            <span>Healthcare Facilities & On-Duty Doctors</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Facilities */}
            {filteredHealth.map((facility) => (
              <div
                key={facility.id}
                onClick={() => {
                  setSelectedHealthFacility(facility);
                  setCustomerTab('health_services');
                }}
                className="p-4 rounded-xl bg-[#141414] hover:bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#D4AF37]/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img src={facility.logo} alt={facility.name} className="w-10 h-10 rounded-xl object-cover border border-[#333333]" />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white group-hover:text-[#F5D76E] transition-colors">{facility.name}</h4>
                      {facility.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />}
                    </div>
                    <span className="text-[11px] text-[#888888] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" /> {facility.location}
                    </span>
                  </div>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#222222] flex items-center justify-between text-xs">
                  <span className="text-[#22C55E] text-[11px] font-semibold">{facility.openingHours}</span>
                  <span className="text-[#D4AF37] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Book consultation <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}

            {/* Doctors */}
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                onClick={() => {
                  setSelectedDoctor(doc);
                  setCustomerTab('health_services');
                }}
                className="p-4 rounded-xl bg-[#141414] hover:bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#D4AF37]/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img src={doc.avatar} alt={doc.name} className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]/50" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white group-hover:text-[#F5D76E] transition-colors">{doc.name}</h4>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1C1C1C] text-[#D4AF37] font-bold">★ {doc.rating}</span>
                    </div>
                    <span className="text-[11px] text-[#D4AF37] block font-medium">{doc.specialty}</span>
                    <span className="text-[10px] text-[#777777]">{doc.facilityName}</span>
                  </div>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#222222] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#888888]">{doc.availableSlots[0] || 'Next slot available'}</span>
                  <span className="text-[#D4AF37] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Book Doctor <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
