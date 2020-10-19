using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Storage.Migrations.ApiContextMigrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "forms",
                columns: table => new
                {
                    id = table.Column<Guid>(nullable: false),
                    keywords = table.Column<string[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_forms", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "fields",
                columns: table => new
                {
                    id = table.Column<Guid>(nullable: false),
                    name = table.Column<string>(nullable: true),
                    value = table.Column<string>(nullable: true),
                    FormId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_fields", x => x.id);
                    table.ForeignKey(
                        name: "FK_fields_forms_FormId",
                        column: x => x.FormId,
                        principalTable: "forms",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_fields_FormId",
                table: "fields",
                column: "FormId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "fields");

            migrationBuilder.DropTable(
                name: "forms");
        }
    }
}
