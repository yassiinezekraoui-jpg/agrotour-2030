import React, { useMemo, useState } from 'react';
import {
  Sprout,
  MapPin,
  Award,
  Sparkles,
  Heart,
  Calendar,
  Languages,
  Menu,
  X,
  CheckCircle2,
  Send,
  ChevronRight,
  Star,
  Compass,
  Globe2,
  Clock3,
  ArrowRight,
  ShieldCheck,
  Leaf,
} from 'lucide-react';

const TRANSLATIONS = {
  ar: {
    tagline: 'السياحة الفلاحية والريفيّة بالمغرب',
    exploreHeading: 'استكشف التجارب',
    interactiveMapTitle: 'الخريطة التفاعلية',
    aiAdvisorBtn: 'المستشار الذكي',
    savedWishlist: 'المفضلة',
    myBookings: 'حجوزاتي',
    hostFarmBtn: 'أضف مزرعتك',
    bookNow: 'حجز الآن',
    visionTitle: 'رؤية المغرب 2030',
    visionDesc: 'تطوير السياحة القروية المستدامة وتمكين صغار الفلاحين قبيل الاستحقاقات الرياضية والدولية الكبرى.',
    aiTitle: 'المستشار الذكي للسياحة الفلاحية',
    aiPlaceholder: 'اطرح سؤالاً عن أفضل المزارع أو المسارات الفلاحية...',
    heroTitle: 'استكشف المزارع والأرياف المغربية',
    heroSubtitle: 'اكتشف تجارب فلاحية أصيلة تجمع بين الثقافة، الأرض، والضيافة المغربية.',
    all: 'الكل',
    regions: 'المناطق',
    liveExperiences: 'تجارب مباشرة',
    guestReviews: 'تقييمات الضيوف',
    ruralImpact: 'الأثر القروي',
    filters: 'الفلاتر',
    searchPlaceholder: 'بحث في التجارب...',
    mapSubtitle: 'رحلة مغربية من الحقل إلى المائدة وبصمة ثقافية أصيلة.',
    confirmBooking: 'تأكيد الحجز',
    selectDate: 'اختر التاريخ',
    hostTitle: 'انضم إلى شبكة AgroTour',
    discover: 'اكتشف أكثر',
    trusted: 'موثوق من قبل 12,000+ زائر',
  },
  fr: {
    tagline: 'Agrotourisme & Expériences Rurales au Maroc',
    exploreHeading: 'Explorer les Expériences',
    interactiveMapTitle: 'Carte Interactive',
    aiAdvisorBtn: 'Conseiller IA',
    savedWishlist: 'Favoris',
    myBookings: 'Mes Réservations',
    hostFarmBtn: 'Héberger une Ferme',
    bookNow: 'Réserver',
    visionTitle: 'Vision Maroc 2030',
    visionDesc: 'Développement du tourisme rural durable et autonomisation des petits agriculteurs.',
    aiTitle: 'Conseiller IA Agrotourisme',
    aiPlaceholder: 'Posez une question sur les meilleures fermes ou itinéraires...',
    heroTitle: 'Découvrez les fermes et campagnes du Maroc',
    heroSubtitle: 'Expériences rurales authentiques où culture, terroir et accueil marocain se rencontrent.',
    all: 'Tout',
    regions: 'Régions',
    liveExperiences: 'Expériences actives',
    guestReviews: 'Avis visiteurs',
    ruralImpact: 'Impact rural',
    filters: 'Filtres',
    searchPlaceholder: 'Rechercher une expérience...',
    mapSubtitle: 'Un voyage marocain du champ à la table, sans perdre l’âme du terroir.',
    confirmBooking: 'Confirmer la réservation',
    selectDate: 'Choisir une date',
    hostTitle: 'Rejoignez le réseau AgroTour',
    discover: 'Découvrir',
    trusted: 'Approuvé par plus de 12 000 voyageurs',
  },
  en: {
    tagline: 'Agritourism & Rural Experiences in Morocco',
    exploreHeading: 'Explore Experiences',
    interactiveMapTitle: 'Interactive Map',
    aiAdvisorBtn: 'AI Advisor',
    savedWishlist: 'Wishlist',
    myBookings: 'My Bookings',
    hostFarmBtn: 'Host Your Farm',
    bookNow: 'Book Now',
    visionTitle: 'Morocco 2030 Vision',
    visionDesc: 'Developing sustainable rural tourism and empowering local farmers for global events.',
    aiTitle: 'Agritourism AI Advisor',
    aiPlaceholder: 'Ask a question about top farms or rural routes...',
    heroTitle: 'Discover Morocco’s farms and countryside',
    heroSubtitle: 'Immerse yourself in authentic rural experiences shaped by culture, craft, and warm hospitality.',
    all: 'All',
    regions: 'Regions',
    liveExperiences: 'Live experiences',
    guestReviews: 'Guest reviews',
    ruralImpact: 'Rural impact',
    filters: 'Filters',
    searchPlaceholder: 'Search experiences...',
    mapSubtitle: 'A Moroccan journey from the field to the table, with soul and authenticity.',
    confirmBooking: 'Confirm booking',
    selectDate: 'Choose date',
    hostTitle: 'Join the AgroTour network',
    discover: 'Discover more',
    trusted: 'Trusted by 12,000+ travelers',
  },
};

