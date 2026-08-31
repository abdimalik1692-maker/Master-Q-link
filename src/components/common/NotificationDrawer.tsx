import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import {
  X,
  CheckCheck,
  Building2,
  Landmark,
  HeartPulse,
  AlertTriangle,
  Calendar,
  Layers,
  ReceiptText,
  Shield,
  Bell,
} from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const {
    notifications,
    notificationDrawerOpen,
    setNotificationDrawerOpen,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setCustomerTab,
  } = useQLINK();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!notificationDrawerOpen) return null;

  const categories = ['All', 'Government', 'Banking', 'Healthcare', 'Emergency', 'Appointments', 'Queues', 'Billing', 'Security'];

  const filtered = selectedCategory === 'All'
    ? notifications
    : notifications.filter((n) => n.category.toLowerCase() === selectedCategory.toLowerCase());

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Government':
        return <Building2 className="w-4 h-4 text-[#D4AF37]" />;
      case 'Banking':
        return <Landmark className="w-4 h-4 text-[#D4AF37]" />;
      case 'Healthcare':
        return <HeartPulse className="w-4 h-4 text-[#D4AF37]" />;
      case 'Emergency':
        return <AlertTriangle className="w-4 h-4 text-[#EF4444]" />;
      case 'Appointments':
        return <Calendar className="w-4 h-4 text-[#F5D76E]" />;
      case 'Queues':
        return <Layers className="w-4 h-4 text-[#F5D76E]" />;
      case 'Billing':
        return <ReceiptText className="w-4 h-4 text-[#D4AF37]" />;
      default:
        return <Shield className="w-4 h-4 text-[#AAAAAA]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setNotificationDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside aria-label="Notifications panel" className="w-screen max-w-md bg-[#121212] border-l border-[#D4AF37]/30 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#2A2A2A] bg-[#161616] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F5D76E]">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Unified Notifications</h2>
                <p className="text-xs text-[#888888]">Real-time updates across all services</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={markAllNotificationsAsRead}
                className="p-1.5 rounded-lg bg-[#1F1F1F] hover:bg-[#282828] text-xs text-[#D4AF37] hover:text-[#F5D76E] transition-colors flex items-center gap-1 px-2.5 border border-[#2A2A2A]"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mark read</span>
              </button>
              <button
                onClick={() => setNotificationDrawerOpen(false)}
                className="p-1.5 rounded-lg bg-[#1F1F1F] hover:bg-[#282828] text-[#888888] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="p-3 border-b border-[#242424] bg-[#0E0E0E] overflow-x-auto flex gap-1.5 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#D4AF37] text-black font-bold shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                    : 'bg-[#181818] text-[#888888] hover:text-white hover:bg-[#222222] border border-[#2A2A2A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Notification Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filtered.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6">
                <Bell className="w-10 h-10 text-[#333333] mb-2" />
                <p className="text-sm font-semibold text-[#888888]">No notifications in this category</p>
                <p className="text-xs text-[#555555] mt-1">Updates from Government, Banks, and Hospitals will show here</p>
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    markNotificationAsRead(item.id);
                    if (item.category === 'Government' || item.category === 'Appointments' || item.category === 'Queues') {
                      setCustomerTab('my_qlink');
                    }
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    item.read
                      ? 'bg-[#161616] border-[#242424] opacity-80 hover:opacity-100 hover:border-[#333333]'
                      : 'bg-[#1A1A1A] border-[#D4AF37]/40 shadow-[0_0_12px_rgba(212,175,55,0.08)] hover:border-[#D4AF37]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#222222] border border-[#2E2E2E] mt-0.5">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-[#D4AF37] truncate uppercase tracking-wider">
                          {item.organizationName}
                        </span>
                        <span className="text-[10px] text-[#777777] whitespace-nowrap">{item.time}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5">{item.title}</h4>
                      <p className="text-xs text-[#CCCCCC] mt-1 leading-relaxed">{item.message}</p>

                      {item.relatedId && (
                        <div className="mt-2 flex items-center justify-between pt-2 border-t border-[#252525]">
                          <span className="text-[10px] font-mono text-[#888888]">Ref: {item.relatedId}</span>
                          <span className="text-[10px] text-[#F5D76E] font-semibold hover:underline">
                            View details →
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-[#242424] bg-[#0E0E0E] text-center">
            <p className="text-[11px] text-[#666666]">
              Push notifications powered by QLINK High-Speed Event Bus
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
