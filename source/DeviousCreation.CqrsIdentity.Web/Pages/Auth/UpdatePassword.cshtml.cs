using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Constants;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DeviousCreation.CqrsIdentity.Web.Pages.Auth
{
    public class UpdatePassword : PageModel
    {
        private readonly IMediator _mediator;

        public UpdatePassword(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [BindProperty(SupportsGet = true)]
        public string Token { get; set; }

        [BindProperty]
        public Model PageModel { get; set; }

        [TempData]
        public PrgState PrgState { get; set; }

        public IActionResult OnGet()
        {
            if (this.User.Identity.IsAuthenticated)
            {
                return this.RedirectToPage("/Dashboard/Index");
            }

            this.PageModel = new Model
            {
                Token = this.Token
            };
            return this.Page();

        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!this.ModelState.IsValid)
            {
                return this.RedirectToPage();
            }

            var result = await this._mediator.Send(new ResetPasswordCommand(PageModel.Token, PageModel.Password));
            if (result.IsSuccess)
            {
                PrgState = PrgState.Success;
            }
            else
            {
                PrgState = PrgState.Failed;
            }
            return this.RedirectToPage();
        }
    }

    public class Model
    {
        public string Token { get; set; }

        public string Password { get; set; }
        public string PasswordConfirmation { get; set; }
    }

    public class Validator : AbstractValidator<Model>
    {
        public Validator()
        {
            this.RuleFor(x => x.Token).NotEmpty();
            this.RuleFor(x => x.Password).NotEmpty();
            this.RuleFor(x => x.PasswordConfirmation).Equal(x => x.Password);
        }
    }
}
