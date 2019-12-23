using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DeviousCreation.CqrsIdentity.Web.Pages.Auth
{
    public class RequestReset : PageModel
    {
        private readonly IMediator _mediator;

        public RequestReset(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [BindProperty]
        public Model PageModel { get; set; }

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
                return this.RedirectToPage();
            }

            var result = await this._mediator.Send(new RequestPasswordResetCommand(this.PageModel.Credential));
            return this.RedirectToPage();
        }

        public class Model
        {
            public string Credential { get; set; }
        }

        public class Validator : AbstractValidator<Model>
        {
            public Validator()
            {
                this.RuleFor(x => x.Credential).NotEmpty();
            }
        }
    }
}