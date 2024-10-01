using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SponsorshipBase.Migrations
{
    /// <inheritdoc />
    public partial class AddIndustryAndChangeGenderToSex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Gender",
                table: "Sponsorships",
                newName: "Sex");

            migrationBuilder.RenameColumn(
                name: "Gender",
                table: "AspNetUsers",
                newName: "Sex");

            migrationBuilder.AddColumn<string>(
                name: "Industry",
                table: "Sponsorships",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Industry",
                table: "Sponsorships");

            migrationBuilder.RenameColumn(
                name: "Sex",
                table: "Sponsorships",
                newName: "Gender");

            migrationBuilder.RenameColumn(
                name: "Sex",
                table: "AspNetUsers",
                newName: "Gender");
        }
    }
}
