import React, { useState } from 'react';
import { Footer } from '../components/Footer';
import { Page } from '../App';

const blogPosts = [
    {
        category: 'Tutorial',
        image: 'https://storage.googleapis.com/pose-shift-app-assets/Leisure/E%20(1).jpg',
        title: '3 Ways PoseShift Enhances Your E-commerce Product Photography',
        description: 'Learn how to use PoseShift to create stunning, consistent, and high-converting product images for your online store. Boost your sales with professional visuals.',
        author: 'Jane Doe',
        date: '2025/07/02',
        content: (
            <>
                <p>In the competitive world of e-commerce, high-quality product photography is not just a luxury—it's a necessity. It's the first interaction a potential customer has with your product. PoseShift offers powerful tools to revolutionize your visual merchandising. Here are three key ways it can enhance your e-commerce product photography:</p>
                <h2>1. Achieve Unbeatable Consistency</h2>
                <p>Maintaining a consistent look and feel across your product catalog is crucial for brand identity. PoseShift allows you to define a set of standard poses and apply them across different products or models. This ensures that whether a customer is browsing your clothing line or accessory collection, they are met with a cohesive and professional presentation. Say goodbye to mismatched angles and varied lighting from different photoshoots.</p>
                <h2>2. Reduce Photoshoot Costs and Time</h2>
                <p>Traditional photoshoots are expensive and time-consuming. You need to hire models, photographers, and rent studio space. With PoseShift, you can generate a vast array of product shots from a single source image. Need to showcase a sweater in ten different poses? Instead of a lengthy photoshoot, you can generate them in minutes, drastically cutting down on costs and accelerating your time-to-market.</p>
                <h2>3. A/B Test and Optimize Imagery</h2>
                <p>Which product pose converts better? Does a dynamic, action-oriented pose sell more athletic wear than a static one? With PoseShift, you no longer have to guess. You can quickly generate multiple versions of your product images in different poses and run A/B tests on your e-commerce platform. Use data-driven insights to select the most effective visuals and maximize your conversion rates. This level of rapid testing was previously unattainable for most online retailers.</p>
            </>
        )
    },
    {
        category: 'Product',
        image: 'https://storage.googleapis.com/pose-shift-app-assets/Artistic-photos/G0%20(1).jpg',
        title: 'Unlocking Creativity: How Indie Devs Are Using PoseShift for Character Design',
        description: 'Discover the workflows and techniques independent game developers are using with PoseShift to rapidly prototype and design compelling game characters.',
        author: 'John Smith',
        date: '2025/07/02',
        content: (
            <>
                <p>For independent game developers, resources are often limited, and time is of the essence. Character design is a critical but often lengthy process. Enter PoseShift, a tool that's quickly becoming a secret weapon for indie studios. It enables rapid prototyping and iteration, allowing small teams to punch well above their weight in character creation.</p>
                <h2>Rapid Prototyping</h2>
                <p>In the early stages of development, exploring different character concepts is key. PoseShift allows artists to take a single character sketch or model and instantly see it in hundreds of different poses. This helps in defining the character's personality and movement style long before a single line of animation code is written. Is the character agile and nimble, or strong and imposing? PoseShift can provide visual answers in seconds.</p>
                <h2>Creating Key Art and Promotional Materials</h2>
                <p>Indie developers often wear many hats, including that of a marketer. Creating compelling key art for a game's store page or social media can be a huge challenge. PoseShift allows developers to generate high-quality, dramatic character poses that can be used for promotional materials, saving time and money that would otherwise be spent on commissioned artwork.</p>
            </>
        )
    },
    {
        category: 'News',
        image: 'https://storage.googleapis.com/pose-shift-app-assets/Homepage-Image/H0%20(3).png',
        title: 'Our Latest Update: Introducing Batch Processing and API v2',
        description: 'We are thrilled to announce our biggest update yet! Generate multiple images at once with batch processing and explore the new possibilities with our improved API.',
        author: 'PoseShift Team',
        date: '2025/06/27',
        content: (
            <>
                <p>The team at PoseShift has been hard at work, and we're incredibly excited to roll out our most significant update yet. We've listened to your feedback, and this release is packed with features designed to streamline your workflow and unlock new creative possibilities.</p>
                <h2>Batch Processing is Here!</h2>
                <p>One of the most requested features is now a reality. With our new Batch Processing tool, you can now apply a single pose to multiple character images or apply multiple poses to a single character image, all in one go. This is a game-changer for e-commerce stores needing to update entire product lines, or for game developers creating sprite sheets. Queue up your jobs and let PoseShift do the heavy lifting.</p>
                <h2>Welcome to API v2</h2>
                <p>For our developer community, we're launching API v2. It's faster, more robust, and more flexible than ever before. The new API includes endpoints for batch processing, higher resolution downloads, and improved error handling. We can't wait to see what you build with it! Check out the updated documentation in our developer portal to get started.</p>
            </>
        )
    },
    {
        category: 'Company',
        image: 'https://storage.googleapis.com/pose-shift-app-assets/Artistic-photos/G0%20(16).jpg',
        title: 'The Science Behind the Pose: A Deep Dive into Our AI Model',
        description: 'Go behind the scenes and explore the technology that powers PoseShift. We break down our generative model and the magic of keypoint-based pose transfer.',
        author: 'Dr. Evelyn Reed',
        date: '2025/06/26',
        content: (
            <>
                <p>What makes PoseShift different? The magic lies in our bespoke AI model, which is fundamentally different from most text-to-image generators. Instead of relying solely on language interpretation, our model is trained on a massive dataset of skeletal keypoints and human anatomy. This allows for an unprecedented level of control and precision.</p>
                <h2>From Image to Keypoints</h2>
                <p>When you upload a pose reference (Image B), the first thing our model does is analyze it to extract a 2D skeletal structure. It identifies key joints like elbows, knees, shoulders, and hips, creating a "pose skeleton." This abstract representation is the core instruction for the generation process.</p>
                <h2>The Art of Inpainting and Outpainting</h2>
                <p>When we apply the new pose skeleton to your character (Image A), parts of the original image become obscured or need to be imagined. For example, if an arm moves, what does the torso behind it look like? This is where our model's advanced inpainting and outpainting capabilities come in. It intelligently fills in the missing pieces of both the character and the background, ensuring a seamless and photorealistic result. It's a complex dance of analysis, reconstruction, and generation that all happens in a matter of seconds.</p>
            </>
        )
    },
    {
        category: 'Tutorial',
        image: 'https://storage.googleapis.com/pose-shift-app-assets/Homepage-Image/H0%20(13).png',
        title: "From Prompt to Perfection: A Beginner's Guide to PoseShifting",
        description: 'New to PoseShift? This comprehensive guide will walk you through everything you need to know, from selecting the right images to your first generation.',
        author: 'Ludi',
        date: '2025/06/26',
        content: (
            <>
                <p>Welcome to PoseShift! We're excited to have you on board. This guide will take you from zero to hero in just a few simple steps. Let's create your first masterpiece.</p>
                <h2>Step 1: Choosing Your Images</h2>
                <p>The quality of your output depends heavily on the quality of your input. For your main photo (Image A), choose a clear, well-lit, front-facing portrait. For the pose reference (Image B), any image will work, but clearer poses without too many overlapping limbs will yield the best results. Don't be afraid to experiment!</p>
                <h2>Step 2: The Generation Process</h2>
                <p>Upload your main photo to section "2. Upload Your Photo (A)" and your chosen pose to section "1. Select a Pose (B)". Once both are selected, the "Generate" button will light up. Click it and watch the magic happen! Our AI will analyze the pose and apply it to your character. The result will appear in the third panel.</p>
                <h2>Step 3: Saving and Sharing</h2>
                <p>Happy with your creation? Simply click the "Download" button to save the high-quality image to your device. All your creations are also automatically saved in the "My Creations" section of your account for 7 days, so you can always come back to them later.</p>
            </>
        )
    },
    {
        category: 'Product',
        image: 'https://storage.googleapis.com/pose-shift-app-assets/New/F%20(1).jpg',
        title: 'PoseShift for Marketing: Create High-Converting Ad Creatives in Minutes',
        description: 'Stop spending hours on photoshoots. Learn how marketing professionals are using PoseShift to generate a vast array of ad creatives for A/B testing and campaigns.',
        author: 'Mark Chen',
        date: '2025/06/25',
        content: (
            <>
                <p>In the fast-paced world of digital marketing, the ability to rapidly create and test ad creatives is a significant competitive advantage. PoseShift is empowering marketers to do just that, producing a wide variety of high-quality visual assets without the need for costly and slow photoshoots.</p>
                <h2>Endless Variations for A/B Testing</h2>
                <p>Imagine you're running a campaign for a new clothing item. With a single model photo, you can use PoseShift to generate dozens of variations. Test a confident, hands-on-hips pose against a more casual, walking pose. See if a joyful, celebratory pose outperforms a serious, high-fashion look. PoseShift makes it trivial to create these assets, allowing you to optimize your campaigns based on real user engagement data.</p>
                <h2>Localize and Personalize</h2>
                <p>Running campaigns in different regions? Use PoseShift to adapt your creatives to local cultural norms and preferences without needing separate photoshoots. By simply changing the reference pose, you can make your ads more relatable to diverse audiences, potentially leading to higher click-through rates and conversions.</p>
            </>
        )
    },
];

