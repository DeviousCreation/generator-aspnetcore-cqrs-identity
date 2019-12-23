using System;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Attributes;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Constants;
using FluentValidation;
using JetBrains.Annotations;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DeviousCreation.CqrsIdentity.Web.Pages.App.Profile
{
    [ModelStatePersistence]
    public class Password : PageModel
    {
        private readonly IMediator _mediator;

        public Password([NotNull] IMediator mediator)
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

            var result = await this._mediator.Send(new ChangePasswordCommand(
                this.PageModel.OldPassword, this.PageModel.NewPassword));

            this.PrgState = result.IsSuccess ? PrgState.Success : PrgState.Failed;

            return this.RedirectToPage();
        }


        public class Model
        {
            public string OldPassword { get; set; }

            public string NewPassword { get; set; }

            public string ConfirmPassword { get; set; }
        }

        public class Validator : AbstractValidator<Model>
        {
        }
    }
}