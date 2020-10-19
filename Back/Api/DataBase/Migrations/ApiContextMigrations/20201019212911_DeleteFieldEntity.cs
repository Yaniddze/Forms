using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.DataBase.Migrations.ApiContextMigrations
{
    public partial class DeleteFieldEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "fields");

            migrationBuilder.AddColumn<string>(
                name: "Fields",
                table: "forms",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Fields",
                table: "forms");

            migrationBuilder.CreateTable(
                name: "fields",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    FormId = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    value = table.Column<string>(type: "text", nullable: true)
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
    }
}
