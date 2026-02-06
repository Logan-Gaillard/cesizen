import React from "react";

const AppContainer = ({ children }: { children: React.ReactNode }) => {
	return <div className="p-8">{children}</div>;
};

export default AppContainer;
