import { Button } from "./_components/button";
import Link from "next/link";
export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Link href="/editor">
                <Button>
                    <div className="text-2xl font-bold px-5 py-2">
                        Start Writing ...
                    </div>
                </Button>
            </Link>
        </main>
    );
}
