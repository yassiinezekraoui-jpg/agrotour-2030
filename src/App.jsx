import React, { useState } from 'react';
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
  },
  fr: {
    tagline: 'Agrotourisme & Expériences Rurales au Maroc',
    exploreHeading: 'Explorer Expériences',
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
  },
};

const SAMPLE_EXPERIENCES = [
  {
    id: 1,
    title: {
      ar: 'قطاف الزيتون وتذوق الزيت البكر',
      fr: "Ceuillette d'Olives & Dégustation",
      en: 'Olive Harvesting & Oil Tasting',
    },
    region: 'Fès-Meknès',
    priceMAD: 350,
    priceEUR: 35,
    image:
      'https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 2,
    title: {
      ar: 'ورشة إعداد الأرغان العضوي',
      fr: "Atelier d'Huile d'Argan Bio",
      en: 'Organic Argan Workshop',
    },
    region: 'Souss-Massa (Souss)',
    priceMAD: 450,
    priceEUR: 45,
    image:
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 3,
    title: {
      ar: 'جولة قطاف الزعفران الحر',
      fr: 'Route du Safran de Taliouine',
      en: 'Saffron Trail & Farm Visit',
    },
    region: 'Taliouine',
    priceMAD: 500,
    priceEUR: 50,
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600',
  },
];

const ThreeDIcon = ({ name, size = 20, animate = false }) => {
  const commonClass = 'transition-transform duration-300';
  const animateClass = animate ? 'animate-pulse' : '';

  switch (name) {
    case 'sprout':
      return <Sprout size={size} className={`${commonClass} ${animateClass} text-emerald-400`} />;
    case 'pin':
      return <MapPin size={size} className={`${commonClass} ${animateClass} text-amber-500`} />;
    case 'trophy':
      return <Award size={size} className={`${commonClass} ${animateClass} text-yellow-500`} />;
    case 'sparkles':
      return <Sparkles size={size} className={`${commonClass} ${animateClass} text-amber-600`} />;
    case 'heart':
      return <Heart size={size} className={`${commonClass} ${animateClass} text-red-500`} />;
    case 'calendar':
      return <Calendar size={size} className={`${commonClass} ${animateClass} text-emerald-600`} />;
    case 'wheat':
      return <Sprout size={size} className={`${commonClass} ${animateClass} text-amber-300`} />;
    default:
      return <Sprout size={size} className={`${commonClass} ${animateClass}`} />;
  }
};

const GateSwitcher = ({ currentGate, onGateChange }) => (
  <div className="flex bg-[#EFE8DD] rounded-xl p-0.5 text-xs font-bold text-[#445447] border border-[#E0D5C7]">
    {['visitor', 'farmer', 'investor'].map((gate) => (
      <button
        key={gate}
        onClick={() => onGateChange(gate)}
        className={`px-2 py-1 rounded-lg capitalize transition-all cursor-pointer ${
          currentGate === gate ? 'bg-white shadow-xs text-[#1E2A22]' : 'hover:text-[#1E2A22]'
        }`}
      >
        {gate}
      </button>
    ))}
  </div>
);

