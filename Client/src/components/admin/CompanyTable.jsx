import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  CalendarDays,
  Edit3,
  MoreHorizontal,
  SearchX,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

import { Badge } from "../ui/badge";

const CompanyTable = () => {
  const navigate = useNavigate();

  const { companies, searchCompany } = useSelector(
    (store) => store.company
  );

  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const companyList = Array.isArray(companies) ? companies : [];
    const query = searchCompany?.trim().toLowerCase();

    if (!query) {
      setFilter(companyList);
      return;
    }

    const filteredCompanies = companyList.filter((company) => {
      const name = company?.name?.toLowerCase() || "";
      const location = company?.location?.toLowerCase() || "";
      const description = company?.description?.toLowerCase() || "";

      return (
        name.includes(query) ||
        location.includes(query) ||
        description.includes(query)
      );
    });

    setFilter(filteredCompanies);
  }, [companies, searchCompany]);

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (name = "") => {
    const initials = name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();

    return initials || "CO";
  };

  return (
    <div>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-100 bg-slate-50/70 hover:bg-slate-50/70">
              <TableHead className="h-12 pl-6 text-xs font-bold uppercase tracking-wider text-slate-500">
                Company
              </TableHead>

              <TableHead className="h-12 text-xs font-bold uppercase tracking-wider text-slate-500">
                Industry
              </TableHead>

              <TableHead className="h-12 text-xs font-bold uppercase tracking-wider text-slate-500">
                Location
              </TableHead>

              <TableHead className="h-12 text-xs font-bold uppercase tracking-wider text-slate-500">
                Registered
              </TableHead>

              <TableHead className="h-12 pr-6 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filter.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-80">
                  <EmptyState searchCompany={searchCompany} />
                </TableCell>
              </TableRow>
            ) : (
              filter.map((company, index) => (
                <motion.tr
                  key={company?._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: Math.min(index * 0.04, 0.3),
                  }}
                  className="group border-slate-100 transition-colors hover:bg-slate-50/80"
                >
                  {/* Company */}
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <CompanyAvatar
                        company={company}
                        getInitials={getInitials}
                      />

                      <div className="min-w-0">
                        <p className="max-w-[220px] truncate font-semibold text-slate-900">
                          {company?.name || "Unnamed Company"}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Employer profile
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Industry */}
                  <TableCell>
                    {company?.industry ? (
                      <Badge className="border-0 bg-blue-50 text-blue-600 hover:bg-blue-50">
                        {company.industry}
                      </Badge>
                    ) : (
                      <span className="text-sm text-slate-400">
                        Not specified
                      </span>
                    )}
                  </TableCell>

                  {/* Location */}
                  <TableCell>
                    <span className="text-sm text-slate-500">
                      {company?.location || "Not specified"}
                    </span>
                  </TableCell>

                  {/* Date */}
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <CalendarDays className="h-4 w-4 text-slate-400" />

                      {formatDate(company?.createdAt)}
                    </div>
                  </TableCell>

                  {/* Action */}
                  <TableCell className="pr-6 text-right">
                    <CompanyActions
                      company={company}
                      navigate={navigate}
                    />
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 p-4 md:hidden">
        {filter.length === 0 ? (
          <div className="py-16">
            <EmptyState searchCompany={searchCompany} />
          </div>
        ) : (
          filter.map((company, index) => (
            <motion.div
              key={company?._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                delay: index * 0.04,
              }}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <CompanyAvatar
                    company={company}
                    getInitials={getInitials}
                  />

                  <div className="min-w-0">
                    <p className="truncate font-bold text-slate-900">
                      {company?.name || "Unnamed Company"}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Employer profile
                    </p>
                  </div>
                </div>

                <CompanyActions
                  company={company}
                  navigate={navigate}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-slate-50 px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Industry
                  </p>

                  <p className="mt-1 truncate text-xs font-semibold text-slate-600">
                    {company?.industry || "Not specified"}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Registered
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-600">
                    {formatDate(company?.createdAt)}
                  </p>
                </div>
              </div>

              {company?.location && (
                <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2">
                  <p className="text-xs font-medium text-slate-500">
                    📍 {company.location}
                  </p>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Footer */}
      {filter.length > 0 && (
        <div className="border-t border-slate-100 px-5 py-4 sm:px-6">
          <p className="text-xs font-medium text-slate-400">
            Showing{" "}
            <span className="font-bold text-slate-600">
              {filter.length}
            </span>{" "}
            {filter.length === 1 ? "company" : "companies"}
            {searchCompany && (
              <>
                {" "}
                matching{" "}
                <span className="font-semibold text-slate-600">
                  "{searchCompany}"
                </span>
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

/* ---------------- Company Avatar ---------------- */

const CompanyAvatar = ({ company, getInitials }) => {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 text-sm font-bold text-blue-600">
      {company?.logo ? (
        <img
          src={company.logo}
          alt={company?.name || "Company"}
          className="h-full w-full object-cover"
        />
      ) : (
        getInitials(company?.name)
      )}
    </div>
  );
};

/* ---------------- Actions ---------------- */

const CompanyActions = ({ company, navigate }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-44 rounded-xl border-slate-200 p-2 shadow-xl"
      >
        <button
          type="button"
          onClick={() =>
            navigate(`/admin/companies/${company?._id}`)
          }
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
        >
          <Edit3 className="h-4 w-4" />
          Edit Company
        </button>
      </PopoverContent>
    </Popover>
  );
};

/* ---------------- Empty State ---------------- */

const EmptyState = ({ searchCompany }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
        {searchCompany ? (
          <SearchX className="h-7 w-7 text-slate-400" />
        ) : (
          <Building2 className="h-7 w-7 text-slate-400" />
        )}
      </div>

      <h3 className="text-base font-bold text-slate-900">
        {searchCompany
          ? "No companies found"
          : "No companies registered"}
      </h3>

      <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">
        {searchCompany
          ? `We couldn't find any company matching "${searchCompany}". Try another search.`
          : "Your registered companies will appear here once you create your first company profile."}
      </p>
    </div>
  );
};

export default CompanyTable;