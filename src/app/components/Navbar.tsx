// Navbar.tsx
"use client";

import Link from "next/link";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Search } from 'react-feather';
import Cart from "./Cart";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Navbar() {
    const router = useRouter();
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.FormEvent | React.MouseEvent) => {
        e.preventDefault();
        if (query) {
            router.push(`/search?query=${query}`);
        }
    }

    return (
        <nav className="fixed top-0 w-full flex items-center py-4 px-8 justify-between z-50 bg-slate-800 text-gray-300">
            <Link href="/" className="uppercase font-bold text-md h-12 flex items-center ml-auto">
                <img src="studiohome.png" alt="logo" width={120} height={40}/>
            </Link>
            {/* Barra de Pesquisa */}
            <form onSubmit={handleSearch} className="flex-grow flex justify-center ml-8 mr-8">
                <div className="relative w-full max-w-3xl">
                    <div 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={handleSearch}
                    >
                        <Search className="h-6 w-6 text-gray-400" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Pesquisar" 
                        className="border py-2 px-4 pl-12 pr-10 focus:outline-none focus:ring focus:border-gray-800 w-full rounded-md custom-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)} 
                    />
                </div>
            </form>
            {/* Fim da Barra de Pesquisa */}
            <div className="flex items-center gap-8 justify-end cursor-pointer relative">
                <Cart />
                <SignedIn><UserButton /></SignedIn>
                <SignedOut>
                    <SignInButton mode="modal">
                        <button className="border rounded-md border-gray-400 px-3 py-2">Fazer Login</button>
                    </SignInButton>
                </SignedOut>
            </div>
        </nav>
    );
}

export default Navbar;
