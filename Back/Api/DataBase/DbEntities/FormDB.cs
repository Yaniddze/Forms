using System;

namespace Api.DataBase.DbEntities
{
    public class FormDB
    {
        public Guid Id { get; set; }
        public string[] Keywords { get; set; }
        public string Fields { get; set; }
    }
}