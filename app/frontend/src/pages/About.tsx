import { PageTitle } from "@/components/core/PageTitle";
import { AUTH_ROUTES } from "./routes";

export const About = () => {
  return (
    <>
      <PageTitle title={"About"} />
      <div className="flex flex-col space-y-8 mt-14 mb-40 px-40 dark:text-white">
        <h1 className="text-3xl text-center font-semibold">
          About <span className="text-blue-600">SponsorshipBase</span>
        </h1>
        <p>
          Welcome to{" "}
          <span className="font-semibold text-blue-600">SponsorshipBase</span>,
          a platform for learning more about companies and job opportunities
          that offer visa sponsorship in the UK and Europe. Whether you’re
          looking to relocate from outside Europe, or currently in Europe
          looking to get sponsored or alredy at sponsored job and loooking for
          new opportunities, SponsorshipBase is here to connect you with the
          information you need.
        </p>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold dark:text-blue-600">
            Our Mission
          </h2>
          <p>
            At <span className="font-semibold">SponsorshipBase</span>, our aim
            is to simplify the job search process for international
            professionals by providing a centralized, user-friendly platform
            where verified visa sponsorship job opportunities are shared. Our
            goal is to empower job seekers with up-to-date, accurate
            information, making it easier to pursue careers abroad (primarily in
            UK and Europe for now) without navigating through endless websites
            or uncertain leads.
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold dark:text-blue-600">
            How It Works
          </h2>
          <p>
            SponsorshipBase relies on contributions from users who have
            successfully obtained jobs with visa sponsorship. Here's how it
            works:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <span className="font-semibold">Register</span> – Sign up with
              your email, nationality, and other basic details to get started.
            </li>
            <li>
              <span className="font-semibold">Contribute</span> – Share details
              of your job and visa sponsorship experience, including the company
              name, location, job title, salary range, and where you found the
              job. This helps build our database of verified information for
              other users.
            </li>
            <li>
              <span className="font-semibold">Review and Approve</span> – All
              contributions are reviewed by our admin team to ensure accuracy
              before being shared publicly.
            </li>
            <li>
              <span className="font-semibold"> Explore</span> – Visitors can
              browse the list of jobs, bookmark posts, and share or report them
              as needed. Registered users have full control over their posts and
              can edit or delete them at any time.
            </li>
          </ol>
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold dark:text-blue-600">
            Why SponsorshipBase?
          </h2>
          <p>
            Finding jobs with visa sponsorship can be a challenging process,
            especially when you're navigating complex immigration policies and
            job markets in different countries. SponsorshipBase takes the
            guesswork out of the equation by allowing real people to share their
            experiences and by curating information that is both practical and
            reliable.
          </p>
          <p>
            Whether you’re just starting your job search or looking for new
            opportunities, SponsorshipBase is designed to help you make informed
            decisions and increase your chances of success.
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold dark:text-blue-600">
            Who Can Use SponsorshipBase?
          </h2>
          <p>
            We retain your personal information as long as your account is
            active or as necessary to provide you with our services. You can
            request account deletion at any time, and all your posts will also
            be deleted.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-semibold">Job Seekers</span>: If you're
              looking for opportunities to work abroad and need visa
              sponsorship, SponsorshipBase provides insights into real jobs and
              companies that have offered sponsorship in the past.
            </li>
            <li>
              <span className="font-semibold">Contributors</span>: Those who
              have successfully landed a job with sponsorship are encouraged to
              share their experience and help others on a similar journey.
            </li>
          </ul>
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold dark:text-blue-600">
            What's to Come
          </h2>
          <p>
            At SponsorshipBase, we’re constantly evolving and looking toward the
            future. Here’s a sneak peek of some of the exciting features we’re
            working on:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-semibold">Global Expansion</span>: Soon, we
              will be expanding our reach beyond the UK and Europe to include
              visa sponsorship opportunities in the United States, Canada, and
              other regions around the world. Our goal is to create a truly
              global resource for anyone seeking job opportunities with
              sponsorship across various countries and industries.
            </li>
            <li>
              <span className="font-semibold">Services</span>: We understand
              that finding a job with sponsorship is just one part of the
              journey. In the future, we will introduce curated services that
              offer guidance on visa processes, immigration advice, and even
              resources for relocation and career coaching. These services will
              help make your transition smoother, from job search to securing
              visas and settling into your new role abroad.
            </li>
            <li>
              <span className="font-semibold">Enhanced Features</span>:We’re
              also working on new and exciting features, including:
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <span className="font-semibold">Job Matching Tools</span>:
                  Personalized job suggestions based on your skills, industry,
                  and preferred location.
                </li>
                <li>
                  <span className="font-semibold"> Sponsored Job Alerts</span> :
                  Notifications that keep you updated on new job postings that
                  offer visa sponsorship.
                </li>
                <li>
                  <span className="font-semibold">
                    {" "}
                    Interview Prep and Visa Application Assistance
                  </span>{" "}
                  : Expert resources to help you prepare for interviews and
                  navigate visa applications successfully.
                </li>
              </ul>
            </li>
          </ul>
          <p>
            We’re thrilled about the future and hope that these enhancements
            will further support you in securing the job and visa sponsorship
            you need to launch your international career.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold dark:text-blue-600">
            Join the SponsorshipBase Community
          </h2>
          <p>
            Whether you’re here to contribute or to explore opportunities, we
            invite you to join our community. Together, we can build a database
            of trustworthy information that supports and empowers individuals in
            their journey toward international career success.
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-semibold">
            Start your journey today with SponsorshipBase.
          </h2>
          <a className="text-blue-600 underline" href={AUTH_ROUTES.register}>
            Sign Up Now
          </a>
        </div>
      </div>
    </>
  );
};
