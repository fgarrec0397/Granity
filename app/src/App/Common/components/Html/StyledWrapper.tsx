import { HasChildren } from "@app/Common/commonTypes";
import { FC } from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

export interface StyledWrapperProps {
    css?: FlattenSimpleInterpolation;
}

type Props = StyledWrapperProps &
    HasChildren & {
        as?: string;
    };

const Wrapper: FC<Props> = ({ as = "div", css, children, ...props }) => {
    const AsComponent: any = as;
    return (
        <AsComponent css={css} {...props}>
            {children}
        </AsComponent>
    );
};

const StyledWrapper = styled(Wrapper)`
    ${(props) => props.css}
`;

export default StyledWrapper;
