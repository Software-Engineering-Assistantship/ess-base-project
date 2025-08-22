import { Play } from "lucide-react";

export default function Logo() {
    return (
        <div className="flex items-center space-x-4">
            <Play className="text-[#FF0000] w-15 h-10"/>
            <h1 className="text-[#FF0000] text-3x1 font-bold">CineVideo</h1>
        </div>  
    );
}