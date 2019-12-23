using System;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core.Settings;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using FluentValidation;
using JetBrains.Annotations;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;

namespace DeviousCreation.CqrsIdentity.Web.Pages
{
    public class FirstRun : PageModel
    {
        private readonly IdentitySettings _identitySettings;
        private readonly IMediator _mediator;
        private readonly IUserQueries _userQueries;

        public FirstRun([NotNull] IMediator mediator, [NotNull] IOptions<IdentitySettings> identitySettings,
            [NotNull] IUserQueries userQueries)
        {
            if (identitySettings == null)
            {
                throw new ArgumentNullException(nameof(identitySettings));
            }

            this._mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            this._userQueries = userQueries ?? throw new ArgumentNullException(nameof(userQueries));
            this._identitySettings = identitySettings.Value;
        }

  

        [BindProperty]
        public Model PageModel { get; set; }

        [TempData]
        public bool DataSubmitted { get; set; }

        public async Task<IActionResult> OnGetAsync()
        {
            var check = await this._userQueries.CheckForPresenceOfAnyUser(CancellationToken.None);
            if (check.IsPresent)
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

            var res = await this._mediator.Send(new CreateInitialUserCommand(
                this.PageModel.EmailAddress,
                this.PageModel.Username,
                this.PageModel.Password, this.PageModel.FirstName, this.PageModel.LastName));

            this.DataSubmitted = true;

            return this.RedirectToPage();
        }

        public class Model
        {
            public string EmailAddress { get; set; }

            public string Username { get; set; }

            public string FirstName { get; set; }

            public string LastName { get; set; }

            public string Password { get; set; }

            public string PasswordConfirmation { get; set; }
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
                

                this.RuleFor(x => x.Password).NotEmpty();
                this.RuleFor(x => x.PasswordConfirmation).Equal(x => x.Password);
            }
        }
    }
}