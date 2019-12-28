using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core.Settings;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Attributes;
using FluentValidation;
using JetBrains.Annotations;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;

namespace DeviousCreation.CqrsIdentity.Web.Pages.Auth
{
    [ModelStatePersistence]
    public class Register : PageModel
    {
        private readonly IdentitySettings _identitySettings;
        private readonly IMediator _mediator;

        public Register([NotNull] IMediator mediator, [NotNull] IOptions<IdentitySettings> identitySettings)
        {
            if (identitySettings == null)
            {
                throw new ArgumentNullException(nameof(identitySettings));
            }

            this._mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            this._identitySettings = identitySettings.Value;
        }

       [BindProperty]
        public Model PageModel { get; set; }

        [TempData]
        public bool DataSubmitted { get; set; }

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
            if (this.ModelState.IsValid)
            {

                    var res = await this._mediator.Send(new CreateUserCommand(
                        this.PageModel.EmailAddress,
                        this.PageModel.Username, this._identitySettings.RegisteredAccountsLock, false, new List<Guid>()));

                    this.DataSubmitted = true;
            }

            return this.RedirectToPage();
        }

        public class Model
        {
            public string EmailAddress { get; set; }

            public string Username { get; set; }

            public string FirstName { get; set; }

            public string LastName { get; set; }
        }

        public class Validator : AbstractValidator<Model>
        {
            public Validator([NotNull] IOptions<IdentitySettings> identitySettings)
            {
                if (identitySettings == null)
                {
                    throw new ArgumentNullException(nameof(identitySettings));
                }

                this.RuleFor(x => x.FirstName).NotEmpty().WithMessage("Please enter your first name");
                this.RuleFor(x => x.LastName).NotEmpty().WithMessage("Please enter your last name");
                this.RuleFor(x => x.EmailAddress).EmailAddress().WithMessage("The email address doesn't look right.")
                    .NotEmpty().WithMessage("Please enter your email address");
                
                    this.RuleFor(x => x.Username).NotEmpty().WithMessage("Please enter a username");
                
            }
        }
    }
}