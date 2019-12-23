using System.Collections.Generic;

namespace DeviousCreation.CqrsIdentity.Web.Infrastructure.Data
{
    public class ModelStateTransferContainer
    {
        public string Key { get; set; }
        public string AttemptedValue { get; set; }
        public object RawValue { get; set; }
        public ICollection<string> ErrorMessages { get; set; } = new List<string>();
    }
}
