import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { GeneratedImage } from './components/GeneratedImage';
import { POSE_TEMPLATES, POSE_CATEGORIES } from './constants';
import { generatePoseDescription, generatePoseImage, PoseData } from './services/geminiService';
import { urlToBase64, parseDataUrl, triggerDownload, dataUrlToBlob, fileToBase64 } from './utils/fileUtils';
import { PlayIcon, UserIcon, CreationsIcon, BillingIcon, SettingsIcon, LogoutIcon, CreditsIcon, LanguageIcon, RedoIcon, ShareIcon, UploadIcon, PlusIcon } from './components/icons';
import { Footer } from './components/Footer';
import { useAuth, UserProfile } from './contexts/AuthContext';
import { AuthModal } from './components/auth/AuthModal';
import { AccountPage, AccountTab } from './pages/AccountPage';
// FIX: Import firebase compat app to use FieldValue for increment and serverTimestamp.
import firebase from 'firebase/compat/app';
import { db, storage } from './services/firebase';
import { Testimonials } from './components/Testimonials';
import { BlogPage } from './pages/BlogPage';
import { Faq } from './components/Faq';
import { ContactModal } from './components/ContactModal';
import { LegalPage, LegalPageType } from './pages/legal/LegalPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { PricingSection } from './components/PricingSection';
import { FeaturedPoses } from './components/FeaturedPoses';

export type Page = 'home' | 'blog' | 'templates' | LegalPageType;

const translations = {
  en: {
    'language.short': 'EN',
    'language.english': 'English',
    'language.chinese': '中文',
    'nav.home': 'Home',
    'nav.poseTemplate': 'Pose Template',
    'nav.pricing': 'Pricing',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'auth.login': 'Log in',
    'auth.signup': 'Sign Up',
  },
  zh: {
    'language.short': '中',
    'language.english': 'English',
    'language.chinese': '中文',
    'nav.home': '首页',
    'nav.poseTemplate': '姿势模板',
    'nav.pricing': '定价',
    'nav.blog': '博客',
    'nav.faq': '常见问题',
    'auth.login': '登录',
    'auth.signup': '注册',
  }
};

type Language = 'en' | 'zh';
type TranslationKey = keyof typeof translations.en;

