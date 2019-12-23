namespace DeviousCreation.CqrsIdentity.Queries.Models.User
{
    public class MfaMethodStatus
    {
        public MfaMethodStatus()
        {
            this.HasMobile = false;
            this.HasAuthApp = false;
            this.HasAuthDevice = false;
        }
        public MfaMethodStatus(bool hasMobile, bool hasAuthApp, bool hasAuthDevice)
        {
            this.HasMobile = hasMobile;
            this.HasAuthApp = hasAuthApp;
            this.HasAuthDevice = hasAuthDevice;
        }
        public bool HasMobile { get; }
        public bool HasAuthApp { get; }
        public bool HasAuthDevice { get; }
    }
}
