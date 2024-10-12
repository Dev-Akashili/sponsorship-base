import { z } from "zod";
import { PageTitle } from "@/components/core/PageTitle";
import { FormInput } from "@/components/forms/FormInput";
import { FormLayout } from "@/layout/FormLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sponsorshipFormSchema } from "./validationSchema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LoadingPage, Spinner } from "@/components/core/Loader";
import { useContext, useEffect, useState } from "react";
import { FormSelect } from "@/components/forms/FormSelect";
import {
  addSponsorship,
  getSponsorship,
  updateSponsorship
} from "@/api/sponsorship";
import { AddOrEditSponsorship, Sponsorship } from "@/types/sponsorship";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";
import {
  COUNTRIES,
  COUNTRIES_AND_CITIES,
  CURRENCIES,
  EDUCATION,
  EXPERIENCE,
  INDUSTRIES,
  JOB_BOARDS,
  MONTHS,
  SALARIES,
  YEARS
} from "@/constants/Forms.constants";
import { toast } from "react-toastify";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/Messages.constants";
import { AuthContext } from "@/context/Auth";
import { ROLES } from "@/constants/Auth.constants";

export const AddOrEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const searchParams = new URLSearchParams(location.search);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cityDisabled, setCityDisabled] = useState<boolean>(true);
  const [showNewJobBoard, setShowNewJobBoard] = useState<boolean>(false);
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [data, setData] = useState<Sponsorship | undefined>(undefined);

  useEffect(() => {
    const get = async (id: string) => {
      const result = await getSponsorship(id);
      if (result.id === id) {
        setData(result);
        reset({
          company: result.company?.name || "",
          country: result.country || "",
          city: result.city || "",
          industry: result.industry || "",
          jobTitle: result.jobTitle || "",
          experience: result.experience || "",
          salary: result.salary || "",
          currency: result.currency || "",
          education: result.education || "",
          countryOfQualification: result.countryOfQualification || "",
          month: result.month || "",
          year: result.year || "",
          jobBoard: result.jobBoard?.name || "",
          newJobBoardName: "",
          newJobBoardLink: "",
          companyCareerPage: ""
        });
        if (result.country) {
          setCityDisabled(false);
          handleCountryChange(result.country);
          form.setValue("city", result.city);
          setCityDisabled(true);
        }
        setPageLoaded(true);
      } else {
        navigate(-1);
        toast.error(DEFAULT_ERROR_MESSAGE);
      }
    };

    if (location.pathname.includes("edit")) {
      setIsEdit(true);
      const id = searchParams.get("id") ?? "";
      get(id);
    } else {
      setIsEdit(false);
      reset({
        company: "",
        country: "",
        city: "",
        industry: "",
        jobTitle: "",
        experience: "",
        salary: "",
        currency: "",
        education: "",
        countryOfQualification: "",
        month: "",
        year: "",
        jobBoard: "",
        newJobBoardName: "",
        newJobBoardLink: "",
        companyCareerPage: ""
      });
      setPageLoaded(true);
    }
  }, [location.pathname]);

  const form = useForm<z.infer<typeof sponsorshipFormSchema>>({
    resolver: zodResolver(sponsorshipFormSchema),
    defaultValues: {
      company: data ? data.company?.name : "",
      country: data ? data.country : "",
      city: data ? data.city : "",
      industry: data ? data.industry : "",
      jobTitle: data ? data.jobTitle : "",
      experience: data ? data.experience : "",
      salary: data ? data.salary : "",
      currency: data ? data.currency : "",
      education: data ? data.education : "",
      countryOfQualification: data ? data.countryOfQualification : "",
      month: data ? data.month : "",
      year: data ? data.year : "",
      jobBoard: data ? data.jobBoard?.name : "",
      newJobBoardName: "",
      newJobBoardLink: "",
      companyCareerPage: ""
    }
  });

  const { reset } = form;

  async function onSubmit(values: z.infer<typeof sponsorshipFormSchema>) {
    setIsLoading(true);
    try {
      if (!isEdit) {
        const request = await addSponsorship(values as AddOrEditSponsorship);
        if (request.ok) {
          reset();
          toast.success("Successfully added! Thank you for contributing");
          navigate(ROUTES.list);
        } else {
          toast.error(DEFAULT_ERROR_MESSAGE);
        }
      } else {
        const request = await updateSponsorship(
          values as AddOrEditSponsorship,
          data?.id ?? ""
        );
        if (request.ok) {
          toast.success("Sponsorship details updated");
        } else {
          toast.error(DEFAULT_ERROR_MESSAGE);
        }
      }
    } catch (error) {
      console.warn(error);
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
    setIsLoading(false);
  }

  const handleCountryChange = (selectedCountry: string) => {
    const country = COUNTRIES_AND_CITIES.find(
      (item) => item.country === selectedCountry
    );
    setCityOptions(country ? country.cities : []);
    form.setValue("city", isEdit ? data?.city ?? "" : "");

    if (!isEdit) {
      form.setValue("city", "");
      setCityDisabled(false);
    }
  };

  const handleJobBoardChange = (selectedJobBoard: string) => {
    if (selectedJobBoard === "Other") {
      setShowNewJobBoard(true);
    } else {
      setShowNewJobBoard(false);
    }
  };

  return (
    <>
      <PageTitle title={"Add Your Sponsorship Job"} />
      {!pageLoaded ? (
        <LoadingPage />
      ) : (
        <FormLayout size="lg">
          <p className="text-slate-600 dark:text-white mb-4">
            Contribute by adding details about your sponsorship
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormInput
                form={form}
                name="company"
                label="Company"
                disabled={isEdit && !user?.roles.includes(ROLES.Admin)}
              />
              <div className="flex justify-between">
                <FormSelect
                  form={form}
                  label="Country"
                  name="country"
                  width={"49%"}
                  options={COUNTRIES_AND_CITIES.map((item) => item.country)}
                  onChange={handleCountryChange}
                  disabled={isEdit}
                />
                <FormSelect
                  form={form}
                  label="City"
                  name="city"
                  width={"49%"}
                  disabled={cityDisabled}
                  options={cityOptions}
                />
              </div>
              <FormInput
                form={form}
                label="Job Title"
                name="jobTitle"
                placeholder="e.g Software Engineer"
              />
              <div className="flex justify-between">
                <FormSelect
                  form={form}
                  label="Industry"
                  name="industry"
                  options={INDUSTRIES}
                  width={"57%"}
                />
                <FormSelect
                  form={form}
                  label="Experience level"
                  name="experience"
                  options={EXPERIENCE}
                  width={"41%"}
                />
              </div>
              <div className="flex justify-between">
                <FormSelect
                  form={form}
                  label="Salary Range"
                  name="salary"
                  options={SALARIES}
                  width={"70%"}
                  disabled={isEdit}
                />
                <FormSelect
                  form={form}
                  label="Currency"
                  name="currency"
                  placeholder={<p className="text-slate-400">e.g GBP</p>}
                  options={CURRENCIES}
                  width={"28%"}
                  disabled={isEdit}
                />
              </div>
              <div className="flex justify-between">
                <FormSelect
                  form={form}
                  label="Highest level of education"
                  name="education"
                  options={EDUCATION}
                  width={"50%"}
                  disabled={isEdit}
                />
                <FormSelect
                  form={form}
                  label="Recent qualification from"
                  name="countryOfQualification"
                  options={COUNTRIES}
                  width={"48%"}
                  disabled={isEdit}
                />
              </div>
              <p className="mt-4 text-slate-700 dark:text-white text-sm font-medium">
                Date of sponsorship
              </p>
              <div className="flex justify-between">
                <FormSelect
                  form={form}
                  label="Month"
                  name="month"
                  width={"49%"}
                  options={MONTHS}
                />
                <FormSelect
                  form={form}
                  label="Year"
                  name="year"
                  width={"49%"}
                  options={YEARS}
                />
              </div>
              <FormSelect
                form={form}
                label="Job board"
                name="jobBoard"
                options={JOB_BOARDS}
                onChange={handleJobBoardChange}
                disabled={isEdit && !user?.roles.includes(ROLES.Admin)}
              />
              {showNewJobBoard && (
                <>
                  <p className="mt-4 text-slate-700 text-sm font-medium">
                    If 'Other' please specify
                  </p>
                  <FormInput form={form} label="Name" name="newJobBoardName" />
                </>
              )}
              {user?.roles.includes(ROLES.Admin) && (
                <div className="flex justify-between">
                  <FormInput
                    form={form}
                    label="Job board link"
                    name="newJobBoardLink"
                    width={"48%"}
                  />
                  <FormInput
                    form={form}
                    label="Company career page"
                    name="companyCareerPage"
                    width={"48%"}
                  />
                </div>
              )}
              <Button
                type="submit"
                disabled={isLoading}
                className="sponsorship-base dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white mt-6 w-full"
              >
                {isLoading ? <Spinner /> : isEdit ? "Update" : "Submit"}
              </Button>
            </form>
          </Form>
        </FormLayout>
      )}
    </>
  );
};