const SAMPLE_EXPERIENCES = [
  {
    id: 1,
    title: { ar: 'قطاف الزيتون وتذوق الزيت البكر', fr: "Cueillette d'Olives & Dégustation", en: 'Olive Harvesting & Oil Tasting' },
    region: 'Fès-Meknès',
    city: 'Fès',
    duration: 'Half-day',
    priceMAD: 350,
    priceEUR: 35,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 2,
    title: { ar: 'ورشة إعداد الأرغان العضوي', fr: "Atelier d'Huile d'Argan Bio", en: 'Organic Argan Workshop' },
    region: 'Souss-Massa',
    city: 'Agadir',
    duration: '2 hours',
    priceMAD: 450,
    priceEUR: 45,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 3,
    title: { ar: 'جولة قطاف الزعفران الحر', fr: 'Route du Safran de Taliouine', en: 'Saffron Trail & Farm Visit' },
    region: 'Taliouine',
    city: 'Taroudant',
    duration: 'Full day',
    priceMAD: 500,
    priceEUR: 50,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 4,
    title: { ar: 'رحلة المزرعة العائلية', fr: 'Aventure Ferme Familiale', en: 'Family Farm Adventure' },
    region: 'Atlas',
    city: 'Imlil',
    duration: 'Full day',
    priceMAD: 620,
    priceEUR: 62,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=600',
  },
];

const MAP_POINTS = [
  { region: 'Fès-Meknès', x: 42, y: 34 },
  { region: 'Souss-Massa', x: 58, y: 72 },
  { region: 'Taliouine', x: 46, y: 68 },
  { region: 'Atlas', x: 39, y: 49 },
];

const ThreeDIcon = ({ name, size = 20, animate = false }) => {
  const base = 'transition-transform duration-300';
  const pulse = animate ? 'animate-pulse' : '';
  switch (name) {
    case 'sprout': return <Sprout size={size} className={`${base} ${pulse} text-emerald-400`} />;
    case 'pin': return <MapPin size={size} className={`${base} ${pulse} text-amber-500`} />;
    case 'trophy': return <Award size={size} className={`${base} ${pulse} text-yellow-500`} />;
    case 'sparkles': return <Sparkles size={size} className={`${base} ${pulse} text-amber-600`} />;
    case 'heart': return <Heart size={size} className={`${base} ${pulse} text-red-500`} />;
    case 'calendar': return <Calendar size={size} className={`${base} ${pulse} text-emerald-600`} />;
    case 'wheat': return <Sprout size={size} className={`${base} ${pulse} text-amber-300`} />;
    case 'globe': return <Globe2 size={size} className={`${base} ${pulse} text-emerald-500`} />;
    case 'compass': return <Compass size={size} className={`${base} ${pulse} text-amber-500`} />;
    case 'leaf': return <Leaf size={size} className={`${base} ${pulse} text-emerald-500`} />;
    default: return <Sprout size={size} className={`${base} ${pulse}`} />;
  }
};

const GateSwitcher = ({ currentGate, onGateChange }) => (
  <div className="flex bg-[#EFE8DD] rounded-xl p-0.5 text-xs font-bold text-[#445447] border border-[#E0D5C7]">
    {['visitor', 'farmer', 'investor'].map((gate) => (
      <button
        key={gate}
        onClick={() => onGateChange(gate)}
        className={`px-2 py-1 rounded-lg capitalize transition-all cursor-pointer ${currentGate === gate ? 'bg-white shadow-xs text-[#1E2A22]' : 'hover:text-[#1E2A22]'}`}
      >
        {gate}
      </button>
    ))}
  </div>
);

