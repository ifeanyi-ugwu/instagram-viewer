import { Film, Image, MessageCircle, User } from "lucide-react";
import { LoginButton } from "./components/login-button";
import { PhoneSVG } from "./components/phone-svg";

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
          <div className="lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl font-bold leading-snug mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
              Instagram Integration
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Connect your Instagram account to access your profile, view your
              media, and interact with your community all in one place.
            </p>
            <LoginButton />
          </div>

          <div className="lg:w-1/2">
            <PhoneSVG />
          </div>
        </div>

        {/* Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-12">What You Can Do</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<User className="w-10 h-10 text-pink-500" />}
              title="Profile Access"
              description="View your Instagram profile information including bio, followers, and following count."
            />
            <FeatureCard
              icon={<Image className="w-10 h-10 text-purple-500" />}
              title="Posts Gallery"
              description="Browse through all your Instagram posts in an elegant grid layout."
            />
            <FeatureCard
              icon={<Film className="w-10 h-10 text-indigo-500" />}
              title="Reels Integration"
              description="Access your reels content seamlessly within the application."
            />
            <FeatureCard
              icon={<MessageCircle className="w-10 h-10 text-blue-500" />}
              title="Comment Management"
              description="View and reply to comments on your posts directly from the dashboard."
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Connect?</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Link your Instagram account now to get started with all features.
          </p>
          <LoginButton />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2025 Instagram Integration. This is a demo application.</p>
          <p className="mt-2">
            Created for the Empathy Technologies Assessment. Not affiliated with
            Instagram.
          </p>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow transition-shadow">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
