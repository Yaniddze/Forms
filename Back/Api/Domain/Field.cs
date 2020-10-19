using System;

namespace Api.Domain
{
    public class Field
    {
        public Guid Id { get; set; }
        public object Value { get; set; }
        public string Name { get; set; }
    }
}