import { NavBar } from "../_components/navbar";
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex  flex-col h-full">
            <NavBar />
            {/* <Button className="top-0 left-0 p-4 m-5 bg-blue-500 text-white absolute">project</Button> */}
            {children}
        </div>
    );
}
