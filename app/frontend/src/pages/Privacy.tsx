import { PageTitle } from "@/components/core/PageTitle";
import { ROUTES } from "./routes";

export const PrivacyPolicy = () => {
  return (
    <>
      <PageTitle title={"Privacy Policy"} />
      <div className="flex flex-col space-y-4 mt-32 mb-40 px-40">
        <h1 className="text-3xl text-blue-600 text-center font-semibold">
          Privacy Policy
        </h1>
        <p className="text-sm font-semibold">
          Last Updated: <span className="font-thin italic">11/08/202</span>
        </p>
        <p>
          At SponsorshipBase, we take your privacy seriously. This Privacy
          Policy outlines how we collect, use, and protect your personal data
          when you visit and interact with our website.
        </p>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold">1. Information We Collect</h2>
          <p>
            When you register on SponsorshipBase, we collect the following
            information:
          </p>
          <ol className="list-disc pl-6">
            <li>Email address</li>
            <li>Sex</li>
            <li>Nationality</li>
            <li>Password</li>
          </ol>
          <p>When you contribute information, we also collect:</p>
          <ol className="list-disc pl-6">
            <li>Company name</li>
            <li>Country and city where your company is located</li>
            <li>Industry your job falls into</li>
            <li>Job title</li>
            <li>Level of experience</li>
            <li>Salary range and currency</li>
            <li>Your current level of education</li>
            <li>Country of most recent education</li>
            <li>Date (month and year) you got sponsored</li>
            <li>Website where you found the job</li>
          </ol>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold">
            2. How We Use Your Information
          </h2>
          <p>The information you provide helps us:</p>
          <ol className="list-disc pl-6">
            <li>Display relevant visa sponsorship job data to users.</li>
            <li>Allow registered users to contribute and manage posts.</li>
            <li>
              Authenticate user access and enable user account management.
            </li>
            <li>Improve our website and user experience.</li>
          </ol>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold">
            3. Data Storage and Security
          </h2>
          <p>
            Your data is securely stored and encrypted. We implement security
            measures to protect against unauthorized access, disclosure, or
            alteration of your information. While we have taken reasonable steps
            to secure the personal information you provide to us, please be
            aware that despite our efforts, no security measures are perfect or
            impenetrable, and no method of data transmission can be guaranteed
            against any interception or other type of misuse.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold">4. Sharing Your Data</h2>
          <p>
            We do not share, sell, or distribute your personal information to
            third parties except when required by law. We may share generic
            aggregated demographic information not linked to any personal
            identification information regarding visitors and users with our
            business partners, trusted affiliates, and advertisers.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold">5. Data Retention</h2>
          <p>
            We retain your personal information as long as your account is
            active or as necessary to provide you with our services. You can
            request account deletion at any time, and all your posts will also
            be deleted.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold">6. Your Rights</h2>
          <p>As a user, you have the right to:</p>
          <ol className="list-disc pl-6">
            <li>Access, edit, or delete your personal data.</li>
            <li>Report any post or data on the platform.</li>
            <li>
              Withdraw your consent to data processing at any time by deleting
              your account.
            </li>
          </ol>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold">7. Cookies</h2>
          <p>
            SponsorshipBase may use cookies to enhance user experience. You can
            choose to disable cookies through your browser settings.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold">8. Third-Party Websites</h2>
          <p>
            Our website may contain links to third-party websites. We have no
            control over the content, privacy policies, or practices of any
            third-party sites or services.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold">
            9. Changes to this Privacy Policy
          </h2>
          <p>
            We reserve the right to update this policy. Changes will be posted
            on this page, and your continued use of SponsorshipBase signifies
            your acceptance of any changes.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold">Contact Us</h2>
          <p>
            If you have any questions regarding this Privacy Policy, please
            contact us by clicking{" "}
            <span>
              <a href={ROUTES.contact} className="text-blue-600 underline">
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
