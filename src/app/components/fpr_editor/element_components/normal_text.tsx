import { BasicWrapperProps } from "../types";
import { paragraphStyle } from "../typography";

export const NormalText: React.FC<BasicWrapperProps> = ({ children }) => {
    return <div className={`flex-grow p-4 ${paragraphStyle}`}>{children}</div>;
};
