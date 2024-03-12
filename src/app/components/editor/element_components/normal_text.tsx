
import { BasicWrapperProps } from '../types'
import { paragraphStyle } from '../typography';


export const NormalText: React.FC<BasicWrapperProps> = ({
    children
}) => {
    return (
        <div className={paragraphStyle}>
            {children}
        </div>
    );
};