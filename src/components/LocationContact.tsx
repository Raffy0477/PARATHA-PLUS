import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  Share2, 
  Navigation, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Sparkles,
  Calendar,
  Users
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const LocationContact: React.FC = () => {
  const [inquiryType, setInquiryType] = useState<'order' | 'table' | 'catering'>('table');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('4');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*Salam Paratha Plus (Faisal Road RYK)!* 🫓

*Type:* ${inquiryType.toUpperCase()}
*Name:* ${name}
*Phone:* ${phone}
${inquiryType === 'table' ? `*Guests / Family Members:* ${guests}\n*Date & Time:* ${date || 'Today'} at ${time || 'Evening'}\n` : ''}
*Message/Request:* ${note || 'Please confirm reservation/inquiry.'}

_Thank you!_`;

    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="location" className="py-20 bg-stone-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <MapPin className="w-3.5 h-3.5" />
            Visit & Connect
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-serif-title">
            Location & <span className="text-amber-500">Contact</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base">
            Located right in the culinary heart of Rahim Yar Khan on Faisal Road. Easy parking, family hall, and lightning-fast delivery across the city.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards & Social Links */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Primary Location Card */}
            <div className="bg-stone-950/90 rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-6 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Paratha Plus Restaurant
                  </h3>
                  <p className="text-sm text-stone-300 mt-1 leading-relaxed">
                    {RESTAURANT_INFO.address}
                  </p>
                  <p className="text-xs text-amber-400/90 mt-1 font-medium">
                    Landmark: {RESTAURANT_INFO.landmark}
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-stone-800">
                <div className="w-12 h-12 rounded-2xl bg-stone-900 text-amber-400 border border-stone-800 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">
                    Opening Hours
                  </h4>
                  <p className="text-xs text-stone-300">
                    <strong className="text-amber-400">Monday – Sunday:</strong> {RESTAURANT_INFO.hours.weekdays}
                  </p>
                  <p className="text-xs text-stone-400">
                    Hot Breakfast Nashta: {RESTAURANT_INFO.hours.breakfastHours}
                  </p>
                  <p className="text-xs text-stone-400">
                    Evening Chai & Late Night Dinner: {RESTAURANT_INFO.hours.teaAndDinner}
                  </p>
                </div>
              </div>

              {/* Contact Lines */}
              <div className="flex items-start gap-4 pt-4 border-t border-stone-800">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-white">
                    Phone & WhatsApp Hotline
                  </h4>
                  <div className="flex flex-wrap gap-4 text-xs">
                    <a
                      href={`tel:${RESTAURANT_INFO.phoneCall}`}
                      className="text-stone-300 hover:text-amber-400 font-semibold"
                    >
                      Call: {RESTAURANT_INFO.phoneDisplay}
                    </a>
                    <span className="text-stone-600">|</span>
                    <a
                      href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 font-bold"
                    >
                      WhatsApp: {RESTAURANT_INFO.whatsappDisplay}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('Salam Paratha Plus! I want to order food for home delivery on Faisal Road RYK.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct WhatsApp Order</span>
                </a>

                <a
                  href={RESTAURANT_INFO.socials.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/50 text-stone-200 font-semibold text-xs sm:text-sm py-3 rounded-xl transition-all"
                >
                  <Navigation className="w-4 h-4 text-amber-400" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Social Media Links */}
              <div className="pt-4 border-t border-stone-800">
                <p className="text-xs uppercase font-bold text-stone-400 tracking-wider mb-3">
                  Follow PARATHA PLUS on Social Media
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={RESTAURANT_INFO.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 text-xs font-semibold transition-all flex items-center gap-1.5"
                  >
                    <span>Facebook</span>
                  </a>

                  <a
                    href={RESTAURANT_INFO.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-pink-600/10 hover:bg-pink-600 text-pink-400 hover:text-white border border-pink-500/30 text-xs font-semibold transition-all flex items-center gap-1.5"
                  >
                    <span>Instagram</span>
                  </a>

                  <a
                    href={RESTAURANT_INFO.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-all flex items-center gap-1.5"
                  >
                    <span>TikTok</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Table Reservation & Quick Query Form */}
          <div className="lg:col-span-6">
            <div className="bg-stone-950/90 rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-white font-serif-title">
                  Table Reservation & Quick Query
                </h3>
                <p className="text-xs sm:text-sm text-stone-400">
                  Planning a family breakfast or dinner on Faisal Road? Reserve a table or request event catering.
                </p>
              </div>

              {/* Inquiry Type Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-stone-900 rounded-xl">
                {[
                  { key: 'table', label: 'Reserve Table' },
                  { key: 'order', label: 'Delivery Query' },
                  { key: 'catering', label: 'Bulk / Catering' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setInquiryType(tab.key as any)}
                    className={`py-2 text-xs font-bold rounded-lg transition-all ${
                      inquiryType === tab.key
                        ? 'bg-amber-500 text-stone-950 shadow-md'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSendInquiry} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-300">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Mehmood"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-300">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {inquiryType === 'table' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-300 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        Persons
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                      >
                        <option value="2">2 Persons</option>
                        <option value="4">4 Persons</option>
                        <option value="6">6 Persons</option>
                        <option value="8+">8+ Family Group</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-300 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-300 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        Time
                      </label>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-300">
                    Additional Notes / Requests
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Quiet family booth required, please arrange high chair, or specific timing..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-950/40 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Request to WhatsApp Hotline</span>
                </button>
              </form>

              {/* Map Preview Graphic */}
              <div className="rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 p-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Direct Navigation Link</p>
                    <p className="text-stone-400 text-[11px]">Open GPS coordinates in Google Maps</p>
                  </div>
                </div>
                <a
                  href={RESTAURANT_INFO.socials.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 font-bold underline"
                >
                  Open Maps
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