const Navbar = ({
  currentLanguage,
  onLanguageChange,
  currentCurrency,
  onCurrencyChange,
  wishlistCount,
  bookingsCount,
  onOpenWishlist,
  onOpenBookings,
  onOpenHostModal,
  onOpenAiAdvisor,
  onScrollToSection,
  currentGate,
  onGateChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLanguage];

  const languages = [
    { code: 'ar', label: 'العربية (المغرب)', flag: '🇲🇦' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => onScrollToSection('hero')}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#35662E] via-[#2D5A27] to-[#173014] flex items-center justify-center shadow-[0_4px_12px_rgba(45,90,39,0.35)] text-white border-t border-white/30 border-b-2 border-b-[#122410] ring-1 ring-[#E5A93C]/40">
              <ThreeDIcon name="sprout" size={32} animate />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-[#1E2A22] tracking-tight">AgroTour</span>
                <span className="font-bold text-sm px-2 py-0.5 rounded-lg bg-[#C85A32]/10 text-[#B34A26] border border-[#C85A32]/20 shadow-xs">
                  2030
                </span>
              </div>
              <span className="text-xs text-[#5C6E61] font-medium hidden sm:inline">{t.tagline}</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#2E3D32]">
            <button
              onClick={() => onScrollToSection('experiences')}
              className="hover:text-[#B34A26] transition-colors flex items-center gap-2 font-bold cursor-pointer"
            >
              <ThreeDIcon name="sprout" size={18} />
              <span>{t.exploreHeading}</span>
            </button>
            <button
              onClick={() => onScrollToSection('interactive-map')}
              className="hover:text-[#B34A26] transition-colors flex items-center gap-2 font-bold cursor-pointer"
            >
              <ThreeDIcon name="pin" size={18} />
              <span>{t.interactiveMapTitle}</span>
            </button>
            <button
              onClick={() => onScrollToSection('vision-2030')}
              className="hover:text-[#B34A26] transition-colors flex items-center gap-2 font-bold cursor-pointer"
            >
              <ThreeDIcon name="trophy" size={18} />
              <span>{t.visionTitle}</span>
            </button>
            <button
              onClick={onOpenAiAdvisor}
              className="hover:text-[#B34A26] transition-colors flex items-center gap-2 text-[#B34A26] bg-[#C85A32]/10 px-3.5 py-1.5 rounded-xl border border-[#C85A32]/20 hover:bg-[#C85A32]/20 font-bold cursor-pointer shadow-xs"
            >
              <ThreeDIcon name="sparkles" size={18} />
              <span>{t.aiAdvisorBtn}</span>
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {currentGate && onGateChange && (
              <GateSwitcher
                currentGate={currentGate}
                onGateChange={onGateChange}
              />
            )}

            <div className="flex items-center bg-[#EFE8DD] rounded-xl p-0.5 text-xs font-bold text-[#445447] border border-[#E0D5C7]">
              <button
                onClick={() => onCurrencyChange('MAD')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  currentCurrency === 'MAD' ? 'bg-white shadow-xs text-[#1E2A22]' : 'hover:text-[#1E2A22]'
                }`}
              >
                MAD
              </button>
              <button
                onClick={() => onCurrencyChange('EUR')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  currentCurrency === 'EUR' ? 'bg-white shadow-xs text-[#1E2A22]' : 'hover:text-[#1E2A22]'
                }`}
              >
                EUR
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EFE8DD] hover:bg-[#E7DED0] rounded-xl text-xs font-bold text-[#2E3D32] transition-colors border border-[#E0D5C7] cursor-pointer"
              >
                <Languages className="w-3.5 h-3.5 text-[#5C6E61]" />
                <span>
                  {languages.find((l) => l.code === currentLanguage)?.flag}{' '}
                  {currentLanguage.toUpperCase()}
                </span>
              </button>
              {langMenuOpen && (
                <div
                  className={`absolute mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#E8DFD3] py-1 z-50 ${
                    currentLanguage === 'ar' ? 'left-0' : 'right-0'
                  }`}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                        currentLanguage === lang.code
                          ? 'bg-[#F4EFEA] text-[#B34A26] font-bold'
                          : 'text-[#3E4F42] hover:bg-stone-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                      {currentLanguage === lang.code && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B34A26]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-xl bg-[#EFE8DD] hover:bg-[#E7DED0] text-[#2E3D32] transition-colors border border-[#E0D5C7] cursor-pointer"
            >
              <ThreeDIcon name="heart" size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#C85A32] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenBookings}
              className="relative flex items-center gap-2 px-3 py-1.5 bg-[#EFE8DD] hover:bg-[#E7DED0] rounded-xl text-xs font-bold text-[#2E3D32] transition-colors border border-[#E0D5C7] cursor-pointer"
            >
              <ThreeDIcon name="calendar" size={18} />
              <span>{t.myBookings}</span>
              {bookingsCount > 0 && (
                <span className="bg-[#2D5A27] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {bookingsCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenHostModal}
              className="flex items-center gap-2 px-4 py-2 bg-[#2D5A27] hover:bg-[#23471e] text-white text-xs font-black rounded-xl shadow-[0_3px_0_#173014] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              <ThreeDIcon name="wheat" size={18} animate />
              <span>{t.hostFarmBtn}</span>
            </button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#EFE8DD] text-[#2E3D32]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
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

  const t = TRANSLATIONS[language];

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

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2E3D32]" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar
        currentLanguage={language}
        onLanguageChange={setLanguage}
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        wishlistCount={wishlist.length}
        bookingsCount={bookings.length}
        onOpenWishlist={() => setActiveModal('wishlist')}
        onOpenBookings={() => setActiveModal('bookings')}
        onOpenHostModal={() => setActiveModal('host')}
        onOpenAiAdvisor={() => setActiveModal('ai')}
        onScrollToSection={scrollToSection}
        currentGate={userGate}
        onGateChange={setUserGate}
      />

      <section id="hero" className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-black text-[#1E2A22] mb-4">
          {language === 'ar' ? 'استكشف المزارع والأرياف المغربية' : 'Explore Moroccan Farms & Countryside'}
        </h1>
        <p className="text-lg text-[#5C6E61] max-w-2xl mx-auto mb-8">{t.tagline}</p>
      </section>

      <section id="experiences" className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-black mb-6">{t.exploreHeading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_EXPERIENCES.map((exp) => (
            <div key={exp.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8DFD3] flex flex-col justify-between">
              <div>
                <img src={exp.image} alt={exp.title[language]} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <span className="text-xs font-bold text-[#B34A26] bg-[#C85A32]/10 px-2 py-1 rounded-md">
                    {exp.region}
                  </span>
                  <h3 className="font-bold text-lg mt-2">{exp.title[language]}</h3>
                  <p className="text-sm font-black text-[#2D5A27] mt-2">
                    {currency === 'MAD' ? `${exp.priceMAD} MAD` : `${exp.priceEUR} €`}
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0 flex gap-2">
                <button
                  onClick={() => addBooking(exp.id)}
                  className="flex-1 bg-[#2D5A27] text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1"
                >
                  <CheckCircle2 size={14} /> {t.bookNow}
                </button>
                <button
                  onClick={() => toggleWishlist(exp.id)}
                  className={`p-2 rounded-xl border ${
                    wishlist.includes(exp.id) ? 'bg-red-50 border-red-200 text-red-500' : 'border-[#E0D5C7]'
                  }`}
                >
                  <Heart size={16} fill={wishlist.includes(exp.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="interactive-map" className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-[#EFE8DD] border border-[#E0D5C7] rounded-3xl p-12 text-center">
          <MapPin size={48} className="mx-auto text-[#2D5A27] mb-2" />
          <h3 className="text-xl font-bold">{t.interactiveMapTitle}</h3>
          <p className="text-sm text-[#5C6E61] mt-1">
            Interactive map preview displaying rural farms across Morocco.
          </p>
        </div>
      </section>

      <section id="vision-2030" className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-[#2D5A27] to-[#173014] text-white rounded-3xl p-8 sm:p-12">
          <h2 className="text-3xl font-black mb-3">{t.visionTitle}</h2>
          <p className="text-emerald-100 max-w-xl">{t.visionDesc}</p>
        </div>
      </section>

      {activeModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1 rounded-full bg-stone-100"
            >
              <X size={18} />
            </button>

            {activeModal === 'ai' && (
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                  <Sparkles className="text-[#C85A32]" /> {t.aiTitle}
                </h3>
                <div className="bg-[#FAF7F2] p-4 rounded-xl text-xs space-y-2 mb-4">
                  <p className="font-bold text-[#2D5A27]">AI Assistant:</p>
                  <p>مرحباً بك! كيف يمكنني مساعدتك في تخطيط مسارك الفلاحي بالمغرب لعام 2030؟</p>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={t.aiPlaceholder}
                    className="flex-1 border border-[#E0D5C7] rounded-xl px-3 py-2 text-xs"
                  />
                  <button className="bg-[#2D5A27] text-white p-2 rounded-xl">
                    <Send size={16} />
                  </button>
                </div>
              </div>
            )}

            {activeModal === 'host' && (
              <div>
                <h3 className="text-lg font-bold mb-4">{t.hostFarmBtn}</h3>
                <p className="text-xs text-[#5C6E61] mb-4">
                  انضم إلى شبكة AgroTour 2030 واستقبل الزوار في مزرعتك.
                </p>
                <input
                  type="text"
                  placeholder="اسم المزرعة / Farm Name"
                  className="w-full border border-[#E0D5C7] rounded-xl px-3 py-2 text-xs mb-3"
                />
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full bg-[#2D5A27] text-white font-bold py-2 rounded-xl text-xs"
                >
                  إرسال الطلب
                </button>
              </div>
            )}

            {(activeModal === 'wishlist' || activeModal === 'bookings') && (
              <div>
                <h3 className="text-lg font-bold mb-4">
                  {activeModal === 'wishlist' ? t.savedWishlist : t.myBookings}
                </h3>
                <p className="text-xs text-[#5C6E61]">
                  {activeModal === 'wishlist'
                    ? `You have ${wishlist.length} item(s) saved.`
                    : `You have ${bookings.length} active booking(s).`}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
