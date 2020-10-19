using System;
using System.Collections.Generic;

namespace Api.Domain
{
    public class Form
    {
        public Guid Id { get; set; }
        public IEnumerable<Field> Fields { get; set; }
        public string[] Keywords { get; set; }
    }
}