const Navbar = ({ currentLanguage, onLanguageChange, currentCurrency, onCurrencyChange, wishlistCount, bookingsCount, onOpenWishlist, onOpenBookings, onOpenHostModal, onOpenAiAdvisor, onScrollToSection, currentGate, onGateChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLanguage];
  const languages = [
    { code: 'ar', label: 'العربية (المغرب)', flag: '🇲🇦' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-xl border-b border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => onScrollToSection('hero')}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#35662E] via-[#2D5A27] to-[#173014] flex items-center justify-center shadow-[0_4px_12px_rgba(45,90,39,0.35)] text-white border-t border-white/30 border-b-2 border-b-[#122410] ring-1 ring-[#E5A93C]/40">
              <ThreeDIcon name="sprout" size={32} animate />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-[#1E2A22] tracking-tight">AgroTour</span>
                <span className="font-bold text-sm px-2 py-0.5 rounded-lg bg-[#C85A32]/10 text-[#B34A26] border border-[#C85A32]/20 shadow-xs">2030</span>
              </div>
              <span className="text-xs text-[#5C6E61] font-medium hidden sm:inline">{t.tagline}</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#2E3D32]">
            <button onClick={() => onScrollToSection('experiences')} className="hover:text-[#B34A26] transition-colors flex items-center gap-2 font-bold cursor-pointer"><ThreeDIcon name="sprout" size={18} /><span>{t.exploreHeading}</span></button>
            <button onClick={() => onScrollToSection('interactive-map')} className="hover:text-[#B34A26] transition-colors flex items-center gap-2 font-bold cursor-pointer"><ThreeDIcon name="pin" size={18} /><span>{t.interactiveMapTitle}</span></button>
            <button onClick={() => onScrollToSection('vision-2030')} className="hover:text-[#B34A26] transition-colors flex items-center gap-2 font-bold cursor-pointer"><ThreeDIcon name="trophy" size={18} /><span>{t.visionTitle}</span></button>
            <button onClick={onOpenAiAdvisor} className="hover:text-[#B34A26] transition-colors flex items-center gap-2 text-[#B34A26] bg-[#C85A32]/10 px-3.5 py-1.5 rounded-xl border border-[#C85A32]/20 hover:bg-[#C85A32]/20 font-bold cursor-pointer shadow-xs"><ThreeDIcon name="sparkles" size={18} /><span>{t.aiAdvisorBtn}</span></button>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {currentGate && onGateChange && <GateSwitcher currentGate={currentGate} onGateChange={onGateChange} />}
            <div className="flex items-center bg-[#EFE8DD] rounded-xl p-0.5 text-xs font-bold text-[#445447] border border-[#E0D5C7]">
              <button onClick={() => onCurrencyChange('MAD')} className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${currentCurrency === 'MAD' ? 'bg-white shadow-xs text-[#1E2A22]' : 'hover:text-[#1E2A22]'}`}>MAD</button>
              <button onClick={() => onCurrencyChange('EUR')} className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${currentCurrency === 'EUR' ? 'bg-white shadow-xs text-[#1E2A22]' : 'hover:text-[#1E2A22]'}`}>EUR</button>
            </div>
            <div className="relative">
              <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EFE8DD] hover:bg-[#E7DED0] rounded-xl text-xs font-bold text-[#2E3D32] transition-colors border border-[#E0D5C7] cursor-pointer">
                <Languages className="w-3.5 h-3.5 text-[#5C6E61]" />
                <span>{languages.find((l) => l.code === currentLanguage)?.flag} {currentLanguage.toUpperCase()}</span>
              </button>
              {langMenuOpen && (
                <div className={`absolute mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#E8DFD3] py-1 z-50 ${currentLanguage === 'ar' ? 'left-0' : 'right-0'}`}>
                  {languages.map((lang) => (
                    <button key={lang.code} onClick={() => { onLanguageChange(lang.code); setLangMenuOpen(false); }} className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${currentLanguage === lang.code ? 'bg-[#F4EFEA] text-[#B34A26] font-bold' : 'text-[#3E4F42] hover:bg-stone-50'}`}>
                      <span className="flex items-center gap-2"><span>{lang.flag}</span><span>{lang.label}</span></span>
                      {currentLanguage === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-[#B34A26]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={onOpenWishlist} className="relative p-2 rounded-xl bg-[#EFE8DD] hover:bg-[#E7DED0] text-[#2E3D32] transition-colors border border-[#E0D5C7] cursor-pointer"><ThreeDIcon name="heart" size={20} />{wishlistCount > 0 && <span className="absolute -top-1.5 -right-1.5 bg-[#C85A32] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">{wishlistCount}</span>}</button>
            <button onClick={onOpenBookings} className="relative flex items-center gap-2 px-3 py-1.5 bg-[#EFE8DD] hover:bg-[#E7DED0] rounded-xl text-xs font-bold text-[#2E3D32] transition-colors border border-[#E0D5C7] cursor-pointer"><ThreeDIcon name="calendar" size={18} /><span>{t.myBookings}</span>{bookingsCount > 0 && <span className="bg-[#2D5A27] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">{bookingsCount}</span>}</button>
            <button onClick={onOpenHostModal} className="flex items-center gap-2 px-4 py-2 bg-[#2D5A27] hover:bg-[#23471e] text-white text-xs font-black rounded-xl shadow-[0_3px_0_#173014] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"><ThreeDIcon name="wheat" size={18} animate /><span>{t.hostFarmBtn}</span></button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg bg-[#EFE8DD] text-[#2E3D32]">{mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
          </div>
        </div>
      </div>
    </header>
  );
};

function App() {
  const [language, setLanguage] = useState('ar');
  const [currency, setCurrency] = useState('MAD');
  const [userGate, setUserGate] = useState('visitor');
  const [wishlist, setWishlist] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedExperienceId, setSelectedExperienceId] = useState(1);
  const [query, setQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { from: 'assistant', text: 'Bonjour ! Je peux vous recommander une expérience selon la région, le budget et le niveau d’aventure.' },
  ]);

  const t = TRANSLATIONS[language];
  const regions = ['all', ...new Set(SAMPLE_EXPERIENCES.map((item) => item.region))];
  const filteredExperiences = useMemo(() => {
    return SAMPLE_EXPERIENCES.filter((exp) => {
      const matchesRegion = selectedRegion === 'all' || exp.region === selectedRegion;
      const matchesQuery = `${exp.title[language]} ${exp.region} ${exp.city}`.toLowerCase().includes(query.toLowerCase());
      return matchesRegion && matchesQuery;
    });
  }, [selectedRegion, query, language]);

  const selectedExperience = SAMPLE_EXPERIENCES.find((exp) => exp.id === selectedExperienceId) || SAMPLE_EXPERIENCES[0];

  const toggleWishlist = (id) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const addBooking = (id) => {
    if (!bookings.includes(id)) setBookings((prev) => [...prev, id]);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const onAskAi = () => {
    const trimmed = chatInput.trim();
    if (!trimmed) return;
    setChatMessages((prev) => [...prev, { from: 'user', text: trimmed }]);
    const reply = `Pour ${selectedExperience.title[language]}, je recommande de réserver le matin pour profiter du meilleur climat et d’une immersion plus authentique.`;
    setChatMessages((prev) => [...prev, { from: 'assistant', text: reply }]);
    setChatInput('');
  };

  const onBookExperience = () => {
    addBooking(selectedExperience.id);
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2E3D32]" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar currentLanguage={language} onLanguageChange={setLanguage} currentCurrency={currency} onCurrencyChange={setCurrency} wishlistCount={wishlist.length} bookingsCount={bookings.length} onOpenWishlist={() => setActiveModal('wishlist')} onOpenBookings={() => setActiveModal('bookings')} onOpenHostModal={() => setActiveModal('host')} onOpenAiAdvisor={() => setActiveModal('ai')} onScrollToSection={scrollToSection} currentGate={userGate} onGateChange={setUserGate} />

      <main>
        <section id="hero" className="max-w-7xl mx-auto px-4 py-10 sm:py-14 lg:py-16">
          <div className="rounded-[32px] bg-[radial-gradient(circle_at_top_left,_#f4efe7,_#f8f2ea_38%,_#eff7ec_100%)] border border-[#E8DFD3] p-6 sm:p-10 shadow-[0_30px_80px_rgba(33,47,34,0.08)] overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D9C7A7] bg-white/75 px-3 py-1.5 text-xs font-bold text-[#2D5A27] shadow-sm">
                  <ThreeDIcon name="leaf" size={14} />
                  <span>{t.trusted}</span>
                </div>
                <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black text-[#1E2A22] tracking-[-0.04em] leading-[0.98]">
                  {t.heroTitle}
                </h1>
                <p className="mt-4 text-lg text-[#5C6E61] max-w-xl">{t.heroSubtitle}</p>

                <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <button onClick={() => setActiveModal('ai')} className="flex items-center justify-center gap-2 bg-[#2D5A27] text-white px-5 py-3 rounded-2xl font-bold shadow-[0_6px_0_#173014] active:translate-y-1 transition-all">
                    <Sparkles size={18} /> {t.aiAdvisorBtn}
                  </button>
                  <button onClick={() => scrollToSection('experiences')} className="flex items-center justify-center gap-2 border border-[#D9C3A3] bg-white px-5 py-3 rounded-2xl font-bold text-[#2E3D32] shadow-sm">
                    {t.discover} <ArrowRight size={18} />
                  </button>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl">
                  <div className="rounded-2xl border border-[#E7D7C0] bg-white/70 p-3">
                    <div className="flex items-center gap-2 text-[#2D5A27] font-black text-xl"><ShieldCheck size={18} /> 4.8</div>
                    <div className="text-[11px] text-[#5C6E61] mt-1">{t.guestReviews}</div>
                  </div>
                  <div className="rounded-2xl border border-[#E7D7C0] bg-white/70 p-3">
                    <div className="flex items-center gap-2 text-[#2D5A27] font-black text-xl"><ThreeDIcon name="compass" size={18} /> 120+</div>
                    <div className="text-[11px] text-[#5C6E61] mt-1">{t.liveExperiences}</div>
                  </div>
                  <div className="rounded-2xl border border-[#E7D7C0] bg-white/70 p-3">
                    <div className="flex items-center gap-2 text-[#2D5A27] font-black text-xl"><ThreeDIcon name="leaf" size={18} /> 85%</div>
                    <div className="text-[11px] text-[#5C6E61] mt-1">{t.ruralImpact}</div>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-lg">
                <div className="relative rounded-[28px] border border-[#E8DFD3] bg-white p-4 shadow-[0_18px_45px_rgba(32,51,42,0.08)]">
                  <div className="absolute -top-4 -right-4 bg-[#E5A93C]/20 text-[#7b4e00] rounded-full px-3 py-1 text-[10px] font-black border border-[#E5A93C]/40">Morocco 2030</div>
                  <img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=900" alt="Moroccan countryside" className="h-[380px] w-full object-cover rounded-[20px]" />
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="bg-[#F9F3EC] rounded-2xl p-3 text-center">
                      <div className="text-xl font-black text-[#2D5A27]">120+</div>
                      <div className="text-[10px] text-[#5C6E61]">{t.liveExperiences}</div>
                    </div>
                    <div className="bg-[#F9F3EC] rounded-2xl p-3 text-center">
                      <div className="text-xl font-black text-[#2D5A27]">4.8</div>
                      <div className="text-[10px] text-[#5C6E61]">{t.guestReviews}</div>
                    </div>
                    <div className="bg-[#F9F3EC] rounded-2xl p-3 text-center">
                      <div className="text-xl font-black text-[#2D5A27]">85%</div>
                      <div className="text-[10px] text-[#5C6E61]">{t.ruralImpact}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="experiences" className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#7a6d57] font-bold">{t.filters}</p>
              <h2 className="text-3xl font-black mt-1">{t.exploreHeading}</h2>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full md:w-72 border border-[#E0D5C7] rounded-xl px-3 py-2.5 text-sm bg-white shadow-sm"
              />
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {regions.map((regionItem) => {
              const label = regionItem === 'all' ? t.all : regionItem;
              const active = selectedRegion === regionItem;
              return (
                <button
                  key={regionItem}
                  onClick={() => setSelectedRegion(regionItem)}
                  className={`px-3 py-2 rounded-full text-xs font-bold transition-colors ${active ? 'bg-[#2D5A27] text-white shadow-md' : 'bg-[#EFE8DD] text-[#2E3D32] border border-[#E0D5C7]'}`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {filteredExperiences.map((exp) => (
              <article key={exp.id} className="bg-white rounded-[28px] overflow-hidden shadow-[0_12px_40px_rgba(19,31,24,0.05)] border border-[#E8DFD3] flex flex-col justify-between group hover:-translate-y-1 transition-all duration-200">
                <div>
                  <div className="relative">
                    <img src={exp.image} alt={exp.title[language]} className="w-full h-56 object-cover" />
                    <button onClick={() => toggleWishlist(exp.id)} className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm border border-[#E0D5C7] hover:scale-105 transition-transform">
                      <Heart size={16} fill={wishlist.includes(exp.id) ? 'currentColor' : 'none'} className={wishlist.includes(exp.id) ? 'text-red-500' : 'text-[#2E3D32]'} />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between text-[11px] text-[#5C6E61] mb-2">
                      <span className="rounded-full bg-[#C85A32]/10 text-[#B34A26] px-2 py-1 font-bold">{exp.region}</span>
                      <span className="flex items-center gap-1 font-bold"><Star size={12} fill="#F5B948" className="text-[#F5B948]" /> {exp.rating}</span>
                    </div>
                    <h3 className="font-bold text-lg leading-snug text-[#1E2A22]">{exp.title[language]}</h3>
                    <div className="mt-3 flex items-center justify-between text-xs text-[#5C6E61]">
                      <span className="flex items-center gap-1"><MapPin size={12} /> {exp.city}</span>
                      <span className="flex items-center gap-1"><Clock3 size={12} /> {exp.duration}</span>
                    </div>
                    <p className="text-base font-black text-[#2D5A27] mt-4">{currency === 'MAD' ? `${exp.priceMAD} MAD` : `${exp.priceEUR} €`}</p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <button onClick={() => { setSelectedExperienceId(exp.id); setActiveModal('booking'); }} className="w-full flex items-center justify-center gap-2 bg-[#2D5A27] text-white font-bold py-3 rounded-xl text-xs shadow-[0_4px_0_#173014] active:translate-y-1 transition-all">
                    <CheckCircle2 size={14} /> {t.bookNow}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="interactive-map" className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-[#EFE8DD] border border-[#E0D5C7] rounded-[32px] p-6 sm:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#7a6d57] font-bold">Discovery</p>
                <h3 className="text-3xl font-black mt-1">{t.interactiveMapTitle}</h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#5C6E61]">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#2D5A27]" /> Landmark routes</span>
              </div>
            </div>
            <div className="relative h-[320px] rounded-[28px] overflow-hidden border border-[#E0D5C7] bg-[radial-gradient(circle_at_top,_#f8f1e7,_#efe4d4_48%,_#e0d0b2_100%)]">
              <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'linear-gradient(rgba(45,90,39,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(45,90,39,0.09) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
              {MAP_POINTS.map((point) => (
                <button key={point.region} onClick={() => setSelectedRegion(point.region)} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: `${point.x}%`, top: `${point.y}%` }}>
                  <span className="w-4 h-4 rounded-full bg-[#2D5A27] border-4 border-white shadow-lg" />
                  <span className="mt-2 rounded-full bg-white/90 border border-[#E0D5C7] px-2 py-1 text-[10px] font-bold text-[#2E3D32] shadow-sm">{point.region}</span>
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-[#5C6E61]">{t.mapSubtitle}</p>
          </div>
        </section>

        <section id="vision-2030" className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-[#2D5A27] to-[#173014] text-white rounded-[32px] p-8 sm:p-12 shadow-[0_18px_50px_rgba(23,48,20,0.3)]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-200 font-bold">Morocco 2030</p>
                <h2 className="text-3xl font-black mt-2">{t.visionTitle}</h2>
                <p className="text-emerald-100 max-w-xl mt-3">{t.visionDesc}</p>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold bg-white/10 border border-white/15 rounded-2xl px-4 py-3">
                <ThreeDIcon name="trophy" size={20} />
                <span>Morocco 2030</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {activeModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 p-1 rounded-full bg-stone-100"><X size={18} /></button>

            {activeModal === 'ai' && (
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4"><Sparkles className="text-[#C85A32]" /> {t.aiTitle}</h3>
                <div className="bg-[#FAF7F2] p-4 rounded-xl text-xs space-y-3 mb-4 max-h-52 overflow-auto">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`rounded-xl px-3 py-2 ${msg.from === 'assistant' ? 'bg-white border border-[#E8DFD3]' : 'bg-[#EAF4E7] ml-auto max-w-[85%]'}`}>
                      {msg.text}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onAskAi()} type="text" placeholder={t.aiPlaceholder} className="flex-1 border border-[#E0D5C7] rounded-xl px-3 py-2 text-xs" />
                  <button onClick={onAskAi} className="bg-[#2D5A27] text-white p-2 rounded-xl"><Send size={16} /></button>
                </div>
              </div>
            )}

            {activeModal === 'host' && (
              <div>
                <h3 className="text-lg font-bold mb-4">{t.hostTitle}</h3>
                <p className="text-xs text-[#5C6E61] mb-4">Join the AgroTour network and showcase your land, craft, and hospitality to travelers seeking authentic rural experiences.</p>
                <input type="text" placeholder="Nom de la ferme / Farm Name" className="w-full border border-[#E0D5C7] rounded-xl px-3 py-2 text-xs mb-3" />
                <button onClick={() => setActiveModal(null)} className="w-full bg-[#2D5A27] text-white font-bold py-2 rounded-xl text-xs">Envoyer la demande</button>
              </div>
            )}

            {activeModal === 'booking' && (
              <div>
                <h3 className="text-lg font-bold mb-4">{t.confirmBooking}</h3>
                <div className="rounded-2xl border border-[#E8DFD3] overflow-hidden bg-[#FAF7F2] mb-4">
                  <img src={selectedExperience.image} alt={selectedExperience.title[language]} className="h-32 w-full object-cover" />
                  <div className="p-3">
                    <p className="font-bold text-[#2E3D32]">{selectedExperience.title[language]}</p>
                    <p className="text-xs text-[#5C6E61] mt-1">{selectedExperience.region}</p>
                    <p className="text-sm font-black text-[#2D5A27] mt-2">{currency === 'MAD' ? `${selectedExperience.priceMAD} MAD` : `${selectedExperience.priceEUR} €`}</p>
                  </div>
                </div>
                <label className="block text-xs font-bold text-[#2E3D32] mb-2">{t.selectDate}</label>
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full border border-[#E0D5C7] rounded-xl px-3 py-2 text-xs mb-4" />
                <button onClick={onBookExperience} className="w-full bg-[#2D5A27] text-white font-bold py-2 rounded-xl text-xs">{t.confirmBooking}</button>
              </div>
            )}

            {(activeModal === 'wishlist' || activeModal === 'bookings') && (
              <div>
                <h3 className="text-lg font-bold mb-4">{activeModal === 'wishlist' ? t.savedWishlist : t.myBookings}</h3>
                {activeModal === 'wishlist' ? (
                  wishlist.length > 0 ? (
                    <div className="space-y-3">
                      {wishlist.map((id) => {
                        const item = SAMPLE_EXPERIENCES.find((exp) => exp.id === id);
                        if (!item) return null;
                        return (
                          <div key={item.id} className="flex items-center gap-3 border border-[#E8DFD3] rounded-xl p-2">
                            <img src={item.image} alt={item.title[language]} className="w-16 h-16 object-cover rounded-lg" />
                            <div className="flex-1">
                              <p className="text-sm font-bold">{item.title[language]}</p>
                              <p className="text-[11px] text-[#5C6E61]">{item.region}</p>
                            </div>
                            <button onClick={() => setSelectedExperienceId(item.id)} className="text-[#2D5A27] font-bold text-xs">Book</button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-[#5C6E61]">No experiences saved yet.</p>
                  )
                ) : bookings.length > 0 ? (
                  <div className="space-y-3">
                    {bookings.map((id) => {
                      const item = SAMPLE_EXPERIENCES.find((exp) => exp.id === id);
                      if (!item) return null;
                      return (
                        <div key={item.id} className="flex items-center justify-between border border-[#E8DFD3] rounded-xl p-2">
                          <div>
                            <p className="text-sm font-bold">{item.title[language]}</p>
                            <p className="text-[11px] text-[#5C6E61]">{item.region}</p>
                          </div>
                          <span className="text-xs font-bold text-[#2D5A27]">{selectedDate || 'Booked'}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-[#5C6E61]">You have no active bookings.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
