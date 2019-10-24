// TOKEN_COPYRIGHT_TEXT

namespace DeviousCreation.CqrsIdentity.Core.Contracts
{
    public interface IPasswordValidator
    {
        bool IsValid(string password);
    }
}