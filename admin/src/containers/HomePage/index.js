import React, { memo } from "react";
import { Padded } from "@buffetjs/core";
import { Header } from "@buffetjs/custom";
import { Deployments, DeployButton } from "./../../../../plugins/strapi-plugin-vercel/admin/src/view";

const Dashboard = () => {
    return (
        <>
        <Padded top right left size="md">
            <Header
            title={{ label: "Dashboard" }}
            actions={[
                { Component: DeployButton },
            ]}
            />
        </Padded>
        <Padded right left size="md">
            <Deployments />
        </Padded>
        </>
    );
};

export default memo(Dashboard);
