
import { Settings, Construction } from 'lucide-react';

const AdminSettings = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">

            <div className="bg-[#16A34A]/10 p-5 rounded-full mb-6">
                <Construction
                    size={40}
                    className="text-[#16A34A]"
                />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Settings
            </h1>

            <p className="text-gray-400 mt-3 max-w-md">
                This page is still being worked on.
                We're preparing something useful for you.
                Please check back later.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-[#16A34A]">
                <Settings size={16} />
                <span>Coming Soon</span>
            </div>

        </div>
    );
};

export default AdminSettings;
