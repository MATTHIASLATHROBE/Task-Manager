
import { ClipboardList, CheckCircle } from 'lucide-react';

const LoadingScreen = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">

            {/* Floating loading card */}
            <div className="w-full max-w-sm bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 p-8 flex flex-col items-center gap-5">

                {/* App icon */}
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-green-900/40">
                    <ClipboardList
                        size={30}
                        className="text-green-500"
                    />
                </div>

                {/* App name */}
                <h1 className="text-2xl font-bold text-white">
                    Task Manager
                </h1>

                {/* Loading message */}
                <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />

                    <p className="text-sm text-gray-300">
                        Loading your workspace...
                    </p>
                </div>

                {/* Spinner */}
                <div className="w-9 h-9 border-4 border-gray-700 border-t-green-500 rounded-full animate-spin"></div>

                <p className="text-xs text-gray-500 text-center">
                    Please wait while we prepare your dashboard.
                </p>

            </div>
        </div>
    );
};

export default LoadingScreen;
