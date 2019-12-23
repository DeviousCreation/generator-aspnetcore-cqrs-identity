using System;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using JetBrains.Annotations;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DeviousCreation.CqrsIdentity.Web.Pages.Auth
{
    public class ResetPassword : PageModel
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
                return this.RedirectToPage("/Dashboard/Index");
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
    }
}