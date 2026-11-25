
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { logoutUser } from '../services/authServices';

const Profile = ({
    authUser,
    onProfileUpdate,
    onDeleteAccount,
    onProfilePhotoUpload,
    onLogoutSuccess
}) => {
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [logoutError, setLogoutError] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(authUser?.name || '');
    const [email, setEmail] = useState(authUser?.email || '');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [isUploading, setIsUploading] = useState(false);
    const [photoError, setPhotoError] = useState('');
    const [showPhotoPreview, setShowPhotoPreview] = useState(false);


    // Save updated profile information
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setSuccess('');
        setIsSaving(true);

        try {
            await onProfileUpdate({ name, email });

            setSuccess('Profile updated successfully.');
            setIsEditing(false);
        } catch (error) {
            setError(error.message || 'Failed to update profile.');
        } finally {
            setIsSaving(false);
        }
    };

    // Cancel editing and restore original values
    const handleCancel = () => {
        setName(authUser?.name || '');
        setEmail(authUser?.email || '');
        setError('');
        setSuccess('');
        setIsEditing(false);
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setPhotoError('');
        setIsUploading(true);

        try {
            await onProfilePhotoUpload(file);
        } catch (error) {
            setPhotoError(error.message || 'Failed to upload profile photo.');
        } finally {
            setIsUploading(false);
            e.target.value = '';
        }
    };

    const handleDeleteAccount = async () => {
        setError('');
        setIsDeleting(true);

        try {
            await onDeleteAccount(authUser._id);
        } catch (error) {
            setError(error.message || 'Failed to delete account.');
            setIsDeleting(false);
            setShowDeleteConfirm(false);
        }
    };

    const handleLogout = async () => {
    setLogoutError('');
    setIsLoggingOut(true);

    try {
        await logoutUser();
        onLogoutSuccess?.();
        navigate('/login', { replace: true });
    } catch (error) {
        setLogoutError(
            error.message || 'Unable to log out. Please try again.'
        );
    } finally {
        setIsLoggingOut(false);
    }
    };

    const initials = authUser?.name
        ?.split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'U';

    return (
        <div className="min-h-screen bg-black text-white px-5 py-10">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-3xl font-bold">
                    My Profile
                </h1>

                <p className="text-gray-400 mt-2">
                    Manage your personal information and account settings.
                </p>

                <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-zinc-950">


                <div className="flex items-center gap-5">

                        <div className="relative w-20 h-20">

                            {/* Profile image */}
                            <div className="w-full h-full rounded-full overflow-hidden bg-emerald-500 flex items-center justify-center text-black text-xl font-bold">
                                {authUser?.profilePhoto ? (
                                   <button
                                        type="button"
                                        onClick={() => setShowPhotoPreview(true)}
                                        className="cursor-zoom-in"
                                        aria-label="View profile photo"
                                    >
                                        <img
                                            src={authUser?.profilePhoto}
                                            alt="Profile"
                                            className="..."
                                        />
                                    </button>
                                ) : (
                                    initials
                                )}
                            </div>

                            {/* Add photo button */}
                            <label
                                htmlFor="profile-photo"
                                className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-emerald-500 border-2 border-zinc-950 flex items-center justify-center text-black cursor-pointer hover:bg-emerald-400 transition-colors"
                                title="Change profile photo"
                            >
                                {isUploading ? (
                                    <span className="text-xs">...</span>
                                ) : (
                                    <span className="text-xl font-bold leading-none">+</span>
                                )}
                            </label>

                            <input
                                id="profile-photo"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handlePhotoUpload}
                                disabled={isUploading}
                                className="hidden"
                            />

                        </div>

                    </div>

                    {error && (
                        <p className="mt-5 text-red-400 text-sm">
                            {error}
                        </p>
                    )}

                    {photoError && (
                        <p className="mt-3 text-red-400 text-sm">
                            {photoError}
                        </p>
                    )}

                    {success && (
                        <p className="mt-5 text-emerald-400 text-sm">
                            {success}
                        </p>
                    )}

                    {isEditing ? (
                        <form onSubmit={handleSubmit}>

                            <div className="mt-5">
                                <label className="block text-sm text-gray-400 mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-emerald-500"
                                />
                            </div>

                            <div className="mt-5">
                                <label className="block text-sm text-gray-400 mb-2">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-emerald-500"
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black font-semibold px-5 py-2.5 rounded-lg transition"
                                >
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={isSaving}
                                    className="border border-white/20 hover:bg-white/10 px-5 py-2.5 rounded-lg transition"
                                >
                                    Cancel
                                </button>
                            </div>

                        </form>
                    ) : (
                        <>
                            <div className="mt-5">
                                <p className="text-sm text-gray-400">
                                    Full Name
                                </p>

                                <p className="text-lg font-semibold mt-1">
                                    {authUser?.name || 'Name unavailable'}
                                </p>
                            </div>

                            <div className="mt-5">
                                <p className="text-sm text-gray-400">
                                    Email Address
                                </p>

                                <p className="text-lg font-semibold mt-1">
                                    {authUser?.email || 'Email unavailable'}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setName(authUser?.name || '');
                                    setEmail(authUser?.email || '');
                                    setSuccess('');
                                    setError('');
                                    setIsEditing(true);
                                }}
                                className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-5 py-2.5 rounded-lg transition"
                            >
                                Edit Profile
                            </button>

                            {/* LOGOUT SECTION */}
                            <div className="mt-8 border-t border-white/10 pt-6">
                                {logoutError && (
                                    <p className="text-red-400 text-sm mb-3">
                                        {logoutError}
                                    </p>
                                )}

                                <button
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                    className="flex items-center gap-2 rounded-lg bg-red-500/10 px-5 py-3 text-red-400 hover:bg-red-500/20 transition disabled:opacity-50"
                                >
                                    <LogOut size={18} />
                                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                                </button>
                            </div>
                        </>
                    )}
                    
                    {/* Danger Zone */}
                    <div className="mt-8 p-6 rounded-2xl border border-red-500/30 bg-zinc-950">

                        <h2 className="text-xl font-bold text-red-400">
                            Danger Zone
                        </h2>

                        <p className="text-gray-400 text-sm mt-2">
                            Permanently delete your account and all your tasks.
                            This action cannot be undone.
                        </p>

                        <button
                            type="button"
                            onClick={() => setShowDeleteConfirm(true)}
                            className="mt-5 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-lg transition"
                        >
                            Delete Account
                        </button>

                    </div>
                    {/* Delete Account Confirmation */}
                    {showDeleteConfirm && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-5">

                            <div className="w-full max-w-md rounded-2xl border border-red-500/30 bg-zinc-950 p-6">

                                <h2 className="text-xl font-bold text-red-400">
                                    Delete Your Account?
                                </h2>

                                <p className="mt-3 text-sm text-gray-400">
                                    Are you sure you want to permanently delete
                                    your account? All your tasks will also be
                                    deleted. This action cannot be undone.
                                </p>

                                <div className="mt-6 flex gap-3">

                                    <button
                                        type="button"
                                        onClick={handleDeleteAccount}
                                        disabled={isDeleting}
                                        className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                                    >
                                        {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setShowDeleteConfirm(false)}
                                        disabled={isDeleting}
                                        className="flex-1 rounded-lg border border-white/20 px-4 py-2.5 hover:bg-white/10 disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>

                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>           
            {/* PROFILE PHOTO PREVIEW */}
            {showPhotoPreview && authUser?.profilePhoto && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                    onClick={() => setShowPhotoPreview(false)}
                >
                    <button
                        type="button"
                        onClick={() => setShowPhotoPreview(false)}
                        className="absolute right-6 top-6 text-white text-3xl"
                        aria-label="Close photo preview"
                    >
                        &times;
                    </button>

                    <img
                        src={authUser.profilePhoto}
                        alt={`${authUser.name}'s profile`}
                        className="max-h-[85vh] max-w-full rounded-xl object-contain"
                        onClick={event => event.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
};

export default Profile;
