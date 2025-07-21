"use client";

import { useMemo, useState } from "react";
import { useAuth } from "@/features/firebaseAuth/hooks/useAuth";
import { addUserStatModule } from "../api/usersCollection";
import { ButtonModulePane } from "./buttonModulePane";
import { StatModuleData } from "../types/display";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaBars } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { getColorNameByHex } from "@/lib/utils";

/**
 * Stat module pane for a single game, displaying all information about the stat module. The user
 * can select the stat module pane to add it to their personalised list of stat modules.
 *
 * @param props Component props
 * @returns Stat module pane
 */
export const StatModulePane = ({
    data,
    deleteStatModule,
}: {
    data: StatModuleData;
    deleteStatModule: (statModuleId: string) => void;
}) => {
    const { currentUser } = useAuth();

    const [themeColorName, setThemeColorName] = useState(data.themeColor);
    useMemo(() => {
        const getThemeColorName = async () => {
            setThemeColorName(await getColorNameByHex(data.themeColor));
        };

        getThemeColorName();
    }, [data.themeColor]);

    return (
        <Card
            className="flex flex-col justify-between border-2 shadow-md"
            style={{ borderColor: data.themeColor }}
        >
            <div>
                <CardHeader>
                    <CardTitle>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <h2 className="w-52 cursor-default truncate text-xl font-bold">
                                    {data.gameName}
                                </h2>
                            </TooltipTrigger>
                            <TooltipContent className="-translate-y-1">
                                {data.gameName}
                            </TooltipContent>
                        </Tooltip>
                    </CardTitle>
                    <CardAction>
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger>
                                <FaBars />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuItem
                                    onClick={() => {
                                        addUserStatModule(currentUser!.uid, data.id);
                                    }}
                                >
                                    Add to List
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        deleteStatModule(data.id);
                                    }}
                                >
                                    Delete from Global
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <div
                        className="flex justify-between rounded-md bg-white p-1 text-sm text-black dark:bg-zinc-800 dark:text-white"
                        style={{ backgroundColor: `${data.themeColor}25` }}
                    >
                        <span>Theme: {themeColorName}</span>
                        <span className="font-mono">{data.themeColor}</span>
                    </div>

                    <div
                        className="rounded-md bg-white p-1 text-sm text-black dark:bg-zinc-800 dark:text-white"
                        style={{ backgroundColor: `${data.themeColor}25` }}
                    >
                        Hard mode:{" "}
                        {data.hardModeMultiplier !== 1 ? `×${data.hardModeMultiplier}` : "N/A"}
                    </div>

                    <>
                        {data.inputModules.map((inputModule) => (
                            <ButtonModulePane
                                key={inputModule.id}
                                data={inputModule}
                                themeColor={data.themeColor}
                            />
                        ))}
                    </>
                </CardContent>
            </div>
            <CardFooter className="flex w-full justify-end gap-2">
                <Button className="bg-rankle text-black hover:bg-rankle-hover">Preview</Button>
            </CardFooter>
        </Card>
    );
};
