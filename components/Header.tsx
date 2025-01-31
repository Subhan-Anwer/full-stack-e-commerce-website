"use client"

import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';
import React from 'react'
import Form from 'next/form';
import { PackageIcon, TrolleyIcon } from '@sanity/icons';

const Header = () => {
    const { user } = useUser();
    // console.log(user)

    const createClerkPassKey = async () => {
        try {
            const response = await user?.createPasskey();
            console.log(response);
        } catch (err) {
            console.error("Error: ", JSON.stringify(err, null, 2));
        }
    }

    return (
        <header className="w-full bg-white shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Header Content */}
                <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4 md:gap-6">
                    {/* Logo and Search Container */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full md:w-auto">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="text-2xl sm:text-3xl font-bold text-blue-500 hover:opacity-70 transition cursor-pointer whitespace-nowrap"
                        >
                            Shopit
                        </Link>

                        {/* Search Form */}
                        <Form action="/search" className="w-full sm:w-auto flex-1 max-w-2xl">
                            <input
                                type="text"
                                name="query"
                                placeholder="Search for products..."
                                className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
                            />
                        </Form>
                    </div>

                    {/* Basket & User Details */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
                        {/* Basket Button */}
                        <Link
                            href="/basket"
                            className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 transition cursor-pointer whitespace-nowrap"
                        >
                            <TrolleyIcon className="w-6 h-6" />
                            <span>My Basket</span>
                        </Link>

                        {/* User Details */}
                        <ClerkLoaded>
                            <SignedIn>
                                <Link
                                    href="/orders"
                                    className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 transition cursor-pointer whitespace-nowrap"
                                >
                                    <PackageIcon className="w-6 h-6" />
                                    <span>My Orders</span>
                                </Link>
                            </SignedIn>

                            {user ? (
                                <div className="flex relative items-center space-x-2">
                                    <UserButton />

                                    {/* Welcome Message (Hidden on Mobile) */}
                                    <div className="block text-xs">
                                        <p className="text-gray-400">Welcome Back</p>
                                        <p className="font-bold">{user.fullName || user.username}!</p>
                                    </div>

                                    {/* Passkey Tooltip (Only if no passkeys) */}
                                    {user?.passkeys.length === 0 && (
                                        <div className="absolute left-1/2 top-full mt-2 w-max -translate-x-1/2 transform">
                                            {/* Tooltip Container */}
                                            <div className="relative bg-white border border-blue-300 rounded-lg shadow-lg p-2 animate-fade-in">
                                                {/* Arrow pointing up */}
                                                <div className="absolute left-1/2 -top-2.5 -translate-x-1/2 h-3 w-3 rotate-45 border-l border-t border-blue-300 bg-white"></div>

                                                {/* Tooltip Content */}
                                                <div className="flex flex-col items-center space-y-2">
                                                    <p className="text-xs text-gray-700 font-normal">
                                                        Secure your account
                                                    </p>
                                                    <button
                                                        onClick={createClerkPassKey}
                                                        className="animate-pulse rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                    >
                                                        Create Passkey
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <SignInButton mode="modal" />
                            )}
                        </ClerkLoaded>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Header