using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Constants;
using JetBrains.Annotations;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DeviousCreation.CqrsIdentity.Web.Pages.App.Profile
{
    public class SecurityKeys : PageModel
    {
        private readonly IMediator _mediator;
        private readonly IUserQueries _userQueries;

        public IReadOnlyCollection<DetailedDevice> DeviceInfos;

        public SecurityKeys([NotNull] IUserQueries userQueries, IMediator mediator)
        {
            this._userQueries = userQueries ?? throw new ArgumentNullException(nameof(userQueries));
            this._mediator = mediator;
        }

        [BindProperty]
        public Model PageModel { get; set; }

        [TempData]
        public PrgState PrgState { get; set; }

        public async Task OnGetAsync()
        {
            var devices = await this._userQueries.GetDeviceInfoForCurrentUser(CancellationToken.None);
            this.DeviceInfos = devices.HasValue
                ? devices.Value.Entities.Select(x => new DetailedDevice(
                    x.Id,
                    x.Name,
                    null,
                    null
                )).ToImmutableList()
                : new List<DetailedDevice>().ToImmutableList();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!this.ModelState.IsValid)
            {
                return this.RedirectToPage();
            }

            //var result = await this._mediator.Send(new EnrollDeviceCommand(
            //    this.PageModel.Nickname,
            //    this.PageModel.Challenge,
            //    this.PageModel.RegistrationData, this.PageModel.ClientData));

            //if (result.IsSuccess)
            //{
            //    this.PrgState = PrgState.Success;
            //}
            //else
            //{
            //    this.TempData.Add("PageModel", JsonConvert.SerializeObject(PageModel));
            //    this.PrgState = PrgState.Failed;
            //}

            return this.RedirectToPage();
        }

        public async Task<IActionResult> OnPostRevokeAsync([FromForm] Guid id)
        {
            return this.RedirectToPage();
        }

        public class Model
        {
            public string Challenge { get; set; }

            public string RegistrationData { get; set; }

            public string ClientData { get; set; }

            public string Nickname { get; set; }
        }

        public class DetailedDevice
        {
            public DetailedDevice(Guid id, string name, string keyHandle, string publicKey)
            {
                this.Id = id;
                this.Name = name;
                this.KeyHandle = keyHandle;
                this.PublicKey = publicKey;
            }

            public Guid Id { get; }

            public string Name { get; }

            public string KeyHandle { get; }

            public string PublicKey { get; }
        }
    }
}