using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SponsorshipBase.Migrations
{
    /// <inheritdoc />
    public partial class AddEducationAndCountryOfQualificationToSponsorship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CountryOfQualification",
                table: "Sponsorships",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Education",
                table: "Sponsorships",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CountryOfQualification",
                table: "Sponsorships");

            migrationBuilder.DropColumn(
                name: "Education",
                table: "Sponsorships");
        }
    }
}
