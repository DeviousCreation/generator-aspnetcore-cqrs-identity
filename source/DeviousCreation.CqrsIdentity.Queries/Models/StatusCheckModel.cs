// TOKEN_COPYRIGHT_TEXT

namespace DeviousCreation.CqrsIdentity.Queries.Models
{
    public sealed class StatusCheckModel
    {
        public StatusCheckModel(bool isPresent)
        {
            this.IsPresent = isPresent;
        }

        public bool IsPresent { get; }
    }
}