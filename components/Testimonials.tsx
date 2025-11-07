import React from 'react';

const testimonials = [
    // Column 1
    [
        {
            name: 'Michelle K.',
            title: 'Travel Enthusiast',
            avatar: 'https://i.pravatar.cc/48?u=michelle',
            quote: "I just got back from Kyoto with hundreds of photos... and one major regret. The background in my favorite shot was perfect, but I looked incredibly stiff. PoseShift is a miracle. It 'saved' this photo. It's not a face-swap; it's me, in that scene, just with the natural pose I should have had. A perfect memory finally has a perfect photo.",
        },
        {
            name: 'Sarah J.',
            title: 'Lifestyle Blogger',
            avatar: 'https://i.pravatar.cc/48?u=sarah',
            quote: "I can finally stop 'fake-smiling' at my boyfriend's photography! He always manages to get the perfect background... and my eyes perfectly closed. PoseShift fixed my favorite beach shot. My dress, my hair, my face are all still mine, but the pose is suddenly alive and photogenic. This is the kind of AI we actually need!",
        },
        {
            name: 'Alexandra T.',
            title: 'Photographer',
            avatar: 'https://i.pravatar.cc/48?u=alexandra',
            quote: "I'm one of those people who just freezes up in front of a camera. I hate getting my picture taken because I never look like... me. I tried 'fixing' a party photo with PoseShift, picking a more relaxed stance... and the result honestly shocked me. It’s the first time I have a photo where I look genuinely relaxed and natural. It's a huge confidence boost.",
        },
        {
            name: 'David L.',
            title: 'Dad & Hobbyist',
            avatar: 'https://i.pravatar.cc/48?u=david',
            quote: "Getting a good candid of my son playing in the park is impossible! I got one with perfect lighting, but he was just a blur of motion at the wrong second. I thought the shot was lost. PoseShift intelligently re-imagined his pose into a 'looking back and smiling' run. It’s... magic. It saved a priceless moment.",
        },
    ],
    // Column 2
    [
        {
            name: 'Emily R.',
            title: 'Digital Artist',
            avatar: 'https://i.pravatar.cc/48?u=emily',
            quote: "Honestly, I assumed this was just another AI tool to face-swap me onto a model, and I have zero interest in those 'fake photos.' I was wrong. PoseShift 100% kept me—my face, my makeup, even the wrinkles on my shirt. It just... corrected the bad pose. This is what tech should do: enhance reality, not replace it.",
        },
        {
            name: 'Kevin G.',
            title: 'Perfectionist',
            avatar: 'https://i.pravatar.cc/48?u=kevin',
            quote: "You know that feeling? The lighting, the composition, the background are all 10/10... but your one awkward stance ruins the whole thing. PoseShift was built for that photo. It's like an 'undo' button for your pose. My entire photo library is thanking me.",
        },
        {
            name: 'Jessica W.',
            title: 'Influencer',
            avatar: 'https://i.pravatar.cc/48?u=jessica',
            quote: "This tool has changed my workflow. I used to take 100 shots at one location just to get 10 usable poses. Now, I just need one photo with perfect lighting, and I can use PoseShift to generate 5 different, natural-looking variations. They're all usable! And they all look like they were actually shot on location.",
        },
        {
            name: 'Maria S.',
            title: 'Family Photographer',
            avatar: 'https://i.pravatar.cc/48?u=maria',
            quote: "We took a three-generation family photo at my sister's wedding, but my youngest nephew turned his head at the last second. There was no way to get everyone back for a retake. I used PoseShift to try and adjust his pose... and it worked. Perfectly. It saved our family's most important photo. I seriously almost cried.",
        },
    ],
    // Column 3
    [
        {
            name: 'Chloe P.',
            title: 'Social Media User',
            avatar: 'https://i.pravatar.cc/48?u=chloe',
            quote: "I don't need 'high fashion' model poses. I just want to look less 'posed' when I post my weekend coffee run. The pose library in PoseShift is exactly what I was looking for—it's all casual, daily, and natural. It makes my planned 'plandid' (planned-candid) shots actually look candid.",
        },
        {
            name: 'Tom B.',
            title: 'Developer',
            avatar: 'https://i.pravatar.cc/48?u=tom',
            quote: "From a technical standpoint, this is wild. It's not just cutting and pasting. It understands light, perspective, and even the graphic on my t-shirt. When I shifted my pose, the logo on my shirt warped naturally with the fabric. This isn't 'changing' a pose, it's 're-rendering' the photo. So impressive.",
        },
        {
            name: 'Olivia C.',
            title: 'Creative Thinker',
            avatar: 'https://i.pravatar.cc/48?u=olivia',
            quote: "I'm always that person who gets home from a trip and thinks, 'Ah, I should have tried that pose!' Now I don't have to live with that regret. PoseShift lets me 'revisit' those moments and explore all the 'what-ifs.' One photo, so many new possibilities.",
        },
        {
            name: 'Rachel F.',
            title: 'Happy Customer',
            avatar: 'https://i.pravatar.cc/48?u=rachel',
            quote: "Finally, a tool that actually gets it. I don't want to be someone else. I just want to look like the best version of myself in my own memory. PoseShift does exactly that. It’s not creating a fake, it's fixing a flaw.",
        },
    ],
];


const TestimonialCard: React.FC<{ testimonial: typeof testimonials[0][0] }> = ({ testimonial }) => (
    <div className="bg-white p-6 rounded-2xl shadow-[0_8px_24px_rgba(89,74,78,0.08)]">
        <p className="text-[#594a4e] mb-4">"{testimonial.quote}"</p>
        <div className="flex items-center space-x-3">
            <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full" />
            <div>
                <p className="font-semibold text-[#33272a]">{testimonial.name}</p>
                <p className="text-sm text-[#594a4e]">{testimonial.title}</p>
            </div>
        </div>
    </div>
);

const TestimonialColumn: React.FC<{ testimonials: typeof testimonials[0], animationDuration: string }> = ({ testimonials, animationDuration }) => (
    <div className="flex flex-col gap-6 animate-scroll-up" style={{ animationDuration }}>
        {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
        ))}
        {/* Duplicate for seamless loop */}
        {testimonials.map((testimonial, index) => (
            <TestimonialCard key={`dup-${index}`} testimonial={testimonial} />
        ))}
    </div>
);

export const Testimonials: React.FC = () => {
    return (
        <div className="py-20">
            <div className="text-center mb-12">
                <span className="bg-white text-[#ff8ba7] text-sm font-medium px-4 py-1 rounded-full">Testimonials</span>
                <h2 className="text-4xl font-extrabold mt-4 mb-4 text-[#33272a]">What Users Say About PoseShift</h2>
                <p className="text-lg text-[#594a4e] max-w-3xl mx-auto">
                    See how creators use PoseShift's unique features to boost their productivity and creativity.
                </p>
            </div>
            <div className="relative h-[40rem] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#faeee7] via-transparent to-[#faeee7] z-10"></div>
                <div className="testimonial-container flex justify-center gap-6">
                    <TestimonialColumn testimonials={testimonials[0]} animationDuration="40s" />
                    <TestimonialColumn testimonials={testimonials[1]} animationDuration="50s" />
                    <TestimonialColumn testimonials={testimonials[2]} animationDuration="45s" />
                </div>
            </div>
        </div>
    );
};