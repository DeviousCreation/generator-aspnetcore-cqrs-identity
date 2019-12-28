using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Attributes;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Constants;
using DeviousCreation.CqrsIdentity.Web.Pages.Auth;
using FluentValidation;
using JetBrains.Annotations;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace DeviousCreation.CqrsIdentity.Web.Pages.App.UserManagement.Users
{
    [ResourceBasedAuthorize(AuthorizationResources.CreateUser)]
    public class Create : PageModel
    {
        private readonly IMediator _mediator;
        private readonly IRoleQueries _roleQueries;

        public Create([NotNull] IMediator mediator, IRoleQueries roleQueries)
        {
            this._mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            this._roleQueries = roleQueries;
        }

        [BindProperty]
        public Model PageModel { get; set; }

        [TempData]
        public PrgState PrgState { get; set; }

        public List<SelectListItem> AvalibleRoles { get; set; }

        public async Task OnGet()
        {
            this.AvalibleRoles = new List<SelectListItem>();
            var roles = await this._roleQueries.GetSimpleRoles(cancellationToken: CancellationToken.None);
            if (roles.HasValue)
            {
                this.AvalibleRoles.AddRange(roles.Value.Entities.Select(x=> new SelectListItem(x.Name, x.Id.ToString())));
            }
            
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!this.ModelState.IsValid)
            {
                return this.RedirectToPage();
            }

            var result = await this._mediator.Send(new CreateUserCommand(PageModel.EmailAddress, PageModel.Username,
                PageModel.IsLockable, PageModel.IsAdmin, PageModel.Roles));

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

            public bool IsAdmin { get; set; }

            public List<Guid> Roles { get; set; }
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
