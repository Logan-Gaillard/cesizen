"use client";

import React from "react";
import styled from "styled-components";

interface IFlexProps {
	children: React.ReactNode;
	direction?: "row" | "column";
	gap?: string | boolean;
	padding?: string;
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
	fullWidth?: boolean;
	fullHeight?: boolean;
}

const Flex = styled.div.withConfig({
	shouldForwardProp: (prop) =>
		![
			"direction",
			"gap",
			"justifyContent",
			"alignItems",
			"flexWrap",
			"alignContent",
			"flex",
			"flexGrow",
			"flexShrink",
			"flexBasis",
			"fullWidth",
			"fullHeight",
		].includes(prop),
})<IFlexProps>`
	display: flex;
	flex-direction: ${(props) => props.direction || "row"};
	gap: ${(props) => (props.gap === true ? "1rem" : props.gap)};
	padding: ${(props) => props.padding};
	justify-content: ${(props) => props.justifyContent};
	align-items: ${(props) => props.alignItems};
	flex-wrap: ${(props) => props.flexWrap || "nowrap"};
	align-content: ${(props) => props.alignContent};
	flex: ${(props) => props.flex};
	flex-grow: ${(props) => props.flexGrow};
	flex-shrink: ${(props) => props.flexShrink};
	flex-basis: ${(props) => props.flexBasis};
	width: ${(props) => (props.fullWidth ? "100%" : "auto")};
	height: ${(props) => (props.fullHeight ? "100%" : "auto")};
`;

export default Flex;
