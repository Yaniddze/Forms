namespace Api.UseCases.Abstractions
{
    public class AbstractAnswer
    {
        public bool Success { get; set; }
        public string[] Errors { get; set; }

        public static AbstractAnswer CreateSuccess()
        {
            return new AbstractAnswer
            {
                Success = true,
            };
        }
        public static AbstractAnswer CreateFailed(string[] errors)
        {
            return new AbstractAnswer
            {
                Success = false,
                Errors = errors,
            };
        }
    }
    
    public class AbstractAnswer<TData>
    {
        public bool Success { get; set; }
        public string[] Errors { get; set; }
        public TData Data { get; set; }

        public static AbstractAnswer<TData> CreateSuccess(TData data)
        {
            return new AbstractAnswer<TData>
            {
                Success = true,
                Data = data,
            };
        }
        public static AbstractAnswer<TData> CreateFailed(string[] errors)
        {
            return new AbstractAnswer<TData>
            {
                Success = false,
                Errors = errors,
            };
        }
    }
}