type BlogPost = typeof blogPosts[0];

const BlogCard: React.FC<{ post: BlogPost; onClick: () => void }> = ({ post, onClick }) => (
    <div onClick={onClick} className="bg-white rounded-2xl overflow-hidden group border border-[#faeee7] hover:border-[#ffc6c7] transition-all duration-300 cursor-pointer shadow-[0_8px_24px_rgba(89,74,78,0.08)]">
        <div className="relative overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            <span className="absolute top-3 left-3 bg-[#ff8ba7] text-[#33272a] text-xs font-bold px-3 py-1 rounded-2xl">{post.category}</span>
        </div>
        <div className="p-6">
            <h3 className="text-lg font-bold text-[#33272a] mb-2 truncate group-hover:text-[#ff8ba7] transition-colors">{post.title}</h3>
            <p className="text-[#594a4e] text-sm mb-4 h-20 overflow-hidden">{post.description}</p>
            <div className="flex justify-between items-center text-xs text-[#594a4e]/70">
                <span>By {post.author}</span>
                <span>{post.date}</span>
            </div>
        </div>
    </div>
);

const BlogPostDetail: React.FC<{ post: BlogPost; onBack: () => void }> = ({ post, onBack }) => {
    return (
        <main className="container mx-auto px-4 pt-28 pb-12">
            <div className="max-w-4xl mx-auto">
                <button onClick={onBack} className="text-[#ff8ba7] hover:underline font-semibold mb-8">
                    &larr; Back to all posts
                </button>
                <article>
                    <span className="bg-[#ff8ba7] text-[#33272a] text-sm font-bold px-3 py-1 rounded-2xl">{post.category}</span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-[#33272a] my-4 leading-tight">{post.title}</h1>
                    <div className="flex items-center text-[#594a4e] text-sm mb-6">
                        <span>By {post.author}</span>
                        <span className="mx-2">&bull;</span>
                        <span>{post.date}</span>
                    </div>
                    <img src={post.image} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-2xl my-8" />
                    <div className="prose prose-lg max-w-none text-[#594a4e] prose-headings:text-[#33272a] prose-p:leading-relaxed prose-a:text-[#ff8ba7] hover:prose-a:underline">
                        {post.content}
                    </div>
                </article>
            </div>
        </main>
    );
};


export const BlogPage: React.FC<{
    onContactClick: () => void;
    navigate: (page: Page, anchorId?: string) => void;
}> = ({ onContactClick, navigate }) => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const filters = ['All', 'Company', 'News', 'Product', 'Tutorial'];

    const filteredPosts = activeFilter === 'All'
        ? blogPosts
        : blogPosts.filter(post => post.category === activeFilter);
        
    if (selectedPost) {
        return (
            <div className="bg-[#faeee7]">
                <BlogPostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
                <Footer onContactClick={onContactClick} navigate={navigate}/>
            </div>
        );
    }

    return (
        <div className="bg-[#faeee7]">
            <main className="container mx-auto px-4 pt-28 pb-12">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-[#33272a]">Blog</h1>
                    <p className="text-lg text-[#594a4e] mt-2">Welcome to our latest news, updates, and tutorials.</p>
                </div>

                <div className="flex justify-center items-center gap-2 mb-10 flex-wrap">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-5 py-2 text-sm font-semibold rounded-2xl transition-all duration-200 ${
                                activeFilter === filter
                                ? 'bg-[#ff8ba7] text-[#33272a]'
                                : 'bg-white text-[#594a4e] border border-[#faeee7] hover:bg-[#faeee7]'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, index) => (
                        <BlogCard key={index} post={post} onClick={() => setSelectedPost(post)} />
                    ))}
                </div>

                <div className="flex justify-center items-center mt-12 space-x-2 text-[#594a4e]">
                    <button className="px-4 py-2 rounded-2xl hover:bg-[#faeee7] transition-colors disabled:opacity-50" disabled>Previous</button>
                    <button className="w-10 h-10 rounded-2xl bg-[#ff8ba7] text-[#33272a] font-bold">1</button>
                    <button className="px-4 py-2 rounded-2xl hover:bg-[#faeee7] transition-colors">Next</button>
                </div>
            </main>
            <Footer onContactClick={onContactClick} navigate={navigate}/>
        </div>
    );
};