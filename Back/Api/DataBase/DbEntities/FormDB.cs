using System;
using System.Collections.Generic;

namespace Api.DataBase.DbEntities
{
    public class FormDB
    {
        public Guid Id { get; set; }
        public string[] Keywords { get; set; }
        
        public IEnumerable<FieldDB> Fields { get; set; }
    }
}