using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Attributes;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Constants;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;

namespace DeviousCreation.CqrsIdentity.Web.Pages.App.Profile
{
    [ModelStatePersistence]
    public class Details : PageModel
    {
        private readonly IUserQueries _userQueries;
        private readonly IMediator _mediator;

        public Details(IUserQueries userQueries, IMediator mediator)
        {
            this._userQueries = userQueries;
            this._mediator = mediator;
        }

        [BindProperty]
        public Model PageModel { get; set; }

        [TempData]
        public PrgState PrgState { get; set; }

        public async Task<IActionResult> OnGetAsync()
        {
            if (this.TempData.ContainsKey("Details.PageModel"))
            {
                this.PageModel = JsonConvert.DeserializeObject<Model>(this.TempData["Details.PageModel"] as string);
            }
            else
            {
                var profile = await this._userQueries.GetSystemProfileForCurrentUser(CancellationToken.None);
                if (profile.HasNoValue)
                {
                    return this.NotFound();
                }

                this.PageModel = new Model
                {
                    Username = profile.Value.Username,
                    EmailAddress = profile.Value.EmailAddress,
                    FirstName = profile.Value.FirstName,
                    LastName = profile.Value.LastName,
                };
            }

            return this.Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!this.ModelState.IsValid)
            {
                this.TempData.Add("PageModel", JsonConvert.SerializeObject(this.PageModel));
                return this.RedirectToPage();
            }

            var result =
                await this._mediator.Send(
                    new UpdateProfileCommand(this.PageModel.FirstName, this.PageModel.LastName, this.PageModel.EmailAddress));
            if (result.IsSuccess)
            {
                this.PrgState = PrgState.Success;
            }
            else
            {
                this.TempData.Add("PageModel", JsonConvert.SerializeObject(this.PageModel));
                this.PrgState = PrgState.Failed;
            }

            return this.RedirectToPage();
        }

        public class Model
        {
            public string FirstName { get; set; }

            public string LastName { get; set; }

            public string EmailAddress { get; set; }

            public string Username { get; set; }
        }

        public class Validator : AbstractValidator<Model>
        {

        }
    }
}
