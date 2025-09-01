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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

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
        <Card className="flex flex-col justify-between border-2 shadow-md">
            <div>
                <CardHeader>
                    <CardTitle>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <a className="flex" href={data.link} rel="noopener" target="_blank">
                                    <h2 className="w-52 truncate text-xl font-bold">
                                        {data.gameName}
                                    </h2>
                                </a>
                            </TooltipTrigger>
                            <TooltipContent className="-translate-y-1">
                                {data.gameName}
                            </TooltipContent>
                        </Tooltip>
                    </CardTitle>
                    <CardAction>
                        <AlertDialog>
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
                                    <AlertDialogTrigger asChild>
                                        <DropdownMenuItem>Delete from Global</DropdownMenuItem>
                                    </AlertDialogTrigger>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        &quot;{data.gameName}&quot; will be lost forever! (A long
                                        time!)
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        className="bg-rankle text-black hover:bg-rankle-hover"
                                        onClick={() => {
                                            deleteStatModule(data.id);
                                        }}
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
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
                <Button
                    onClick={() => {
                        toast.info("Work in progress!");
                    }}
                    className="bg-rankle text-black hover:bg-rankle-hover"
                >
                    Preview
                </Button>
            </CardFooter>
        </Card>
    );
};
