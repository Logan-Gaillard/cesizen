"use client";

import Flex from "../components/utils/Flex";

const Dashboard = () => {
	return (
		<Flex direction="column" gap justifyContent="center" alignItems="center">
			<h1 className="text-4xl font-bold">Dashboard</h1>
			<p className="text-lg text-gray-600">
				Découvrez vos activités ainsi que vos statisques.
			</p>
		</Flex>
	);
};

export default Dashboard;
