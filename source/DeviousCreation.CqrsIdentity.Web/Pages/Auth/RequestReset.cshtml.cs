using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Constants;
using DeviousCreation.CqrsIdentity.Web.Pages.App.UserManagement.Users;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DeviousCreation.CqrsIdentity.Web.Pages.Auth
{
    public class RequestReset : PrgPageModel<RequestReset.Model>
    {
        private readonly IMediator _mediator;

        public RequestReset(IMediator mediator)
        {
            this._mediator = mediator;
        }

        public IActionResult OnGet()
        {
            if (this.User.Identity.IsAuthenticated)
            {
                return this.RedirectToPage(PageLocations.App_Dashboard);
            }

            return this.Page();
        }

        public async Task<IActionResult> OnPost()
        {
            if (!this.ModelState.IsValid)
            {
                return this.RedirectToPage();
            }

            var result = await this._mediator.Send(new RequestPasswordResetCommand(this.PageModel.EmailAddress));
            this.PrgState = PrgState.Success;
            this.AddPageNotification("Email Sent", "an email has been sent with instructions on how to continue.");
            this.PageModel = new Model();
            return this.RedirectToPage();
        }

        public class Model
        {
            public string EmailAddress { get; set; }
        }

        public class Validator : AbstractValidator<Model>
        {
            public Validator()
            {
                this.RuleFor(x => x.EmailAddress).NotEmpty();
            }
        }
    }
}