const UserMenu: React.FC<{ onMenuClick: (tab: AccountTab) => void }> = ({ onMenuClick }) => {
    const { userProfile, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    if (!userProfile) return null;

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 rounded-full hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#ff8ba7]"
            >
                {userProfile.photoURL ? (
                    <img src={userProfile.photoURL} alt="User avatar" className="h-9 w-9 rounded-full" />
                ) : (
                    <UserIcon className="h-9 w-9 text-[#594a4e] p-1" />
                )}
            </button>
            {isOpen && (
                <div 
                    className="absolute right-0 mt-2 w-64 origin-top-right bg-white border border-[#faeee7] rounded-2xl shadow-[0_8px_24px_rgba(89,74,78,0.08)] ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <div className="py-1">
                        <div className="px-4 py-3 border-b border-[#faeee7]">
                            <p className="font-medium text-[#33272a] truncate">{userProfile.displayName || 'Mossecho'}</p>
                            <p className="text-sm text-[#594a4e] truncate mt-1">{userProfile.email}</p>
                        </div>
                        <div className="py-2 space-y-1">
                            <button onClick={() => { onMenuClick('creations'); setIsOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#594a4e] hover:bg-[#ff8ba7]/20 hover:text-[#33272a] transition-colors"><CreationsIcon className="h-5 w-5" /> My Creations</button>
                            <button onClick={() => { onMenuClick('credits'); setIsOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#594a4e] hover:bg-[#ff8ba7]/20 hover:text-[#33272a] transition-colors"><CreditsIcon className="h-5 w-5" /> Credits</button>
                            <button onClick={() => { onMenuClick('billing'); setIsOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#594a4e] hover:bg-[#ff8ba7]/20 hover:text-[#33272a] transition-colors"><BillingIcon className="h-5 w-5" /> Billing</button>
                            <button onClick={() => { onMenuClick('settings'); setIsOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#594a4e] hover:bg-[#ff8ba7]/20 hover:text-[#33272a] transition-colors"><SettingsIcon className="h-5 w-5" /> Account Settings</button>
                        </div>
                        <div className="border-t border-[#faeee7]">
                            <button
                                onClick={async () => {
                                    await logout();
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#594a4e] hover:bg-[#ff8ba7]/20 hover:text-[#33272a] transition-colors"
                            >
                                <LogoutIcon className="h-5 w-5" />
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const LanguageSwitcher: React.FC<{
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKey) => string;
}> = ({ language, setLanguage, t }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-[#594a4e] hover:text-[#33272a] transition-colors">
                <LanguageIcon className="h-5 w-5" />
                <span className="text-sm font-medium hidden md:inline">{t('language.short')}</span>
            </button>
             {isOpen && (
                <div 
                    className="absolute right-0 mt-2 w-28 origin-top-right bg-white border border-[#faeee7] rounded-2xl shadow-[0_8px_24px_rgba(89,74,78,0.08)] ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <div className="py-1">
                        <a href="#" onClick={(e) => { e.preventDefault(); setLanguage('en'); setIsOpen(false); }} className={`block text-center px-4 py-2 text-sm rounded-lg ${language === 'en' ? 'text-[#33272a] bg-[#ff8ba7]/50' : 'text-[#594a4e] hover:bg-[#ff8ba7]/20'}`}>{t('language.english')}</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setLanguage('zh'); setIsOpen(false); }} className={`block text-center px-4 py-2 text-sm rounded-lg ${language === 'zh' ? 'text-[#33272a] bg-[#ff8ba7]/50' : 'text-[#594a4e] hover:bg-[#ff8ba7]/20'}`}>{t('language.chinese')}</a>
                    </div>
                </div>
             )}
        </div>
    );
}

const Header: React.FC<{ 
    onLoginClick: () => void; 
    onSignUpClick: () => void; 
    onMenuClick: (tab: AccountTab) => void;
    navigate: (page: Page, anchorId?: string) => void;
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKey) => string;
}> = ({ onLoginClick, onSignUpClick, onMenuClick, navigate, language, setLanguage, t }) => {
    const { userProfile } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, page: Page, anchorId?: string) => {
        e.preventDefault();
        navigate(page, anchorId);
    };

    const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
        ? 'bg-white/85 backdrop-blur-md border-b border-[rgba(51,39,42,0.1)]' 
        : 'bg-transparent border-b border-transparent'
    }`;

    return (
        <header className={headerClasses}>
            <div className="container mx-auto px-4 py-5 flex justify-between items-center">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('home')}>
                    <div className="w-10 h-10 bg-[#ff8ba7] rounded-2xl flex items-center justify-center text-2xl font-bold text-[#33272a]">
                        P
                    </div>
                    <span className="text-2xl font-bold text-[#33272a]">PoseShift</span>
                </div>
                <nav className="hidden md:flex items-center space-x-8 text-[#594a4e] font-semibold">
                    <a href="#" onClick={(e) => handleLinkClick(e, 'home')} className="hover:text-[#33272a] transition-colors">{t('nav.home')}</a>
                    <a href="#" onClick={(e) => handleLinkClick(e, 'templates')} className="hover:text-[#33272a] transition-colors">{t('nav.poseTemplate')}</a>
                    <a href="/#pricing-section" onClick={(e) => handleLinkClick(e, 'home', 'pricing-section')} className="hover:text-[#33272a] transition-colors">{t('nav.pricing')}</a>
                    <a href="#" onClick={(e) => handleLinkClick(e, 'blog')} className="hover:text-[#33272a] transition-colors">{t('nav.blog')}</a>
                    <a href="/#faq" onClick={(e) => handleLinkClick(e, 'home', 'faq')} className="hover:text-[#33272a] transition-colors">{t('nav.faq')}</a>
                </nav>
                <div className="flex items-center space-x-4">
                     <LanguageSwitcher language={language} setLanguage={setLanguage} t={t} />
                    {userProfile ? (
                        <UserMenu onMenuClick={onMenuClick} />
                    ) : (
                        <>
                            <button onClick={onLoginClick} className="text-[#594a4e] hover:text-[#33272a] transition-colors text-sm font-medium hidden sm:block">{t('auth.login')}</button>
                            <button onClick={onSignUpClick} className="px-5 py-2 text-sm font-semibold bg-[#ff8ba7] text-[#33272a] rounded-2xl hover:brightness-105 transition-all">
                                {t('auth.signup')}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

const App: React.FC = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [selectedPose, setSelectedPose] = useState<string | null>(POSE_TEMPLATES[0].url);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [poseDescription, setPoseDescription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'signup'>('login');
  
  const [isAccountPageOpen, setIsAccountPageOpen] = useState(false);
  const [initialAccountTab, setInitialAccountTab] = useState<AccountTab>('creations');
  const [page, setPage] = useState<Page>('home');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const [language, setLanguage] = useState<Language>('en');
  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations['en'][key];
  };
  
  const { userProfile } = useAuth();
  const generationCost = 3;
  const userImageInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const navigate = (targetPage: Page, anchorId?: string) => {
    if (page !== targetPage) {
        setPage(targetPage);
        // Use a timeout to ensure the new page is rendered before scrolling to the anchor
        setTimeout(() => {
            if (anchorId) {
                document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo(0, 0);
            }
        }, 100);
    } else {
        if (anchorId) {
            document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
        }
    }
  };

  const handleOpenLoginModal = () => { setAuthModalView('login'); setIsAuthModalOpen(true); };
  const handleOpenSignUpModal = () => { setAuthModalView('signup'); setIsAuthModalOpen(true); };
  const handleMenuClick = (tab: AccountTab) => { setInitialAccountTab(tab); setIsAccountPageOpen(true); };

  const handleImageUpload = (base64: string) => { setUserImage(base64); setGeneratedImage(null); setError(null); };

  const handleSelectPose = (url: string) => {
    setSelectedPose(url);
    setGeneratedImage(null);
    setError(null);
    // If we're not on the home page, navigate back and scroll to the editor
    if (page !== 'home') {
        navigate('home');
        // Use a short timeout to ensure the page has re-rendered before scrolling
        setTimeout(() => {
            editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
  };
  
  const handleUserImageFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      handleImageUpload(base64);
    }
  }, []);


  const saveCreationInBackground = async (imageSrc: string, profile: UserProfile) => {
    try {
        const imageBlob = dataUrlToBlob(imageSrc);
        if (!imageBlob) throw new Error("Failed to convert data URL to Blob.");
        
        const storageRef = storage.ref(`userCreations/${profile.uid}/${Date.now()}.png`);
        const uploadResult = await storageRef.put(imageBlob);
        const downloadURL = await uploadResult.ref.getDownloadURL();
        const userProfileRef = db.collection("userProfiles").doc(profile.uid);
        await userProfileRef.update({ credits: firebase.firestore.FieldValue.increment(-generationCost) });
        await db.collection("userCreations").add({ userId: profile.uid, imageUrl: downloadURL, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    } catch (err) {
        console.error("Failed to save creation in the background:", err);
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!userProfile) { handleOpenLoginModal(); return; }
    if (!userImage || !selectedPose) { setError("Please upload your photo and select a pose."); return; }
    if (userProfile.credits < generationCost) { setError(`You need at least ${generationCost} credits.`); return; }

    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);
    setPoseDescription(null);

    try {
      const poseImageBase64 = selectedPose.startsWith('data:') ? selectedPose : await urlToBase64(selectedPose);
      const userImageData = parseDataUrl(userImage);
      const poseImageData = parseDataUrl(poseImageBase64);
      if (!userImageData || !poseImageData) throw new Error("Failed to process images.");
      
      setLoadingStep("Analyzing pose...");
      const { formattedDescription, poseData } = await generatePoseDescription(poseImageData);
      setPoseDescription(formattedDescription);

      setLoadingStep("Recreating you in the new pose...");
      const resultBase64 = await generatePoseImage(userImageData, poseImageData, formattedDescription, poseData);
      const fullImageSrc = `data:image/png;base64,${resultBase64}`;
      
      setGeneratedImage(fullImageSrc);
      if (userProfile) { saveCreationInBackground(fullImageSrc, userProfile); }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
      setLoadingStep("");
    }
  }, [userImage, selectedPose, userProfile]);

  const handleDownload = useCallback(() => {
    if (!generatedImage) return;
    triggerDownload(generatedImage, 'poseshift-result.png');
  }, [generatedImage]);

  const handleShare = useCallback(async () => {
    if (!generatedImage || !navigator.share) return;
    try {
        const blob = dataUrlToBlob(generatedImage);
        if(!blob) return;
        const file = new File([blob], 'poseshift-result.png', { type: blob.type });
        await navigator.share({
            title: 'My PoseShift Creation',
            text: 'Check out this cool image I made with PoseShift!',
            files: [file],
        });
    } catch (error) {
        console.error('Error sharing:', error);
    }
  }, [generatedImage]);

  const renderHomePage = () => {
     return (
        <div className="pt-24 md:pt-32">
            <main className="container mx-auto px-4 py-8">
                <div className="text-center py-12 mb-12">
                    <h1 className="font-black text-[#33272a] tracking-tighter">
                        <span className="block text-6xl sm:text-7xl">
                            <span>Don't let a </span>
                            <span className="distressed-font">bad pose</span>
                            <span> ruin a</span>
                        </span>
                        <span className="block text-6xl sm:text-7xl mt-2 text-[#ff8ba7]">
                            beautiful moment
                        </span>
                    </h1>
                    <h2 className="text-lg sm:text-xl font-bold text-[#33272a] mt-10">
                        All to showcase your best look
                    </h2>
                    <p className="text-base sm:text-lg text-[#594a4e] max-w-2xl mx-auto mt-2 leading-[1.7]">
                        Rescue your favorite photos. Traveled miles just for an awkward shot? Instantly fix stiff, unnatural, or closed-eye poses.
                    </p>
                </div>
                
                <div ref={editorRef} className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-stretch">
                    {/* LEFT: POSE TEMPLATES */}
                    <FeaturedPoses
                        selectedPose={selectedPose}
                        onSelectPose={handleSelectPose}
                        onViewMore={() => navigate('templates')}
                    />

                    {/* CENTER: EDITOR + GENERATE BUTTON */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="bg-white rounded-2xl p-6 flex items-center justify-center relative flex-grow shadow-[0_8px_24px_rgba(89,74,78,0.08)] overflow-hidden">
                            <div className="w-full h-full relative flex items-center justify-center">
                                {selectedPose ? (
                                    <img src={selectedPose} alt="Selected Pose" className="max-w-full max-h-full object-contain rounded-2xl" />
                                ) : (
                                    <p className="text-[#594a4e]">Select a pose</p>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-2xl">
                                    <button onClick={() => navigate('templates')} className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-2xl text-sm font-semibold hover:bg-white/70 hover:scale-105">Replace</button>
                                </div>
                                <span className="absolute top-3 left-3 bg-black/30 text-white text-sm font-bold px-3 py-1 rounded-full backdrop-blur-sm">1. Select a Pose</span>

                                <div 
                                    onClick={() => userImageInputRef.current?.click()}
                                    className="group absolute bottom-6 left-6 w-52 h-72 bg-white border border-[#ffc6c7] rounded-2xl p-3 cursor-pointer hover:scale-105 transition-transform duration-300 shadow-[0_8px_24px_rgba(89,74,78,0.08)] origin-top-left -rotate-6 scale-90"
                                >
                                    <input type="file" ref={userImageInputRef} onChange={handleUserImageFileChange} accept="image/*" className="hidden" />
                                    {userImage ? (
                                        <img src={userImage} alt="User Upload" className="w-full h-full object-cover rounded-xl"/>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-[#594a4e] border-2 border-dashed border-[#ffc6c7] rounded-xl">
                                            <PlusIcon className="w-14 h-14 text-[#ff8ba7]"/>
                                            <p className="text-base text-center mt-2 font-semibold">Upload Photo</p>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                                        <button className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-2xl text-sm font-semibold hover:bg-white/70 hover:scale-105">Replace</button>
                                    </div>
                                    <span className="absolute top-2 left-2 bg-black/30 text-white text-sm font-bold px-3 py-1 rounded-full backdrop-blur-sm">2. Upload Your Photo</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleGenerate}
                            disabled={!userImage || !selectedPose || isLoading}
                            className="w-full flex items-center justify-center gap-3 text-lg font-bold px-10 py-5 rounded-2xl transition-all duration-300 ease-in-out bg-[#ff8ba7] text-[#33272a] shadow-[0_8px_24px_rgba(89,74,78,0.08)] hover:shadow-xl hover:brightness-105 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                            >
                            {isLoading ? loadingStep || 'Generating...' : 'Generate'}
                        </button>
                    </div>

                    {/* RIGHT: GENERATOR */}
                     <div className="lg:col-span-4">
                        <GeneratedImage 
                            image={generatedImage} 
                            isLoading={isLoading}
                            loadingStep={loadingStep}
                            poseDescription={null}
                            error={error} 
                            onDownload={handleDownload}
                            onShare={handleShare}
                            onRegenerate={handleGenerate}
                        />
                    </div>
                </div>

                <div className="py-24 md:py-32">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#33272a] mb-6 leading-tight">Unleash Your Vision, Redefine the Pose.</h2>
                            <p className="text-lg text-[#594a4e] mb-8">PoseShift empowers you to transform photos into any pose imaginable. Upload one image, choose a pose from our gallery, and watch our AI magically transfer the desired pose while keeping your character, clothes, and background consistent.</p>
                            <button onClick={() => navigate('templates')} className="px-8 py-4 text-base font-semibold bg-[#faeee7] text-[#594a4e] border border-[#ffc6c7] rounded-2xl hover:bg-[#ffc6c7] hover:text-[#33272a] transition-colors">
                                Start Creating Now -&gt;
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="row-span-2 rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(89,74,78,0.08)]"><img src="https://storage.googleapis.com/pose-shift-app-assets/marketing/marketing-1.jpg" alt="Character concept art" className="w-full h-full object-cover"/></div>
                            <div className="rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(89,74,78,0.08)]"><img src="https://storage.googleapis.com/pose-shift-app-assets/marketing/marketing-2.jpg" alt="Character in a city" className="w-full h-full object-cover"/></div>
                            <div className="rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(89,74,78,0.08)]"><img src="https://storage.googleapis.com/pose-shift-app-assets/marketing/marketing-3.jpg" alt="Character working" className="w-full h-full object-cover"/></div>
                        </div>
                    </div>
                </div>

                <Testimonials />
                <PricingSection onGetStarted={handleOpenSignUpModal} />
                <Faq onContactClick={() => setIsContactModalOpen(true)} />
            </main>
            <Footer onContactClick={() => setIsContactModalOpen(true)} navigate={navigate} />
        </div>
     )
  };

  const renderContent = () => {
    switch(page) {
      case 'home':
        return renderHomePage();
      case 'templates':
        return <TemplatesPage onSelectPose={handleSelectPose} onContactClick={() => setIsContactModalOpen(true)} navigate={navigate} />;
      case 'blog':
        return <BlogPage onContactClick={() => setIsContactModalOpen(true)} navigate={navigate} />;
      case 'terms':
      case 'privacy':
      case 'cookies':
      case 'copyright':
      case 'disclaimer':
        return (
          <>
            <LegalPage type={page} />
            <Footer onContactClick={() => setIsContactModalOpen(true)} navigate={navigate} />
          </>
        );
      default:
        return renderHomePage();
    }
  }

  return (
    <div className="min-h-screen bg-[#faeee7] text-[#594a4e]">
      {isAccountPageOpen ? <AccountPage initialTab={initialAccountTab} onExit={() => setIsAccountPageOpen(false)} /> : (
          <>
            <AuthModal isOpen={isAuthModalOpen} initialView={authModalView} onClose={() => setIsAuthModalOpen(false)} />
            {isContactModalOpen && <ContactModal onClose={() => setIsContactModalOpen(false)} />}
            <Header 
                onLoginClick={handleOpenLoginModal} 
                onSignUpClick={handleOpenSignUpModal} 
                onMenuClick={handleMenuClick}
                navigate={navigate}
                language={language}
                setLanguage={setLanguage}
                t={t}
            />
            
            {renderContent()}
          </>
      )}
    </div>
  );
};

export default App;