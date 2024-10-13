import { PageTitle } from "@/components/core/PageTitle";
import { ROUTES } from "./routes";

export const TermsAndConditions = () => {
  return (
    <>
      <PageTitle title={"Terms And Conditions"} />
      <div className="flex flex-col space-y-4 mt-14 mb-40 px-40 dark:text-white">
        <h1 className="text-3xl text-blue-600 text-center font-semibold">
          Terms and Conditions of Service
        </h1>
        <p className="text-sm font-semibold">
          Last Updated: <span className="font-thin italic">11/08/202</span>
        </p>
        <p>
          Welcome to SponsorshipBase! By accessing or using our website, you
          agree to be bound by the following terms and conditions. Please read
          them carefully.
        </p>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold dark:text-blue-600">1. Use of the Website</h2>
          <ol className="list-disc pl-6">
            <li>
              You must be at least 18 years old to register and contribute to
              SponsorshipBase.
            </li>
            <li>
              The content shared on SponsorshipBase is for informational
              purposes only.
            </li>
            <li>
              SponsorshipBase does not guarantee job offers or sponsorships.
            </li>
            <li>
              Registered users can add, edit, and delete their contributions, as
              well as delete their accounts.
            </li>
            <li>
              Non-registered users may browse and share posts but cannot
              contribute or manage posts.
            </li>
          </ol>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold dark:text-blue-600">2. Contributions</h2>
          <p>When contributing job-related information, you agree:</p>
          <ol className="list-disc pl-6">
            <li>
              That the information provided is truthful and accurate to the best
              of your knowledge.
            </li>
            <li>Not to upload any false, misleading, or unlawful content.</li>
            <li>
              That your submission will be reviewed by an admin before it
              becomes visible to the public.
            </li>
            <li>
              That SponsorshipBase reserves the right to edit or remove posts
              that violate these terms.
            </li>
          </ol>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold dark:text-blue-600">3. Intellectual Property</h2>
          <p>
            The content on SponsorshipBase is protected by intellectual property
            laws. You may not reproduce, distribute, or create derivative works
            based on our content without permission.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold dark:text-blue-600">4. Account Responsibility</h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials. Any activities that occur under your account
            are your responsibility. If you suspect unauthorized use of your
            account, you must notify us immediately.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold dark:text-blue-600">5. Prohibited Activities</h2>
          <p>You agree not to:</p>
          <ol className="list-disc pl-6">
            <li>Use the website for any illegal activities.</li>
            <li>Post harmful, defamatory, or offensive content.</li>
            <li>
              Attempt to hack or disrupt the functionality of the website.
            </li>
          </ol>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold dark:text-blue-600">6. Reporting and Moderation</h2>
          <p>
            Users can report any inappropriate content they encounter.
            SponsorshipBase reserves the right to remove or block content and
            accounts that violate these terms.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold dark:text-blue-600">7. Disclaimer of Warranties</h2>
          <p>
            SponsorshipBase is provided "as is" without any warranties or
            guarantees. We do not guarantee the accuracy, completeness, or
            reliability of the information posted by users.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold dark:text-blue-600">8. Limitation of Liability</h2>
          <p>
            SponsorshipBase is not liable for any damages arising from your use
            of the website or reliance on any information provided.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold dark:text-blue-600">9. Changes to the Terms</h2>
          <p>
            We reserve the right to modify these Terms and Conditions at any
            time. Changes will be posted, and your continued use of the website
            signifies your acceptance.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold dark:text-blue-600">Contact Us</h2>
          <p>
            If you have any questions regarding this Privacy Policy, please
            contact us by clicking{" "}
            <span>
              <a href={ROUTES.contact} className="text-blue-600 dark:text-blue-500 underline">
                here
              </a>
            </span>
            .
          </p>
        </div>
      </div>
    </>
  );
};
