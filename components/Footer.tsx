import React from 'react';
import { Page } from '../App';

const Logo: React.FC = () => (
    <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-[#ff8ba7] rounded-2xl flex items-center justify-center text-xl font-bold text-[#33272a]">
            P
        </div>
        <span className="text-xl font-bold text-[#33272a]">PoseShift</span>
    </div>
);

interface FooterLink {
    name: string;
    page?: Page;
    anchor?: string;
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
}

const FooterLinkColumn: React.FC<{ 
    title: string; 
    links: FooterLink[];
    navigate: (page: Page, anchorId?: string) => void;
    onContactClick: () => void;
}> = ({ title, links, navigate, onContactClick }) => {

    const handleLinkClick = (e: React.MouseEvent, link: FooterLink) => {
        e.preventDefault();
        if (link.onClick) {
            link.onClick(e);
        } else if (link.page || link.anchor) {
            navigate(link.page || 'home', link.anchor);
        }
    };
    
    return (
        <div>
            <h3 className="text-sm font-semibold text-[#33272a] tracking-wider uppercase">{title}</h3>
            <ul className="mt-4 space-y-3">
                {links.map(link => (
                    <li key={link.name}>
                        <a href="#" onClick={(e) => handleLinkClick(e, link)} className="text-base text-[#594a4e] hover:text-[#33272a] transition-colors cursor-pointer">
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const Footer: React.FC<{
    onContactClick: () => void;
    navigate: (page: Page, anchorId?: string) => void;
}> = ({ onContactClick, navigate }) => {

    const productLinks: FooterLink[] = [
        { name: 'Features', page: 'home' },
        { name: 'Pricing', page: 'home', anchor: 'pricing-section' },
        { name: 'FAQ', page: 'home', anchor: 'faq' },
    ];

    const resourceLinks: FooterLink[] = [
        { name: 'Blog', page: 'blog' },
        { name: 'Update Log', page: 'blog' }, // Points to blog for now
    ];
    
    const companyLinks: FooterLink[] = [
        { name: 'About Us', page: 'home' },
        { name: 'Contact Us', onClick: (e) => {e.preventDefault(); onContactClick()}},
    ];

    const legalLinks: FooterLink[] = [
        { name: 'Terms of Service', page: 'terms' },
        { name: 'Privacy Policy', page: 'privacy' },
        { name: 'Cookie Policy', page: 'cookies' },
        { name: 'Copyright Policy', page: 'copyright' },
        { name: 'Disclaimer', page: 'disclaimer' },
    ];


    return (
        <footer className="bg-white text-[#594a4e] border-t border-[#ffc6c7]/50">
            <div className="container mx-auto px-4 pt-16 pb-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    <div className="col-span-2 md:col-span-1 space-y-4 pr-8">
                        <Logo />
                        <p className="text-sm text-[#594a4e]">Created by <br/> @ MossEcho & Qiuyun</p>
                    </div>

                    <FooterLinkColumn title="Product" links={productLinks} navigate={navigate} onContactClick={onContactClick} />
                    <FooterLinkColumn title="Resources" links={resourceLinks} navigate={navigate} onContactClick={onContactClick} />
                    <FooterLinkColumn title="Company" links={companyLinks} navigate={navigate} onContactClick={onContactClick} />
                    <FooterLinkColumn title="Legal" links={legalLinks} navigate={navigate} onContactClick={onContactClick} />
                </div>

                <div className="mt-12 pt-8 border-t border-[#faeee7] text-center text-[#594a4e]/60">
                    <p>&copy; 2025 PoseShift. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};