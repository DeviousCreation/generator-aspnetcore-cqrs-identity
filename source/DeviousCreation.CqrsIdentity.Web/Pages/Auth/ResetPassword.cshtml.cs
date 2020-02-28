using System;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Constants;
using DeviousCreation.CqrsIdentity.Web.Pages.App.UserManagement.Users;
using FluentValidation;
using JetBrains.Annotations;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DeviousCreation.CqrsIdentity.Web.Pages.Auth
{
    public class ResetPassword : PrgPageModel<ResetPassword.Model>
    {
        private readonly IMediator _mediator;

        public ResetPassword([NotNull] IMediator mediator)
        {
            this._mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        public string NewPassword { get; set; }

        public string Token { get; set; }

        public IActionResult OnGet()
        {
            if (this.User.Identity.IsAuthenticated)
            {
                return this.RedirectToPage(PageLocations.App_Dashboard);
            }

            return this.Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!this.ModelState.IsValid)
            {
                return this.Page();
            }

            var result = await this._mediator.Send(new ResetPasswordCommand(this.Token, this.NewPassword));
            if (result.IsSuccess)
            {
                return this.RedirectToPage();
            }

            return this.Page();
        }

        public class Model
        {
            public string Token { get; set; }

            public string Password { get; set; }
            public string PasswordConfirmation { get; set; }
        }

        public class Validator : AbstractValidator<Auth.Model>
        {
            public Validator()
            {
                this.RuleFor(x => x.Token).NotEmpty();
                this.RuleFor(x => x.Password).NotEmpty();
                this.RuleFor(x => x.PasswordConfirmation).Equal(x => x.Password);
            }
        }
    }
}