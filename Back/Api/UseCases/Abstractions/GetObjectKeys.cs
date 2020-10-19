namespace Api.UseCases.Abstractions
{
    public interface GetObjectKeys
    {
        string[] Handle(object obj);
    }
}