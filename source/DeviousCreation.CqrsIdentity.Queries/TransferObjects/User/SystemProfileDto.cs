namespace DeviousCreation.CqrsIdentity.Queries.TransferObjects.User
{
    public class SystemProfileDto
    {
        public string EmailAddress { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Username { get; set; }

        public bool IsAdmin { get; set; }
    }
}
