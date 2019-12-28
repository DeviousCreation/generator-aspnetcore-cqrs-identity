using System;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Constants;
using DeviousCreation.CqrsIdentity.Web.Pages.Auth;
using FluentValidation;
using JetBrains.Annotations;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DeviousCreation.CqrsIdentity.Web.Pages.App.UserManagement.Users
{
    [Authorize]
    public class Create : PageModel
    {
        private readonly IMediator _mediator;

        public Create([NotNull] IMediator mediator)
        {
            this._mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [BindProperty]
        public Model PageModel { get; set; }

        [TempData]
        public PrgState PrgState { get; set; }

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!this.ModelState.IsValid)
            {
                return this.RedirectToPage();
            }

            var result = await this._mediator.Send(new CreateUserCommand(PageModel.EmailAddress, PageModel.Username,
                PageModel.IsLockable));

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


        public class Model
        {
            public string EmailAddress { get; set; }
            public string Username { get; set; }
            public bool IsLockable { get; set; }
        }

        public class Validator : AbstractValidator<Model>
        {
            public Validator()
            {
                this.RuleFor(x => x.EmailAddress).NotEmpty();
                this.RuleFor(x => x.Username).NotEmpty();
            }
        }
    }
}
