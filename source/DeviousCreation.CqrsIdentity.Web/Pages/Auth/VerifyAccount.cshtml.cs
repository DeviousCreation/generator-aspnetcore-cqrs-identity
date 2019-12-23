using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Constants;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DeviousCreation.CqrsIdentity.Web.Pages.Auth
{
    public class VerifyAccount : PageModel
    {
        private readonly IMediator _mediator;

        public VerifyAccount(IMediator mediator)
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

            if (this.PageModel == null)
            {

                this.PageModel = new Model
                {
                    Token = this.Token
                };
            }

            return this.Page();

            return this.Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!this.ModelState.IsValid)
            {
                return this.RedirectToPage(this.PageModel);
            }

            var result =
                    await this._mediator.Send(new VerifyAccountAndSetPasswordCommand(this.PageModel.Token, this.PageModel.Password));
            if (result.IsSuccess)
            {
                PrgState = PrgState.Success;
            }
            else
            {
                PrgState = PrgState.Failed;
            }
            return this.RedirectToPage(this.PageModel);

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
}
