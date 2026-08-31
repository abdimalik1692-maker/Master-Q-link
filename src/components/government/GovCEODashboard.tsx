import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import {
  Building2,
  Users,
  Clock,
  Activity,
  CheckCircle2,
  AlertCircle,
  PauseCircle,
  PlayCircle,
  Search,
  Filter,
  BarChart3,
  Sparkles,
} from 'lucide-react';

export const GovCEODashboard: React.FC = () => {
  const {
    govServices,
    govBranches,
    govApplications,
    toggleGovServiceStatus,
  } = useQLINK();

  const [activeSearch, setActiveSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Aggregated KPIs
  const totalServices = govServices.length;
  const activeServices = govServices.filter((s) => s.status === 'Open').length;
  const totalBranches = govBranches.length;
  const totalApplications = govApplications.length;
  const pendingApplications = govApplications.filter((a) => a.status === 'Pending' || a.status === 'Under Review').length;
  const totalWaitingCitizens = govBranches.reduce((acc, b) => acc + b.currentQueue, 0);

  const filteredServices = govServices.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(activeSearch.toLowerCase()) || s.organizationName.toLowerCase().includes(activeSearch.toLowerCase());
    const matchesCat = categoryFilter === 'All' || s.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Executive Command Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1C1C1C] via-[#141414] to-[#0D0D0D] border border-[#2A2A2A] shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3.5 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F5D76E]">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
                COUNTY GOVERNMENT EXECUTIVE OVERSIGHT
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-0.5">
                County Public Administration Command
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-[#0A0A0A] text-[#22C55E] border border-[#222222] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              All 6 Sub-County Centers Connected
            </span>
          </div>
        </div>

        {/* Top KPI Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#242424]">
          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#202020]">
            <span className="text-[10px] text-[#888888] uppercase block font-semibold">Live Public Services</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-white">{activeServices}</span>
              <span className="text-xs text-[#888888]">/ {totalServices}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#202020]">
            <span className="text-[10px] text-[#888888] uppercase block font-semibold">Citizens in Branch Queues</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-[#F5D76E]">{totalWaitingCitizens}</span>
              <span className="text-xs text-[#888888]">waiting</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#202020]">
            <span className="text-[10px] text-[#888888] uppercase block font-semibold">Civil Applications Total</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-white">{totalApplications}</span>
              <span className="text-xs text-[#22C55E]">98.2% SLA</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#202020]">
            <span className="text-[10px] text-[#888888] uppercase block font-semibold">Pending Review Queue</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-[#EAB308]">{pendingApplications}</span>
              <span className="text-xs text-[#888888]">cases</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-County Processing Centers Live Table */}
      <div className="p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Sub-County Processing Branches</h2>
            <p className="text-xs text-[#888888]">Live queue counters, average wait times & counter utilization</p>
          </div>
          <span className="text-xs text-[#D4AF37] font-semibold">{totalBranches} Operating Centers</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {govBranches.map((branch) => (
            <div key={branch.id} className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#222222] space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">{branch.name}</h4>
                <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#22C55E]/15 text-[#22C55E]">
                  {branch.status}
                </span>
              </div>
              <p className="text-xs text-[#777777]">{branch.address}</p>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#1C1C1C] text-center text-xs">
                <div>
                  <span className="text-[#888888] block text-[10px]">Queue</span>
                  <span className="font-bold text-[#F5D76E]">{branch.currentQueue}</span>
                </div>
                <div>
                  <span className="text-[#888888] block text-[10px]">Wait</span>
                  <span className="font-bold text-white">{branch.avgWaitMinutes}m</span>
                </div>
                <div>
                  <span className="text-[#888888] block text-[10px]">Capacity</span>
                  <span className="font-bold text-[#22C55E]">{branch.capacityUtilization}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Government Services Catalog & Operational Toggles */}
      <div className="p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white">Published Public Services Management</h2>
            <p className="text-xs text-[#888888]">Enable, pause, or configure civil service intake pipelines</p>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search services..."
                value={activeSearch}
                onChange={(e) => setActiveSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-[#0A0A0A] border border-[#333333] rounded-lg text-xs text-white placeholder-[#666666] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#242424] text-[#888888] uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Service Name</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Operating Hours</th>
                <th className="py-3 px-3">Avg Wait</th>
                <th className="py-3 px-3">State</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C1C1C]">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-[#181818] transition-colors">
                  <td className="py-3 px-3 font-semibold text-white">
                    {service.name}
                    <span className="block text-[10px] text-[#777777]">{service.organizationName}</span>
                  </td>
                  <td className="py-3 px-3 text-[#CCCCCC]">{service.category}</td>
                  <td className="py-3 px-3 text-[#888888]">{service.operatingHours}</td>
                  <td className="py-3 px-3 text-[#F5D76E] font-mono">{service.avgWaitMinutes} mins</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        service.status === 'Open'
                          ? 'bg-[#22C55E]/15 text-[#22C55E]'
                          : 'bg-[#EF4444]/15 text-[#EF4444]'
                      }`}
                    >
                      ● {service.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => toggleGovServiceStatus(service.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1 ${
                        service.status === 'Open'
                          ? 'bg-[#2A1010] hover:bg-[#3D1414] text-[#EF4444] border border-[#EF4444]/30'
                          : 'bg-[#102A14] hover:bg-[#143D1A] text-[#22C55E] border border-[#22C55E]/30'
                      }`}
                    >
                      {service.status === 'Open' ? (
                        <>
                          <PauseCircle className="w-3.5 h-3.5" /> Pause
                        </>
                      ) : (
                        <>
                          <PlayCircle className="w-3.5 h-3.5" /> Activate
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
