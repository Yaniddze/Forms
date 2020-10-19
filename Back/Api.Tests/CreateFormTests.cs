using System.Linq;
using Api.Infostructure.Handlers;
using Xunit;

namespace Api.Tests
{
    public class SomeTests
    {
        [Fact]
        public void test_1()
        {
            object obj = new[]
            {
                new
                {
                    title = "123",
                    name = "321",
                    cool = true,
                },
                new
                {
                    title = "5567",
                    name = "321",
                    cool = false,
                }
            };

            var keys = new GetObjectsKeysHandler().Handle(obj);

            Assert.True(keys.Length == 12);
            Assert.True(keys.Contains("5567"));
            Assert.True(keys.Contains("false"));
        }
    }
}