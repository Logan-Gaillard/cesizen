import React from "react";
import styled from "styled-components";

interface IFlexProps {
	children: React.ReactNode;
	directionColumn?: boolean;
	gap?: string;
	justifyContent?:
		| "flex-start"
		| "center"
		| "flex-end"
		| "space-between"
		| "space-around"
		| "space-evenly";
	alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
	flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
	alignContent?:
		| "flex-start"
		| "center"
		| "flex-end"
		| "stretch"
		| "space-between"
		| "space-around";
	flex?: string;
	flexGrow?: number;
	flexShrink?: number;
	flexBasis?: string;
}

const Flex = styled.div<IFlexProps>`
    display: flex;
    flex-direction: ${(props) => (props.directionColumn ? "column" : "row")};
    gap: ${(props) => props.gap};
    justify-content: ${(props) => props.justifyContent};
    align-items: ${(props) => props.alignItems};
    flex-wrap: ${(props) => props.flexWrap || "nowrap"};
    align-content: ${(props) => props.alignContent};
    flex: ${(props) => props.flex};
    flex-grow: ${(props) => props.flexGrow};
    flex-shrink: ${(props) => props.flexShrink};
    flex-basis: ${(props) => props.flexBasis};
`;

export default Flex;
