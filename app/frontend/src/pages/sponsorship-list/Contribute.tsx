import { z } from "zod";
import { PageTitle } from "@/components/core/PageTitle";
import { FormInput } from "@/components/forms/FormInput";
import { FormLayout } from "@/layout/FormLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sponsorshipFormSchema } from "./validationSchema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/core/Loader";
import { useState } from "react";
import { FormSelect } from "@/components/forms/FormSelect";
import { addSponsorship } from "@/api/sponsorship";
import { AddSponsorship } from "@/types/sponsorship";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";
import {
  COUNTRIES,
  COUNTRIES_AND_CITIES,
  CURRENCIES,
  EDUCATION,
  EXPERIENCE,
  JOB_BOARDS,
  MONTHS,
  SALARIES,
  YEARS
} from "@/constants/Forms.constants";
import { toast } from "react-toastify";

export const Contribute = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cityDisabled, setCityDisabled] = useState<boolean>(true);
  const [showNewJobBoard, setShowNewJobBoard] = useState<boolean>(false);
  const [cityOptions, setCityOptions] = useState<string[]>([]);

  const form = useForm<z.infer<typeof sponsorshipFormSchema>>({
    resolver: zodResolver(sponsorshipFormSchema),
    defaultValues: {
      company: "",
      country: "",
      city: "",
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
      newJobBoardLink: ""
    }
  });

  const { reset } = form;

  async function onSubmit(values: z.infer<typeof sponsorshipFormSchema>) {
    setIsLoading(true);
    try {
      const request = await addSponsorship(values as AddSponsorship);
      if (request.ok) {
        reset();
        toast.success("Successfully added! Thank you for contributing");
        navigate(ROUTES.list);
      } else {
        toast.error("Something went wrong! Please try again later");
      }
    } catch (error) {
      console.warn(error);
      toast.error("Something went wrong! Please try again later");
    }
    setIsLoading(false);
  }

  const handleCountryChange = (selectedCountry: string) => {
    setCityDisabled(false);
    const country = COUNTRIES_AND_CITIES.find(
      (item) => item.country === selectedCountry
    );
    setCityOptions(country ? country.cities : []);
    form.setValue("city", "");
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
      <div className="my-32">
        <FormLayout size="lg">
          <p className="text-slate-600 mb-4">
            Contribute by adding details about your sponsorship
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormInput form={form} name="company" label="Company" />
              <div className="flex justify-between">
                <FormSelect
                  form={form}
                  label="Country"
                  name="country"
                  width={"49%"}
                  options={COUNTRIES_AND_CITIES.map((item) => item.country)}
                  onChange={handleCountryChange}
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
              <div className="flex justify-between">
                <FormInput
                  form={form}
                  label="Job Title"
                  name="jobTitle"
                  placeholder="e.g Software Engineer"
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
                />
                <FormSelect
                  form={form}
                  label="Currency"
                  name="currency"
                  placeholder={<p className="text-slate-400">e.g GBP</p>}
                  options={CURRENCIES}
                  width={"28%"}
                />
              </div>
              <div className="flex justify-between">
                <FormSelect
                  form={form}
                  label="Highest level of education"
                  name="education"
                  options={EDUCATION}
                  width={"50%"}
                />
                <FormSelect
                  form={form}
                  label="Recent qualification from"
                  name="countryOfQualification"
                  options={COUNTRIES}
                  width={"48%"}
                />
              </div>
              <p className="mt-4 text-slate-700 text-sm font-medium">
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
              />
              {showNewJobBoard && (
                <>
                  <p className="mt-4 text-slate-700 text-sm font-medium">
                    If 'Other' please specify
                  </p>
                  <div className="flex justify-between">
                    <FormInput
                      form={form}
                      label="Name"
                      name="newJobBoardName"
                      width={"48%"}
                    />
                    <FormInput
                      form={form}
                      label="Link to website"
                      name="newJobBoardLink"
                      width={"48%"}
                    />
                  </div>
                </>
              )}
              <Button
                type="submit"
                disabled={isLoading}
                className="sponsorship-base mt-6 w-full"
              >
                {isLoading ? <Spinner /> : "Submit"}
              </Button>
            </form>
          </Form>
        </FormLayout>
      </div>
    </>
  );
};
