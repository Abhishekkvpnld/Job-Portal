import {
    BriefcaseBusiness,
    Building2,
    CalendarDays,
    CheckCircle2,
    Clock3,
    FileSearch,
    XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import { Badge } from "../ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

const AppliedJobTable = () => {
    const { allAppliedJobs = [] } = useSelector(
        (store) => store.jobs
    );

    const getStatusConfig = (status) => {
        switch (status?.toLowerCase()) {
            case "rejected":
                return {
                    label: "Rejected",
                    className:
                        "border-red-200 bg-red-50 text-red-700 hover:bg-red-50",
                    icon: XCircle,
                };

            case "accepted":
            case "selected":
                return {
                    label:
                        status.charAt(0).toUpperCase() +
                        status.slice(1),
                    className:
                        "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50",
                    icon: CheckCircle2,
                };

            default:
                return {
                    label: "Pending",
                    className:
                        "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50",
                    icon: Clock3,
                };
        }
    };

    const formatDate = (date) => {
        if (!date) return "N/A";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "N/A";
        }

        return parsedDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    if (allAppliedJobs.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center"
            >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
                    <FileSearch className="h-7 w-7" />
                </div>

                <h3 className="mt-4 font-semibold text-slate-800">
                    No applications yet
                </h3>

                <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
                    You haven't applied to any jobs yet. Explore available
                    opportunities and start your job search.
                </p>
            </motion.div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200">
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 hover:bg-slate-50">
                            <TableHead className="font-semibold text-slate-600">
                                Applied
                            </TableHead>

                            <TableHead className="font-semibold text-slate-600">
                                Company
                            </TableHead>

                            <TableHead className="font-semibold text-slate-600">
                                Job Role
                            </TableHead>

                            <TableHead className="text-right font-semibold text-slate-600">
                                Status
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {allAppliedJobs.map((item, index) => {
                            const status = getStatusConfig(item?.status);
                            const StatusIcon = status.icon;

                            return (
                                <motion.tr
                                    key={item?._id || index}
                                    initial={{
                                        opacity: 0,
                                        y: 8,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        delay: index * 0.04,
                                    }}
                                    className="border-b border-slate-100 transition-colors hover:bg-slate-50/70"
                                >
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <CalendarDays className="h-4 w-4 text-slate-400" />
                                            {formatDate(item?.createdAt)}
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                                <Building2 className="h-4 w-4" />
                                            </div>

                                            <span className="font-semibold text-slate-700">
                                                {item?.job?.company?.name ||
                                                    "Unknown Company"}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <BriefcaseBusiness className="h-4 w-4 text-slate-400" />

                                            <span className="font-medium text-slate-700">
                                                {item?.job?.title ||
                                                    "Unknown Position"}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <Badge
                                            variant="outline"
                                            className={`rounded-full px-3 py-1 font-medium ${status.className}`}
                                        >
                                            <StatusIcon className="mr-1.5 h-3.5 w-3.5" />
                                            {status.label}
                                        </Badge>
                                    </TableCell>
                                </motion.tr>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile cards */}
            <div className="space-y-3 p-3 md:hidden">
                {allAppliedJobs.map((item, index) => {
                    const status = getStatusConfig(item?.status);
                    const StatusIcon = status.icon;

                    return (
                        <motion.div
                            key={item?._id || index}
                            initial={{
                                opacity: 0,
                                y: 10,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: index * 0.05,
                            }}
                            className="rounded-2xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-sm"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <Building2 className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="truncate font-semibold text-slate-800">
                                            {item?.job?.company?.name ||
                                                "Unknown Company"}
                                        </h3>

                                        <p className="truncate text-sm text-slate-500">
                                            {item?.job?.title ||
                                                "Unknown Position"}
                                        </p>
                                    </div>
                                </div>

                                <Badge
                                    variant="outline"
                                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs ${status.className}`}
                                >
                                    <StatusIcon className="mr-1 h-3 w-3" />
                                    {status.label}
                                </Badge>
                            </div>

                            <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-xs text-slate-400">
                                <CalendarDays className="h-3.5 w-3.5" />
                                Applied on {formatDate(item?.createdAt)}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default AppliedJobTable;