export default {
  logo: (
    <span
      style={{
        display: "flex",
        color: "rgb(37 99 235)"
      }}
    >
      <img
        src="./sb-logo.png"
        alt="sb-logo"
        style={{
          marginRight: "8px",
          height: "25px",
          width: "25px",
          borderRadius: "6px"
        }}
      />
      <strong>SponsorshipBase</strong>
    </span>
  ),
  project: {
    link: "https://github.com/Dev-Akashili/sponsorship-base"
  },
  head: (
    <>
      <link rel="icon" type="image/svg+xml" href="./sb-icon.png" />
    </>
  ),
  footer: {
    text: (
      <span>
        <a href="" target="_blank">
          ©{new Date().getFullYear()} SponsorshipBase
        </a>
      </span>
    )
  }
};
