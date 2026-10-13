'use client';

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface UserContextType {
    id: string | null;
    user: { name: string } | null;
    avatarUrl: string | null;
}

const UserContext = createContext<UserContextType | null>(null);

function getUserData(user: SupabaseUser | null) {
    if (!user) {
        return {
            id: null,
            user: null,
            avatarUrl: null,
        };
    }

    const name =
        user.user_metadata?.name ||
        user.user_metadata?.full_name ||
        user.email ||
        'Usuário';

    return {
        id: user.id,
        user: { name },
        avatarUrl: user.user_metadata?.avatar_url ?? null,
    };
}

export function UserProvider({ children }: { children: ReactNode }) {
    const [id, setId] = useState<string | null>(null);
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        const syncUser = (supabaseUser: SupabaseUser | null) => {
            if (!mounted) return;

            const userData = getUserData(supabaseUser);

            setId(userData.id);
            setUser(userData.user);
            setAvatarUrl(userData.avatarUrl);
        };

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            syncUser(session?.user ?? null);
        });

        const loadSession = async () => {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();

            if (error) {
                console.error('Erro ao recuperar sessão:', error.message);
                return;
            }

            syncUser(session?.user ?? null);
        };

        void loadSession();

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider value={{ id, user, avatarUrl }}>
            {children}
        </UserContext.Provider>
    );
}

export function useSession() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useSession deve ser usado dentro de UserProvider');
    }

    return context;
}
