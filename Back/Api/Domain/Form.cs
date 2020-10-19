using System;

namespace Api.Domain
{
    public class Form
    {
        public Guid Id { get; set; }
        public string Fields { get; set; }
        public string[] Keywords { get; set; }
    }
}
