using System;

namespace Api.DataBase.DbEntities
{
    public class FieldDB
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public object Value { get; set; }

        public Guid FormId { get; set; }
        public FormDB Form { get; set; }
    }
}