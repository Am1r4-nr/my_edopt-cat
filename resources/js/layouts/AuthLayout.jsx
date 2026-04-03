import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
    return (
        <div className="min-h-screen bg-amber-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-200">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link to="/" className="flex justify-center items-center">
                    <span className="text-4xl font-extrabold text-orange-600 drop-shadow-md">
                        E-DOPTCAT
                    </span>
                </Link>
                <h2 className="mt-6 text-center text-3xl font-bold text-gray-800">
                    Welcome Back
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Join us in caring for our campus felines.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border-t-4 border-orange-500">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
