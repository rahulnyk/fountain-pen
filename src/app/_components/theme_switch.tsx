// import React, { MouseEventHandler, useContext } from "react";
// import { BiParagraph, BiHeading } from "react-icons/bi";
// import { FaHeading, FaParagraph } from "react-icons/fa6";
// import { BsParagraph, BsCardHeading } from "react-icons/bs";
// import { TfiParagraph } from "react-icons/tfi";
// import { CiLock } from "react-icons/ci";
// import { RxHeading } from "react-icons/rx";
// import { ModeContext } from "./fpr_editor";

// const ThemeSwitch = ({
//     className,
//     onClick,
// }: {
//     className: string;
//     onClick: MouseEventHandler;
// }) => {
//     const mode = useContext(ModeContext);

//     return (
//         <>
//             <div
//                 className={`${className} relative p-[1px] h-7 w-25 bg-gray-50 rounded-full justify-center inline-flex cursor-pointer select-none items-center border-solid border border-gray-200 border-spacing-1`}
//                 onClick={onClick}
//             >
//                 <div className="flex h-10 w-auto items-center justify-center rounded-md ">
//                     <span
//                         className={`flex h-10 w-10 m-0 items-center justify-center rounded-full ${
//                             mode === "edit"
//                                 ? "bg-gray-600 hover:bg-gray-700 text-white hover:shadow-md"
//                                 : "text-gray-400"
//                         }`}
//                     >
//                         <TfiParagraph />
//                     </span>
//                     <span
//                         className={`flex h-10 w-10 m-0 items-center justify-center rounded-full  ${
//                             mode === "outline"
//                                 ? // </div>? "bg-white hover:shadow-md text-black shadow-sm"
//                                   "bg-gray-600 hover:bg-gray-700 text-white hover:shadow-md"
//                                 : "text-gray-400"
//                         }`}
//                     >
//                         <RxHeading />
//                     </span>
//                     <span
//                         className={`flex h-10 w-10 m-0 items-center justify-center rounded-full ${
//                             mode === "readonly"
//                                 ? "bg-gray-600 hover:bg-gray-700 text-white hover:shadow-md"
//                                 : "text-gray-400"
//                         }`}
//                     >
//                         <CiLock />
//                     </span>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ThemeSwitch;
