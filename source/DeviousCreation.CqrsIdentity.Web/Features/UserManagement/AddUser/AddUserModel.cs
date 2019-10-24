// TOKEN_COPYRIGHT_TEXT

namespace DeviousCreation.CqrsIdentity.Web.Features.UserManagement.AddUser
{
    public class AddUserModel
    {
        public string EmailAddress { get; set; }

        public string Username { get; set; }

        public bool IsLockable { get; set; }
    }
}