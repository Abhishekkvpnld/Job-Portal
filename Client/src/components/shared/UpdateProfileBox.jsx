import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  FileText,
  Code2,
  Upload,
  Loader2,
  X,
  Save,
  Sparkles,
  FileCheck2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

import { USER_API_END_POINT } from "@/utils/constants";
import { setAuthUser } from "@/redux/authSlice";

const UpdateProfileBox = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phone: "",
    bio: "",
    skills: "",
    file: null,
  });

  /* ============================================================
     SET USER DATA WHEN DIALOG OPENS
  ============================================================ */

  useEffect(() => {
    if (user) {
      setInput({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phone: user?.phone || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: null,
      });

      setSelectedFile(null);
    }
  }, [user, open]);

  /* ============================================================
     INPUT HANDLER
  ============================================================ */

  const changeEventHandler = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ============================================================
     FILE HANDLER
  ============================================================ */

  const fileHandler = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF resume.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Resume size must be less than 5MB.");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);

    setInput((prev) => ({
      ...prev,
      file,
    }));
  };

  /* ============================================================
     SUBMIT
  ============================================================ */

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.fullname.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!input.email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    const formData = new FormData();

    formData.append("fullname", input.fullname.trim());
    formData.append("email", input.email.trim());
    formData.append("phone", input.phone.trim());
    formData.append("bio", input.bio.trim());

    /*
      Convert:
      "React, Node.js, MongoDB"

      into:

      ["React", "Node.js", "MongoDB"]

      If your backend expects a string instead,
      keep the original value here.
    */
    const skillsArray = input.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    formData.append("skills", JSON.stringify(skillsArray));

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setAuthUser(res.data.data));

        toast.success(
          res.data.message || "Profile updated successfully."
        );

        setOpen(false);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     FIELD COMPONENT
  ============================================================ */

  const FieldWrapper = ({
    icon: Icon,
    label,
    name,
    children,
  }) => {
    return (
      <div className="space-y-2">
        <Label
          htmlFor={name}
          className="flex items-center gap-2 text-xs font-semibold text-slate-700"
        >
          <Icon className="h-3.5 w-3.5 text-blue-500" />
          {label}
        </Label>

        {children}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-0 shadow-2xl"
      >
        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-7 text-white sm:px-8">
          {/* Background decoration */}
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="absolute -bottom-20 left-20 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
              <User className="h-6 w-6 text-blue-300" />
            </div>

            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl font-bold tracking-tight text-white">
                Update your profile
              </DialogTitle>

              <p className="mt-1 text-sm text-slate-300">
                Keep your profile updated so recruiters can discover you.
              </p>
            </DialogHeader>

            <div className="mt-5 flex items-center gap-2 text-xs text-slate-300">
              <Sparkles className="h-3.5 w-3.5 text-blue-300" />
              A complete profile can help showcase your skills better.
            </div>
          </div>
        </div>

        {/* ======================================================
            FORM
        ====================================================== */}

        <form onSubmit={submitHandler}>
          <div className="space-y-6 px-6 py-6 sm:px-8">

            {/* Personal information */}
            <div>
              <div className="mb-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Personal information
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Update your basic contact information.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Full name */}
                <FieldWrapper
                  icon={User}
                  label="Full name"
                  name="fullname"
                >
                  <Input
                    id="fullname"
                    name="fullname"
                    type="text"
                    value={input.fullname}
                    onChange={changeEventHandler}
                    placeholder="Enter your full name"
                    className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-sm transition-all focus:border-blue-400 focus:bg-white focus:ring-blue-100"
                  />
                </FieldWrapper>

                {/* Email */}
                <FieldWrapper
                  icon={Mail}
                  label="Email address"
                  name="email"
                >
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    placeholder="you@example.com"
                    className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-sm transition-all focus:border-blue-400 focus:bg-white focus:ring-blue-100"
                  />
                </FieldWrapper>

                {/* Phone */}
                <FieldWrapper
                  icon={Phone}
                  label="Phone number"
                  name="phone"
                >
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={input.phone}
                    onChange={changeEventHandler}
                    placeholder="Enter phone number"
                    className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-sm transition-all focus:border-blue-400 focus:bg-white focus:ring-blue-100"
                  />
                </FieldWrapper>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100" />

            {/* ==================================================
                PROFESSIONAL INFORMATION
            ================================================== */}

            <div>
              <div className="mb-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Professional information
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Tell recruiters about your experience and technical skills.
                </p>
              </div>

              <div className="space-y-5">

                {/* Bio */}
                <FieldWrapper
                  icon={FileText}
                  label="Professional bio"
                  name="bio"
                >
                  <textarea
                    id="bio"
                    name="bio"
                    value={input.bio}
                    onChange={changeEventHandler}
                    rows={4}
                    placeholder="Write a short introduction about yourself..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </FieldWrapper>

                {/* Skills */}
                <FieldWrapper
                  icon={Code2}
                  label="Skills"
                  name="skills"
                >
                  <Input
                    id="skills"
                    name="skills"
                    value={input.skills}
                    onChange={changeEventHandler}
                    placeholder="React, Node.js, MongoDB, TypeScript"
                    className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-sm transition-all focus:border-blue-400 focus:bg-white focus:ring-blue-100"
                  />

                  <p className="text-[11px] text-slate-400">
                    Separate multiple skills using commas.
                  </p>
                </FieldWrapper>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100" />

            {/* ==================================================
                RESUME
            ================================================== */}

            <div>
              <div className="mb-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Resume
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Upload your latest resume in PDF format.
                </p>
              </div>

              <label
                htmlFor="resume"
                className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-6 py-8 text-center transition-all duration-300 hover:border-blue-300 hover:bg-blue-50/30"
              >
                <motion.div
                  whileHover={{ y: -3 }}
                  className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${
                    selectedFile
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {selectedFile ? (
                    <FileCheck2 className="h-6 w-6" />
                  ) : (
                    <Upload className="h-6 w-6" />
                  )}
                </motion.div>

                {selectedFile ? (
                  <>
                    <p className="text-sm font-semibold text-emerald-700">
                      {selectedFile.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Click to choose a different file
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-slate-700">
                      Upload your resume
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      PDF only · Maximum 5MB
                    </p>
                  </>
                )}

                <Input
                  id="resume"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={fileHandler}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* ======================================================
              FOOTER
          ====================================================== */}

          <DialogFooter className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:px-8">
            <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="h-11 rounded-xl border-slate-200 bg-white px-5 text-sm font-semibold"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="h-11 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-700 hover:to-violet-700 hover:shadow-blue-500/30"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileBox;