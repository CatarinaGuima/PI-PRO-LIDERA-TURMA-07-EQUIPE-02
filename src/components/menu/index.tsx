"use client";

import {
    ChevronDown,
    ClipboardCheck,
    LifeBuoy,
    LogOut,
    Settings,
    User,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useSession } from "../../../contexts/user-context";

export function DropdownMenuDemo() {
    const router = useRouter();
    const { user } = useSession();

    const handleLogOut = async () => {
        try {
            await supabase.auth.signOut();
            router.push("/")
        } catch (error) {
            console.error("Erro ao sair:", error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-input bg-white px-3.5 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 data-[state=open]:border-primary">
                Menu
                <ChevronDown className="size-4" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user && (
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <User />
                            <span>{user.name.split(" ")[0] || "Perfil"}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/instrucoes")}>
                            <ClipboardCheck />
                            <span>Realizar teste</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings />
                            <span>Configurações</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                )}
                <DropdownMenuItem>
                    <LifeBuoy />
                    <span>Suporte</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogOut}>
                    <LogOut />
                    <span>Sair</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
